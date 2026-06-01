<script setup lang="ts">
useThemePreferences()
</script>

<template>
  <div class="min-h-screen">
    <ReadingProgress />
    <AppHeader />
    <main class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
