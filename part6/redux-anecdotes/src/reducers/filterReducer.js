import { createSlice } from '@reduxjs/toolkit'

const initialState = null

/*
const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}*/

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    },
  },
})

export default filterSlice.reducer

export const { filterChange } = filterSlice.actions