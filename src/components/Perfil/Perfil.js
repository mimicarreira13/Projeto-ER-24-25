import React, { useState, useEffect } from 'react';
import './Perfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';

const Perfil = ({ username, accountType, status }) => {
  const [userData, setUserData] = useState(null);
  const [authorId, setAuthorId] = useState(null); // Estado para armazenar o authorId
  const [userPosts, setUserPosts] = useState([]); // Estado para armazenar os posts
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const navigate = useNavigate();
  

  const handleNavigation = (path) => {
    console.log("Redirecionando para: ", path);
    navigate(path);
  };

  useEffect(() => {
    console.log("Tipo de conta do utilizador: ", accountType);
    console.log("Status do utilizador: ", status);

    if (accountType === 'entidade' && status === 'ativo') {
      console.log(accountType);
      console.log(status);
      handleNavigation('/admin/Relatorio');
    } else if (accountType === 'entidade' && status === 'pendente') {
      console.log(accountType);
      console.log(status);
    } else if (accountType === 'normal') {
      
      console.log("utilizador é normal - exibindo grid");
    } else if (accountType === 'admin') {
      console.log("utilizador é admin - redirecionando para /admin");
      handleNavigation('/admin');
    }
  }, [accountType, status, handleNavigation]);

  useEffect(() => {
    const fetchAuthorId = async () => {
      try {
        const response = await axios.get(`/users?username=${username}`);
  
        if (response.data && response.data.length > 0) {
          // Assume que o primeiro usuário da lista é o que você está procurando
          const user = response.data[0]; // Obtém o primeiro usuário do array
          console.log("Author ID encontrado:", user._id);
          console.log("teste:", username);
          console.log(user);
          setAuthorId(user._id); // Armazena o authorId
        } else {
          console.warn("Utilizador não encontrado no backend.");
          setError('Utilizador não encontrado.');
        }
      } catch (err) {
        console.error("Erro ao buscar authorId:", err);
        setError('Erro ao obter informações do utilizador.');
      }
    };
  
    if (username) {
      fetchAuthorId();
    }
  }, [username]);
  
  useEffect(() => {
  if (authorId) {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/posts/${authorId}`);
        console.log("Posts carregados:", response.data);
        setUserPosts(response.data); // Atualiza o estado com os posts recebidos
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
        setError('De momento não tem nenhuma publicação');
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }
}, [authorId]);

  return (
    <div className='container-perfil'>
      
     {accountType === 'normal' && (
        <>
          {loading ? (
            <p>Carregando posts...</p>
          ) : error ? (
            <div>
            <p className="error-message">{error}</p>
            <button className="floating-button" >
              <FaPlusCircle size={24}onClick= {handleNavigation('/publicar')}/>
              <div className="tooltip">Criar Nova Publicação</div>
             </button>
        </div>
          ) : (
            <div className="grid-container_pi">
              {userPosts.map((post, index) => (
                <div key={index} className="grid-item">
                  <div className="item-image">
                    <img src={post.picture} alt={post.title} />
                  </div>
                  <div className="item-details">
                    <h3>{post.title}</h3>
                    <p className="item-price">{post.description}</p>
                    <p className="item-location">{post.location}</p>
                    <p className="item-time">{post.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}


      {accountType === 'entidade' && status === 'pendente' && (
        <div className='entidade'>
          <p>De momento não tem acesso a nenhum relatório</p>
        </div>
      )}
    </div>
  );
};

export default Perfil;