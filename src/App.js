import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AdminPage from './components/Admin/AdminPage';
import GereUt from './components/Users/gereUt';
import GereEnt from './components/Users/gereEnt';
import GereRel from './components/Users/gereRel';
import Login from './components/Auth/Login';
import CreateAccount from './components/Auth/CreateAccount';
import Layout from './components/Layout/Layout';
import EditUser from './components/Users/editUser';
import VotarEnt from './components/VotarEnt/votarEnt';
import Monitora from './components/ImpactoAmbiental/monitora';
import Perfil from "./components/Perfil/Perfil";
import PublicaPage from './components/Publicacao/PublicaPage';
import PesquisaPage from './components/Pesquisa/PesquisaPage';
import Guardados from './components/Guardados/Guardados';
import Pagina_Publicacao from "./components/Publicacao/Pagina_Publicacao";
import Sobre from './components/Sobre/Sobre';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");
    const storedAccountType = localStorage.getItem("accountType");
    const storedStatus = localStorage.getItem("status");
    
    if (storedIsLoggedIn && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedIsLoggedIn && storedAccountType) {
      setAccountType(storedAccountType);
    }
    if (storedIsLoggedIn && storedStatus) {
      setStatus(storedStatus);
    }
  }, []);

  const handleLogin = (username, accountType, status) => {
    setIsLoggedIn(true);
    setUsername(username);
    setAccountType(accountType);
    setStatus(status);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("accountType", accountType);
    localStorage.setItem("status", status);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setAccountType("");
    setStatus("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("accountType"); 
    localStorage.removeItem("status");
  };

  return (
    <Router>
      <div>
        <Layout
          isLoggedIn={isLoggedIn}
          onLoginClick={handleLogout}
          accountType={accountType}
          status={status}
        />
        <Routes>
          <Route
              path="/"
              element={<HomePage isLoggedIn={isLoggedIn} username={username} accountType={accountType} />}
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/Utilizador" element={<GereUt />} />
          <Route path="/admin/Entidades" element={<GereEnt />} />
          <Route path="/admin/Relatorio" element={<GereRel />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/create-account" element={<CreateAccount onAccountCreated={handleLogout} />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/votar" element={<VotarEnt />} />
          <Route path="/moni" element={<Monitora />} />
          <Route path="/perfil" element={ <Perfil username={username} accountType={accountType} status={status}/>} />
          <Route path="/publicar" element={ <PublicaPage />} />
          <Route path="/pesquisar" element={ <PesquisaPage />} />
          <Route path="/guardados" element={ <Guardados />} />
          <Route path="/pagina_publicacao" element={ <Pagina_Publicacao />} />
          <Route path="/sobreNos" element={ <Sobre />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;