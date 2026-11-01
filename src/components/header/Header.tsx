import "./Header.scss"
import ThemeToggler from "../ThemeToggler/ThemeToggler.tsx";

function Header() {
    return (
        <header className="header">
            <nav className="header__nav">
                <div className="brand">
                    <img className="brand__logo" src="logo.png" alt="" />
                    <span className="brand__name">Said</span>
                    <span className="brand__zone">.dev</span>
                </div>
            </nav>

            <ThemeToggler title="clickMe!" />
        </header>
    )
}

export default Header;