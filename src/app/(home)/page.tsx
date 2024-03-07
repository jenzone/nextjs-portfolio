import Hero from './section/hero'
import About from './section/about'
import Skills from './section/skills'
import Projects from './section/projects'
import Contact from './section/contact'

import NavBar from '@/components/navigation/nav-bar'
import Footer from '@/components/navigation/footer'
import { Container } from '@/components/ui/container'
import Particles from '@/libs/particles'

export default function Home() {
  return (
    <main>
      <section id="hero" className="relative">
        {/* <Particles /> */}
        <div className="relative">
          <Container>
            <NavBar />
            <Hero />
          </Container>
        </div>
      </section>
      <div className="bg-[var(--text-100)] text-[var(--bg-100)]">
        <Container>
          <section id="about" className="h-full min-h-screen">
            <About />
          </section>
          <section id="skills" className="h-full min-h-screen">
            <Skills />
          </section>
          <section id="projects" className="h-full min-h-screen">
            <Projects />
          </section>
          <section id="contact" className="h-full">
            <Contact />
          </section>
        </Container>
      </div>
      <Footer />
    </main>
  )
}
