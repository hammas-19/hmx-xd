<template>
  <div>
    <MotionPointerFollower :size="20" color="#ff0088" :damping="10" :stiffness="100" shape="rounded" />
    <TheNavbar />
    <main>
      <!-- Your page content -->
      <NuxtPage />
    </main>
  </div>
</template>