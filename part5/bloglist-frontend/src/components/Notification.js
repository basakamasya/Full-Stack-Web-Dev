const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Success = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}


export default {Error, Success }