import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Involvement from "./sections/Involvement";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F8F8F6] text-[#111111] transition-colors duration-200 dark:bg-[#111111] dark:text-[#F5F5F5]">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Involvement />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}