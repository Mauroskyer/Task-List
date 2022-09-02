import{useState} from "react";
import Todo from "./todo";

import "./todoApp.css";

export default function TodoApp() {
    const[title, setTitle] = useState(""); /* Title status */
    const[todos, setTodos] = useState([]); /* State where my to-do lists are stored */

    /* Is taking the value that receives the imput and is changing the title state */
    function handleChange(event){
        const value = event.target.value

        setTitle(value);
    }

    function handleSubmit(event) {
        /* The native behavior of the imput is overridden. */
        event.preventDefault();

        /* Object with the properties of the new 'to-do'. */
        const newTodo ={
            id: crypto.randomUUID(), /* We use crypto Api to generate a random id */
            title: title,
            completed: false
        }

        /* Copy 'todo' array and add the new 'to-do' to the beginning of the array */
        const temp =[ ...todos];
        temp.unshift(newTodo)

        /* Update the 'todo' status */
        setTodos(temp);
        setTitle("");
    }

    /* Search the 'todo' within the array to edit the 'title'. */
    function handleUpdate(id, value) {
        const temp =[...todos];
        const item = temp.find(item => item.id === id);
        item.title = value;
        setTodos(temp);
    }

    /* Removes the "todo" with its id */
    function handleDelete(id) {
        const temp = todos.filter(item => item.id !== id);
        setTodos(temp);
    }

    return (
        <div className="todoContainer">
            <form className="todoCreateForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="todoInput" value={title}/>
                <input
                onClick={handleSubmit}
                type="submit"
                value="Create todo"
                className="buttonCreate" />
            </form>
            <div className="todosContainer">
                {todos.map((item) => (
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                ))}
            </div>
        </div>
    )
}