<script setup lang="ts">
const route = useRoute()
const tag = computed(() => decodeURIComponent(String(route.params.tag)))
const page = parsePaginationPage(route.params.page)

if (page === null || page < 2) {
  throw createError({ statusCode: 404, message: '标签分页不存在' })
}
</script>

<template>
  <TaxonomyPostList type="tag" :value="tag" :page="page" />
</template>
