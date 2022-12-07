const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0)
  return (
    <>
    <b>total of {sum} exercises</b>
    </>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />) //so that it works with arbitrary number of parts

const Course = ({course}) =>     
<div key={course.id}>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
</div>

export default Course