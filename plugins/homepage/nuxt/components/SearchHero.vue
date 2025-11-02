<template>
  <section class="search-hero">
    <div class="hero-content">
      <div class="titles">
        <h2 class="city-title">{{ city }}</h2>
        <p class="subtitle">
          Royalty-free photos and videos of {{ city }}.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ city: string }>()
</script>

<style scoped>
.search-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 64px 32px;
  gap: 10px;
  position: relative;
  height: 211px;
  width: 100%;
  background: #f1f5f9;
  margin-top: 120px; /* header height offset */
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 676px;
}

.titles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.city-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 39px;
  line-height: 47px;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #64748b;
}
/* === Responsive & Flow Fix === */
.search-hero {
  position: static;            /* remove absolute */
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 0;               /* handled by header naturally */
  height: auto;
  padding: 48px 24px;
}

.hero-content {
  width: 100%;
  max-width: 720px;
}

.city-title {
  font-size: clamp(28px, 5vw, 39px);
  line-height: 1.2;
}

.subtitle {
  font-size: clamp(16px, 3.5vw, 20px);
  line-height: 1.4;
}

</style>
