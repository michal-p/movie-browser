import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movies from './components/Movies'
import Film from './components/Film'
import helperEvents from './utils/events_helper'
import Notification from './components/Notification'
import Search from './components/Search'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [shows, setShows] = useState([])
  const [family, setFamily] = useState([])
  const [documentary, setDocumentary] = useState([])
  const [filmId, setFilmId] = useState(0)
  const [type, setType] = useState('')
  const [notification, setNotification] = useState({})
  const [newFilter, setNewFilter] = useState('')

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
    setFilmId(parseInt(event.target.id))
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  let filteredMovies = movies.filter((movie) =>
    movie.title.toUpperCase().includes(newFilter.toUpperCase())
  )
  let filteredShows = shows.filter((show) =>
    show.name.toUpperCase().includes(newFilter.toUpperCase())
  )
  let filteredFamily = family.filter((fam) =>
    fam.title.toUpperCase().includes(newFilter.toUpperCase())
  )
  let filteredDocumentary = documentary.filter((doc) =>
    doc.name.toUpperCase().includes(newFilter.toUpperCase())
  )

  if (filmId) {
    return <Film filmId={filmId} type={type} />
  } else {
    return (
      <div className="App">
        {/* TODO remove */}
        <p>
          Window size: {width} x {height}
          <Notification
            message={notification.message}
            type={notification.type}
          />
        </p>
        <Search value={newFilter} handler={handleFilter} />
        <main>
          <div style={statisticStyle}>
            <Movies
              type="movie"
              movies={filteredMovies}
              width={width}
              handler={filmHandler}
              name="Popular Movies"
            />
          </div>
          <div style={statisticStyle}>
            <Movies
              type="tv"
              movies={filteredShows}
              width={width}
              handler={filmHandler}
              name="Popular Series"
            />
          </div>
          <div style={statisticStyle}>
            <Movies
              type="movie"
              movies={filteredFamily}
              width={width}
              handler={filmHandler}
              name="Family"
            />
          </div>
          <div style={statisticStyle}>
            <Movies
              type="tv"
              movies={filteredDocumentary}
              width={width}
              handler={filmHandler}
              name="Documentary"
            />
          </div>
        </main>
      </div>
    )
  }
}

export default App
