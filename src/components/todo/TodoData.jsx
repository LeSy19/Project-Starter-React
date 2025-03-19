
const TodoData = (props) => {

    //Khởi tạo biến từ props lấy từ App.jsx
    const { name, age, data } = props;

    console.log(">>> Check props: ", props);

    return (
        <div className='todo-data'>
            <div>Code: {data.name}</div>
            <div>Learning React</div>
            <div>Watch youtube</div>
        </div>

    )
}

export default TodoData;