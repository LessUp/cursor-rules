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
import { useRouter } from 'vitepress'

onMounted(() => {
  const router = useRouter()
  const lang = navigator.language || navigator.userLanguage
  const suffix = `${window.location.search}${window.location.hash}`
  if (lang.startsWith('zh')) {
    router.go(`/zh/${suffix}`)
  } else {
    router.go(`/en/${suffix}`)
  }
})
</script>
