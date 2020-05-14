import axios from 'axios'
const apiID = process.env.API_KEY
const baseUrl = 'http://localhost:3001/movies'
const baseFilmUrl = 'https://api.themoviedb.org/3/movie/'

const getMovie = (id) => {
  const request = axios.get(`${baseFilmUrl}/${id}?api_key=${apiID}`)
  return request.then(response => {
    return response.data
  })
}

const endPoints = {
  latest: 'latest.json',
  currencies: 'currencies.json'
}

const createUrl = (action) => {
  return `${baseUrl}/${action}/?app_id=${apiID}`
}

const getLatest = () => {
  const request = axios.get(createUrl(endPoints.latest))
  return request.then(response => {
    console.log('getLatest promise fulfilled')
    return response.data
  })
}

const getCurrencies = () => {
  const request = axios.get(createUrl(endPoints.currencies))
  return request.then(response => {
    // console.log('getCurrencies promise fulfilled')
    return response.data
  })
}

export default { getMovie }