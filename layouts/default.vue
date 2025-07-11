<template>
  <div>
    <MotionPointerFollower :size="30" color="#5757573b" :damping="11" :stiffness="100" shape="circle" />
    <main>
      <!-- Your page content -->
      <NuxtPage />
    </main>
  </div>
</template>
