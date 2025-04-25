import React, {useState, useEffect} from 'react';
import './Sobre.css' ;
import 'bootstrap/dist/css/bootstrap.min.css';

const Sobre = () => {
    return(
        <div className='sobre'>
          
          
                <h2>Quem Somos</h2>
                <p>
                    O <strong>EcoLoop</strong> é uma iniciativa que visa transformar a forma como consumimos e reutilizamos bens físicos, como roupas, móveis e eletrônicos. 
                    Criamos uma plataforma inovadora que permite a reutilização de recursos de forma <strong>anónima</strong>, <strong>segura</strong> e <strong>eficiente</strong>, 
                    promovendo a sustentabilidade.
                </p>

                <p>
                    O nosso principal objetivo é desenvolver um sistema que permita a troca, doação e venda de bens físicos sem comprometer a privacidade dos utilizadores. 
        
                </p>
          
                <h2>Por Que Criar Este Sistema?</h2>
                <p>
                    Como a sociedade enfrenta desafios relacionados ao consumo excessivo e ao desperdício de recursos, achamos que esta plataforma é um bom começo para resolver esses desafios. 
                    Muitas pessoas hesitam em participar de plataformas de reutilização devido a preocupações com privacidade ou complexidade no uso. 
                    O <strong>EcoLoop</strong> foi concebido para superar esses obstáculos, oferecendo uma solução prática e confiável.
                </p>
            
                <h2>Junte-se a Nós</h2>
                <p>
                    Faça parte da mudança! Contribua para um futuro mais sustentável com o <strong>EcoLoop</strong>, onde a reutilização de bens 
                    se torna simples, segura e responsável.
                </p>
          
           
        </div>

    );
};

export default Sobre;