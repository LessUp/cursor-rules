<script setup lang="ts">
defineProps<{ name: string; size?: number }>()
</script>

<template>
  <!-- philosophy -->
  <svg v-if="name === 'philosophy'" :width="size ?? 32" :height="size ?? 32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
    <circle cx="32" cy="30" r="13" stroke="currentColor" stroke-width="2.5"/>
    <line x1="32" y1="17" x2="32" y2="43" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M22 35C24.6 32.4 28.09 31 32 31C35.91 31 39.4 32.4 42 35" stroke="currentColor" stroke-opacity="0.55" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="24" y1="48" x2="40" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>

  <!-- pathways -->
  <svg v-else-if="name === 'pathways'" :width="size ?? 32" :height="size ?? 32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
    <path d="M12 20 C18 20 24 14 30 14 C36 14 42 26 48 26 C54 26 58 22 60 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <circle cx="14" cy="20" r="3.5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>
    <circle cx="32" cy="14" r="3.5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>
    <circle cx="50" cy="26" r="3.5" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2"/>
    <path d="M20 44 L32 36 L44 44 L38 52 L26 52 Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
    <line x1="32" y1="36" x2="32" y2="52" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round"/>
  </svg>

  <!-- languages -->
  <svg v-else-if="name === 'languages'" :width="size ?? 32" :height="size ?? 32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
    <rect x="8" y="10" width="22" height="18" rx="4" stroke="currentColor" stroke-width="2.5"/>
    <rect x="34" y="10" width="22" height="18" rx="4" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
    <path d="M12 20h14M12 15h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 20h14M38 15h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.55"/>
    <rect x="8" y="36" width="48" height="18" rx="4" stroke="currentColor" stroke-width="2.5"/>
    <path d="M14 46h12M30 46h6M40 46h10M14 42h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.65"/>
  </svg>

  <!-- engineering -->
  <svg v-else-if="name === 'engineering'" :width="size ?? 32" :height="size ?? 32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
    <rect x="8" y="10" width="48" height="36" rx="5" stroke="currentColor" stroke-width="2.5"/>
    <rect x="14" y="16" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" stroke-opacity="0.6"/>
    <line x1="38" y1="20" x2="50" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.55"/>
    <line x1="38" y1="25" x2="46" y2="25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.55"/>
    <line x1="14" y1="34" x2="50" y2="34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-opacity="0.4"/>
    <path d="M28 46 L28 54 M36 46 L36 54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="22" y1="54" x2="42" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>

  <!-- resources -->
  <svg v-else-if="name === 'resources'" :width="size ?? 32" :height="size ?? 32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
    <path d="M14 14 L32 10 L50 14 L50 38 C50 46 32 54 32 54 C32 54 14 46 14 38 Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
    <path d="M23 32 L29 38 L41 26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <!-- fallback: solid circle -->
  <svg v-else :width="size ?? 32" :height="size ?? 32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
    <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2.5"/>
  </svg>
</template>

<style scoped>
.svg-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}
</style>
