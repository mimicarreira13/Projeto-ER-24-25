import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_CONNECT
)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

// Estrutura para o Utilizador normal
const userSchema = new mongoose.Schema({
    username: String,
    nome : { type: String, default: null},
    nif: String,
    password: String,
    accountType: { type: String, default: "Normal" },
    status: { type: String, default: "ativo" },
    n_voto: { type: Number, default: 0 },
});


// Modelo para o Utilizador normal
const User = mongoose.model("User_info", userSchema);

// Function to generate a unique username
const generateUsername = () => {
    return uniqueNamesGenerator({
        dictionaries: [adjectives, animals], // Example: 'SillyPenguin'
        separator: '',
        length: 2,
        style: 'capital',
    }) + `_${Math.floor(1000 + Math.random() * 9000)}`; // Add random 4-digit number
};

app.get('/users', async (req, res) => {
    const { accountType, status,username} = req.query;

    try {
        let query = {};
        if (accountType ) {
            query.accountType = accountType;
        }
        if (status) {
            query.status = status;
        }
        if (username) {
            query.username = username;
        }
        const users = await User.find(query);
        res.json(users);
    } catch (error) {
        res.status(500).send('Erro ao buscar os usuários');
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
});


app.get('/users', async (req, res) => {
    const { username } = req.query; // Obtém o username
    if (!username) {
        return res.status(400).send('Username is required');
    }
    try {
        // Busca o usuário no banco de dados com o username fornecido
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
        res.status(500).send('Error fetching user');
    }
});
// Atualiza os dados do utilizador
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, nif, accountType, status } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.nome = nome || user.nome;
        user.nif = nif || user.nif;
        user.accountType = accountType || user.accountType;
        user.status = status || user.status;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

// Apaga o utilizador
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});

// Ativa o utilizador
app.put('/users/:id/activate', async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Tentando ativar o usuário com ID: ${id}`);
        const user = await User.findById(id);
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(404).send('User not found');
        }

        user.status = 'ativo';
        await user.save();
        console.log('Usuário ativado com sucesso');
        res.json({ message: 'User activated successfully' });
    } catch (error) {
        console.error('Erro ao ativar o usuário:', error);
        res.status(500).send('Error activating user');
    }
});

app.put('/users/:id/pendente', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        user.status = 'pendente';
        await user.save();
        res.json({ message: 'Usuário desativado com sucesso' });
    } catch (error) {
        res.status(500).send('Erro ao desativar usuário');
    }
});

//
app.post('/entities/:id/vote', async (req, res) => {
    const { id } = req.params;

    try {
        const entity = await User.findById(id);
        if (!entity) {
            return res.status(404).send('Entidade não encontrada');
        }

        entity.n_voto += 1;
        await entity.save();
        res.json({ message: 'Voto registrado com sucesso' });
    } catch (error) {
        res.status(500).send('Erro ao registrar voto');
    }
});

app.get('/entities/vote-percentage', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ accountType: 'normal' });
        const entities = await User.find({ accountType: 'entidade' });

        const entitiesWithVotePercentage = entities.map(entity => {
            const votePercentage = (entity.n_voto / totalUsers) * 100;
            return {
                ...entity.toObject(),
                votePercentage
            };
        });

        const entitiesAbove30Percent = entitiesWithVotePercentage.filter(entity => entity.votePercentage >= 30);

        res.json(entitiesAbove30Percent);
    } catch (error) {
        res.status(500).send('Erro ao calcular a porcentagem de votos');
    }
});

app.get('/products/count-by-category', async (req, res) => {
    try {
        const countByCategory = await Post.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(countByCategory);
    } catch (error) {
        console.error('Erro ao buscar contagem de produtos por categoria:', error);
        res.status(500).send('Erro ao buscar contagem de produtos por categoria');
    }
});

// Envia os dados para a base de dados da criação de conta
app.post('/create-account', async (req, res) => {
    const { nome, nif, password, accountType } = req.body;

    try {
        // Check if the NIF already exists
        const existingUser = await User.findOne({ nif });
        if (existingUser) {
            return res.status(400).send('NIF already exists');
        }

        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        let username = null;
        let status = 'ativo'; // valor padrão para status

        if (accountType === "normal") {
            username = generateUsername();
        } else if (accountType === "entidade") {
            status = 'pendente'; // definir status como pendente para entidades
        }

        const newUser = new User({ nome, username, nif, password: hashedPassword, accountType, status });
        await newUser.save();
        res.status(201).send('Account created');
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

app.post('/login', async (req, res) => {
    const { nif, password } = req.body;

    try {
        const user = await User.findOne({ nif });
        console.log("Login attempt:", { nif, password, accountType: user.accountType,status:user.status});
        if (!user) {
            console.log("User not found");
            return res.status(400).send('User doesnt exist');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Password is invalid');
        }

        res.status(200).json({ message: 'Login successful', nome: user.nome, username: user.username, accountType: user.accountType,status:user.status });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

// Parte de ir buscar as publicações e relacionado com a página das publicações
// Ir buscar as publicações a base de dados
app.get('/items', async (req, res) => {
    try {
        const items = await Post.find();
        res.json(items);
    } catch (error) {
        res.status(500).send('Error fetching items');
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
});

app.get('/posts/:authorId', async (req, res) => {

    const { authorId } = req.params;
    try {
        const posts = await Post.find({ authorId: authorId }); // Busca posts pelo campo authorId
        if (!posts || posts.length === 0) {
            return res.status(404).send('Posts not found');
        }
        res.json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).send('Error fetching posts');
    }
});
app.get('/posts', async (req, res) => {

    try {
        console.log('Recebendo requisição para /posts');
        const posts = await Post.find();
        console.log('Posts encontrados:', posts);
        if (posts.length === 0) {
            console.log('Nenhum post encontrado');
            return res.status(404).send('Posts not found');
        }
        res.json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).send('Error fetching posts');
    }
});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,  // Or you could use an object if you prefer to store width/height/depth separately
        required: true
    },
    location: {
        type: String,  // Can be a select with predefined location values, for example: "New York", "Los Angeles", etc.
        required: true
    },
    quality: {
        type: String,
        enum: ['muito-bom', 'bom', 'usado'], // Enum for quality options
        required: true
    },
    category: {
        type: String,
        enum: ['moveis', 'eletronica', 'roupa', 'bijuteria'], // Enum for predefined categories
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Doação', 'Troca', 'venda'],
        required: true
    },
    price: {
        type: String,
        required: false
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Assuming the post is associated with a user
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
export default Post;


app.post('/posts', async (req, res) => {
    const { title, description, dimensions, location, quality, category, picture, type, price, authorId } = req.body;

    try {
        const newPost = new Post({
            title,
            description,
            dimensions,
            location,
            quality,
            category,
            picture,
            type,
            price,
            authorId
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);  // Successfully created the post
    } catch (error) {
        console.error('Error creating post:', error);
        console.error('Request Body:', req.body);  // Log the incoming request body for debugging
        res.status(500).json({ message: 'Error creating post' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});