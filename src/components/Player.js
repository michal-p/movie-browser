import React, { useEffect, useRef, useState, useCallback } from 'react'
import shaka from 'shaka-player'
import Notification from './Notification'

const Player = ({ url }) => {
  const [notification, setNotification] = useState({})
  const videoRef = useRef(null)
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll()

  const onError = (error, type = 'note') => {
    // Log the error.
    console.error('Error code', error.code, 'object', error)
    setNotification({ message: error, type: type })
  }

  const initPlayer = useCallback(async () => {
    try {
      const player = new shaka.Player(videoRef.current)
      videoRef.current.requestFullscreen()
      await player.load(url)
    } catch (error) {
      onError(error)
    }
  }, [url])

  useEffect(() => {
    if (shaka.Player.isBrowserSupported()) {
      // Check to see if the browser supports the basic APIs Shaka needs.
      initPlayer()
    } else {
      // This browser does not have the minimum set of APIs we need.
      onError('Browser not supported!', 'error')
    }
  }, [initPlayer])

  return (
    <>
      <Notification message={notification.message} type={notification.type} />
      <video
        ref={videoRef}
        width="640"
        poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
        controls
        autoPlay
      ></video>
    </>
  )
}

export default Player
