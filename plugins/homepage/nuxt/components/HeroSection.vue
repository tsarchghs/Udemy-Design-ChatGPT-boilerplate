<template>
  <section class="hero">
    <div class="hero-overlay">
      <div class="hero-content">
        <!-- Titles -->
        <div class="hero-titles">
          <h1 class="hero-title">Beautiful aerial stock photography and video</h1>
          <p class="hero-subtitle">
            Royalty-free photos and videos sorted by geographic location.
          </p>
        </div>

        <!-- Search bar -->
        <div class="hero-search">
          <div class="hero-dropdown">
            <span>All</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Replace input with shared ProductSearchInput -->
          <ProductSearchInput
            placeholder="Search a location"
            class="flex-1"
          />

          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-4.35-4.35m1.15-5.4A7 7 0 1110.4 4.35a7 7 0 017.4 7.4z" />
          </svg>
        </div>

        <!-- Location tags -->
        <div class="hero-tags">
          <span class="tag">Sydney</span>
          <span class="tag">Brisbane</span>
          <span class="tag">Melbourne</span>
          <span class="tag">Adelaide</span>
          <span class="tag">...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductSearchInput from '../../../../packages/shared-ui/src/components/ProductSearchInput.vue'
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

.hero {
  width: 100%;
  height: 600px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/Sydney.jpg') center/cover no-repeat;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 0; /* vertically centers the text nicely */
}


.hero-overlay {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  margin-top: 80px;
}

.hero-titles {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 58px;
  letter-spacing: -0.04em;
  max-width: 600px;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 26px;
  color: #ffffff;
  max-width: 560px;
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f1f5f9;
  border-radius: 4px;
  padding-right: 12px;
  width: 100%;
  max-width: 676px;
  height: 44px;
}

.hero-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border-radius: 4px;
  padding: 0 12px;
  height: 100%;
  color: #000;
  font-size: 14px;
}

.icon {
  width: 16px;
  height: 16px;
  stroke: #64748b;
}

.search-icon {
  width: 20px;
  height: 20px;
  stroke: #64748b;
}

.hero-tags {
  display: flex;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.tag {
  background: #f8fafc;
  border-radius: 50px;
  padding: 4px 12px;
  font-weight: 700;
  font-size: 12px;
  color: #000;
}
</style>
