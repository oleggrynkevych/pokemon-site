import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch, useScrollToTopOrSection } from '../hooks';
import { fetchPokemon } from '../store/slices/searchPokemonSlice';
import POKEMONLOGO from '../assets/pokemon-logo.png';
import { fetchPokemonsByType, changeType } from '../store/slices/typesSlice';

const PokemonPage = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const scrollToTop = useScrollToTopOrSection();

  const allPokemons = useAppSelector((state) => state.pokemons.pokemons);
  const allPokemonsWithDetails = useAppSelector((state) => state.pokemonsDetails.pokemonsWithDetails);

  const pagePokemon = allPokemonsWithDetails.filter((pokemon) => pokemon.name === slug);
  const pokemon = !pagePokemon.length ? useAppSelector((state) => state.pokemon.pokemon) : pagePokemon[0];

  const handleBack = () => {
    navigate(-1);
  };

  const handleFilterType = (url: string, name: string) => {
    dispatch(fetchPokemonsByType({ url, name }));
    navigate('/');

    dispatch(changeType(name));
  };

  useEffect(() => {
    scrollToTop();

    if (!pagePokemon.length) {
      const { url } = allPokemons.filter((pok) => pok.name === slug)[0];
      dispatch(fetchPokemon(url));
    }
  }, []);

  return (
        <main className='pokemon-page'>
            <div className='pokemon-page-container'>
                <button className='back-button' onClick={handleBack}>
                    BACK
                </button>

                <div className='polemon-page-main'>
                    <img src={pokemon.sprites.other['official-artwork'].front_default
                      ? pokemon.sprites.other['official-artwork'].front_default
                      : POKEMONLOGO}
                        alt={pokemon.name}
                        className='pokemon-page-image'
                    />

                    <div className='pokemon-page-base-info'>
                        <div className='pokemon-page-type-box'>
                            {
                                pokemon.types.map((type, index) => (
                                    <button key={index} onClick={() => handleFilterType(type.type.url, type.type.name)}>{type.type.name}</button>
                                ))
                            }
                        </div>

                        <h1 className='pokemon-page-name'>{pokemon.name}</h1>

                        <div className='pokemon-page-short-stat'>
                            <span>Weight:  </span>
                            <span>{pokemon.weight}</span>
                        </div>

                        <div className='pokemon-page-short-stat'>
                            <span>Height:  </span>
                            <span>{pokemon.height}</span>
                        </div>

                        <div className='pokemon-page-short-stat'>
                            <span>Base Experience:  </span>
                            <span>{pokemon.base_experience}</span>
                        </div>
                    </div>
                </div>

                <div className='pokemon-page-add-info'>
                    <div className='pokemon-page-add-info-box'>
                        {
                            pokemon.moves.map((move, index) => (
                                <div className='pokemon-page-skill' key={index}>{move.move.name}</div>
                            ))
                        }
                    </div>

                    <div className='pokemon-page-add-info-box stats'>
                        {
                            pokemon.stats.map((stat, index) => (
                                <div key={index}>
                                    <span className='pokemon-page-skill'>{stat.stat.name}: </span>
                                    <span className='pokemon-page-skill'>{stat.base_stat}</span>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </main>
  );
};

export default PokemonPage;
