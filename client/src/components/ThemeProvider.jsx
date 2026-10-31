import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeProvider = ({ children }) => {
    const theme = useThemeStore((state) => state.theme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return children;
};

export default ThemeProvider;