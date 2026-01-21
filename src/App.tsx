import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputTodoForm from "./components/InputTodoForm";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import type { Todo, Render } from "./types";
import { useAriaActionStatusAnnouncer } from "./hooks/useAriaActionStatusAnnouncer";


export default function App()
{
    const [todos, setTodos] = useState<Todo[]>(loadTodos());
    const [filter, setFilter] = useState<Render>("All");
    const [isDuplicate, setIsduplicate] = useState<boolean>(false);
    
    const { ariaMessage, announce } = useAriaActionStatusAnnouncer();
    
    const completed: number = todos
        .reduce((count, todo) =>
        count + (todo.isCompleted === true ? 1 : 0), 0
    );
    
    
    function getItemsLeft(): number
    {
        const toComplete: number = todos
            .reduce((count, todo) =>
            count + (todo.isCompleted === false ? 1 : 0), 0
        );
        
        return(toComplete);
    }
    
    
    function loadTodos(): Todo[]
    {
        const savedTodos: string | null = localStorage.getItem("todos");
        
        if (savedTodos === null)
        {
            return([]);
        }
        
        return(JSON.parse(savedTodos));
    }
    
    
    function saveTodos(): void
    {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    
    
    function renderListItems(): Todo[]
    {
        if (filter === "All")
        {
            return(todos);
        }
        
        if (filter === "Active")
        {
            return(todos.filter(todo => todo.isCompleted === false));
        }
        
        return(todos.filter(todo => todo.isCompleted === true));
    }
    
    
    function normalizeStr(str: string): string
    {
        return(
            str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ç/g, "c")
            .replace(/\s+/g, "")
        );
    }
    
    
    function handleAddTodo(title: string): void
    {
        const normalizedTodo: string = normalizeStr(title);
        const existsTodo: boolean = todos.some(
            todo => normalizeStr(todo.title) === normalizedTodo
        );
        
        if (existsTodo === true)
        {
            setIsduplicate(true);
            announce("This task already exists.");
            return;
        }
        
        
        const newTodo: Todo =
        {
            id: Date.now(),
            title: title,
            isCompleted: false,
        };
        
        setIsduplicate(false);
        const newTodos: Todo[] = todos.concat(newTodo);
        setTodos(newTodos);
        announce("Task inserted successfully.");
    }
    
    
    function handleDeteteTodo(id: number): void
    {
        setTodos(previousTodos =>
        {
            const newTodos: Todo[] = previousTodos.filter(
                todo => todo.id !== id
            );
            return(newTodos);
        });
        
        announce("Task deleted successfully.");
    }
    
    
    function handleDeleteCompleted(): void
    {
        setTodos(previousTodos =>
        {
            const newTodos: Todo[] = previousTodos.filter(
                todo => todo.isCompleted === false
            );
            
            return(newTodos)
        });
        
        announce("Completed tasks deleted.");
    }
    
    
    function handleCompleteTodo(id: number): void
    {
        setTodos(previousTodos =>
        {
            const newTodos: Todo[] = previousTodos.slice();
            const index: number = newTodos.findIndex(todo => todo.id === id);
            
            if (index !== -1)
            {
                const todo: Todo = newTodos[index];
                let nextCompletedState: boolean;
                
                if (todo.isCompleted === true)
                {
                    nextCompletedState = false;
                }
                else
                {
                    nextCompletedState = true;
                }
                
                newTodos[index] =
                {
                    id: todo.id,
                    title: todo.title,
                    isCompleted: nextCompletedState
                };
                
                if (nextCompletedState === true)
                {
                    announce(`Task ${todo.title} marked as completed`);
                }
                else
                {
                    announce(`Task ${todo.title} marked as active.`);
                }
            }
            
            return(newTodos);
        });
    }
    
    
    useEffect(() =>
    {
        saveTodos();
    
    }, [todos]);
    
    
    
    return(
        <>
        <div className="bg-image">
        </div>
        <div className="app-wrapper">
            <Header/>
            <main>
                <section className="todo-list-section">
                    <InputTodoForm setTodoValue={handleAddTodo}/>
                    <TodoList
                        todos={renderListItems()}
                        handleCompleteTodo={handleCompleteTodo}
                        handleDeleteTodo={handleDeteteTodo}
                    />
                </section>
            </main>
             <TodoFooter
                toComplete={getItemsLeft}
                completed={completed}
                setFilter={setFilter}
                filter={filter}
                isDuplicate={isDuplicate}
                handleDeleteCompleted={handleDeleteCompleted}
            />
        </div>
        <div
            className="visually-hidden"
            aria-live="polite"
            aria-atomic="true"
        >
            {ariaMessage}
        </div>
        </>
    );
}
