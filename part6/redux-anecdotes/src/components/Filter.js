import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    const filterValue = event.target.value
    props.filterChange(filterValue)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
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

const mapDispatchToProps = { filterChange }

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter