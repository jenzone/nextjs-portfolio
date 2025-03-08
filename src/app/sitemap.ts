import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jensoncaparida.me',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://jensoncaparida.me/projects',
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
