import { useThemeStore } from "../store/useThemeStore";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    );
};

export default ThemeToggle;