import { useState } from 'react'

//already implemented the button
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>
}
return <div>
  <StatisticLine text="good" value={props.good}></StatisticLine>
  <StatisticLine text="neutral" value={props.neutral}></StatisticLine>
  <StatisticLine text="bad" value={props.bad}></StatisticLine>
  <StatisticLine text="all" value={props.good+props.neutral+props.bad}></StatisticLine>
  <StatisticLine text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}></StatisticLine>
  <StatisticLine text="positive" value={(props.good/(props.good+props.neutral+props.bad))*100 + " %"}></StatisticLine>
</div>
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
