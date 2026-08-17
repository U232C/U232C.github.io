<script setup lang="ts">
const route = useRoute()
const tag = computed(() => decodeURIComponent(String(route.params.tag)))
</script>

<template>
  <TaxonomyPostList type="tag" :value="tag" :page="1" />
</template>
