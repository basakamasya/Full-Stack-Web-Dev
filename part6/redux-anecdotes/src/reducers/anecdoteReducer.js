import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      const id = action.payload
      const ancToChange = state.find((anc) => {
        return anc.id === id;
      })

      const changedAnc = {
        ...ancToChange,
        votes: ancToChange.votes + 1
      }
      return state.map(anc => anc.id !== changedAnc.id ? anc : changedAnc)
    },
    //createAnc(state, action) {
    //const content = action.payload
    //state.push(action.payload)
    //},
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

export default anecdoteSlice.reducer

export const { increaseVote, setAnecdotes, appendAnc } = anecdoteSlice.actions