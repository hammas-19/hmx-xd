<template>
  <div>
    <MotionPointerFollower :size="30" color="#5757573b" :damping="10" :stiffness="100" shape="circle" />
    <TheNavbar />
    <main>
      <!-- Your page content -->
      <NuxtPage />
    </main>
  </div>
</template>
<script setup>
onMounted(() => {
  // Hide default cursor
  document.body.classList.add('no-default-cursor')
})

onUnmounted(() => {
  // Restore default cursor when component unmounts
  document.body.classList.remove('no-default-cursor')
})
</script>

<style>
/* Global cursor hiding */
.no-default-cursor,
.no-default-cursor * {
  cursor: none !important;
}

/* Keep text cursor for input fields */
.no-default-cursor input[type="text"],
.no-default-cursor input[type="email"],
.no-default-cursor input[type="password"],
.no-default-cursor input[type="search"],
.no-default-cursor textarea {
  cursor: text !important;
}

/* Optional: Add cursor classes for special cases */
.force-default-cursor {
  cursor: auto !important;
}

.force-pointer-cursor {
  cursor: pointer !important;
}
</style>