import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import EditModal from "./Components/EditModals/EditModal";



const url ="https://656424f6ceac41c0761d8037.mockapi.io/Shema"

const App = ()=>{
    const [todos, setTodos]=useState([])
    const [todoAdd, setTodoAdd]=useState('')
    const [editModalOpen, setEditModalOpen] =useState(false)
    const [idTodo, setIdTodo] = useState('')


    useEffect(() => {
        axios('https://656424f6ceac41c0761d8037.mockapi.io/Shema')
            .then(({data})=>setTodos(data))
    }, []);


    const handleEdit = (idTodo) => {
        setEditModalOpen(true)
        setIdTodo(idTodo)
    }

    const handleAddTodo=()=>{
        const newTodo ={
            title: todoAdd,
            completed: false,
            createdit: null,
            completedAt: +new Date()

        }
        setTodoAdd('')
        axios.post(url,newTodo)
            .then(({data})=>setTodos([...todos,data]))
    }

    const handleDeleteTodo = (todo)=>{
        axios.delete(`${url}/${todo.id}`, todo)
            .then(({data})=> setTodos(todos.filter((todo)=> todo.id!==data.id)))
    }

    const handleSave = (todo) => {
        axios.put(`${url}/${idTodo}`, todo)
            .then(({data}) => {
                setTodos(todos.map(el => el.id === data.id ? data: el))
            })
    }

    return(
        <div className={'container'}>
            <h1>Todo List</h1>
            <input className={'Input'}  placeholder={"Добавить"} type="text" onChange={(e)=> setTodoAdd(e.target.value)}/>
            <button className={'Butt'} onClick={handleAddTodo}>Add</button>
            <div>

                {
                    editModalOpen &&
                    <EditModal handleSave={handleSave} setOpen={setEditModalOpen} idTodo={idTodo} url={url}/>
                }
                {
                    todos.map(todo=>
                        <div className={'todo-wrapper'} key={todo.id}>
                            <p>{todo.title}</p>
                            <input type="checkbox" checked={todo.completed} />
                            <span>
                                {dayjs(todo.createdAt).format('HH:mm DD:MM:YYYY')}
                            </span>
                            <span>
                                {dayjs(todo.createdAt).format('HH:mm DD:MM:YYYY')}
                            </span>
                            <button className={'buta'} onClick={()=>handleDeleteTodo(todo)}>Delete</button>
                            <button onClick={() => handleEdit(todo.id)}>Edit</button>
                        </div>)
                }
            </div>
        </div>
    )
}
export default App