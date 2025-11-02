<template>
  <nav class="filters-bar">
    <!-- Primary group -->
    <div class="filter-group primary">
      <label class="checkbox">
        <input type="checkbox" v-model="selected.primary" value="photos" />
        <span class="check-icon"></span>
        <span class="label-text">Photos</span>
      </label>

      <label class="checkbox">
        <input type="checkbox" v-model="selected.primary" value="videos" />
        <span class="check-icon"></span>
        <span class="label-text">Videos</span>
      </label>
    </div>

    <div class="divider"></div>

    <!-- Secondary group -->
    <div class="filter-group secondary">
      <label
        v-for="(opt, i) in secondaryFilters"
        :key="i"
        class="checkbox"
      >
        <input type="checkbox" v-model="selected.secondary" :value="opt.value" />
        <span class="check-icon"></span>
        <span class="label-text">{{ opt.label }}</span>
      </label>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref({
  primary: [] as string[],
  secondary: [] as string[]
})

const secondaryFilters = [
  { label: 'People', value: 'people' },
  { label: 'Nature', value: 'nature' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'Animals', value: 'animals' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

/* 🔹 Base container */
.filters-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  padding: 12px 32px;
  background: #fff;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  z-index: 10;
  box-sizing: border-box;
  margin-top: 0;
  position: relative;
  z-index: auto;
}


/* 🔹 Filter groups */
.filter-group {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.primary {
  flex-shrink: 0;
}

.secondary {
  flex: 1;
  flex-wrap: wrap;
}

/* 🔹 Divider */
.divider {
  width: 1px;
  height: 24px;
  background: #cbd5e1;
  margin: 0 8px;
}

/* 🔹 Checkbox item */
.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox input {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #94a3b8;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.checkbox input:checked {
  border-color: #102fd8;
  background-color: #102fd8;
}

.label-text {
  font-size: 14px;
  line-height: 20px;
  color: #0f172a;
  font-weight: 400;
}

/* 🔹 Integration with header */
.filters-bar {
  margin-top: 0;
  position: sticky;
  top: 76px; /* header height */
  z-index: 40;
}

/* ========== 📱 Responsive Breakpoints ========== */

/* 🟢 Tablet (≤1024px) */
@media (max-width: 1024px) {
  .filters-bar {
    padding: 10px 24px;
    gap: 16px;
  }

  .divider {
    height: 20px;
  }

  .checkbox input {
    width: 18px;
    height: 18px;
  }

  .label-text {
    font-size: 13px;
  }
}

/* 🟡 Mobile (≤768px) */
@media (max-width: 768px) {
  .filters-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 16px;
    gap: 12px;
    position: static;
    top: 0;
    border-top: none;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: none;
  }

  .divider {
    display: none; /* divider unnecessary in stacked layout */
  }

  .filter-group {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px 16px;
  }

  .checkbox input {
    width: 18px;
    height: 18px;
  }

  .label-text {
    font-size: 13px;
  }
}

/* 🔴 Small phones (≤480px) */
@media (max-width: 480px) {
  .filters-bar {
    padding: 8px 12px;
    gap: 10px;
  }

  .checkbox input {
    width: 16px;
    height: 16px;
  }

  .label-text {
    font-size: 12px;
  }
}/* ==============================
   Responsive Filters Fixes
   ============================== */

/* Tablet */
@media (max-width: 1024px) {
  .filters-bar {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px 20px;
    gap: 12px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .filters-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 16px;
    border-top: none;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: none;
  }

  .divider {
    display: none;
  }

  .filter-group {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  }

  .checkbox input {
    width: 18px;
    height: 18px;
  }

  .label-text {
    font-size: 13px;
  }
}
/* ========== Mid-tablet fix (760–900 px) ========== */
@media (max-width: 900px) and (min-width: 760px) {
  .filters-bar {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 12px 16px;
    padding: 10px 20px;
    height: auto;
  }

  .divider {
    display: none;
  }

  .filter-group {
    flex-wrap: wrap;
    width: 100%;
    gap: 10px 16px;
  }

  .checkbox input {
    width: 18px;
    height: 18px;
  }

  .label-text {
    font-size: 13px;
  }
}


</style>
