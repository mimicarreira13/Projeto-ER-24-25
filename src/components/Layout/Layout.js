import React, {useEffect} from 'react';
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import $ from 'jquery';
const Layout = ({isLoggedIn, onLoginClick, accountType, status 
}) => {
  const location = useLocation();

  useEffect(() => {
    // Destruir DataTable ao mudar de página
    if ($.fn.DataTable.isDataTable('#myTable')) {
      $('#myTable').DataTable().destroy();
    }
  }, [location]);

  const getNavBarProps = () => {
    if (accountType === 'admin') {
    switch (location.pathname) {
      case '/' :
        return {showSpecificLink: true, showAboutLink: false, showSpecificLink_to_Util: false, showSpecificLink_to_En: false, showSpecificLink_to_Rel: false, showProdutosReutilizadosLink: true};
      case '/admin/Utilizador':
        return { showSpecificLink: true, showAboutLink: false, showSpecificLink_to_Util: true, showSpecificLink_to_En: true, showSpecificLink_to_Rel: false,  showProdutosReutilizadosLink: true };
      case '/admin/Entidades':
        return { showSpecificLink: true, showAboutLink: false, showSpecificLink_to_Util: false, showSpecificLink_to_En: true, showSpecificLink_to_Rel: true,  showProdutosReutilizadosLink: true };
      case '/admin/Relatorio':
        return { showSpecificLink: true, showAboutLink: false, showSpecificLink_to_Util: true, showSpecificLink_to_En: false, showSpecificLink_to_Rel: true,  showProdutosReutilizadosLink: true };
      case '/admin':
        return { showSpecificLink: true, showAboutLink: false, showSpecificLink_to_Util: false, showSpecificLink_to_En: false, showSpecificLink_to_Rel: false , showProdutosReutilizadosLink: true};
        case '/moni':
          return { showSpecificLink: true, showAboutLink: false, showSpecificLink_to_Util: false, showSpecificLink_to_En: false, showSpecificLink_to_Rel: false, showProdutosReutilizadosLink: true };
        default:
        return { showSpecificLink: false, showAboutLink: true, showSpecificLink_to_Util: false, showSpecificLink_to_En: false, showSpecificLink_to_Rel: false , showProdutosReutilizadosLink: true };
    }
  } else if (accountType === 'entidade') {
    
    return { showSpecificLink: false, showAboutLink: true, showSpecificLink_to_Util: false, showSpecificLink_to_En: status === 'ativo', showSpecificLink_to_Rel: false,  showProdutosReutilizadosLink: true };
  } else {
    return { showSpecificLink: false, showAboutLink: true, showSpecificLink_to_Util: false, showSpecificLink_to_En: false, showSpecificLink_to_Rel: false,  showProdutosReutilizadosLink: true };
  }
  };

  const navBarProps = getNavBarProps();

  return (
    <>
      <NavBar 
        isLoggedIn={isLoggedIn} 
        onLoginClick={onLoginClick}
        accountType={accountType} 
        status={status}
        {...navBarProps} 
      />
    </>
  );
};

export default Layout;