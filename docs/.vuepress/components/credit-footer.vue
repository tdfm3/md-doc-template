<template>
  <div class="credit-footer">
    <hr>
    <span>{{ frontmatter.footer }}</span>
  </div>
</template>

<script setup>
import { usePageFrontmatter } from '@vuepress/client'

const frontmatter = usePageFrontmatter()
</script>

<style scoped>
.credit-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--c-border);
}

.credit-footer span {
  color: var(--c-text-lighter);
  font-size: 0.9rem;
}
</style>
