import { useState } from 'react'

//moving the components out of the App component
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({name, number}) => {
  return <p>{name} {number}</p>
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
      <Statistics name="good" number={good}/>
      <Statistics name="neutral" number={neutral}/>
      <Statistics name="bad" number={bad}/>
      <Statistics name="all" number={good+neutral+bad}/>
      <Statistics name="average" number={(good-bad)/(good+neutral+bad)}/>
      <Statistics name="positive" number={(good/(good+neutral+bad))*100 + " %"}/>
    </div>
  )
}

export default App
