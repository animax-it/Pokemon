import React, { useState, useEffect } from 'react';
import './Styles.css'

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`
      );
      const data = await response.json();
      setPokemonList(data.results);
      setTotalPages(Math.ceil(data.count / 20));
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const visiblePageCount = 5;
    const maxPage = Math.min(totalPages, currentPage + visiblePageCount - 1);

    let startPage = Math.max(1, maxPage - visiblePageCount + 1);

    if (startPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePagination(startPage - visiblePageCount)}
        >
          &lt;
        </button>
      );
    }

    for (let i = startPage; i <= maxPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePagination(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handlePagination(startPage + visiblePageCount)}
        >
          &gt;
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pokemon-list-container">
        <center>
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearch}
      />
      </center>
      <div className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <div className="pokemon-card" key={pokemon.name}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                .split('/')
                .slice(-2, -1)}.png`}
              alt={pokemon.name}
            />
            <p className="pokemon-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">{renderPaginationButtons()}</div>
    </div>
  );
};

export default PokemonList;
