---
layout: home
hero:
  name: Cursor Rules
  text: ' '
  actions:
    - theme: brand
      text: 简体中文
      link: /zh/
    - theme: alt
      text: English
      link: /en/
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  const lang = navigator.language || navigator.userLanguage
  const suffix = `${window.location.search}${window.location.hash}`
  const target = lang.startsWith('zh') ? withBase('/zh/') : withBase('/en/')
  window.location.replace(`${target}${suffix}`)
})
</script>
