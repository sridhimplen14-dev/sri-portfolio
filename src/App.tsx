import { Hero } from './components/hero/Hero';
import { Skills } from './components/skills/Skills';
import { Experience } from './components/experience/Experience';
import { Projects } from './components/projects/Projects';
import { Credentials } from './components/credentials/Credentials';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';
import { SideNav } from './components/navigation/SideNav';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { usePointerGlow } from './hooks/usePointerGlow';

export default function App() {
  usePointerGlow();

  return (
    <div className="relative min-h-screen overflow-x-clip engineering-grid">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-orange focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <SideNav />

      <main className="main-with-nav">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
