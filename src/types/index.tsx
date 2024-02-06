// Initial States

export interface PokemonDetailsState {
  pokemonsWithDetails: Pokemon[];
  detailsCount: number;
  loading: boolean;
  error: boolean;
}

export interface PokemonState {
  pokemons: Pokemon[];
  count: number;
  loading: boolean;
  error: boolean;
}

export interface SearchPokemonState {
  pokemon: Pokemon;
  loading: boolean;
  error: boolean;
}

export interface TypesState {
  list: Type[];
  pokemons: Pokemon[];
  type: string;
  loading: boolean;
  error: boolean;
}

// Pokemon General Info

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
  moves: PokemonMoveObj[];
  stats: PokemonStats[];
  weight: number;
  height: number;
  base_experience: number;
  sprites: PokemonSprites;
}

// Data After Fetching

export interface FetchPokemonData {
  results: Pokemon[];
  count: number;
}

export interface FetchPokemonDetailsData {
  pokemons: Pokemon[];
  count: number;
}

export interface FetchTypeData {
  results: Type[];
}

export interface FetchPokemonsByType {
  pokemon: PokemonFromType[]
}

// Types To Get Images

interface OfficialSprites {
  front_default: string
}

interface OtherSprites {
  'official-artwork': OfficialSprites
}

interface PokemonSprites {
  other: OtherSprites
}

// Types To Get Moves And Stats

interface PokemonMoveObj {
  move: PokemonMove
}

interface PokemonStats {
  base_stat: number;
  stat: PokemonStatObj;
}

interface PokemonStatObj {
  name: string
}

// Addional Interfaces

export interface PokemonType {
  type: TypeDetails;
  slot?: number;
}

export interface Type {
  name: string,
  url: string,
}

interface TypeDetails {
  name: string;
  url: string;
}

interface PokemonMove {
  name: string
}

interface PokemonFromType {
  pokemon: Pokemon;
  slot: number;
}

// Props

export interface PokemonCardProps {
  key?: number,
  name: string,
  image: string,
  types: PokemonType[],
}
