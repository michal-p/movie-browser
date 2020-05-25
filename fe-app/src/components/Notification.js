import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  let style = `notification--${type}`
  if (message === null) {
    return null
  }

  return <span className={style}>{message}</span>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.any,
}

export default Notification
