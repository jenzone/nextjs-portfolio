import { Container } from '@/components/ui/container'
import NavBar from '@/components/navigation/nav-bar'

import ProjectContent from './components/content'

export default function ProjectPage() {
  return (
    <main className="h-full min-h-screen">
      <Container>
        <NavBar />
      </Container>
      <Container>
        <ProjectContent />
      </Container>
    </main>
  )
}
