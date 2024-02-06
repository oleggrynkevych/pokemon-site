import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import isError from '../error';
import { PokemonState, FetchPokemonData } from '../../types';

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchPokemons',

  async (_, { rejectWithValue }) => {
    const response = await axios.get<FetchPokemonData>('https://pokeapi.co/api/v2/pokemon?limit=10000');

    if (response.status !== 200) {
      return rejectWithValue('Server error.');
    }

    const pokemons = response.data.results;
    const { count } = response.data;

    return { pokemons, count };
  },
);

const initialState: PokemonState = {
  pokemons: [],
  count: 0,
  loading: false,
  error: false,
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload.pokemons;
        state.count = action.payload.count;
      })

      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },

});

export const { } = pokemonSlice.actions;
export default pokemonSlice.reducer;
