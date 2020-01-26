import React from 'react'
import FigureImage from 'react-bootstrap/FigureImage'
import Carousel from 'react-bootstrap/Carousel'
import _ from 'lodash'

const Movies = ({ movies, width, handler }) => {
  const image = { width: 171, height: 180 }
  const chunksAmount = Math.floor(width * 0.8 / image.width) 
  const imageBaseUrl = 'http://image.tmdb.org/t/p/w342/'
  const moviesChunks = _.chunk(movies, chunksAmount)

  return (
    <Carousel>
      { moviesChunks.map((chunk, i) => {
        return (
          <Carousel.Item key={`carousel_${i}`}>
            { chunk.map((film, j) => {
              return (
                <FigureImage
                  key={`image_${j}`} id={film.id} onClick={handler}
                  width={image.width}
                  height={image.height}
                  alt={`${image.width}x${image.height}`}
                  src={`${imageBaseUrl}${film.poster_path}`}
                />
              )
            })}
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default Movies