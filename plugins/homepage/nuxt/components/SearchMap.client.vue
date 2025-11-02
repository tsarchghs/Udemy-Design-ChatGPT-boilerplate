<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// ⛔️ Important: import leaflet only inside onMounted (so window exists)
let L: any
const mapContainer = ref<HTMLElement | null>(null)
let map: any = null

const props = defineProps<{
  photos: Array<{ title?: string; imageUrl?: string; lat?: number; lng?: number }>
}>()

onMounted(async () => {
  // Dynamically import leaflet only in browser
  const leaflet = await import('leaflet')
  L = leaflet.default || leaflet
  await import('leaflet/dist/leaflet.css')

  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([-33.8688, 151.2093], 4)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Add photo markers
  watch(
    () => props.photos,
    (list) => {
      if (!map) return
      // Remove previous markers (keep tile layer)
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) return
        map.removeLayer(layer)
      })
      list.forEach((p) => {
        if (!p.lat || !p.lng) return
        const icon = L.divIcon({
          className: 'photo-marker',
          html: `<div class="thumb" style="background-image:url(${p.imageUrl})"></div>`
        })
        L.marker([p.lat, p.lng], { icon }).addTo(map)
          .bindPopup(`<b>${p.title || 'Untitled'}</b>`)
      })
    },
    { immediate: true }
  )
})
</script>

<style scoped>
.map-container {
  width: 100%;
  max-width: 100vw; /* ✅ Prevents overshoot */
  height: 60vh;
  min-height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  position: relative; /* fixes leaflet absolute child issues */
}


/* Marker thumbnails */
.photo-marker .thumb {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

/* === 📱 Responsive Breakpoints === */

/* 🟢 Large desktop (≥1440px) */
@media (min-width: 1440px) {
  .map-container {
    height: 50vh; /* slightly shorter for wide monitors */
    max-height: 700px;
  }
}

/* 🟠 Standard desktop (1024–1439px) */
@media (max-width: 1439px) and (min-width: 1024px) {
  .map-container {
    height: 480px;
  }
}

/* 🟡 Tablet landscape / medium screens (768–1023px) */
@media (max-width: 1023px) and (min-width: 768px) {
  .map-container {
    height: 400px;
    margin-top: 8px;
  }
  .photo-marker .thumb {
    width: 34px;
    height: 34px;
  }
}

/* 🔵 Tablet portrait / small laptops (600–767px) */
@media (max-width: 767px) and (min-width: 600px) {
  .map-container {
    height: 350px;
    border-radius: 6px;
  }
  .photo-marker .thumb {
    width: 30px;
    height: 30px;
  }
}

/* 🟣 Mobile phones (≤599px) */
@media (max-width: 599px) {
  .map-container {
    height: 300px;
    border-radius: 0; /* edge-to-edge for mobile */
  }
  .photo-marker .thumb {
    width: 28px;
    height: 28px;
  }
}

/* 🔴 Extra-small (≤400px) */
@media (max-width: 400px) {
  .map-container {
    height: 240px;
  }
  .photo-marker .thumb {
    width: 24px;
    height: 24px;
  }
}

</style>
