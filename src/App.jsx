
import './components/todo/todo.css';
import TodoData from './components/todo/TodoData';
import TodoNew from './components/todo/TodoNew';
import reactLogo from './assets/react.svg';
//arrow function = () => {}
const App = () => {

  const name = 'React';
  const age = 21;
  const data = {
    name: 'Java',
    framework: 'Spring'
  }

  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo list</div>
        <TodoNew />
        <TodoData
          name={name}
          age={age}
          data={data}
        />
        <div className="todo-image">
          <img src={reactLogo} alt="" className='logo' />
        </div>
      </div>
    </>
  )
}

export default App
