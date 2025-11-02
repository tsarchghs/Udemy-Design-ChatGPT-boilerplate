<template>
  <section class="admin-page">
    <div class="admin-container">
      <h1 class="title">Admin Dashboard</h1>
      <p class="subtitle">Manage users and photos across all plugins</p>

      <div class="panels">
        <!-- USERS PANEL -->
        <div class="panel">
          <div class="panel-header">
            <h2>Users</h2>
            <button @click="openUserForm()" class="btn-primary">+ Add User</button>
          </div>

          <div v-if="usersLoading">Loading users...</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Email</th><th>Name</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in users" :key="u.id">
                <td>{{ u.id.slice(0, 6) }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.name || '—' }}</td>
                <td>
                  <button @click="openUserForm(u)">✏️</button>
                  <button @click="deleteUser(u.id)">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PHOTOS PANEL -->
        <div class="panel">
          <div class="panel-header">
            <h2>Photos</h2>
            <button @click="openPhotoForm()" class="btn-primary">+ Add Photo</button>
          </div>

          <div v-if="photosLoading">Loading photos...</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Title</th><th>User</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in photos" :key="p.id">
                <td>{{ p.id.slice(0, 6) }}</td>
                <td>{{ p.title }}</td>
                <td>{{ p.user?.email || '—' }}</td>
                <td>
                  <button @click="openPhotoForm(p)">✏️</button>
                  <button @click="deletePhoto(p.id)">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- === USER FORM MODAL === -->
      <div v-if="showUserForm" class="modal-overlay">
        <div class="modal">
          <h3>{{ editingUser?.id ? 'Edit User' : 'Add User' }}</h3>
          <form @submit.prevent="saveUser">
            <label>Email</label>
            <input v-model="userForm.email" type="email" required />
            <label>Name</label>
            <input v-model="userForm.name" type="text" />

            <div class="modal-actions">
              <button type="submit" class="btn-primary">
                {{ editingUser?.id ? 'Update' : 'Create' }}
              </button>
              <button type="button" @click="closeUserForm" class="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- === PHOTO FORM MODAL === -->
      <div v-if="showPhotoForm" class="modal-overlay">
        <div class="modal">
          <h3>{{ editingPhoto?.id ? 'Edit Photo' : 'Add Photo' }}</h3>
          <form @submit.prevent="savePhoto">
            <label>Title</label>
            <input v-model="photoForm.title" type="text" required />
            <label>User ID</label>
            <input v-model="photoForm.userId" type="text" placeholder="Link to user..." />

            <div class="modal-actions">
              <button type="submit" class="btn-primary">
                {{ editingPhoto?.id ? 'Update' : 'Create' }}
              </button>
              <button type="button" @click="closePhotoForm" class="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// === Data ===
const users = ref<any[]>([])
const photos = ref<any[]>([])
const usersLoading = ref(true)
const photosLoading = ref(true)

// === User Form State ===
const showUserForm = ref(false)
const editingUser = ref<any | null>(null)
const userForm = ref({ email: '', name: '' })

// === Photo Form State ===
const showPhotoForm = ref(false)
const editingPhoto = ref<any | null>(null)
const photoForm = ref({ title: '', userId: '' })

// === Fetch Data ===
async function loadData() {
  usersLoading.value = photosLoading.value = true
  const [uRes, pRes] = await Promise.all([
    fetch(`${apiBase}/api/admin/users`),
    fetch(`${apiBase}/api/admin/photos`)
  ])
  users.value = await uRes.json()
  photos.value = await pRes.json()
  usersLoading.value = photosLoading.value = false
}
onMounted(loadData)

// === CRUD Handlers (Users) ===
function openUserForm(user?: any) {
  editingUser.value = user || null
  userForm.value = user ? { ...user } : { email: '', name: '' }
  showUserForm.value = true
}
function closeUserForm() { showUserForm.value = false }

async function saveUser() {
  const method = editingUser.value ? 'PUT' : 'POST'
  const url = editingUser.value
    ? `${apiBase}/api/admin/users/${editingUser.value.id}`
    : `${apiBase}/api/admin/users`
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userForm.value)
  })
  closeUserForm()
  await loadData()
}

async function deleteUser(id: string) {
  if (!confirm('Delete this user and all their photos?')) return
  await fetch(`${apiBase}/api/admin/users/${id}`, { method: 'DELETE' })
  await loadData()
}

// === CRUD Handlers (Photos) ===
function openPhotoForm(photo?: any) {
  editingPhoto.value = photo || null
  photoForm.value = photo ? { ...photo } : { title: '', userId: '' }
  showPhotoForm.value = true
}
function closePhotoForm() { showPhotoForm.value = false }

async function savePhoto() {
  const method = editingPhoto.value ? 'PUT' : 'POST'
  const url = editingPhoto.value
    ? `${apiBase}/api/admin/photos/${editingPhoto.value.id}`
    : `${apiBase}/api/admin/photos`
  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photoForm.value)
  })
  closePhotoForm()
  await loadData()
}

async function deletePhoto(id: string) {
  if (!confirm('Delete this photo?')) return
  await fetch(`${apiBase}/api/admin/photos/${id}`, { method: 'DELETE' })
  await loadData()
}
</script>

<style scoped>
.admin-page {
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
  padding: 48px 24px;
}
.admin-container { max-width: 1100px; margin: 0 auto; }
.title { font-size: 28px; font-weight: 700; color: #0f172a; }
.subtitle { color: #64748b; margin-bottom: 24px; }
.panels { display: grid; gap: 32px; }

.panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.btn-primary, .btn-secondary {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}
.btn-primary {
  background: #102fd8;
  color: #fff;
  border: none;
}
.btn-secondary {
  background: #e2e8f0;
  border: none;
  color: #0f172a;
}
.data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.data-table th, .data-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
}
.data-table tr:hover { background: #f1f5f9; }

/* Modal styling */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
</style>
