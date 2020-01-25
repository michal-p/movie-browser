import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movies from './components/Movies'
import Alert from 'react-bootstrap/Alert';
import { useWindowSize } from './utils/events_helper'

import './App.css'

function App() {
  const [ movies, setMovies ] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios
          .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}`)
          setMovies(response.data.results)
          //.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_MOVIE_BROWSER_API_KEY}`)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMovies()
  }, [])
  
  const [width, height] = useWindowSize()

  const statisticStyle = {
    padding: 0,
  }

  return (
    <div className="App">
      <span>Window size: {width} x {height}</span>
      <main>
        <Alert key='primary' variant='danger'>
          This is a alert—check it out!
        </Alert>
        <h3>Popular Movies</h3>
        <div style={statisticStyle}>
          <Movies movies={movies} width={width} handler={() => onclick(alert('bubu'))}/>
        </div>
      </main>
    </div>
  )
}

export default App
