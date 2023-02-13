import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const changedAnc = action.payload
      return state.map(anc => anc.id !== changedAnc.id ? anc : changedAnc)
    },
    appendAnc(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdotes.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnc = content => {
  return async dispatch => {
    const newNote = await anecdotes.createNew(content)
    dispatch(appendAnc(newNote))
  }
}

export const increaseVote = anecdote => {
  return async dispatch => {
    const changedAnc = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(incrementVote(changedAnc))
    await anecdotes.vote(anecdote, changedAnc)
  }
}


export default anecdoteSlice.reducer

export const { incrementVote, setAnecdotes, appendAnc } = anecdoteSlice.actions