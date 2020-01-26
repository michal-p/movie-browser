import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Film = ({filmId}) => {
  const [film, setFilm] = useState()
  useEffect(() => {
    const baseFilmUrl = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}`
    const fetchFilm = async () => {
      try {
        const response = await axios.get(baseFilmUrl)
        setFilm(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFilm()
  }, [filmId])

  if(film) {
    return (
      <p>{JSON.stringify(film)}</p>
    )
  } else {
    return <p>Film is loading!</p>
  }
}

export default Film