import { useState } from "react"

export default function Todo({item, onUpdate, onDelete}) {
    const [isEdit, setIsEdit] = useState(false);/* Status for 'todo' edit mode */

    /* Function to edit the title status */
    function FormEdit() {

        const [newValue, setNewValue] = useState(item.title) /* Status to change 'title' */

        function handleSubmit(event) {
            event.preventDefault()
        }

        /* the new value is taken and the 'title' is edited.*/
        function handleChange(event) {
            const value = event.target.value;
            setNewValue(value);
        }

        /* Edits the 'todo' with the new values of the imput */
        function handleClickUpdateTodo() {
            onUpdate(item.id, newValue);
            setIsEdit(false);
        }

        /* Edit mode interface */
        return(
            <form className="todoUpdateForm" onSubmit={handleSubmit}>
                <input type="text" className="todoInput" onChange={handleChange} value={newValue}/>
                <button className="button" onClick={handleClickUpdateTodo}>Update</button>
            </form>
        )
    }

    function TodoElement(params) {
        return(
            <div className="todoInfo">
                <span className="todoTitle">{item.title}</span>
                <button className="button" onClick={() => setIsEdit(true)}>Edit</button>
                <button className="buttonDelete" onClick={(event) => onDelete(item.id)}>Delete</button>
            </div>
        )
    }

    /* Uses the component depending on the state of 'isEdit'. */
    return (
        <div className="todo">
            {isEdit ? <FormEdit/> : <TodoElement/>}
        </div>

    )

}