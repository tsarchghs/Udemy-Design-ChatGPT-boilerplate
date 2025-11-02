<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const product = await $fetch(`${config.public.apiBase}/api/marketplace/products/${route.params.id}`)
</script>

<template>
  <div>
    <NuxtLink to="/products" class="underline">&larr; Back</NuxtLink>
    <h1 class="text-2xl font-bold mt-4 mb-2">{{ product.name }}</h1>
    <p class="text-gray-700">{{ product.description }}</p>
    <p class="mt-3 font-semibold">{{ product.price.toFixed(2) }} €</p>
  </div>
</template>
