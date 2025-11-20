<script setup>
import { onMounted, ref, watch } from 'vue';
import FriendCard from './FriendCard.vue';
import { useUserStore } from '@/stores/UserStore';
import UsersSearchCard from './UsersSearchCard.vue';

const UsersStore = useUserStore()

const ff = ref([])     
const users = ref([])    
const userSearch = ref('')

const maxUsers = 3

onMounted(async () => {
  const allUsers = await UsersStore.fetchUsers()
  ff.value = allUsers.slice(0, maxUsers)   
  users.value = ff.value
})

watch(userSearch, async () => {
  if (!userSearch.value.trim()) {
    users.value = ff.value      
  } else {
    users.value = await UsersStore.fetchUsersByname(userSearch.value)
  }
})
</script>

<template>
  <div class="friends-component">
    <main class="main-wrap">
      <aside class="friends-card">

        <h6 class="mb-2">البحث عن مستخدمين</h6>

        <div class="friends-list">

          <div class="user-search-wrapper mb-2">
            <input 
              type="text" 
              class="form-control" 
              placeholder="ابحث عن صديق..." 
              v-model="userSearch" 
            />
          </div>

          <template v-if="UsersStore.loading">
            <div v-for="f in 3" :key="f" class="loading-friend shimmer"></div>
          </template>

          <template v-else-if="users.length > 0">
            <UsersSearchCard 
              v-for="user in users" 
              :key="user.id" 
              :user="user" 
            />
          </template>

          <div v-else class="text-center text-muted py-3">
            لا يوجد نتائج
          </div>

        </div>

      </aside>
    </main>
  </div>
</template>




<style scoped>
.loading-friend{
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 7px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(18, 24, 40, 0.04);
  overflow: hidden;
  height: 3.5rem;
  background: #e3e3e3;
}

.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 100px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  100% {
    transform: translateX(300%);
  }
}


.friends-component {
  --muted: #6b7280;
  --brand: #4f46e5;
  display: flex;
  flex-direction: column;
  background: #f6f8fb;
  color: #1f2937;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans Arabic', Arial;
}

.main-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

.friends-card {
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 12px 36px rgba(18, 24, 40, 0.06);
}

.friend-item {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}

.friend-item img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.friend-body {
  display: flex;
  flex-direction: column;
}

.btn-toggle {
  width: 100%;
  text-align: center;
}

.small-muted {
  font-size: 13px;
  color: var(--muted);
}

.user-search-wrapper {
    display: flex;
    gap: 8px;
    padding: 8px 12px;
}


#userSearch {
    flex-grow: 1;
    border-radius: 25px;
    padding: 8px 16px;
    border: 1px solid #ddd;
}

#userSearch:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 8px rgba(79,70,229,0.2);
}

@media (max-width: 420px) {
  .friends-card {
    max-width: 92%;
    padding: 12px;
  }

  .friend-item img {
    width: 42px;
    height: 42px;
  }
}
</style>
