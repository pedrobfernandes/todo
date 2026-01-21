import { useState, useRef } from "react";
import "./InputTodoForm.css";


type InputTodoFormProps =
{
    setTodoValue(value: string): void;
};


export default function InputTodoForm(props: InputTodoFormProps)
{
    const { setTodoValue} = props;
    const [task, setTask] = useState<string>("");
    
    const inputRef: React.RefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void
    {
        event.preventDefault();
        
        if (task.trim() === "")
        {
            return;
        }
        
        setTodoValue(task);
        setTask("");
        
        inputRef.current?.focus();
    }
    
    
    return(
        <form className="todo-list-form" onSubmit={handleSubmit}>
            <label htmlFor="input-todo" className="visually-hidden">
                Type in to enter a new todo
            </label>

            <input
                id="input-todo"
                ref={inputRef}
                type="text"
                placeholder="Create a new todo..."
                value={task}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTask(event.target.value)
                }
            />
            <button
                className="add-todo-button"
                type="submit"
            >
                <span className="visually-hidden">Add the new task</span>
            </button>
        </form>
    );
}
