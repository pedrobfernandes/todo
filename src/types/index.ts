export type Todo =
{
    id: number;
    title: string;
    isCompleted: boolean;
};


export type Render = "All" | "Active" | "Completed" | "Clear";


export type Theme = "light" | "dark";


export type ThemeConfig =
{
    theme: Theme;
    toggleTheme(): void;
};
