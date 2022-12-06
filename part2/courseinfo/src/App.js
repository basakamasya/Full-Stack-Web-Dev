const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const nums = parts.map((part) => part.exercises)
  const sum = nums.reduce((a, b) => a + b, 0)
  return (
    <>
    <p>Number of exercises {sum}</p>
    </>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />) //so that it works with arbitrary number of parts

const Course = ({course}) =>     
<div>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
</div>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App