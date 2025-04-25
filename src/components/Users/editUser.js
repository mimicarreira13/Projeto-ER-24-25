import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './editUser.css';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data by ID
    fetch(`/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const handleSave = () => {
    // Lógica para salvar as alterações do usuário
    fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User updated:', data);
        navigate(-1); // Redirecionar de volta para a página anterior
        Swal.fire({
          title: 'Editou com sucesso!',
          icon: "success",
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton: 'custom-confirm-button'
          }
        });
      })
      .catch(error => console.error('Error updating user:', error));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container_editUser">
      <h2 class= 'titulo_EDit'>Edit User</h2>
      <form>
        <div className="form_group_editUser">
          <label className='label_editar'>Nome</label>
          <input
            className='input_editar'
            type="text"
            value={user.nome}
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
            disabled={user.accountType === 'normal'}
          />
        </div>
        <div className="form_group_editUser">
          <label className='label_editar'>NIF</label>
          <input
            className='input_editar'
            type="text"
            value={user.nif}
            onChange={(e) => setUser({ ...user, nif: e.target.value })}
          />
          
        </div>
        <div className="form_group_editUser">
          <label className='label_editar'>Tipo de Conta</label>
          <input
           className='input_editar'
            type="text"
            value={user.accountType}
            onChange={(e) => setUser({ ...user, accountType: e.target.value })}
          />
        </div>
        <div className="form_group_editUser">
          <label className='label_editar'>Estado da conta</label>
          <input
            className='input_editar'
            type="text"
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
            disabled={user.accountType === 'normal' || user.accountType === 'entidade'}
          />
        </div>
        <button class='botao_editar' type="button" onClick={handleSave}>Guardar</button>
      </form>
    </div>
  );
}

export default EditUser;