<template>
  <div>
    <MotionPointerFollower :size="40" color="#5757573b" :damping="10" :stiffness="100" shape="circle" />
    <TheNavbar />
    <main>
      <!-- Your page content -->
      <NuxtPage />
    </main>
  </div>
</template>