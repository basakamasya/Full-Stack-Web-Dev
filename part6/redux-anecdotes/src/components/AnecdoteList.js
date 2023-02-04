import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnectodeList = () => {
  const filteredAnecdotes = useSelector(state => {
    const filteredAnecdotes =
      state.filter
        ? state.anecdotes.filter((anc) =>
          anc.content.toUpperCase().includes(state.filter.toUpperCase())
        )
        : state.anecdotes
    return filteredAnecdotes
  })

  const anecdotes = useSelector(state =>
    //state.anecdotes
    filteredAnecdotes
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVote(id))
  }

  return (
    <div>
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
    </div>
  )
}


export default AnectodeList