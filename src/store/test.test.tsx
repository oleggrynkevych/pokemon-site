import typesReducer, { changeType, fetchTypes } from './slices/typesSlice';

describe('typesSlice', () => {
  it('return default state', () => {
    const result = typesReducer(undefined, { type: '' });

    expect(result).toEqual({
      list: [],
      pokemons: [],
      type: '',
      loading: false,
      error: false,
    });
  });

  it('change pokemons type', () => {
    const action = { type: changeType.type, payload: 'normal' };

    const result = typesReducer({
      list: [],
      pokemons: [],
      type: '',
      loading: false,
      error: false,
    }, action);

    expect(result.type).toBe('normal');
  });

  it('fetch types successfully', async () => {
    const dispatch = jest.fn();
    const thunk = fetchTypes();

    await thunk(dispatch, () => ({}), () => ({}));

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe('types/fetchTypes/pending');
    expect(end[0].type).toBe('types/fetchTypes/fulfilled');
  });
});
