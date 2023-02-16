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
    hide() {
      return initialState
    },
  },
})

export const setNotification = (m) => {
  return async (dispatch) => {
    clearTimeout(timeID)
    dispatch(display(m))
    timeID = setTimeout(() => {
      dispatch(hide())
    }, 5000)
  }
}

export default notificationSlice.reducer

export const { display, hide } = notificationSlice.actions