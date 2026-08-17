<script setup lang="ts">
const route = useRoute()
const category = computed(() => decodeURIComponent(String(route.params.category)))
</script>

<template>
  <TaxonomyPostList type="category" :value="category" :page="1" />
</template>
