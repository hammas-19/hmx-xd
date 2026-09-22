export type ProjectCategory = 'completed' | 'in-progress' | 'drafted' | 'playground'

export interface Project {
  slug: string
  name: string
  logo?: string
  description: string
  category: ProjectCategory
  achievements?: string[]
  images?: string[]
  technologies?: string[]
  type?: string
  status?: string
  duration?: string
  link?: string
  [key: string]: any
}

export interface CategoryOption {
  id: 'all' | ProjectCategory
  label: string
}

export const projectCategories: CategoryOption[] = [
  { id: 'all', label: 'All' },
  { id: 'completed', label: 'Completed' },
  { id: 'in-progress', label: 'In-progress' },
  { id: 'drafted', label: 'Drafted' },
  { id: 'playground', label: 'Playground' },
]

export const orderedSlugs = [
  'esa-crew',
  'agency-demo',
  'gec-pathways',
  'codes-hawk',
  'college',
  'gec-drafted',
  'mr-tech-labs',
  'ranked-designs',
  'job-portal',
  'art-agency',
  'rechik',
]

export const useProjects = () => {
  // Automatically loads all JSON project files in data/projects/
  const jsonModules = import.meta.glob<Project | { default: Project }>('../data/projects/*.json', {
    eager: true,
  })

  const rawProjects: Project[] = Object.values(jsonModules).map((mod: any) => mod.default || mod)

  const allProjects: Project[] = [...rawProjects].sort((a, b) => {
    const indexA = orderedSlugs.indexOf(a.slug)
    const indexB = orderedSlugs.indexOf(b.slug)
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return (a.name || '').localeCompare(b.name || '')
  })

  const getProjectBySlug = (slug: string): Project | undefined => {
    return allProjects.find((p) => p.slug === slug)
  }

  const getProjectsByCategory = (category: 'all' | ProjectCategory): Project[] => {
    if (category === 'all') return allProjects
    return allProjects.filter((p) => p.category === category)
  }

  return {
    allProjects,
    categories: projectCategories,
    getProjectBySlug,
    getProjectsByCategory,
  }
}
