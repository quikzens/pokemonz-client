import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGet } from '../../hooks/useGet'

import CatchPokemon from './CatchPokemon'
import AddExchange from './AddExchange'

const MyPokemon = () => {
  const [myPokemons, setMyPokemons] = useState(null)
  const { data: pokemonsData } = useGet('/mypokemons')

  useEffect(() => {
    setMyPokemons(pokemonsData.pokemons)
    return () => {
      setMyPokemons(null)
    }
  }, [pokemonsData])

  return (
    <div className='container mt-5'>
      <CatchPokemon />
      <h1>My Pokemon</h1>
      {myPokemons && myPokemons.length === 0 && (
        <p>It seems like you don't have any pokemon yet, catch one!</p>
      )}
      {myPokemons &&
        myPokemons.map((pokemon, index) => (
          <div className='card' style={{ width: '18rem' }} key={index}>
            <img src={pokemon.image} className='card-img-top' alt='' />
            <div className='card-body'>
              <h5 className='card-title'>{pokemon.name}</h5>
              <div>
                <Link
                  to={`/pokemon/${pokemon.pokemonId}`}
                  className='btn btn-primary'
                >
                  See detail
                </Link>
                <AddExchange id={pokemon.id} name={pokemon.name} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default MyPokemon
