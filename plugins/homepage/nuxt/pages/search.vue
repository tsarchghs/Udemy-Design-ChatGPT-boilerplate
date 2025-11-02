<template>
  <div>
      <div class="top-area">

    <HeaderBar /> <!-- ✅ shared header -->
    <SearchFilters/>
        </div>
    <SearchHero :city="query || 'Australia'" />
    <SearchResults :photos="photos" />
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '../../../../packages/shared-ui/src/components/HeaderBar.vue'
import SearchFilters from '../components/SearchFilters.vue'
import SearchHero from '../components/SearchHero.vue'
import SearchResults from '../components/SearchResults.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = ref('')
const photos = ref<any[]>([])
const loading = ref(false)

async function fetchPhotos(q: string) {
  if (!q) return
  loading.value = true
  try {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    const res = await fetch(`${apiBase}/api/marketplace/photos?q=${encodeURIComponent(q)}`)
    photos.value = await res.json()
  } catch (err) {
    console.error('❌ Failed to fetch photos', err)
  } finally {
    loading.value = false
  }
}
watch(
  () => route.query.q,
  (newQ) => {
    query.value = (newQ as string) || ''
    if (query.value) fetchPhotos(query.value)
  },
  { immediate: true }
)
onMounted(async () => {
  query.value = (route.query.q as string) || ''
  if (!query.value) return

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const res = await fetchPhotos(query.value);
  photos.value = await res.json()
})
</script>
<style scoped>
/* === Combined sticky top area === */
.top-area {
  position: sticky;
  top: 0;
  z-index: 100; /* ensure it’s above content */
  background: #fff; /* unify header + filters background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

/* Ensure header and filters flow together with no overlap */
.header-bar {
  position: static !important; /* disable fixed */
  border-bottom: 1px solid #f1f5f9;
  box-shadow: none;
}

.filters-bar {
  position: static;
  border-bottom: 1px solid #e2e8f0;
  z-index: 10;
}

/* Responsive padding below sticky top */
.search-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #fff;
}

/* Remove extra gap between filters and hero */
.top-area {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 0; /* 👈 ensure no gap below */
}

/* Prevent header or filters from adding bottom padding */
.header-bar,
.filters-bar {
  margin: 0;
  padding-bottom: 0;
}

/* Hero starts immediately after filters */
.search-hero {
  margin-top: 0;
  padding-top: 32px; /* just enough breathing room */
}
/* 🌐 Responsive Layout Adjustments */

/* ========== Tablet (≤1024px) ========== */
@media (max-width: 1024px) {
  .top-area {
    box-shadow: none; /* simplify shadows on mobile */
  }

  .header-bar {
    flex-wrap: wrap;
    padding: 12px 16px;
    gap: 12px;
  }

  .filters-bar {
    flex-wrap: wrap;
    padding: 8px 16px;
    gap: 12px;
    border-bottom: 1px solid #e2e8f0;
  }

  .search-hero {
    padding-top: 24px;
    padding-bottom: 16px;
  }
}

/* ========== Mobile (≤768px) ========== */
@media (max-width: 768px) {
  /* Stack header and search cleanly */
  .header-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 14px;
    height: auto;
  }

  /* Make header links wrap or hide extras */
  .header-bar .actions,
  .header-bar .links {
    flex-wrap: wrap;
    gap: 8px;
  }

  /* Make search input full-width */
  .header-bar .search {
    width: 100%;
    order: 3;
    margin-top: 8px;
  }

  /* Filters bar stacks too */
  .filters-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 14px;
    gap: 8px;
  }

  /* Hero text scales down */
  .search-hero {
    padding: 16px;
    text-align: left;
  }
  .search-hero h2 {
    font-size: clamp(20px, 5vw, 28px);
  }
  .search-hero p {
    font-size: 14px;
    line-height: 1.5;
  }

  /* Gallery spacing */
  .results-section {
    padding: 16px;
    flex-direction: column;
    gap: 20px;
  }

  /* Map area moves below images */
  .results-section .right {
    order: 2;
    width: 100%;
  }

  .results-section .left {
    width: 100%;
  }
}

/* ========== Small Phones (≤480px) ========== */
@media (max-width: 480px) {
  .header-bar {
    padding: 8px 10px;
    gap: 8px;
  }

  .header-bar .logo {
    font-size: 18px;
  }

  .filters-bar {
    padding: 8px 10px;
    gap: 6px;
  }

  .search-hero {
    padding: 12px;
  }

  .search-hero h2 {
    font-size: 20px;
  }

  .search-hero p {
    font-size: 13px;
  }

  .results-section {
    padding: 12px;
  }
}
.top-area {
  position: relative; /* not sticky */
  z-index: auto;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.search-map {
  margin-top: 24px;
}
</style>
<style>
html,
body {
  margin: 0;
  padding: 0;
  padding-left: 10px;
  padding-right: 30px;
}
</style>