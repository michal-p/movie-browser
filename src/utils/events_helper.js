import { useState, useLayoutEffect } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const onError = (error, type = 'note') => {
  // Log the error.
  let errorCode = error.code ? `Error code ${error.code}` : ''
  console.error(errorCode, 'object', error)
  return { message: error, type: type }
}

export default { useWindowSize, onError }
