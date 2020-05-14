import React from 'react'

const Search = ({value, handler}) => {

  return (
    <>
      <label>Search: </label>
      <input value={value} onChange={handler}/>
    </>
  )
}

export default Search