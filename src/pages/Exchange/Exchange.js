import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { API } from '../../config/api'
import { useGet } from '../../hooks/useGet'

const Exchange = () => {
  const history = useHistory()
  const [exchanges, setExchanges] = useState(null)
  const [myExchange, setMyExchange] = useState(null)
  const [matchExchange, setMatchExchange] = useState(null)
  const { data: myExchangeData } = useGet('/my-exchange')
  const { data: exchangesData } = useGet('/exchanges')

  useEffect(() => {
    setExchanges(exchangesData.exchanges)
    if (exchanges && myExchange.pokemon) {
      const match = exchanges.find((exchange) => {
        return myExchange.pokemon.pokemonId === exchange.wantedPokemon.pokemonId
      })
      setMatchExchange(match)
    }
    return () => {
      setExchanges(null)
    }
  }, [exchangesData, myExchange, exchanges])

  useEffect(() => {
    setMyExchange(myExchangeData.exchange)
    console.log(myExchange)
    return () => {
      setMyExchange(null)
    }
  }, [myExchangeData])

  const acceptExchange = async (id) => {
    await API.get(`/acceptexchange/${id}`)
    history.push('/mypokemons')
  }

  return (
    <div className='container mt-5 mb-5'>
      <h2>Your Exchange</h2>
      {myExchange &&
        // check whether object is empty or not
        !(
          Object.keys(myExchange).length === 0 &&
          myExchange.constructor === Object
        ) && (
          <div className='card p-3'>
            <strong>kamu</strong> ingin menukar '{myExchange.pokemon?.name}'
            dengan '{myExchange.wantedPokemon?.name}'
          </div>
        )}
      <h2 className='mt-5'>Match Exchanges</h2>
      {matchExchange && (
        <>
          <p>
            Tampaknya sudah ada user yang mau menukarkan pokemon yg kamu
            inginkan, kamu sudah bisa tekan tombol 'accept' dibawah untuk
            menjalankan pertukaran...
          </p>
          <div className='card p-3'>
            <p>
              <strong>{matchExchange.user.username}</strong> ingin menukar '
              {matchExchange.pokemon.name}' dengan '
              {matchExchange.wantedPokemon.name}'
            </p>
            <button
              type='button'
              className='btn btn-outline-success d-inline-block'
              onClick={() => acceptExchange(matchExchange.id)} // work on id
            >
              Hey, tukaran yuk!
            </button>
          </div>
        </>
      )}
      <h2 className='mt-5'>Exchange List</h2>
      {exchanges &&
        exchanges.map((exchange, index) => (
          <div className='card p-3' key={index}>
            <strong>{exchange.user.username}</strong> ingin menukar '
            {exchange.pokemon.name}' dengan '{exchange.wantedPokemon.name}'
          </div>
        ))}
    </div>
  )
}

export default Exchange
