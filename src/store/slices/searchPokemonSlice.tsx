import {
  createSlice, createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import isError from '../error';
import { Pokemon, SearchPokemonState } from '../../types';

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',

  async (url: string, { rejectWithValue }) => {
    const response = await axios.get<Pokemon>(url);

    if (response.status !== 200) {
      return rejectWithValue('Server error.');
    }

    return response.data;
  },
);

const initialState: SearchPokemonState = {
  pokemon: {
    name: '', url: '', id: 0, weight: 0, height: 0, base_experience: 0, types: [], stats: [], moves: [], sprites: { other: { 'official-artwork': { front_default: '' } } },
  },
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
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload;
      })

      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },

});

export const { } = pokemonSlice.actions;
export default pokemonSlice.reducer;
