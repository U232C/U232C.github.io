<script setup lang="ts">
const { data: page } = await useAsyncData('about-page', () => queryCollection('pages').path('/pages/about').first())

useSeoMeta({
  title: '关于 | U232C Blog',
  description: page.value?.description || '关于 U232C Blog。'
})
</script>

<template>
  <article class="mx-auto max-w-4xl rounded-lg border border-line/70 bg-panel p-5 sm:p-8">
    <ContentRenderer v-if="page" class="content-prose" :value="page" />
  </article>
</template>
