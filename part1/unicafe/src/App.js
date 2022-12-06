import { useState } from 'react'

//moving the components out of the App component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>
}
return <>
  <p>good {props.good}</p>
  <p>neutral {props.neutral}</p>
  <p>bad {props.bad}</p>
  <p>all {props.good+props.neutral+props.bad}</p>
  <p>average {(props.good-props.bad)/(props.good+props.neutral+props.bad)}</p>
  <p>positive {(props.good/(props.good+props.neutral+props.bad))*100 + " %"}</p>
</>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => setGood(good + 1)
  const onClickNeutral = () => setNeutral(neutral + 1)
  const onClickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onClickGood} text="good" />
      <Button onClick={onClickNeutral} text="neutral" />
      <Button onClick={onClickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
