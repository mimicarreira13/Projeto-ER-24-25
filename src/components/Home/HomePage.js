import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Pagina_Inicial_login from './Pagina_Inicial_login';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ isLoggedIn, username, accountType, status }) => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState('');

  const handleModalContent = (value) => {
    let videoSrc = '';
    if (value === 1) {
      videoSrc = 'https://www.youtube.com/embed/7pj3pipb9Ag?si=XnrFTgECYzy9rstP?autoplay=1&rel=0';
      setModalContent(
        <div>
          <h5>1º Passo: Registe uma conta</h5>
          <p>Registe-se com o seu número de cartão de cidadão e faça login.</p>
          <div className="video">
            <iframe
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else if (value === 2) {
      videoSrc = 'https://www.youtube.com/embed/sSxZNE-PNgI?si=Xa8n7pJ1tAMj4xjx?autoplay=1&rel=0';
      setModalContent(
        <div>
          <h5>2º Passo: Publique ou Escolha</h5>
          <p>Publique os seus produtos ou escolha os da sua preferência.</p>
          <div className="video">
            <iframe
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else if (value === 3) {
      videoSrc = 'https://www.youtube.com/embed/Qzufi5tlLKw?si=sTNtjzEs2VlZL-Ji?autoplay=1&rel=0';
      setModalContent(
        <div>
          <h5>3º Passo: Troca, Receba ou Doa</h5>
          <p>Reutilize, economize e ajude o planeta ao mesmo tempo.</p>
          <div className="video">
            <iframe
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    }
  };

  // Limpar modal quando fechado
  useEffect(() => {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      const handleModalClose = () => setModalContent('');
      modalElement.addEventListener('hidden.bs.modal', handleModalClose);

      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
      };
    }
  }, []);



  // Navegar para a página Perfil se estiver logado como entidade
  useEffect(() => {
    if (isLoggedIn && accountType === 'entidade') {
      navigate('/Perfil');
    }
  }, [isLoggedIn, accountType, navigate]);

  return (
    <div>
      {isLoggedIn ? (
        accountType !== 'entidade' ? (
          <Pagina_Inicial_login username={username} accountType={accountType} />
        ) : null
      ) : (
        <div className="cards">
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-4 mb-3">
                <button
                  type="button"
                  className="btn-saber-mais"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => handleModalContent(1)}
                >
                  <p>1º Passo</p>
                  <p>Registe uma conta</p>
                  <p>Registe-se com o seu número de cartão de cidadão e faça login</p>
                  <p>Saber mais</p>
                </button>
              </div>
              <div className="col-md-4 mb-3">
                <button
                  type="button"
                  className="btn-saber-mais"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => handleModalContent(2)}
                >
                  <p>2º Passo</p>
                  <p>Publique ou Escolha</p>
                  <p>Publique os seus produtos ou escolha os da sua preferência</p>
                  <p>Saber mais</p>
                </button>
              </div>
              <div className="col-md-4 mb-3">
                <button
                  type="button"
                  className="btn-saber-mais"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => handleModalContent(3)}
                >
                  <p>3º Passo</p>
                  <p>Troca, Receba ou Doa</p>
                  <p>Reutilize, economize e ajude o planeta ao mesmo tempo.</p>
                  <p>Saber mais</p>
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          {/* Modal */} 
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
                  <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Tutorial</h5>
              <div
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                    ></div>
            </div>
            <div class="mb-3">
            <div className="modal-body">{modalContent}</div>
            </div>
          </div>
          </div>
          </div>
      </div>
      )}
    </div>
  );
};

export default HomePage;