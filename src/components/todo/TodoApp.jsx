
import './todo.css';
import TodoData from './TodoData';
import TodoNew from './TodoNew';
import reactLogo from '../../assets/react.svg';
import { useState } from 'react';

const TodoApp = () => {
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "React" },
        // { id: 2, name: "Java" }
    ])



    const addNewData = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 40000),
            name: name
        }

        // ... là copy lại data trước đó
        setTodoList([...todoList, newTodo]);
    }

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1))
    }
    const deleteData = (id) => {
        const newTodo = todoList.filter(item => item.id !== id);
        setTodoList(newTodo);
    };

    return (
        <div className="todo-container">
            <div className="todo-title">Todo list</div>
            <TodoNew
                addNewData={addNewData}
            />
            {todoList.length > 0 ?
                <TodoData
                    todoList={todoList}
                    deleteData={deleteData}
                />
                :
                <div className="todo-image">
                    <img src={reactLogo} alt="" className='logo' />
                </div>
            }

        </div>
    );
}

export default TodoApp;