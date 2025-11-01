<template>
  <section class="gallery-section">
    <PhotoGalleryFetcher />
  </section>
</template>

<script setup lang="ts">
import PhotoGalleryFetcher from '../../../../packages/shared-ui/src/components/PhotoGalleryFetcher.vue'
</script>

<style scoped>
.gallery-section {
  width: 100%;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
