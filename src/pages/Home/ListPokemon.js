import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGet } from '../../hooks/useGet'

const ListPokemon = () => {
  const [pokemons, setPokemons] = useState(null)
  const { data: pokemonsData } = useGet('/pokemons')

  useEffect(() => {
    setPokemons(pokemonsData)
    return () => {
      setPokemons(null)
    }
  }, [pokemonsData])

  return (
    <div
      className='my-5'
      style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}
    >
      {pokemons &&
        pokemons.map((pokemon, index) => (
          <div className='card' style={{ width: '15rem' }} key={index}>
            <img src={pokemon.image} className='card-img-top' alt='' />
            <div className='card-body'>
              <h5 className='card-title'>{pokemon.name}</h5>
              <Link to={`/pokemon/${index + 1}`} className='btn btn-primary'>
                See detail
              </Link>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ListPokemon
