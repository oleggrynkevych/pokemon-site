import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonCardProps } from '../types';

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, types }) => (
        <Link to={`/pokemon/${name}`}>
            <div className='pokemon-card'>
                <img src={image} alt={name} />
                <span>{name}</span>
                {
                    types.map((type, index) => (
                        <div key={index}>{type.type.name}</div>
                    ))
                }
                <button>MORE INFO</button>
            </div>
        </Link>
);

export default PokemonCard;
