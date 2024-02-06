import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import isError from '../error';
import { Pokemon, PokemonDetailsState, FetchPokemonDetailsData } from '../../types';

export const fetchMorePokemons = createAsyncThunk(
  'pokemons/fetchMorePokemons',

  async (fetchData: FetchPokemonDetailsData, { rejectWithValue }) => {
    const { pokemons, count } = fetchData;
    const pokemonDetails: Pokemon[] = [];

    const pokemonsCount = pokemons.length > count + 12 ? count + 12 : pokemons.length;

    for (let index = count; index < pokemonsCount; index++) {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get<Pokemon>(pokemons[index].url);
      pokemonDetails.push(response.data);

      if (response.status !== 200) {
        return rejectWithValue('Server error.');
      }
    }

    return pokemonDetails;
  },
);

const initialState: PokemonDetailsState = {
  pokemonsWithDetails: [],
  detailsCount: 0,
  loading: false,
  error: false,
};

const pokemonDetailsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMorePokemons.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMorePokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonsWithDetails = [...state.pokemonsWithDetails, ...action.payload];
        state.detailsCount = state.pokemonsWithDetails.length;
      })

      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },

});

export const { } = pokemonDetailsSlice.actions;
export default pokemonDetailsSlice.reducer;
