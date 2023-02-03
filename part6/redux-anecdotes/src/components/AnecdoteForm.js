import { useDispatch } from 'react-redux'
import { createAnc } from '../reducers/anecdoteReducer'

const NewAnc = () => {
  const dispatch = useDispatch()

  const addAnc = (event) => {
    event.preventDefault()
    console.log(event.target)
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnc(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnc}>
        <input name='content' />
        <button type='submit'>create</button>
      </form>
    </div>

  )
}

export default NewAnc