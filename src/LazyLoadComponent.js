import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';
import './Styles.css';

const LazyLoadComponent = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${20}&offset=${offset}`
      );
      const data = await response.json();
      setPokemonList((prevList) => [...prevList, ...data.results]);
    };

    fetchData();
  }, [offset]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pokemon-list-container">
     
     <center>
      <h1 className="pokemon-list-heading">Lazy Load Pokemon</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      </center> 
      <ul className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <li className="pokemon-card" key={pokemon.name}>
            <LazyLoad height={100}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split('/')[6]
                }.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </LazyLoad>
            <p className="pokemon-name">{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LazyLoadComponent;
