import { useState, useEffect } from 'react'
import { API } from '../config/api'

export const useGet = (url) => {
  // init state
  const [isInvoke, setInvoke] = useState(true)
  const [data, setData] = useState([])

  // init lifecycle
  useEffect(() => {
    const getData = async () => {
      const response = await API.get(url)

      if (response.data.status === 'failed') {
        return console.log(`Error: ${response.data.message}`)
      }

      const data = response.data
      setData(data)
    }
    getData()
  }, [url, isInvoke])

  const invoke = () => {
    setInvoke(!isInvoke)
  }

  return { data, invoke }
}
