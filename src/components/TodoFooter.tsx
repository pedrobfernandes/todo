import "./TodoFooter.css";
import type { Render } from "../types";


type TodoFooterProps =
{
    toComplete(): number;
    completed: number;
    setFilter: React.Dispatch<React.SetStateAction<Render>>;
    filter: Render;
    isDuplicate: boolean;
    handleDeleteCompleted(): void;
};


export default function TodoFooter(props: TodoFooterProps)
{
    const
    {
        toComplete, completed,
        setFilter, handleDeleteCompleted,
        filter, isDuplicate
    
    } = props;
    
    
    function showDuplicateTastWarinig(): React.ReactNode
    {
        if (isDuplicate === true)
        {
            return(
                <p
                    className="warning-duplicate"
                >
                    This task already exists.
                </p>
            );
        }
    }
    
    return(
         <footer className="todo-footer">
            <nav className="todo-footer-filters" aria-label="Todo list filters">
                <ul>
                    <li>
                        <button
                            type="button"
                            className={filter === "All" ? "active" : ""}
                            aria-pressed={filter === "All"}
                            onClick={() => setFilter("All")}
                        >
                            All
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={filter === "Active" ? "active" : ""}
                            aria-pressed={filter === "Active"}
                            onClick={() => setFilter("Active")}
                        >
                            Active
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className={filter === "Completed" ? "active" : ""}
                            aria-pressed={filter === "Completed"}
                            onClick={() => setFilter("Completed")}
                        >
                            Completed
                        </button>
                    </li>
                </ul>
            </nav>
            
             <div className="todo-footer-main">
                <span
                    className="items-remaining"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {toComplete()} items left
                </span>
                <button
                    className="clear-completed"
                    type="button"
                    disabled={completed === 0}
                    onClick={handleDeleteCompleted}
                >
                    Clear Completed
                </button>
            </div>
            
            {showDuplicateTastWarinig()}
            
        </footer>
    );
}
