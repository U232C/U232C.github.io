<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
}>()
</script>

<template>
  <figure class="my-8">
    <NuxtImg :src="src" :alt="alt || ''" class="w-full rounded-lg border border-line object-cover" sizes="sm:100vw md:768px lg:920px" />
    <figcaption v-if="alt" class="mt-2 text-center text-xs text-muted">{{ alt }}</figcaption>
  </figure>
</template>
