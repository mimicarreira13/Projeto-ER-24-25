import React, {useState, useEffect} from 'react';
import './Publica.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../NavBar/NavBar';

const PublicaPage = () => {
    const [darkMode, setDarkMode] = useState(true);

    const [title, setTitle]= useState('');
    const [description, setDescription]= useState('');
    const [dimensions, setDimensions]= useState('');
    const [location, setLocation]= useState('');
    const [quality, setQuality]= useState('');
    const [category, setCategory]= useState('');
    const [picture, setPicture]= useState('');
    const [type, setType]= useState('');
    const [price, setPrice]= useState('0');
    const [authorId, setAuthor]= useState('67587b87745799702194073e');

    const navigate = useNavigate();

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emptyFields = [title, description, dimensions, location, quality, category, picture, type].filter(
            (field) => field.trim() === ''
        );

        if (emptyFields.length > 0) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        try {
            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, dimensions, location, quality, category, picture, type, price, authorId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else {
                navigate('/');
            }

            const data = await response.json();
            console.log('Post created successfully:', data);
        } catch (error) {
            console.error('Error creating post:', error);  // Log the full error message
        }
    };



    useEffect(() => {
        document.body.className = darkMode ?  'light-mode' : 'dark-mode';
    }, [darkMode]);
    return (
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap" rel="stylesheet"/>
            <div id="tudo">
                <h1 id="title">Criar nova publicação</h1>
                <div id="publication">
                    <form id="WideFormat" onSubmit={handleSubmit}>
                        <div id="column">
                            <div className="rowL">
                                <input
                                    type="text"
                                    id="titulo"
                                    name="title"
                                    className="inputL"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Inserir o titulo da publicação..."
                                />
                            </div>
                            <div className="rowL">
                                <textarea
                                    rows="9"
                                    id="descricao"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Inserir a descrição da publicação..."
                                ></textarea>
                            </div>
                            <div className="rowL">
                                <div className="miniColumn">
                                    <select
                                        name="location"
                                        className="selectL"
                                        id="localidades"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    >
                                        <option value="">Localidade</option>
                                        <option value="calheta">Calheta</option>
                                        <option value="camara-de-lobos">Câmara de Lobos</option>
                                        <option value="funchal">Funchal</option>
                                        <option value="machico">Machico</option>
                                        <option value="ponta-do-sol">Ponta do Sol</option>
                                        <option value="ponto-moniz">Porto Moniz</option>
                                        <option value="ribeira-brava">Ribeira Brava</option>
                                        <option value="santa-cruz">Santa Cruz</option>
                                        <option value="santana">Santana</option>
                                        <option value="sao-vicente">São Vicente</option>
                                    </select>
                                    <br />
                                    <select
                                        name="category"
                                        id="categoria"
                                        className="selectL"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Categoria</option>
                                        <option value="eletronica">Eletrónica</option>
                                        <option value="roupa">Roupas</option>
                                        <option value="moveis">Móveis</option>
                                        <option value="bijuteria">Bijuteria</option>
                                    </select>
                                </div>
                                <div className="miniColumn">
                                    <select
                                        name="quality"
                                        id="qualidade"
                                        className="selectL"
                                        value={quality}
                                        onChange={(e) => setQuality(e.target.value)}
                                    >
                                        <option value="">Qualidade</option>
                                        <option value="muito-bom">Muito bom</option>
                                        <option value="bom">Bom</option>
                                        <option value="usado">Usado</option>
                                    </select>
                                    <br />
                                    <input
                                        type="text"
                                        id="dimensoes"
                                        className="inputL"
                                        name="dimensions"
                                        value={dimensions}
                                        onChange={(e) => setDimensions(e.target.value)}
                                        placeholder="Dimensões"
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="column">
                            <div id="rowR">
                                <input
                                    type="text"
                                    id="imagens"
                                    className="inputL"
                                    name="picture"
                                    value={picture}
                                    onChange={(e) => setPicture(e.target.value)}
                                    placeholder="Inserir link de imagem"
                                />
                            </div>
                            <div id='rowR'>
                                <select
                                    name="type"
                                    id="type"
                                    className="selectL"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Tipo de publicação</option>
                                    <option value="Doação">Doação</option>
                                    <option value="Troca">Troca</option>
                                    <option value="venda">Venda</option>
                                </select>
                                <input
                                    type="text"
                                    id="price"
                                    className="inputL"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Inserir o preço"
                                />
                            </div>
                        </div>
                        <div id="alignSubmit">
                            <input type="submit" value="Submit" id="submit" className="inputL" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PublicaPage;
