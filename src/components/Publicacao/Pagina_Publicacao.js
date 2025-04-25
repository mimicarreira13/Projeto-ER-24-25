
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Pagina_Publicacao.css';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const PublicationDetails = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const { item } = location.state;
    const [username, setUsername] = useState('');



    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/users/${item.authorId}`);
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [item.authorId]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    const handleTrocaSuccess = () => {
        Swal.fire({
          title: 'Produto adiquirido com sucesso!',
          icon: 'success',
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton: 'custom-confirm-button', // Para estilos personalizados
          },
        }).then(() => {
          // Redirecionar após o clique no botão
          navigate('/');
        });
      };

    return (
        <div className="publication-details-container_pub">
            {/* Breadcrumb, Title, and Image Block */}
            <div className="main-content-block_pub">
                <div className="breadcrumb-title-image-block_pub">
                    {/* Breadcrumb Section */}
                    <div className="breadcrumb_pub">
                        <a href="/public">Home</a> / <a href="/category">{item.category}</a> / {item.title}
                    </div>

                    {/* Main Content */}
                    <div style={{ display: 'flex', width: '100%' }}>
                        {/* Left Column: Image and Title */}
                        <div style={{ flex: 2 }}>
                            <h1 className="titulo_pub">{item.title}</h1>
                            <img
                                src={item.picture}
                                alt={item.title}
                                className="publication-image_pub"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Block */}
            <div className="description-block_pub">
                <p className="items_pub">
                    <strong>Descrição:</strong> {item.description}
                </p>
                <p className="items_pub">
                    <strong>Dimensões:</strong> {item.dimensions}
                </p>
                <p className="items_pub">
                    <strong>Qualidade:</strong> {item.quality}
                </p>
            </div>

            {/* Right Column: Sidebar */}
            <div className="publication-details-sidebar_pub">
                <div className="sidebar-container sidebar-container-1">
                    {item.type === 'venda' ? (
                        <>
                            <h2 className="sidebar-heading_pub">Preço</h2>
                            <span className="price-section_pub">{item.price}€</span>
                        </>
                    ) : (
                        <>
                            <h2 className="sidebar-heading_pub">Tipo</h2>
                            <span className="price-section_pub">
            {item.type === 'doacao' ? 'Doação' : item.type === 'troca' ? 'Troca' : item.type}
        </span>
                        </>
                    )}
                </div>
                <div className="sidebar-container sidebar-container-2">
                    <h2 className="sidebar-heading_pub">Utilizador</h2>
                    <div className="sidebar-detail_pub">
                        <i className="fas fa-user"></i>
                        <span className="username_pub">{username}</span>
                    </div>
                    <p className="items_pub">
                        <strong>Data Publicação:</strong>{' '}
                        {new Date(item.createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="sidebar-container sidebar-container-3">
                    <h2 className="sidebar-heading_pub">Localização</h2>
                    <div className="location-container_pub">
                        <div>
                            <h3 className="localizacao"><FaMapMarkerAlt
                                style={{marginRight: '8px'}}/> {capitalizeFirstLetter(item.location)}</h3>
                        </div>
                        <img
                            src="../mini_map.png" // Replace with actual map thumbnail or icon
                            alt={`Mapa de ${item.location}`}
                            className="location-map_pub"
                        />
                    </div>
                </div>
                <button className="adquirir-button_pub" onClick={handleTrocaSuccess}>Adquirir Produto</button>
            </div>
        </div>
    );
};

export default PublicationDetails;
