import Hero from './section/hero'
import About from './section/about'
import Skills from './section/skills'

import NavBar from '@/components/navigation/nav-bar'
import { Container } from '@/components/ui/container'

export default function Home() {
  return (
    <main>
      <section>
        <Container>
          <NavBar />
          <Hero />
        </Container>
      </section>
      <div className="bg-[var(--text-100)] text-[var(--bg-100)]">
        <Container>
          <section id="about" className="h-full min-h-screen">
            <About />
          </section>
          <section id="skills" className="h-full min-h-screen">
            <Skills />
          </section>
          <section id="projects">Projects</section>
          <section id="contact">Contact</section>
        </Container>
      </div>
    </main>
  )
}
