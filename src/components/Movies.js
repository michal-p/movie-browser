import { Link } from 'react-router-dom'
import React from 'react'
import FigureImage from 'react-bootstrap/FigureImage'
import Carousel from 'react-bootstrap/Carousel'
import _ from 'lodash'

const Movies = ({ movies, width, handler, type, name }) => {
  const image = { width: 171, height: 180 }
  const chunksAmount = Math.floor((width * 0.85) / image.width)
  let imageBaseUrl = 'http://image.tmdb.org/t/p/w342/'
  const moviesChunks = _.chunk(movies, chunksAmount)

  return (
    <>
      {movies.length === 0 ? (
        ''
      ) : (
        <>
          {name && <h3>{name}</h3>}
          <Carousel interval={null}>
            {moviesChunks.map((chunk, i) => {
              return (
                <Carousel.Item key={`carousel_${i}`}>
                  {chunk.map((film, j) => {
                    return (
                      <Link to={`/${type}/${film.id}`}>
                        <FigureImage
                          key={`image_${j}`}
                          id={film.id}
                          data-type={type}
                          //onClick={handler}
                          width={image.width}
                          height={image.height}
                          alt={`${image.width}x${image.height}`}
                          src={`${imageBaseUrl}${film.poster_path}`}
                        />
                      </Link>
                    )
                  })}
                </Carousel.Item>
              )
            })}
          </Carousel>
        </>
      )}
    </>
  )
}

export default Movies
