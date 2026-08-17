<script setup lang="ts">
const route = useRoute()
const category = computed(() => decodeURIComponent(String(route.params.category)))
const page = parsePaginationPage(route.params.page)

if (page === null || page < 2) {
  throw createError({ statusCode: 404, message: '分类分页不存在' })
}
</script>

<template>
  <TaxonomyPostList type="category" :value="category" :page="page" />
</template>
