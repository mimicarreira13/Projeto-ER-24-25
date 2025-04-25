# ♻️ EcoLoop – Plataforma de Reutilização Sustentável e Anónima

> **Projeto de Engenharia de Requisitos – LEI 2024/2025**

O **EcoLoop** é um sistema informático desenvolvido por um grupo de 4 estudantes com o objetivo de promover a **reutilização de bens físicos** de forma **anónima**, **segura** e **sustentável**. Idealizado como resposta ao crescente desperdício de recursos e às preocupações com a privacidade dos utilizadores, o sistema permite a troca, doação e venda de itens sem a necessidade de identificação pessoal.

---

## 🌐 Aceder ao Protótipo

O protótipo está disponível online através do seguinte link:

👉 [https://ecoloop-vz7r.onrender.com](https://ecoloop-vz7r.onrender.com)

---

## 🚀 Funcionalidades principais

- 🔒 **Anonimato garantido** como proposta através de autenticação com criptografia de chave pública e privada.
- 📦 **Publicação de itens** com descrição, foto e localização aproximada.
- 🖘️ **Pesquisa geolocalizada** por itens próximos, sem revelar a localização exata até a transação ser aceite.
- 🪹 **Transações seguras** com geração de tokens únicos de confirmação.
- 🌱 **Métricas ambientais** para monitorizar o impacto positivo das reutilizações.
- ⭐ **Avaliações anónimas** com sistema de reputação baseado em transações reais.
- 📊 **Relatórios acessíveis** para entidades externas aprovadas, com dados agregados sobre impacto ambiental.

> **Nota:** Como se trata de um protótipo, funcionalidades como a autenticação por encriptação, transações seguras, avaliações e uso de blockchain ainda não se encontram implementadas. Estas estão apenas representadas a nível conceptual.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React](https://reactjs.org/)
- **Backend & Base de Dados:** [MongoDB](https://www.mongodb.com/) com [Mongoose](https://mongoosejs.com/)

---

## ✅ Requisitos Prioritários Implementados

Durante o desenvolvimento do protótipo, focámo-nos nos seguintes requisitos principais:

- Geração automática de username anónimo
- Restrição à criação de múltiplas contas (baseada em NIF)
- Publicação de produtos com título, categoria e localização
- Pesquisa de produtos com filtro por concelho
- Ordenação dos resultados por proximidade geográfica
- Possibilidade de guardar publicações favoritas
- Monitorização da quantidade de produtos reutilizados
- Aprovação de empresas registadas por um administrador

Cada um destes requisitos foi documentado e implementado com base em critérios de aceitação específicos, garantindo clareza e consistência no comportamento esperado do sistema.

---

## 🧪 Validação e Testes

Os requisitos implementados foram validados com base em critérios de aceitação objetivos, como:

- Geração única de usernames
- Validação de campos obrigatórios nas publicações
- Filtros e ordenação funcional nos resultados de pesquisa
- Persistência e recuperação de publicações favoritas

---

## 🥑 Equipa

Este projeto foi desenvolvido por um grupo de **4 alunos** no âmbito da unidade curricular de **Engenharia de Requisitos** do curso de **Licenciatura em Engenharia Informática (LEI)**, ano letivo 2024/2025 e foi atribuída **nota 15**.

---

## 🧾 Requisitos de Instalação

```bash
# Clonar o repositório
git clone git@github.com:mimicarreira13/Projeto-ER-24-25.git
cd src

# Instalar dependências
npm install

# Iniciar o projeto
npm start
```

---

## 📌 Estado atual

O projeto encontra-se numa fase de **protótipo funcional**, com ênfase nos requisitos do sistema e prova de conceito. Algumas funcionalidades avançadas como sistema de recompensa, autenticação criptográfica e integração com blockchain estão apenas representadas em nível conceptual ou em fase de planeamento.

---

## 📸 Exemplos Visuais

Abaixo estão algumas imagens ilustrativas do protótipo desenvolvido (disponíveis nos anexos do relatório final):

### Página de Publicação de Itens
![Publicação de Itens](./images/publicacao.png)

### Pesquisa por Localização
![Pesquisa Local](./images/pesquisa_local.png)

### Área de Conta e Favoritos
![Gestão de Conta](./images/gestao_conta.png)

---

## 📄 Licença

Este projeto é apenas para fins educacionais e não possui uma licença de uso comercial neste momento.

---

