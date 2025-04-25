import React, { useState, useEffect } from 'react';
import './monitora.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const Monitora = () => {

  const [productCounts, setProductCounts] = useState([]);
  const [totals, setTotals] = useState({ emissaoTotal: 0, consumoTotal: 0 });

  const quantidadeProdutos = async () => {
    try {
      console.log('Chamando API para buscar os produtos...');
      const response = await axios.get('http://localhost:4000/products/count-by-category');
      const productCounts = response.data;
      console.log('Dados recebidos:', productCounts);
  
      const totalProducts = productCounts.reduce((sum, category) => sum + category.count, 0);

      let emissaoTotal = 0;
      let consumoTotal = 0;

      const productCountsWithCalculations = productCounts.map(category => {
        let emissao = 0;
        let consumoAgua = 0;

  
        if (category._id === 'eletronica') {
          emissao = 100 * category.count;
          consumoAgua =  1000 * category.count;
        } 
        if (category._id === 'moveis') {
          emissao = 50 * category.count;
          consumoAgua =  1500 * category.count;
        }
        if (category._id === 'roupa') {
          emissao = 20 * category.count;
          consumoAgua =  3500 * category.count;
        }
        if (category._id === 'bijuteria') {
          emissao = 2 * category.count;
          consumoAgua =  50 * category.count;
        } 
        if (category._id === 'brinquedos') {
          emissao = 5 * category.count;
          consumoAgua =  150 * category.count;
        } 

        emissaoTotal += emissao;
        consumoTotal += consumoAgua;

        return {
          ...category,
          emissao,
          consumoAgua,
        };
      });

      console.log('Dados com cálculos:', productCountsWithCalculations);
      setProductCounts(productCountsWithCalculations);
      setTotals({ emissaoTotal, consumoTotal });
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };

  useEffect(() => {
    quantidadeProdutos();
  }, []);

    return (
      <div>
          <h1 className="titulo_moni">Quantidade de produtos reutilizados</h1>
          <p className = 'texto'>Nosso sistema visa monitorar a reutilização de recursos para reduzir o desperdício, 
            proteger o meio ambiente e incentivar práticas sustentáveis.</p>

          <h2 className='beneficios'> Beneficios de Monitorizar </h2>
          <ul className = 'texto_beneficios'>
            <li>Redução de desperdício</li>
            <li>Proteção do meio ambiente</li>
            <li>Incentivo a práticas sustentáveis</li>
            <li>Transações seguras</li>
            <li>Impacto positivo mensurável</li>
          </ul>
          <div>
            <h2 className='informacao_o'> Valores Utlizados para o cálculo de Impacto Ambiental</h2>
            <ul className = 'texto_beneficios'>
              <li className='titulo_ben'>Eletronica</li>
                <ul className='texto_ben'>Emissão de CO2 : 100 kg CO₂e por unidade </ul>
                <ul className='texto_ben'>Consumo de Água : 1000 litros por unidade </ul>
              <li className='titulo_ben'>Moveis</li>
                <ul className='texto_ben'>Emissão de CO2 : 50 kg CO₂e por unidade </ul>
                <ul className='texto_ben'>Consumo de Água : 1500 litros por unidade </ul>
              <li className='titulo_ben'>Roupas</li>
                <ul className='texto_ben'>Emissão de CO2 : 20 kg CO₂e por unidade </ul>
                <ul className='texto_ben'>Consumo de Água : 3500 litros por unidade </ul>
              <li className='titulo_ben'>Bijuteria</li>
                <ul className='texto_ben'>Emissão de CO2 : 2 kg CO₂e por unidade </ul>
                <ul className='texto_ben'>Consumo de Água : 50 litros por unidade </ul>
              <li className='titulo_ben'>Brinquedos</li>
                <ul className='texto_ben'>Emissão de CO2 : 5 kg CO₂e por unidade </ul>
                <ul className='texto_ben'>Consumo de Água : 150 litros por unidade </ul>
            </ul>
          </div>
          <div className="container_beneficios">
            <h2 className='monitora_coisas'>Impacto Ambiental Evitado</h2>
            {productCounts.length > 0 && (
            <table className="table table-striped table-bordered">
              <thead>
            <tr>
              <th>Categoria</th>
              <th>Contagem</th>
              <th>Emissão CO2</th>
              <th>Consumo de Água</th>
            </tr>
          </thead>
          <tbody>
            {productCounts.map((category, index) => (
              <tr key={index}>
                <td>{category._id}</td>
                <td>{category.count}</td>
                <td>{category.emissao}</td>
                <td>{category.consumoAgua}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div> 
      <h2 className='totalDeCenas'>Total evitado</h2>
          <p className='texto_totais'>Emissão Total de CO2: {totals.emissaoTotal}</p>
          <p className='texto_totais'>Consumo Total de Água: {totals.consumoTotal}</p>
      </div>
    </div>
  </div>
    );
};

export default Monitora;