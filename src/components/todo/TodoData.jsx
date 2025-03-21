
const TodoData = (props) => {

    //Khởi tạo biến từ props lấy từ App.jsx
    const { todoList, deleteData } = props;

    const handleDelele = (id) => {
        deleteData(id)
    }


    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                console.log(">> check item: ", item, index)
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button
                            onClick={() => handleDelele(item.id)}
                            style={{ cursor: "pointer" }}
                        >Delete</button>
                    </div>
                )
            })}
        </div >

    )
}

export default TodoData;