const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <><p>{props.name1} {props.point1}</p>
    <p>{props.name2} {props.point2}</p>
    <p>{props.name3} {props.point3}</p></>    
  )
}

const Total = (props) => {
  return (
      <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content name1={part1} point1={exercises1} name2={part2} point2={exercises2} name3={part3} point3={exercises3}  />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App