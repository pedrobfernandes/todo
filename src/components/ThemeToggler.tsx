import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon } from "../icons/ThemeToggglerIcons";
import { useAriaActionStatusAnnouncer } from "../hooks/useAriaActionStatusAnnouncer";


export default function ThemeToggler()
{
    const { theme, toggleTheme } = useTheme();
    const { ariaMessage, announce } = useAriaActionStatusAnnouncer();
    
    function getThemeIcon(): React.ReactNode
    {
        if (theme === "light")
        {
            return(<MoonIcon/>);
        }
        
        return(<SunIcon/>);
    }
    
    
    function handleToggle(): void
    {
        toggleTheme();
        let mode: "dark mode" | "light mode";
        
        if (theme === "light")
        {
            mode = "dark mode";
        }
        else
        {
            mode = "light mode";
        }
        
        announce( `Theme swicthed to ${mode}`);
    }
    
    
    return(
        <>
        <button
            className="theme-toggler"
            type="button"
            onClick={handleToggle}
        >
            <span className="visually-hidden">
                Switch between light and dark mode
            </span>
            {getThemeIcon()}
        </button>
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
