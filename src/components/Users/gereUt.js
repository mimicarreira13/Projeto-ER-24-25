import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './gereUt.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import 'datatables.net-responsive';
import { useNavigate } from 'react-router-dom';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const tableRef = useRef(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Calcular os índices dos usuários a serem exibidos
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Função para mudar para a próxima página
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para mudar para a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4000/users?accountType=normal');
          console.log('Dados recebidos:', response.data); // Log dos dados recebidos
          setUsers(response.data);
        } catch (error) {
          console.error('Erro ao buscar os usuários:', error);
        }
      };
  
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
            { data: 'username', title: 'Username' },
            { data: 'nif', title: 'NIF' },
            { 
              data: null, 
              title: 'Ações', 
              render: (data, type, row) => `
                <button class="edit-btn" data-id="${row._id}">Editar</button>
                <button class="delete-btn" data-id="${row._id}">Apagar</button>
              `
            }
          ],
            search: true,
            paging: false, // Enables pagination
            pageLength: 5, // Sets the number of records per page
            lengthChange: true, // Enables changing the number of records
            language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Nenhum registro encontrado",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Nenhum registro disponível",
            search: "Pesquisa:",
            paginate: {
              first: "Primeiro",
              last: "Último",
              next: "Próximo",
              previous: "Anterior"
            }
          },
          columnDefs: [
            { width: '20%', targets: 0 },
            { width: '20%', targets: 1 },
            { width: '20%', targets: 2 }
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
      }
  
      return () => {
        if (table) {
          table.destroy();
        }
        $(tableRef.current).off('click', 'button.edit-btn');
        $(tableRef.current).off('click', 'button.delete-btn');
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
          Swal.fire({
            title: 'Apagou com sucesso!',
            icon: "success",
            confirmButtonText: 'Continuar',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
        })
        .catch(error => console.error('Error deleting user:', error));
        Swal.fire({
          title: 'Não foi possivel apagar',
          icon: "error",
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton: 'custom-confirm-button'
          }
        });
  };
  
    return (
      <div className="container mt-0">
        <div className="row justify-content-center">
        <div className="col-md-12">
        <h1 class='titulo_para_utilizador'>Utilizadores</h1>
        <table ref={tableRef} id="myTable">
          <thead>
            <tr className='barra'>
              <th>Username</th>
              <th>NIF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.nif}</td>
                <td>
                <button className="edit-btn" onClick={() => handleEdit(user._id)}>Editar</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Apagar</button>
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

export default UserTable;