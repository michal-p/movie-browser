import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, handler }) => {
  return (
    <>
      <label>Search: </label>
      <input value={value} onChange={handler} />
    </>
  )
}

Search.propTypes = {
  value: PropTypes.string,
  handler: PropTypes.func,
}

export default Search
