import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jensoncaparida.com',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://jensoncaparida.com/projects',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
