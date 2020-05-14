import React from 'react'

const Notification = ({ message, type }) => {
  let style = `notification--${type}`
  if (message === null) {
    return null
  }

  return <span className={style}>{message}</span>
}

export default Notification
