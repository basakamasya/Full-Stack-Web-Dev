import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = (props) => {   //taken from the course material
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }

  const Statistic = ({name, number}) => {
    return <p>{name} {number}</p>
  }

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
      <Statistic name="good" number={good}/>
      <Statistic name="neutral" number={neutral}/>
      <Statistic name="bad" number={bad}/>
    </div>
  )
}

export default App
