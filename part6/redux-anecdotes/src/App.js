import { useSelector, useDispatch } from 'react-redux'
import { createAnc } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnc = (event) => {
    event.preventDefault()
    console.log(event.target)
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnc(content))
  }

  const vote = (id) => {
    //console.log('vote', id)
    dispatch({
      type: 'Vote',
      data: {
        voteId: id
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnc}>
        <input name='content' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App