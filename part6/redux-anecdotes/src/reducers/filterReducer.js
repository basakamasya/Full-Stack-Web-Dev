import { createSlice } from '@reduxjs/toolkit'

const initialState = null

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