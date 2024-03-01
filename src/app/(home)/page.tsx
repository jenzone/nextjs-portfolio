import Hero from './section/hero'

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
      <section id="projects">Projects</section>
      <section id="skills">Skills</section>
      <section id="about">About</section>
      <section id="contact">Contact</section>
    </main>
  )
}
