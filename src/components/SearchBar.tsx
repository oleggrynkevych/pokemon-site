import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../hooks';

const SearchBar = () => {
  const pokemons = useAppSelector((state) => state.pokemons.pokemons);

  const [value, setValue] = useState('');
  const [url, setUrl] = useState('');
  const [optionNotSelected, setOptionNotSelected] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent) => {
    const inputElement = event.target as HTMLInputElement;

    setValue(inputElement.value);

    const searchResult = pokemons.filter((pokemon) => pokemon.name === inputElement.value);

    if (searchResult.length > 0) {
      setUrl(searchResult[0].url);
    } else {
      setUrl('');
    }

    setOptionNotSelected(true);
    setShowWarning(false);
  };

  const handleSelect = (selectedValue: string, selectedUrl: string) => {
    setValue(selectedValue);
    setUrl(selectedUrl);
    setOptionNotSelected(false);
    setShowWarning(false);
  };

  const processSearchPokemon = () => {
    if (url !== '') {
      navigate(`/pokemon/${value}`);
    } else {
      setShowWarning(true);
    }
  };

  const handleSearch = () => {
    setOptionNotSelected(false);
    processSearchPokemon();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      setOptionNotSelected(false);
      processSearchPokemon();
    }
  };

  return (
        <div className="search-bar">
            <div className="search-component">
                <input
                    type="text"
                    value={value}
                    placeholder='Search Pokemon'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}> Search </button>
            </div>

            <div className="search-dropdown">
                {pokemons && pokemons.filter((pokemon) => {
                  const searchTerm = value.toLocaleLowerCase();
                  const pokemonName = pokemon.name.toLocaleLowerCase();
                  return searchTerm && optionNotSelected && pokemonName.includes(searchTerm) && searchTerm !== pokemonName;
                })
                  .slice(0, 10)
                  .map((pokemon, index) => <div key={index} onClick={() => handleSelect(pokemon.name, pokemon.url)} className="search-dropdown-item">
                        {pokemon.name}
                    </div>)}
            </div>

            {showWarning && <div className='search-bar-warning'>Pokemon with such name does not exist!</div> }
        </div>
  );
};

export default SearchBar;
