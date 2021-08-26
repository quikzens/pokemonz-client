import React, { useEffect, useState } from 'react'
import { API, configJSON } from '../../config/api'

import Loading from '../../components/Loading/Loading'
import Modal from '../../components/Modal/Modal'

const CatchPokemon = () => {
  const [catchCount, setCatchCount] = useState(0)
  const [isCatchShow, setCatchShow] = useState(false)
  const [status, setStatus] = useState('loading')
  const [catchedPokemon, setCachedPokemon] = useState(null)

  const catchPokemon = () => {
    setCatchShow(true)
    setCatchCount((prevCatch) => {
      prevCatch += 1
      return prevCatch
    })
  }

  useEffect(() => {
    if (catchCount === 0) return

    let mustGet = false
    if (catchCount % 4 === 0) {
      mustGet = true
    }

    async function fetchData() {
      const response = await API.post('/catch-pokemon', { mustGet }, configJSON)

      switch (response.data.status) {
        case 'failed':
          return console.log(`Error: ${response.data.message}`)
        case 'try_again':
          setStatus('try_again')
          break
        case 'has_taken':
          setStatus('has_taken')
          break
        case 'success':
          setStatus('success')
          setCachedPokemon(response.data.pokemon)
          break
        default:
          break
      }
    }
    fetchData()
  }, [catchCount])

  return (
    <div className='my-5'>
      <button className='btn btn-outline-success' onClick={catchPokemon}>
        Catch Pokemon
      </button>
      <Modal
        show={isCatchShow}
        close={() => setCatchShow(false)}
        title='Catch pokemon...'
      >
        <div>
          {status === 'loading' && (
            <>
              <Loading />
              <p>
                Silahkan, menunggu selama 3 detik, kami pastikan kamu mendapat
                pokemon setelah 4 kali percobaan
              </p>
            </>
          )}
          {status === 'try_again' && (
            <p>Yah, belum dapat pokemon :(, coba lagi yuk!</p>
          )}
          {status === 'has_taken' && (
            <p>
              Ups, sayangnya pokemon ini udah diambil orang lain, coba lagi ya!
            </p>
          )}
          {status === 'success' && (
            <>
              <p>Yey, dapat pokemon baru!!</p>
              <h3>{catchedPokemon?.name}</h3>
              <img src={catchedPokemon?.image} alt='' />
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default CatchPokemon
