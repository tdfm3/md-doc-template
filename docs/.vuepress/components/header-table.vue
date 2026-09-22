<template>
  <div class="page-info-table">
    <div class="page-info-row">
      <div class="label">概要</div>
      <div class="content">{{ page.frontmatter.description }}</div>
    </div>
    <div class="page-info-row">
      <div class="label">想定読了時間</div>
      <div class="content">{{ page.frontmatter.time }}</div>
    </div>
    <div class="page-info-row">
      <div class="label">前提知識・用語</div>
      <div class="content">{{ page.frontmatter.prior_knowledge }}</div>
    </div>
  </div>
</template>

<script setup>
import { usePageData } from '@vuepress/client'

const page = usePageData()
</script>

<style>
/* ダークモード対応 - テーブル罫線用カスタム色 */
:root {
  --table-border-color: #dee2e6;
}

html.dark {
  --table-border-color: #4a5568;
}
</style>

<style scoped>
.page-info-table {
  margin: 1rem 0 2rem 0;
  border: 2px solid var(--table-border-color);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: var(--c-bg-light);
}

.page-info-row {
  display: flex;
  border-bottom: 2px solid var(--table-border-color);
}

.page-info-row:last-child {
  border-bottom: none;
}

.label {
  background: var(--c-bg-lighter);
  font-weight: 600;
  width: 30%;
  flex-shrink: 0;
  color: var(--c-text);
  text-align: left;
  padding: 0.75rem 1rem;
  border-right: 2px solid var(--table-border-color);
}

.content {
  background: var(--c-bg);
  color: var(--c-text);
  flex: 1;
  padding: 0.75rem 1rem;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .page-info-row {
    flex-direction: column;
  }

  .label {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--table-border-color);
    padding-bottom: 0.25rem;
  }

  .content {
    padding-top: 0.25rem;
  }
}
</style>
