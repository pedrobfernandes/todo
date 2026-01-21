import { useState, useEffect } from "react";
import type { Theme, ThemeConfig } from "../types";


function getInitialTheme(): Theme
{
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (savedTheme !== null)
    {
        return(savedTheme);
    }
    
    return(
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    );
}


export function useTheme(): ThemeConfig
{
    const [theme, setThemeState] = useState<Theme>("light");
    
    useEffect(() =>
    {
        const initialTheme: Theme = getInitialTheme();
        setThemeState(initialTheme);
        document.documentElement.dataset.theme = initialTheme;
    
    }, []);
    
    
    function toggleTheme(): void
    {
        const newTheme: Theme = theme === "light" ? "dark" : "light";
        setThemeState(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme); 
    }
    
    
    return({ theme, toggleTheme });
}
