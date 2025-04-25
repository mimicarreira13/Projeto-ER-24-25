import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './Pesquisa.css';
import NavBar from '../NavBar/NavBar';

const PesquisaPage = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    
    // Use location hook to read the URL query string
    const location = useLocation();
    
    // Parse query string to get search parameter
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    
    useEffect(() => {
      setSearchQuery(query);
      if (query) {
        // Trigger search if there's a query
        fetchResults(query);
      }
    }, [query]);
  
    const fetchResults = async (query) => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      // Update the URL query string to reflect the new search
      window.history.pushState({}, '', `?query=${searchQuery}`);
    };


    const [darkMode, setDarkMode] = useState(true);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        document.body.className = darkMode ?  'light-mode' : 'dark-mode';
    }, [darkMode]);
    return (
        <div id={"tudo"}>
            <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200&display=swap" rel="stylesheet"/>
            <h1 className="titulo_pesquisa">Pesquisa</h1>
            <form className="form_pesquisa">
                <input className="input_pesquisa" type="text" id="pesquisa" name="pesquisa" placeholder="Pesquisar..."/>
                <input className="input_pesquisa" type="submit" id="ButtaoPesc" value="->"/>
            </form>
            <div>
                {results.length > 0 ? (
                <ul>
                    {results.map((result, index) => (
                    <li key={index}>{result.name}</li>
                    ))}
                </ul>
                ) : (
                <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default PesquisaPage;