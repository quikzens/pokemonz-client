import React, { useEffect, useState } from 'react'
import { API, configJSON } from '../../config/api'
import { useGet } from '../../hooks/useGet'

import Modal from '../../components/Modal/Modal'

const AddExchange = ({ id, name }) => {
  const [isExchangeShow, setExchangeShow] = useState(false)
  const [takenPokemons, setTakenPokemons] = useState(null)
  const { data: takenPokemonsData } = useGet('/takenpokemons')
  const [form, setForm] = useState({
    wantedPokemon: '',
  })

  useEffect(() => {
    setTakenPokemons(takenPokemonsData.pokemons)
    return () => {
      setForm(null)
    }
  }, [takenPokemonsData])

  const handleSubmit = async (e) => {
    // add exchange
    e.preventDefault()
    const data = {
      exchangedPokemon: id,
      wantedPokemon: parseInt(form.wantedPokemon),
    }

    const response = await API.post('/exchange', data, configJSON)
    if (response.data.status === 'failed') {
      return console.log(`Error: ${response.data.message}`)
    }

    console.log('exchange created!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <div>
      <button
        className='btn btn-outline-success'
        onClick={() => setExchangeShow(true)}
      >
        Exchange
      </button>
      <Modal
        show={isExchangeShow}
        close={() => setExchangeShow(false)}
        title='Add Exchange...'
      >
        <form className='form' onSubmit={handleSubmit}>
          <p>
            Kamu mau nukar pokemon '{name}' dengan pokemon apa? Ini dia list
            pokemon yang dimiliki oleh user lain...
          </p>
          <select
            name='wantedPokemon'
            id='wantedPokemon'
            onChange={handleChange}
            className='d-block'
          >
            <option value='-'>-</option>
            {takenPokemons &&
              takenPokemons.map((pokemon) => (
                <option value={parseInt(pokemon.pokemonId)} key={pokemon.id}>
                  {pokemon.name}
                </option>
              ))}
          </select>
          <button type='submit' className='btn btn-success'>
            Tukar
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default AddExchange
