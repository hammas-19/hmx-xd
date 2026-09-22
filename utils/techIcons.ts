export interface TechInfo {
  icon: string
  label: string
}

export const techIcons: Record<string, TechInfo> = {
  nuxt: { icon: 'lineicons:nuxt', label: 'Nuxt.js' },
  vuejs: { icon: 'mdi:vuejs', label: 'Vue.js' },
  next: { icon: 'file-icons:nextjs', label: 'Next.js' },
  react: { icon: 'ri:reactjs-fill', label: 'React.js' },
  gsap: { icon: 'simple-icons:gsap', label: 'GSAP' },
  framer: { icon: 'ph:framer-logo', label: 'Framer' },
  illustration: { icon: 'uil:illustration', label: 'Illustration' },
  html: { icon: 'iconoir:html5', label: 'HTML' },
  css: { icon: 'tdesign:css3', label: 'CSS' },
  github: { icon: 'lucide:github', label: 'GitHub' },
  lenis: { icon: 'carbon:smoothing-cursor', label: 'Lenis' },
  tailwind: { icon: 'flowbite:tailwind-solid', label: 'Tailwind CSS' },
  python: { icon: 'proicons:python', label: 'Python' },
  javascript: { icon: 'ri:javascript-fill', label: 'JavaScript' },
  netlify: { icon: 'teenyicons:netlify-solid', label: 'Netlify' },
}

export const getTechInfo = (techKey: string): TechInfo => {
  const normalizedKey = techKey.toLowerCase().trim()
  return (
    techIcons[normalizedKey] || {
      icon: 'carbon:code',
      label: techKey,
    }
  )
}
