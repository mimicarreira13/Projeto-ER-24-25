import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Pagina_Inicial_login.css';

const HomePage_Login = ({ username }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConcelho, setSelectedConcelho] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [items, setItems] = useState([]);
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/items');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();

        const existingSavedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        setSavedItems(existingSavedItems);
    }, []);

    const handleCriaPublicacao = () => {
        navigate('/publicar');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleConcelhoChange = (event) => {
        setSelectedConcelho(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleSaveItem = (event, item) => {
        event.stopPropagation();
        const isItemAlreadySaved = savedItems.some(savedItem => savedItem.title === item.title && savedItem.location === item.location);
        if (!isItemAlreadySaved) {
            const updatedSavedItems = [...savedItems, item];
            setSavedItems(updatedSavedItems);
            localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
        }
    };

    const handleItemClick = (item) => {
        navigate('/pagina_publicacao', { state: { item } });
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedConcelho === 'all' || item.location.toLowerCase() === selectedConcelho.toLowerCase()) &&
        (selectedType === 'all' || item.type === selectedType)
    );

    return (
        <div>
            {/* Search Bar */}
            <div className="search-bar-container_pi">
                <input
                    type="text"
                    placeholder="O que procuras?"
                    className="search_input_pi"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <select className="search_bar_pi" value={selectedConcelho} onChange={handleConcelhoChange}>
                    <option value="all">Toda a ilha</option>
                    <option value="calheta">Calheta</option>
                    <option value="camara-de-lobos">Câmara de Lobos</option>
                    <option value="funchal">Funchal</option>
                    <option value="machico">Machico</option>
                    <option value="ponta-do-sol">Ponta do Sol</option>
                    <option value="porto-moniz">Porto Moniz</option>
                    <option value="ribeira-brava">Ribeira Brava</option>
                    <option value="santa-cruz">Santa Cruz</option>
                    <option value="santana">Santana</option>
                    <option value="sao-vicente">São Vicente</option>
                </select>
                <select className="search_bar_pi_2" value={selectedType} onChange={handleTypeChange}>
                    <option value="all">Todos os tipos</option>
                    <option value="venda">Venda</option>
                    <option value="doacao">Doação</option>
                    <option value="troca">Troca</option>
                </select>
                <button className="search-button_pi">Pesquisar</button>
            </div>

            {/* Welcome Message */}
            <h1 className="titulo_pg_inicil_login">Destaques no ECOLOOP</h1>

            {/* Grid Section */}
            {filteredItems.length === 0 ? (
                <p className="no_results_search_p1">Não existem resultados para a pesquisa</p>
            ) : (
                <div className="grid-container_pi">
                    {filteredItems.map((item, index) => (
                        <div key={index} className="grid-item" onClick={() => handleItemClick(item)}>
                            <div className="item-image">
                                <img src={item.picture} alt={item.title}/>
                            </div>
                            <div className="item-details">
                                <h3>{item.title}</h3>{item.type === 'venda' ? (
                                <p className="item-price">{item.price} €</p>
                            ) : (
                                <p className="item-price">
                                    {item.type === 'doacao' ? 'Doação' : item.type === 'troca' ? 'Troca' : item.type}
                                </p>
                            )}
                                <p className="item-location">{item.location}</p>
                                <p className="item-time">{item.time}</p>
                                <p className="item-created-at">{new Date(item.createdAt).toLocaleString()}</p>
                                <FaHeart className="save-icon_pi" onClick={(event) => handleSaveItem(event, item)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Floating Button */}
            <button className="floating-button" onClick={handleCriaPublicacao}>
                <FaPlusCircle size={24}/>
                <div className="tooltip">Criar Nova Publicação</div>
            </button>
        </div>
    );
};

export default HomePage_Login;