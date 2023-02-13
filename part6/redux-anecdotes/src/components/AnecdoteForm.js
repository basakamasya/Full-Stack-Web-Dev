import { useDispatch } from 'react-redux'
import { createAnc } from '../reducers/anecdoteReducer'
import { display, hide } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const NewAnc = () => {
  const dispatch = useDispatch()

  const addAnc = async (event) => {
    event.preventDefault()
    console.log(event.target)
    const content = event.target.content.value
    event.target.content.value = ''
    const newAnc = await anecdoteService.createNew(content)
    dispatch(createAnc(newAnc))
    dispatch(display(`you have created '${content}'`))
    setTimeout(() => {
      dispatch(hide())
    }, 5000)
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