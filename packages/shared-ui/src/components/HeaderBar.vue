<template>
  <header class="header-bar">
    <!-- Logo -->
    <div class="logo">Bloggrs</div>

    <!-- Search -->
    <div class="search">
      <div class="dropdown">
        <span class="dropdown-label">All</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="dropdown-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <ProductSearchInput class="search-input" placeholder="Search a location" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="search-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-4.35-4.35m1.15-5.4A7 7 0 1110.4 4.35a7 7 0 017.4 7.4z"
        />
      </svg>
    </div>

    <!-- Actions -->
    <div class="actions">
      <nav class="links">
        <a href="#">Use cases</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
      </nav>

      <button class="cta">Get Started</button>

      <a href="#" class="login">Login</a>
    </div>
  </header>
</template>

<script setup lang="ts">
import ProductSearchInput from './ProductSearchInput.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 76px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 32px;
  gap: 24px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Plus Jakarta Sans', sans-serif;
  z-index: 50;
}

/* Logo */
.logo {
  width: 108px;
  height: 28px;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: -0.02em;
  color: #000000;
}

/* Search */
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  width: 579px;
  height: 44px;
  background: #f1f5f9;
  border-radius: 4px;
  padding-right: 12px;
  flex-grow: 1;
}

/* Dropdown */
.dropdown {
  display: flex;
  align-items: center;
  background: #f8fafc;
  padding: 12px;
  gap: 16px;
  height: 44px;
  border-radius: 4px;
}
.dropdown-label {
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}
.dropdown-icon {
  width: 16px;
  height: 16px;
  stroke: #64748b;
}

/* Search input */
.search-input {
  flex: 1;
}

/* Search icon */
.search-icon {
  width: 20px;
  height: 20px;
  stroke: #64748b;
}

/* Actions */
.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  width: 353px;
  justify-content: flex-end;
}

/* Links */
.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
.links a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  color: #475569;
}
.links a:hover {
  color: #000000;
}

/* CTA button */
.cta {
  background: #102fd8;
  border-radius: 5px;
  color: #f8fafc;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}
.cta:hover {
  background: #1d3ff0;
}

/* Login link */
.login {
  font-size: 14px;
  font-weight: 400;
  color: #475569;
  text-decoration: none;
}
.login:hover {
  color: #000000;
}
</style>
