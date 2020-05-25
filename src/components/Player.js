import React, { useEffect, useRef, useState, useCallback } from 'react'
import shaka from 'shaka-player'
import Notification from './Notification'
import helperEvents from '../utils/events_helper'
import PropTypes from 'prop-types'

const Player = ({ url }) => {
  const [notification, setNotification] = useState({ message: '', type: '' })
  const videoRef = useRef(null)
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll()

  const initPlayer = useCallback(async () => {
    const player = new shaka.Player(videoRef.current)
    videoRef.current.requestFullscreen()
    await player.load(url)
  }, [url])

  useEffect(() => {
    try {
      if (shaka.Player.isBrowserSupported()) {
        // Check to see if the browser supports the basic APIs Shaka needs.
        initPlayer()
      } else {
        throw new Error('Browser not supported!')
      }
    } catch (error) {
      // This browser does not have the minimum set of APIs we need.
      setNotification(helperEvents.onError(error, 'error'))
    }
  }, [initPlayer])

  return (
    <>
      <div>
        <Notification message={notification.message} type={notification.type} />
      </div>
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

Player.propTypes = {
  url: PropTypes.string,
}

export default Player
