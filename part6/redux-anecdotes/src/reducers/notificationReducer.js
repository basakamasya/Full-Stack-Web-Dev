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

export const setNotification = (m, ms) => {
  return async (dispatch) => {
    dispatch(display(m))
    setTimeout(() => {
      dispatch(hide())
    }, ms*100)
  }
}

export default notificationSlice.reducer

export const { display, hide } = notificationSlice.actions