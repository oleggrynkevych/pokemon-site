import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPokemons } from '../store/slices/pokemonSlice';
import { fetchMorePokemons } from '../store/slices/pokemonDetailsSlice';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import POKEMONLOGO from '../assets/pokemon-logo.png';
import Filter from './Filter';
import AnimateBall from './AnimateBall';

const PokemonSection = () => {
  const dispatch = useAppDispatch();

  const pokemons = useAppSelector((state) => state.pokemons);
  const pokemonsWithDetails = useAppSelector((state) => state.pokemonsDetails);
  const pokemonsByType = useAppSelector((state) => state.types);

  const handleShowMore = () => {
    dispatch(fetchMorePokemons({ pokemons: pokemons.pokemons, count: pokemonsWithDetails.detailsCount }));
  };

  useEffect(() => {
    if (!pokemons.pokemons.length) {
      dispatch(fetchPokemons());
    }
  }, []);

  useEffect(() => {
    if (pokemonsWithDetails.detailsCount === 0) {
      dispatch(fetchMorePokemons({ pokemons: pokemons.pokemons, count: pokemonsWithDetails.detailsCount }));
    }
  }, [pokemons]);

  return (
      <div className="pokemon-section" id='catalog'>
        <div className='pokemon-controllers'>
          <SearchBar/>
          <Filter/>
        </div>

        <div className='pokemons-info-box'>
        {
          (pokemons.loading || pokemonsByType.loading) ? (
            <AnimateBall/>
          ) : (pokemons.error || pokemonsByType.error || pokemonsWithDetails.error) ? (
            <div className='error-message'>
              Error fetching Pokemon data. Please try again.
            </div>
          ) : (
            <>
              {
                (pokemonsByType.pokemons.length === 0 ? pokemonsWithDetails.pokemonsWithDetails : pokemonsByType.pokemons).map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other['official-artwork'].front_default
                      ? pokemon.sprites.other['official-artwork'].front_default
                      : POKEMONLOGO}
                    types={pokemon.types}
                  />
                ))
              }

              {
                (pokemonsByType.pokemons.length === 0 && pokemonsWithDetails.detailsCount !== pokemons.count)
                  && (
                    <button
                      className='show-more-btn'
                      onClick={handleShowMore}
                    >
                      SHOW MORE
                    </button>
                  )
              }
            </>
          )
        }

        </div>

      </div>
  );
};

export default PokemonSection;
