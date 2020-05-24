import axios from 'axios'
const apiID = process.env.API_KEY
const baseFilmUrl = 'https://api.themoviedb.org/3/movie/'

const getMovie = (id) => {
  const request = axios.get(`${baseFilmUrl}/${id}?api_key=${apiID}`)
  return request.then((response) => {
    return response.data
  })
}

export default { getMovie }
