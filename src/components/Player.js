import React, { useEffect, useRef } from 'react'
import shaka from 'shaka-player'

const Player = ({ url }) => {
  const videoRef = useRef(null)
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll()

  const onError = (error) => {
    // Log the error.
    console.error('Error code', error.code, 'object', error)
  }

  const initPlayer = async () => {
    try {
      const player = new shaka.Player(videoRef.current)
      videoRef.current.requestFullscreen()
      await player.load(url)
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!')
    } catch (error) {
      onError(error)
    }
  }

  useEffect(() => {
    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      initPlayer()
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!')
    }
  }, [])

  return (
    <video
      ref={videoRef}
      width="640"
      poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
      controls
      autoPlay
    ></video>
  )
}

export default Player
