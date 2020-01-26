import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const Film = ({filmId}) => {
  const [film, setFilm] = useState()
  const imageBaseUrl = 'http://image.tmdb.org/t/p/w342/'
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
      <div className='flex-container' >
        <div className='card-body flex-item' >
          <h3>{film.title}</h3>
          <p>{film.overview}</p>
          <div>
            {film.genres.map(g => {
              return g.name
            }).join(', ')}
            <p>{film.release_date}</p>
            <p>{film.homepage}</p>
          </div>
          <Button variant="secondary">Play</Button>{' '}
        </div>
        <div className='flex-item'>
          <Image src={`${imageBaseUrl}${film.backdrop_path}`} />
        </div>
      </div>
    )
  } else {
    return <p>Film is loading!</p>
  }
}

export default Film