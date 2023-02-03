import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)

const App = () => {
  const handleGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const handleBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const handleOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const handleZero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleZero}>reset stats</button>
      <p>good {store.getState().good}</p>
      <p>ok {store.getState().ok}</p>
      <p>bad {store.getState().bad}</p>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

renderApp()
store.subscribe(renderApp)

