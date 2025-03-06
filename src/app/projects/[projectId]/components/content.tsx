import Link from 'next/link'
import Image from 'next/image'

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
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold uppercase">{data.name}</div>
        <Link href="/projects">
          <Button className="space-x-4 text-sm">
            <ChevronLeftIcon className="mr-2 size-4" />
            <span className="hidden lg:block">Back to projects</span>
          </Button>
        </Link>
      </div>
      <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg border-2 border-[var(--primary)] bg-[var(--primary)] md:h-[500px] lg:px-36">
        {/* <iframe
          src={data.figma_link}
          allowFullScreen
          className="h-full w-full rounded-md"
        /> */}
        <Image
          src={`/projects/${data.img}`}
          alt={data.name + ' Image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className="object-contain"
        />
      </div>
      <div className="space-y-4">
        <div>
          <span className="font-medium uppercase text-[var(--primary-light)]">
            Description:{' '}
          </span>
          {data.description}
        </div>
        <div className="flex space-x-4">
          <div>
            <span className="font-medium uppercase text-[var(--primary-light)]">
              Tech Stacks:{' '}
            </span>
            {data.techstack.join(', ')}
          </div>
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
