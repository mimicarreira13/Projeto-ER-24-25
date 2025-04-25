import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBell, FaHeart } from 'react-icons/fa';
import './NavBar.css';
import Perfil from '../Perfil/Perfil';


const NavBar = ({showSpecificLink, showAboutLink, showSpecificLink_to_Rel, showSpecificLink_to_Util, showSpecificLink_to_En, isLoggedIn, onLoginClick, accountType, showProdutosReutilizadosLink }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotifications, setReadNotifications] = useState([]);
  const navigate = useNavigate();



  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const handleLogoutClick = () => {
    onLoginClick();
    navigate('/');
  };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleNotificationClick = (index) => {
        setReadNotifications([...readNotifications, index]);
        navigate('/votar');
    };

    const handleHeartClick = () => {
        navigate('/guardados');
    };
    const handleUserIconClick = () => {
      navigate('/Perfil');
    };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="./assets/images/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-content">
        <Link to="/">Home</Link>
        {showAboutLink && <Link to="/sobreNos">Sobre Nós</Link>}
        {showSpecificLink && <Link to="/admin">Admin</Link>}
        {showSpecificLink_to_Rel && <Link to="/admin/Utilizador">Gerir Utilizadores</Link>}
        {showSpecificLink_to_Util && <Link to="/admin/Entidades">Gerir Entidades</Link>}
        {showSpecificLink_to_En && <Link to="/admin/Relatorio">Relatórios</Link>}
        {isLoggedIn && accountType === 'normal' && <Link to="/votar">Votar</Link>}
        {isLoggedIn &&  showProdutosReutilizadosLink && <Link to="/moni">Produtos Reutilizados</Link>}

      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
            <div className="user-container">
                <FaBell className="icon" onClick={toggleNotifications}/>
                {showNotifications && (
                    <div className="notifications-dropdown">
                        <div
                            className={`notification-item ${readNotifications.includes(0) ? '' : 'unread'}`}
                            onClick={() => handleNotificationClick(0)}
                        >
                            {!readNotifications.includes(0) && <span className="blue-dot"></span>}
                            Tem uma empresa nova para aprovar
                        </div>
                        <div className="notification-item unread">
                            <span className="blue-dot"></span>21 pessoas guardaram a sua publicação
                        </div>
                        <div className="notification-item">
                            Já reutilizou 20 items
                        </div>
                    </div>
                )}
                <FaHeart className="icon" onClick={handleHeartClick}/>
                <FaUser className="user-icon"onClick={handleUserIconClick} />
                <button onClick={handleLogoutClick}>Logout</button>
            </div>
        ) : (
            <button onClick={handleLoginClick}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;