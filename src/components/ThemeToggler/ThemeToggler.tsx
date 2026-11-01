import { useTheme } from "../../hooks/useTheme.ts";
import "./ThemeToggler.scss"

export default function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
            <button className="theme-toggler" type="button" onClick={toggleTheme} aria-label="Toggle theme">
                <span className="theme-toggler__logo">{theme === "dark" ? "☀️" : "🌙"}</span>
                <span className="space"> </span>
                <span className="theme-toggler__title">{theme === "dark" ? "light theme" : "dark theme"}</span>
            </button>
    )
}