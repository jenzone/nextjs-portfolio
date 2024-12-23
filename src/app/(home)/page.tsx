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
      <div className="bg-[var(--foreground)] text-[var(--background)]">
        <section
          id="about"
          className="h-full min-h-screen bg-[var(--foreground)]"
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
          className="h-full min-h-screen bg-[var(--foreground)]"
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
      <div className="absolute w-full bg-[var(--background)]">
        <Footer />
      </div>
    </main>
  )
}
