<template>
  <div>
    <TheNavbar>
      <template #work>
        <NuxtLink to="#work">
          Work
        </NuxtLink>
      </template>
      <template #about>
        <NuxtLink to="#about">
          About
        </NuxtLink>
      </template>
      <template #flow>
        <NuxtLink to="#about">
          Flow
        </NuxtLink>
      </template>
      <template #connect>
        <NuxtLink to="#connect">
          Connect
        </NuxtLink>
      </template>
    </TheNavbar>
    <HomeHero />
    <div id="work">
      <HomeLatestWork :projects="projects" />
    </div>
    <div id="about">
      <HomeAbout />
    </div>
    <div id="connect">
      <TheFooter />
    </div>
  </div>
</template>
<script setup>
const projects = [
  {
    name: 'Ranked Designs',
    logo: '/projects/rankedDesigns/logo.webp',
    description: 'Ranked Designs delivers top-quality services with a team of experts who know how to make your brand stand out. We use the best tools and strategies to create solutions that are affordable, effective, and tailored to your needs. From websites to marketing materials, we handle everything to save you time and effort.',
    achievements: ['Creative Design', 'Animations', 'Solo Development', 'Short Deadline Success'],
    images: [
      '/projects/rankedDesigns/1.jpg',
      '/projects/rankedDesigns/2.jpg',
      '/projects/rankedDesigns/3.jpg',
      '/projects/rankedDesigns/4.jpg',
      '/projects/rankedDesigns/5.jpg',
      '/projects/rankedDesigns/6.jpg'
    ],
    javascript: true,
    netlify: true,
    github: true,
    html: true,
    css: true,
    tailwind: true,
    type: 'Portfolio',
    status: 'Completed',
    duration: '10 Days',
    link: 'https://rankeddesigns.com/',
  },
  {
    name: 'Job Portal',
    logo: '/projects/jobPortal/jobPortal.webp',
    description: ' Al Nafi Job Portal is a project of Al Nafi International College, designed to bridge the gap between employers and students or job candidates. It provides a seamless platform where employers can find skilled talent, and students or candidates can discover meaningful job and internship opportunities. The portal aims to simplify the recruitment process by connecting the right people with the right opportunities efficiently.',
    achievements: ['PWA', 'Microservice Architecture', 'Cross-team Collaboration', 'Short Deadline Success'],
    images: [
      '/projects/jobPortal/1.jpg',
      '/projects/jobPortal/3.jpg',
      '/projects/jobPortal/4.jpg',
      '/projects/jobPortal/6.jpg',
      '/projects/jobPortal/7.jpg',
      '/projects/jobPortal/2.jpg'
    ],
    vuejs: true,
    javascript: true,
    nuxt: true,
    illustration: false,
    github: true,
    tailwind: true,
    python: true,
    type: 'Progressive Web App',
    status: 'On stage',
    duration: '45 Days',
    link: 'https://stage-jobportal.alnafi.com/',
  },
  {
    name: 'College',
    logo: '/projects/islamicCollege/islamicCollegeLogo.svg',
    description: ' Al Nafi Islamic College is an educational institution dedicated to producing the next generation of traditionally trained scholars and leaders. Our mission is to serve as a leading model for traditional Islamic education globally through a balanced blend of spiritual training and academic studies. We empower our youth to grow into scholarly, self-sufficient, and spiritually grounded leaders who excel both in their faith and in the modern professional world. In addition to our classical Islamic studies, we teach our scholars the worldly skills necessary to excel in professional environments. Our dual-track system integrates modern qualifications, ensuring that our graduates are as capable in the workplace as they are in their spiritual endeavors.',
    achievements: ['PWA', 'Microservice Architecture', 'Cross-team Collaboration', 'Complex designing'],
    images: [
      '/projects/islamicCollege/1.jpg',
      '/projects/islamicCollege/2.jpg',
      '/projects/islamicCollege/3.jpg',
      '/projects/islamicCollege/4.jpg',
      '/projects/islamicCollege/5.jpg',
      '/projects/islamicCollege/6.jpg'
    ],
    vuejs: true,
    javascript: true,
    nuxt: true,
    illustration: false,
    github: true,
    tailwind: true,
    python: true,
    type: 'E-Learning',
    status: 'On stage',
    duration: '25 Days',
    link: 'https://stage-islamic.alnafi.com/',
  },
  {
    name: 'Rechik',
    logo: '/projects/rechik/Logo-Dark.png',
    description: ' More than just a clothing brand, we stand for fairness, inclusivity, and value. Every piece we create reflects our dedication to providing fashion that embodies sophistication without compromise.',
    achievements: ['E-Commerce', 'Microservice Architecture', 'Solo Development'],
    images: [
      '/projects/rechik/1.jpg',
      '/projects/rechik/2.jpg',
      '/projects/rechik/3.jpg',
      '/projects/rechik/4.jpg',
      // '/projects/rechik/5.jpg',
      // '/projects/rechik/6.jpg'
    ],
    vuejs: true,
    javascript: true,
    nuxt: true,
    netlify: true,
    illustration: true,
    github: true,
    tailwind: true,
    python: true,
    type: 'E-Commerce',
    status: 'Completed',
    duration: '20 Days',
    link: 'https://rechik.pk/',
  }
]
</script>
<style scoped>
 .smooth-scroll {
   scroll-behavior: smooth;
 }
</style>