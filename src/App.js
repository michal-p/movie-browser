import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movies from './components/Movies'
import Film from './components/Film'
import helperEvents from './utils/events_helper'
import Notification from './components/Notification'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [shows, setShows] = useState([])
  const [family, setFamily] = useState([])
  const [documentary, setDocumentary] = useState([])
  const [filmId, setFilmId] = useState('')
  const [type, setType] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}`
        )
        setMovies(response.data.results)
        response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}`
        )
        setShows(response.data.results)
        response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}&sort_by=popularity.desc&with_genres=10751`
        )
        setFamily(response.data.results)
        response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}&sort_by=popularity.desc&with_genres=99`
        )
        setDocumentary(response.data.results)
      } catch (error) {
        setNotification(helperEvents.onError(error, 'error'))
      }
    }
    fetchMovies()
  }, [])

  const [width, height] = helperEvents.useWindowSize()

  const statisticStyle = {
    padding: 0,
  }

  const filmHandler = (event) => {
    setType(event.target.dataset.type)
    setFilmId(event.target.id)
  }

  if (filmId) {
    return <Film filmId={filmId} type={type} />
  } else {
    return (
      <div className="App">
        {/* TODO remove */}
        <span>
          Window size: {width} x {height}
          <Notification
            message={notification.message}
            type={notification.type}
          />
        </span>
        <main>
          <h3>Popular Movies</h3>
          <div style={statisticStyle}>
            <Movies
              type="movie"
              movies={movies}
              width={width}
              handler={filmHandler}
            />
          </div>
          <h3>Popular Series</h3>
          <div style={statisticStyle}>
            <Movies
              type="tv"
              movies={shows}
              width={width}
              handler={filmHandler}
            />
          </div>
          <h3>Family</h3>
          <div style={statisticStyle}>
            <Movies
              type="movie"
              movies={family}
              width={width}
              handler={filmHandler}
            />
          </div>
          <h3>Documentary</h3>
          <div style={statisticStyle}>
            <Movies
              type="tv"
              movies={documentary}
              width={width}
              handler={filmHandler}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default App
