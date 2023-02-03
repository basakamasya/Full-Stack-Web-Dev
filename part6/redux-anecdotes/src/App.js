import { useSelector, useDispatch } from 'react-redux'
import { createAnc, increaseVote } from './reducers/anecdoteReducer'

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
    /*
    dispatch({
      type: 'Vote',
      data: {
        voteId: id
      }
    })*/
    dispatch(increaseVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((anc1, anc2) => anc2.votes - anc1.votes).map(anecdote =>
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