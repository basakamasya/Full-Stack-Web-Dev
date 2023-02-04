import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    display(state, action) {
      return action.payload
    },
    hide(state, action) {
      return initialState
    },
  },
})

export default notificationSlice.reducer

export const { display, hide } = notificationSlice.actions