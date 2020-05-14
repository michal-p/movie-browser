import React from 'react'

const Notification = ({ message, type }) => {
  let style = `notification--${type}`
  if (message === null) {
    return null
  }

  return <div className={style}>{message}</div>
}

export default Notification
