import Hero from './section/hero'
import About from './section/about'
import Skills from './section/skills'
import Projects from './section/projects'
import Contact from './section/contact'

import NavBar from '@/components/navigation/nav-bar'
import Footer from '@/components/navigation/footer'
import { Container } from '@/components/ui/container'
import BackgroundParticles from '@/components/bg-particles'

export default function Home() {
  return (
    <main>
      <BackgroundParticles />
      <section id="hero">
        <Container>
          <NavBar />
          <Hero />
        </Container>
      </section>
      <div className="bg-[var(--text-100)] text-[var(--bg-100)]">
        <section
          id="about"
          className="h-full min-h-screen bg-[var(--text-100)]"
        >
          <Container>
            <About />
          </Container>
        </section>
        <section id="skills" className="h-full min-h-screen">
          <Container>
            <Skills />
          </Container>
        </section>
        <section
          id="projects"
          className="h-full min-h-screen bg-[var(--text-100)]"
        >
          <Container>
            <Projects />
          </Container>
        </section>
        <section id="contact" className="h-full">
          <Container>
            <Contact />
          </Container>
        </section>
      </div>
      <div className="absolute w-full bg-[var(--bg-100)]">
        <Footer />
      </div>
    </main>
  )
}
