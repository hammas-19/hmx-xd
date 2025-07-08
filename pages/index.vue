<template>
  <div>
    <HomeHero />
    <HomeLatestWork :projects="projects" />
    <HomeAbout />
    <HomeConnectBtn />
    <!-- <TestComp /> -->
  </div>
</template>
<script setup>
const projects = [
  {
    name: 'Rechik',
    logo: '/home/Rechik_Mascot_lite.webp',
    description: ' An E-commerce Wardrobe Store that specializes in providing a wide range of clothing and accessories.Developed using  Nuxt 3,  Tailwind CSS and  Django',
    achievements: ['in out', 'grou', 'Lod'],
    images: ['/projects/rechik2.jpg', '/projects/rechik2.jpg', '/projects/rechik1.jpg', '/projects/rechik1.jpg'],
    vuejs: true,
    javascript: true,
    nuxt: true,
    illustration: true,
    netlify: true,
    github: true,
    python: true,
    tailwind: true,
  },
  {
    name: 'Job Portal',
    logo: '/projects/jobPortal.webp',
    description: 'Connect with AL NAFI TALENT Find Internships, Jobs & Career Opportunities The official job portal for Al Nafi, connecting students, alumni, and employers.',
    achievements: ['in out', 'grou', 'Lod'],
    vuejs: true,
    javascript: true,
    nuxt: true,
    illustration: false,
    netlify: false,
    github: true,
    python: true,
    tailwind: true,
  }
]
</script>