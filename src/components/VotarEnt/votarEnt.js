import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './votarEnt.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import 'datatables.net-responsive';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const VotarEnt = () => {

  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axios.get('/users?accountType=entidade&status=pendente');
        console.log('Dados recebidos:', response.data); // Adicione este log
        const filteredEntities = response.data.filter(entity => entity.status === 'pendente');
        setEntities(filteredEntities);
      } catch (error) {
        console.error('Erro ao buscar entidades pendentes:', error);
      }
    };
  
    fetchEntities();
  }, []);

  const handleVote = async (entityId) => {
    try {
      const response = await axios.post(`/entities/${entityId}/vote`);
      console.log('Voto registrado com sucesso:', response.data);

      Swal.fire({
        title: 'Entidade Votada com sucesso',
        icon: "success",
        confirmButtonText: 'Continuar',
        customClass: {
          confirmButton: 'custom-confirm-button'
        }
      });

      // Atualize o estado local para refletir o novo número de votos
      setEntities(prevEntities => 
        prevEntities.map(entity => 
          entity._id === entityId ? { ...entity, n_voto: entity.n_voto + 1 } : entity
        ).filter(entity => entity._id !== entityId) // Remove visualmente do DataTable
      );
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 class= 'titu'>Votações das Entidades</h1>
      <p className="frase_votacao">Vote na entidade que sinta mais confiança!</p>
      <table className="table custom-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>NIF</th>
            <th>Nº de Votos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entities.map(entity => (
            <tr key={entity._id}>
              <td>{entity.nome}</td>
              <td>{entity.nif}</td>
              <td>{entity.n_voto}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleVote(entity._id)}>Votar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotarEnt;