import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Tes = () => {

    const [data, setData] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        try {
            const response = await axios.get('http://localhost:5000/')
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        {(data)? (
            <div>{data}</div>
        ): (
            <div>Loadingg...</div>
        )}
    </div>
  )
}

export default Tes