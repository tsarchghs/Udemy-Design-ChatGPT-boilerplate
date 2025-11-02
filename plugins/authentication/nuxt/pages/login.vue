<template>
  <section class="login-page">
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <p class="subtitle">Sign in to continue to Bloggrs</p>

      <form class="login-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="you@example.com" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <button class="login-btn" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Login' }}
        </button>

        <p class="signup-text">
          Don’t have an account?
          <NuxtLink to="/register">Sign up</NuxtLink>
        </p>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'
    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    if (!res.ok) throw new Error('Invalid credentials')

    const data = await res.json()
    localStorage.setItem('token', data.token)
    alert('✅ Logged in successfully!')
    router.push('/') // redirect to homepage
  } catch (err) {
    console.error(err)
    alert('❌ Invalid credentials')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding: 16px;
}
.login-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;
}
.title {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}
.subtitle {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 32px;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  text-align: left;
}
label {
  display: block;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
  color: #334155;
}
input {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}
input:focus {
  border-color: #102fd8;
}
.login-btn {
  background: #102fd8;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.login-btn:hover:not(:disabled) {
  background: #1d3ff0;
}
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.signup-text {
  margin-top: 16px;
  font-size: 13px;
  color: #475569;
}
.signup-text a {
  color: #102fd8;
  font-weight: 600;
  text-decoration: none;
}
.signup-text a:hover {
  text-decoration: underline;
}
@media (max-width: 480px) {
  .login-card {
    padding: 28px 24px;
  }
  .title {
    font-size: 22px;
  }
}
</style>
