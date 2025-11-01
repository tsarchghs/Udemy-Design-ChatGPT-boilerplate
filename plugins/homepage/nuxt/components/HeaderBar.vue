<template>
  <header
    class="flex items-center justify-between px-8 py-4 gap-6 bg-white border border-gray-100 shadow-sm"
  >
    <!-- Logo -->
    <div class="font-bold text-xl tracking-tight text-black">Bloggrs</div>

    <!-- Search -->
    <ProductSearchInput />

    <!-- Actions -->
    <div class="flex items-center gap-6">
      <nav class="flex items-center gap-4 text-gray-600 text-sm">
        <a href="#" class="hover:text-black">Use cases</a>
        <a href="#" class="hover:text-black">About</a>
        <a href="#" class="hover:text-black">Blog</a>
      </nav>

      <button class="bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold">
        Get Started
      </button>

      <a href="#" class="text-gray-600 text-sm">Login</a>
    </div>
  </header>
</template>

<script setup lang="ts">
// uses shared ProductSearchInput
</script>
