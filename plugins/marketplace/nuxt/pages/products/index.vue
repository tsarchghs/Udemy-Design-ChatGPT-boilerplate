<script setup lang="ts">
import { BaseBadge } from '@bloggrs/shared-ui'
const config = useRuntimeConfig()
const products = await $fetch(`${config.public.apiBase}/api/marketplace/products`)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Marketplace Products (from plugin)</h1>
    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="p in products" :key="p.id" class="border rounded p-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">
            <NuxtLink :to="`/products/${p.id}`">{{ p.name }}</NuxtLink>
          </h3>
          <BaseBadge>{{ p.price.toFixed(2) }} €</BaseBadge>
        </div>
        <p class="text-sm text-gray-600 mt-2">{{ p.description }}</p>
      </li>
    </ul>
  </div>
</template>
