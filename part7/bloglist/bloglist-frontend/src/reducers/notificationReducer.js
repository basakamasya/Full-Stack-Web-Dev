import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeID = 0

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

export const setNotification = (m, ms) => {
  return async (dispatch) => {
    clearTimeout(timeID)
    dispatch(display(m))
    timeID = setTimeout(() => {
      dispatch(hide())
    }, ms * 1000)
  }
}

export default notificationSlice.reducer

export const { display, hide } = notificationSlice.actions