import React, { useState, useEffect } from 'react';
import './gereRel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const GereRel = () => {
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const data = [
      { date: '2024-11', value: 'Relatório Semanal 17 a 23', link: '/pdfs/Relatorio_Semanal_Impacto_Ambiental_17_a_23_Nov.pdf' },
      { date: '2024-11', value: 'Relatório Semanal 24 a 30', link: '/pdfs/Relatorio_Semanal_Impacto_Ambiental_24_a_30_Nov.pdf' },
      { date: '2024-12', value: 'Relatório Semanal 8 a 14', link: '/pdfs/Relatorio_Semanal_Impacto_Ambiental_8_a_14_Dev.pdf' },
    ];
    setGroupedData(groupByMonth(data));
  }, []);

  const groupByMonth = (data) => {
    return data.reduce((acc, item) => {
      const month = new Date(item.date + '-01').toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(item);
      return acc;
    }, {});
  };
  return (
    <div className="container">
      <h1 class ='tit'>Relatórios</h1>
      {Object.keys(groupedData).map((month) => (
        <div key={month} className="mb-4">
          <h2>{month}</h2>
          <div className="row">
            {groupedData[month].map((item, index) => (
              <div key={index} className="col-md-6 mb-3">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="card card-link">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-file-alt"></i> {item.value}</h5>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default GereRel;