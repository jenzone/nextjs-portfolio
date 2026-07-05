'use client'

import { useEffect, useRef } from 'react'

import Hero from './section/hero'
import About from './section/about'
import Skills from './section/skills'
import Projects from './section/projects'
import Contact from './section/contact'

import NavBar from '@/components/navigation/nav-bar'
import Footer from '@/components/navigation/footer'
import { Container } from '@/components/ui/container'
import BackgroundParticles from '@/components/bg-particles'
import { useLog } from '@/hooks/use-log'

// ─── Section Observer (logs when a section enters the viewport) ───────────────

function useSectionLogger(id: string, label: string) {
  const ref = useRef<HTMLElement>(null)
  const log = useLog()
  const logged = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          
          if (!logged.current) {
            timeoutRef.current = setTimeout(() => {
              log(`→ Navigated to ${label}`)
              logged.current = true
            }, 600)
          }
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
          logged.current = false
        }
      },
      { threshold: 0.45 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [id, label, log])

  return ref
}

export default function Home() {
  const log = useLog()
  const aboutRef = useSectionLogger('about', 'About')
  const skillsRef = useSectionLogger('skills', 'Skills')
  const projectsRef = useSectionLogger('projects', 'Projects')
  const contactRef = useSectionLogger('contact', 'Contact')

  useEffect(() => {
    log('✔ Portfolio loaded')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <BackgroundParticles />
      <section id="hero">
        <Container>
          <NavBar />
          <Hero />
        </Container>
      </section>
      <div className="bg-(--section-bg) text-(--section-text) transition-colors duration-300">
        <section
          id="about"
          ref={aboutRef}
          className="h-full min-h-screen bg-(--section-bg) transition-colors duration-300"
        >
          <Container>
            <About />
          </Container>
        </section>
        <section id="skills" ref={skillsRef} className="h-full min-h-screen">
          <Container>
            <Skills />
          </Container>
        </section>
        <section
          id="projects"
          ref={projectsRef}
          className="h-full min-h-screen bg-(--section-bg) transition-colors duration-300"
        >
          <Container>
            <Projects />
          </Container>
        </section>
        <section id="contact" ref={contactRef} className="h-full">
          <Container>
            <Contact />
          </Container>
        </section>
      </div>
      <div className="absolute w-full bg-(--background) transition-colors duration-300">
        <Footer />
      </div>
    </main>
  )
}
