import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gereEnt.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import 'datatables.net-responsive';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const GereEnt = () => {
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const fetchEntitiesWithVotePercentage = async () => {
    try {
      console.log('Chamando API para buscar entidades...');
      const response = await axios.get('http://localhost:4000/entities/vote-percentage');
      const entitiesAbove30Percent = response.data;
      console.log('Dados recebidos:', entitiesAbove30Percent);
      if (entitiesAbove30Percent.length > 0) {
        showVotePercentagePopup(entitiesAbove30Percent);
      } else {
        console.log('Nenhuma entidade com mais de 30% dos votos.');
      }
    } catch (error) {
      console.error('Erro ao buscar entidades com mais de 30% dos votos:', error);
    }
  };

  const showVotePercentagePopup = (entities) => {
    const entityNames = entities.map(entity => entity.nome).join(', ');
    console.log('Mostrando popup com entidades:', entityNames);
    Swal.fire({
      title: 'Entidades com mais de 30% dos votos',
      text: `As seguintes entidades têm 30% ou mais dos votos: ${entityNames}`, 
      icon: 'info',
      confirmButtonText: 'Continuar',
      customClass: {
        confirmButton: 'custom-confirm-button'
      }
    });
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users?accountType=entidade');
        console.log('Dados recebidos:', response.data); // Log dos dados recebidos
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    fetchEntitiesWithVotePercentage();
    fetchUsers();
  }, []);



  useEffect(() => {
    let table;
    if (users.length > 0) {
      console.log('Inicializando DataTable com usuários:', users); // Log dos usuários
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().clear().destroy(true);
      }

      table = $(tableRef.current).DataTable({
        responsive: true,
        data: users,
        columns: [
          { data: 'nome', title: 'Nome' },
          { data: 'nif', title: 'NIF' },
          {data : 'n_voto', title: 'Nº de Votos'},
          { 
            data: null, 
            title: 'Ações', 
            render: (data, type, row) => `
              <button class="edit-btn" data-id="${row._id}">Editar</button>
              <button class="delete-btn" data-id="${row._id}">Apagar</button>
              ${renderButton(row)}
            `
          }
        ],
        search: true,
        paging: false, // Enables pagination
        lengthChange: true, // Enables changing the number of records
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "Nenhum registro encontrado",
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          infoEmpty: "Nenhum registro disponível",
          search: "Pesquisa:",
        },
        columnDefs: [
          { width: '15%', targets: 0 },
          { width: '15%', targets: 1 },
          { width: '5%', targets: 2 },
          { width: '15%', targets: 3 }
        ]
      });

      $(tableRef.current).on('click', 'button.edit-btn', function() {
        const id = $(this).data('id');
        handleEdit(id);
      });

      $(tableRef.current).on('click', 'button.delete-btn', function() {
        const id = $(this).data('id');
        handleDelete(id);
      });

      $(tableRef.current).on('click', 'button.ativar-btn', function() {
        const id = $(this).data('id');
        handleActivate(id);
      });

      $(tableRef.current).on('click', 'button.deactivate-btn', function() {
        const id = $(this).data('id');
        handleDeactivateUser(id);
      });
    }

    return () => {
      if (table) {
        table.destroy();
      }
      $(tableRef.current).off('click', 'button.edit-btn');
      $(tableRef.current).off('click', 'button.delete-btn');
      $(tableRef.current).off('click', 'button.ativar-btn');
      $(tableRef.current).off('click', 'button.deactivate-btn');

    };
  }, [users]);

  const handleEdit = (id) => {
    // Redirecionar para a página de edição
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para apagar o usuário
    console.log('Apagar usuário com ID:', id);
    // Fazer uma requisição DELETE para o servidor
    fetch(`http://localhost:4000/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        // Atualizar a lista de usuários após a exclusão
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleActivate = (id) => {
    console.log('Ativar usuário com ID:', id);
    fetch(`http://localhost:4000/users/${id}/activate`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta da API:', data);
        setUsers(prevUsers => {
          const updatedUsers = prevUsers.map(user => 
            user._id === id ? { ...user, status: 'ativo' } : user
          );
          console.log('Lista de usuários atualizada:', updatedUsers);

          Swal.fire({
            title: 'Entidade ativada com sucesso',
            icon: "success",
            confirmButtonText: 'Continuar',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });

          return updatedUsers;
        });
      })
      .catch(error => {
        console.error('Erro ao ativar usuário:', error);
      });
  };

  const handleDeactivateUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${id}/pendente`, {
        method: 'PUT',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Resposta da API:', data);
  
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(user => 
          user._id === id ? { ...user, status: 'pendente' } : user
        );
        console.log('Lista de usuários atualizada:', updatedUsers);
  
        Swal.fire({
          title: 'Usuário desativado com sucesso',
          icon: "success",
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton: 'custom-confirm-button'
          }
        });
  
        return updatedUsers;
      });
    } catch (error) {
      console.error('Erro ao desativar usuário:', error);
    }
  };
  
  const renderButton = (user) => {
    if (user.status === 'ativo') {
      console.log('Entidade ativa');
      return `<button class="deactivate-btn" data-id="${user._id}">Desativar</button>`;
    } else if (user.status === 'pendente') {
      console.log('Entidade pendente');
      return `<button class="ativar-btn" data-id="${user._id}">Ativar</button>`;
    }
  };

  return (
    <div className="container mt-0">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 class='titulo_para_entidade'>Entidades</h1>
          <button class='informacao' onClick={() => fetchEntitiesWithVotePercentage()}>
          <i class="fas fa-info-circle"></i>
        </button>
        {console.log('Clicou no botão de informações')}
          <table ref={tableRef} id="myTable">
            <thead>
              <tr className='barra'>
                <th>Nome</th>
                <th>NIF</th>
                <th>Nº de Votos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.nome}</td>
                  <td>{user.nif}</td>
                  <td>{user.n_voto}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(user._id)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>Apagar</button>
                    {user.status === 'ativo' ? (
                      <button className="deactivate-btn" onClick={() => handleDeactivateUser(user._id)}>Desativar</button>
                    ) : (
                      <button className="ativar-btn" onClick={() => handleActivate(user._id)}>Ativar</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GereEnt;