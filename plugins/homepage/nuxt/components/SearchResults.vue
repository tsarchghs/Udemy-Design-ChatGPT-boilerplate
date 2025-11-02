<template>
  <section class="results-section">
    <div class="left">
      <div class="column" v-for="col in [0,1]" :key="col">
        <div
          class="image-box"
          v-for="(photo, idx) in columnData(col)"
          :key="idx"
        >
          <img :src="photo.imageUrl" :alt="photo.title" class="photo" />
        </div>
      </div>
    </div>

        <div class="right">
        <SearchMap :photos="photosWithCoords" />
        </div>
  </section>
</template>

<script setup lang="ts">
import SearchMap from './SearchMap.client.vue'

const props = defineProps<{ photos: any[] }>()

// Demo coordinate generator if backend lacks lat/lng
const photosWithCoords = computed(() =>
  props.photos.map((p) => ({
    ...p,
    lat: -33.86 + Math.random() * 5,
    lng: 151.20 + Math.random() * 5
  }))
)

function columnData(col: number) {
  // split photos into two columns evenly
  return props.photos.filter((_, i) => i % 2 === col)
}

</script>

<style scoped>
.results-section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  width: 100%;
  min-height: 1600px;
  padding: 0;
  margin-top: 20px;
}

.left {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 64px 32px;
  gap: 20px;
  flex: 0 0 964px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 445px;
}

.image-box {
  width: 100%;
  height: 353px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  flex: 1;
  padding: 0 0 0 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.map-box {
  width: 455px;
  height: 1600px;
  box-shadow: inset 4px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.map-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* === Responsive & Flow Fix === */
.results-section {
  position: static;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 24px;
  gap: 32px;
  min-height: auto;
}

.left {
  flex: 1 1 60%;
  padding: 0;
  gap: 24px;
  justify-content: center;
}

.right {
  flex: 1 1 35%;
  padding: 0;
  justify-content: center;
}

.column {
  width: 100%;
  max-width: 445px;
}

.image-box {
  height: auto;
  aspect-ratio: 4 / 3; /* keeps image proportions */
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Stack vertically on mobile */
@media (max-width: 1024px) {
  .results-section {
    flex-direction: column;
  }
  .left, .right {
    width: 100%;
  }
  .right {
    order: -1; /* map above images if desired */
  }
  .map-box {
    width: 100%;
    height: 300px;
  }
}

</style>
