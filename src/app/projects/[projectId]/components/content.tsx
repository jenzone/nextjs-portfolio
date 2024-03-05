import Link from 'next/link'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components/ui/button'

interface ProjectContentProps {
  data: {
    id: string
    name: string
    description: string
    img: string
    techstack: string[]
    links: {
      github: string
      live: string
    }
    figma_link: string
  }
}

const ProjectContent: React.FC<ProjectContentProps> = ({ data }) => {
  return (
    <div className="space-y-8 py-20">
      <div className="flex">
        <Link href="/projects">
          <Button>
            <ChevronLeftIcon className="size-8" />
          </Button>
        </Link>
      </div>
      <h2 className="text-2xl font-semibold uppercase">{data.name}</h2>
      <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg border-2 border-[var(--primary-200)] bg-[var(--primary-200)] md:h-[500px] lg:px-36">
        <iframe
          src={data.figma_link}
          allowFullScreen
          className="h-full w-full rounded-md"
        />
      </div>
      <div className="space-y-4">
        <p>
          <span className="font-medium uppercase text-[var(--primary-200)]">
            Description:{' '}
          </span>
          {data.description}
        </p>
        <div className="flex space-x-4">
          <p>
            <span className="font-medium uppercase text-[var(--primary-200)]">
              Tech Stacks:{' '}
            </span>
            {data.techstack.join(', ')}
          </p>
        </div>
      </div>
      <div className="flex space-x-4">
        <Link href={data.links.live}>
          <Button variant="outline">
            <SiGithub className="mr-2 size-4" />
            Live Demo
          </Button>
        </Link>
        <Link href={data.links.github}>
          <Button>
            <SiGithub className="mr-2 size-4" />
            Source Code
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProjectContent
