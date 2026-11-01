import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(
            (currentTheme: string) =>
            currentTheme === "dark" ? "light" : "dark"
        );
    }

    return { theme, toggleTheme };
}