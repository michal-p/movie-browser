import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const Film = ({filmId, type}) => {
  const [film, setFilm] = useState()
  const imageBaseUrl = 'http://image.tmdb.org/t/p/w342/'
  useEffect(() => {
    const baseFilmUrl = `https://api.themoviedb.org/3/${type}/${filmId}?api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}`
    const fetchFilm = async () => {
      try {
        const response = await axios.get(baseFilmUrl)
        setFilm(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFilm()
  }, [filmId, type])

  if(film) {
    return (
      <div className='flex-container' >
        <section className='card-body flex-item' >
          <h3>{film.title}</h3>
          <p>{film.overview}</p>
          <span>
            {film.genres.map(g => {
              return g.name
            }).join(', ')}
          </span>
          <p>{film.release_date}</p>
          <p><a href={film.homepage}>{film.homepage}</a></p>
          <Button variant="secondary">Play</Button>{' '}
        </section>
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