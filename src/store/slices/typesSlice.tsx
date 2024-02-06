import {
  createSlice, createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import isError from '../error';
import {
  Pokemon, FetchTypeData, FetchPokemonsByType, TypesState,
} from '../../types';

type Type = {
  url: string;
  name: string
};

export const fetchTypes = createAsyncThunk(
  'types/fetchTypes',

  async (_, { rejectWithValue }) => {
    const response = await axios.get<FetchTypeData>('https://pokeapi.co/api/v2/type');

    if (response.status !== 200) {
      return rejectWithValue('Server error.');
    }

    const types = response.data.results;

    return types;
  },
);

export const fetchPokemonsByType = createAsyncThunk(
  'types/fetchPokemonsByType',

  async (type: Type, { rejectWithValue }) => {
    const response = await axios.get<FetchPokemonsByType>(type.url);

    if (response.status !== 200) {
      return rejectWithValue('Server error.');
    }

    const pokemons = response.data.pokemon;
    const { name } = type;

    const dataDetails: Pokemon[] = [];

    for (const pokemon of pokemons) {
      // eslint-disable-next-line no-await-in-loop
      const responseDetails = await axios.get<Pokemon>(pokemon.pokemon.url);

      if (responseDetails.status !== 200) {
        return rejectWithValue('Server error.');
      }

      dataDetails.push(responseDetails.data);
    }

    return { dataDetails, name };
  },
);

const initialState: TypesState = {
  list: [],
  pokemons: [],
  type: '',
  loading: false,
  error: false,

};

const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchPokemonsByType.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPokemonsByType.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload.dataDetails;
        state.type = action.payload.name;
      })

      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },

});

export const { changeType } = typesSlice.actions;
export default typesSlice.reducer;
