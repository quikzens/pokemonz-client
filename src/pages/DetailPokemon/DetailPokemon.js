import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useGet } from '../../hooks/useGet'

const DetailPokemon = () => {
  const { id } = useParams()
  const { data: pokemonData } = useGet(`/pokemon/${id}`)
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    setPokemon(pokemonData.pokemon)
    return () => {
      setPokemon(null)
    }
  }, [pokemonData])

  return (
    <div className='container mt-5'>
      {pokemon && (
        <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.image} alt='' />
          <p>
            <strong>Height: </strong>
            {pokemon.height}
          </p>
          <p>
            <strong>Abilities</strong>
          </p>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default DetailPokemon
