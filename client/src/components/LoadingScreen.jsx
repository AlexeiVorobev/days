import React from 'react'

const LoadingScreen = ({message}) => {
  return (
    <div className='loading-container'>
        <div className='loading-text'>{message}...</div>
    </div>

  )
}

export default LoadingScreen