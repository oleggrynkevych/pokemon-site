import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchPokemonsByType, fetchTypes } from '../store/slices/typesSlice';
import { Type } from '../types';
import ARROW from '../assets/arrow.png';

const Filter = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<Type | null>({ name: '', url: '' });

  const dispatch = useAppDispatch();

  const responseTypes = useAppSelector((state) => state.types);

  const types = responseTypes.list;
  const typeName = responseTypes.type;

  const handleSelect = (type: string) => {
    setQuery(type);
    setOpen(false);
  };

  useEffect(() => {
    const filteredType = query === ''
      ? { name: '', url: '' }
      : types.find((type: Type) => type.name.toLowerCase() === query.toLowerCase()) || null;

    setSelectedType(filteredType);
  }, [query]);

  useEffect(() => {
    const url = selectedType?.url;
    const name = selectedType?.name;

    if (url && name) {
      dispatch(fetchPokemonsByType({ url, name }));
    }
  }, [selectedType]);

  useEffect(() => {
    if (!responseTypes.list.length) {
      dispatch(fetchTypes());
    }

    if (typeName) {
      setQuery(typeName);
    }
  }, []);

  // Styles

  const inputIconClasses = classNames('filter-input-icon', {
    open,
  });

  const inputDropdownClasses = classNames('filter-dropdown', {
    open,
  });

  return (
        <div className='filter-type'>
            <div className='filter-input' onClick={() => { setOpen(!open); }}>
                <span className='selected-type'>
                {
                  (() => {
                    let typeToShow;
                    if (query) {
                      typeToShow = (query.toLowerCase() === 'unknown' ? 'all types' : query);
                    } else {
                      typeToShow = 'All types';
                    }
                    return typeToShow;
                  })()
                }
                </span>
                <img src={ARROW} alt='arrow' className={inputIconClasses}/>
            </div>

            <div className={inputDropdownClasses}>
                {
                    types.map((type) => (
                        <div
                            key={type.name}
                            onClick={() => handleSelect(type.name)}
                            style={typeName === type.name ? { display: 'none' } : {}}
                        >{type.name.toLocaleLowerCase() === 'unknown' ? 'all types' : type.name}</div>
                    ))
                }
            </div>
        </div>
  );
};

export default Filter;
