<template>
  <div class="product-search-input" @click.outside="showDropdown = false">
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      class="search-field"
      @input="onInput"
      @focus="showDropdown = results.length > 0"
    />

    <!-- Dropdown -->
    <ul v-if="showDropdown && results.length" class="results-dropdown">
      <li
        v-for="product in results"
        :key="product.id"
        class="result-item"
        @click="selectProduct(product)"
      >
        <div class="result-name">{{ product.name }}</div>
        <div class="result-price">${{ product.price.toFixed(2) }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  placeholder?: string
}>()

const query = ref('')
const results = ref<any[]>([])
const showDropdown = ref(false)
let timeout: NodeJS.Timeout | null = null

// ✅ Debounced search
function onInput() {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(searchProducts, 300)
}

async function searchProducts() {
  if (!query.value.trim()) {
    results.value = []
    showDropdown.value = false
    return
  }

  try {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    const res = await fetch(`${apiBase}/api/marketplace/products?q=${encodeURIComponent(query.value)}`)
    results.value = await res.json()
    showDropdown.value = results.value.length > 0
  } catch (err) {
    console.error('Failed to search products', err)
  }
}

function selectProduct(product: any) {
  console.log('Selected:', product)
  query.value = product.name
  showDropdown.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

.product-search-input {
  position: relative;
  width: 100%;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.search-field {
  width: 100%;
  height: 44px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 0 12px;
  color: #000000;
  background: transparent;
}

/* 🔽 Dropdown styling */
.results-dropdown {
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  list-style: none;
  margin: 0;
  padding: 6px 0;
  z-index: 100;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.result-item:hover {
  background: #f8fafc;
}

.result-name {
  font-size: 14px;
  color: #111827;
}

.result-price {
  font-size: 13px;
  color: #475569;
}
</style>
