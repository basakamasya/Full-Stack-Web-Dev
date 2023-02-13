import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      //const id = action.data.voteId
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
    createAnc(state, action) {
      //const content = action.payload
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer

export const { createAnc, increaseVote, setAnecdotes } = anecdoteSlice.actions