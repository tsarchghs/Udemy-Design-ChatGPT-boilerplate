<template>
  <div>
    <HeaderBar />
    <HeroSection />
    <GallerySection />
    <PopularAreas />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '../../../../packages/shared-ui/src/components/HeaderBar.vue'
import HeroSection from '../components/HeroSection.vue'
import PopularAreas from '../../components/PopularAreas.vue'
import FooterSection from '../../components/FooterSection.vue'
import GallerySection from '../components/GallerySection.vue'
</script>

<style scoped>
/* === GLOBAL LAYOUT FIXES === */

/* Force full viewport width on all containers */
:deep(body),
:deep(html),
:deep(#app),
:deep(main),
:deep(.page),
:deep(.container),
:deep(.wrapper) {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  max-width: 100vw !important;
  overflow-x: hidden !important;
}

/* Make every homepage component span edge-to-edge */
:deep(.hero-section),
:deep(.gallery-section),
:deep(.popular-areas),
:deep(.footer-section),
:deep(.header-bar) {
  width: 100vw !important;
  max-width: 100vw !important;
  margin: 0 auto !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  border-radius: 0 !important;
  overflow: hidden;
}

/* Make hero fill viewport height */
:deep(.hero-section) {
  min-height: 100vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Fix header and footer to align flush with edges */
:deep(.header-bar) {
  width: 100vw !important;
  position: relative;
  left: 0;
  top: 0;
  background: transparent;
  z-index: 50;
}

:deep(.footer-section) {
  width: 100vw !important;
  background: #1c212e;
  margin-top: 0 !important;
  border-top: none;
}

/* Remove default margins from Nuxt or Tailwind containers */
:deep(.container),
:deep(.mx-auto),
:deep(.px-4),
:deep(.px-8) {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: 100% !important;
}

/* Ensure images or gallery elements fill columns properly */
:deep(.photo-card),
:deep(.gallery-item) {
  width: 100% !important;
  height: auto !important;
  background-size: cover !important;
  background-position: center !important;
  border-radius: 0 !important;
}

/* Remove white gutters that sometimes come from global Tailwind container rules */
:deep(.mx-auto) {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/* Make scrollbars hidden for clean demo look */
:deep(html),
:deep(body) {
  overflow-x: hidden !important;
}
</style>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>