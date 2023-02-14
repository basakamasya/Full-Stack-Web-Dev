import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification)
    return (
      <div style={style}>
        {notification}
      </div>
    )
}

//export default Notification

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification