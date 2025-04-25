import React, { useState, useEffect } from 'react';
import './Guardados.css';
import { FaTrash } from 'react-icons/fa';

const Guardados = ({ username }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
        setItems(savedItems);
    }, []);

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem('savedItems', JSON.stringify(updatedItems));
    };

    return (
        <div>
            <h1 className="titulo_guardados">Items Guardados</h1>
            {items.length === 0 ? (
                <p className="info_sem_artigos">Ainda não tem artigos nos Favoritos</p>
            ) : (
                <div className="grid-container_g">
                    {items.map((item, index) => (
                        <div className="grid-item_g" key={index}>
                            <div className="item-image_g">
                                <img src={item.picture} alt={item.title}/>
                            </div>
                            <div className="item-details_g">
                                <h3>{item.title}</h3>
                                {item.type === 'venda' ? (
                                    <p className="item-price_g">{item.price} €</p>
                                ) : (
                                    <p className="item-price_g">
                                        {item.type === 'doacao' ? 'Doação' : item.type === 'troca' ? 'Troca' : item.type}
                                    </p>
                                )}
                                <p className="item-location_g">{item.location}</p>
                                <p className="item-created-at_g">{new Date(item.createdAt).toLocaleString()}</p>
                                <FaTrash className="delete-icon_g" onClick={() => handleDeleteItem(index)}/>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Guardados;