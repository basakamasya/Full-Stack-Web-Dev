import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const b = await blogs.getAll()
    dispatch(setBlogs(b))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newNote = await blogs.create(content)
    dispatch(appendBlog(newNote))
  }
}


export default blogsSlice.reducer

export const { setBlogs, appendBlog } = blogsSlice.actions