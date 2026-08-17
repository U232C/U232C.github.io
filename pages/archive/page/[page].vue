<script setup lang="ts">
const route = useRoute()
const page = parsePaginationPage(route.params.page)

if (page === null || page < 2) {
  throw createError({ statusCode: 404, message: '归档分页不存在' })
}
</script>

<template>
  <ArchivePostList :page="page" />
</template>
