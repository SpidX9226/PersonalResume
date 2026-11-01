import Header from "./components/header/Header.tsx";
import About from "./sections/About/About.tsx";
import Contacts from "./sections/Contacts/Contacts.tsx";
import HeroAnimated from "./sections/HeroAnimated/HeroAnimated.tsx";
import Projects from "./sections/Projects/Projects.tsx";
import Sidebar from "./sections/Sidebar/Sidebar.tsx";
import Skills from "./sections/Skills/Skills.tsx";
import "./styles/global.scss";
import Experience from "./sections/Experience/Experience.tsx";

function App() {
  return (
    <>
        <Header />
        <Sidebar />
        <main>
            <HeroAnimated />

            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contacts />
        </main>
    </>
  );
}

export default App