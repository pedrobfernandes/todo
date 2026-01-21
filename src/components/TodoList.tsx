import type { JSX } from "react";
import type { Todo } from "../types";
import "./TodoList.css";


type TodoListProps =
{
    todos: Todo[];
    handleCompleteTodo(id: number): void;
    handleDeleteTodo(id: number): void;
};

export default function TodoList(props: TodoListProps)
{
    const { todos, handleCompleteTodo, handleDeleteTodo } = props;
    
    
    function renderTodoTask(): JSX.Element[]
    {
        const todoItems: JSX.Element[] = todos.map((todo: Todo) =>
        {
            return(
                <li key={todo.id}>
                    <div className="todo-list-input-group">
                        <input
                            id={`${todo.id}`}
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => handleCompleteTodo(todo.id)}
                        />
                        <label
                            htmlFor={`${todo.id}`}
                            className={todo.isCompleted ? "completed" : ""}
                        >
                            {todo.title}
                        </label>
                    </div>
                    
                    <button
                        type="button"
                        className="delete-todo-button"
                        onClick={() => handleDeleteTodo(todo.id)}
                    >
                        <span className="visually-hidden">
                            Delete todo
                        </span>
                        <img
                            src="/assets/images/icon-cross.svg"
                            alt=""
                            aria-hidden="true"
                        />
                    </button>
                </li>
            );
        });
        
        return(todoItems);
    }
    
    
    return(
        <ul className="todo-list">
           {renderTodoTask()}
        </ul>
    );
}
