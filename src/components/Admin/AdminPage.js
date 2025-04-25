import React from 'react';
import './Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="container_admin mt-4">
        <h1 className="titulo_admin">Bem Vindo Administrador</h1>
        <div className="row" style={{ marginLeft: '-190px'}}>
          <div className="col-md-3 mb-1">
            <button onClick={() => handleNavigation('/admin/Utilizador')} className="btn-icon">
              <i className="fas fa-user"></i>
              <span>Gerir Utilizadores</span>
            </button>
          </div>
          <div className="col-md-3 mb-1">
            <button onClick={() => handleNavigation('/admin/Entidades')} className="btn-icon">
              <i className="fas fa-building"></i>
              <span>Gerir Entidades</span>
            </button>
          </div>
          <div className="col-md-3 mb-1">
            <button onClick={() => handleNavigation('/admin/Relatorio')} className="btn-icon">
              <i className="fas fa-file-alt"></i>
              <span>Gerir Relatórios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;