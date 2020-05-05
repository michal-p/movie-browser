import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
// import Player from './ShakaPlayer'
import Player from './Player'
import axios from 'axios'

const Film = ({ filmId, type, handler }) => {
  const [film, setFilm] = useState()
  const [urlToPlay, setUrlToPlay] = useState('')

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

  const playerHandler = () => {
    // setUrlToPlay('/content/sintel/hls/playlist.m3u8')
    // setUrlToPlay('../../playlist.m3u8')
    setUrlToPlay(
      'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'
    )
    // setUrlToPlay(
    //   'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    // )
    // setUrlToPlay('https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8')
  }

  if (urlToPlay) {
    console.log('url to play : ', urlToPlay)
    return <Player url={urlToPlay} />
  } else if (film) {
    console.log('film: ', film)
    return (
      <div className="flex-container">
        <section className="card-body flex-item">
          <h3>{film.title}</h3>
          <p>{film.overview}</p>
          <span>
            {film.genres
              .map((g) => {
                return g.name
              })
              .join(', ')}
          </span>
          <p>{film.release_date}</p>
          <p>
            <a href={film.homepage}>{film.homepage}</a>
          </p>
          <Button variant="secondary" onClick={playerHandler}>
            Play
          </Button>{' '}
        </section>
        <div className="flex-item">
          <Image src={`${imageBaseUrl}${film.backdrop_path}`} />
        </div>
      </div>
    )
  } else {
    return <p>Film is loading!</p>
  }
}

export default Film
