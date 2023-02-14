import { connect } from 'react-redux'
import { createAnc } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const NewAnc = (props) => {
  const addAnc = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnc(content)
    props.setNotification(`you have created '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnc}>
        <input name='content' />
        <button type='submit'>create</button>
      </form>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = { createAnc, setNotification }

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(NewAnc)
export default ConnectedAnecdoteForm