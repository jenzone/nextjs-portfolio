import NavBar from '@/components/navigation/nav-bar'
import { Container } from '@/components/ui/container'
import ProjectContent from './components/content'

import projects from '@/data/projects.json'

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const project = projects.find((project) => project.id === projectId)

  if (!project) {
    return (
      <main>
        <Container>
          <NavBar />
        </Container>
        <div className="flex h-100 flex-col items-center justify-center space-y-2 py-20">
          <div className="text-4xl font-bold">🔍 Project not found.</div>
          <div className="text-sm font-light">
            This project is not existing.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-full min-h-screen">
      <Container>
        <NavBar />
      </Container>
      <Container>
        <ProjectContent data={project} />
      </Container>
    </main>
  )
}
