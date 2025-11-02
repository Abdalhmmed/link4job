<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import FriendCard from './FriendCard.vue'
import { useFollowersStore } from '@/stores/FollowersStore'

const FollowersStore = useFollowersStore()
const UsersStore = useUserStore()
const id = localStorage.getItem("userId")

const maxVisible = 6 
const friends = ref([])

onMounted(async () => {
  friends.value = await FollowersStore.fetchFriendsByUserId(id);
});

const showAll = ref(false)
const fullFriends = ref([]) 

const visibleFriends = computed(() => {
  return fullFriends.value && fullFriends.value.length
    ? showAll.value
      ? fullFriends.value
      : fullFriends.value.slice(0, maxVisible)
    : []
})

function toggleFriends() {
  showAll.value = !showAll.value
}

const fetchFullFriends = async () => {
  if (!friends.value || !friends.value.length) return

  fullFriends.value = await Promise.all(
    friends.value.map(async (f) => {
      try {
        const user = await UsersStore.fetchUserById(f.friend_id)
        return {
          id: user.id,
          name: user.name || 'غير معروف',
          img: user.avatar_url || 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
          status: 'متصل الآن',
        }
      } catch (err) {
        console.error('Error fetching user for friend:', f.friend_id, err)
        return {
          id: f.friend_id,
          name: 'غير معروف',
          img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
          status: 'غير متصل',
        }
      }
    })
  )
}

onMounted(() => fetchFullFriends())

watch(
  () => friends.value,
  () => {
    fetchFullFriends()
  },
  { deep: true }
)
</script>

<template>
  <div class="friends-component" role="region" aria-label="قائمة الأصدقاء">
    <main class="main-wrap">
      <aside class="friends-card" aria-labelledby="friends-title">
        <div class="header d-flex justify-content-between align-items-center mb-2">
          <h6 id="friends-title" class="mb-0">أصدقاؤك</h6>
          <small class="small-muted">{{ friends.length }} عدد الأصدقاء </small>
        </div>

        <div id="friendsList" class="friends-list">
          <template v-if="FollowersStore.loading" v-for="f in 3" :key="f">
            <div class="loading-friend shimmer" ></div>
          </template>

          <template v-else-if="!FollowersStore.loading && visibleFriends.length <= 0 ">
            قم بالتعرف على بعض الاصدقاء من اجل الدردشة
          </template>

          <template v-else v-for="friend in visibleFriends" :key="friend.id">
            <FriendCard :friend="friend" />
          </template>

        </div>
        

        <div v-if="fullFriends.value && fullFriends.value.length > maxVisible" class="text-center mt-2">
          <button
            id="toggleFriends"
            class="btn btn-sm btn-outline-primary btn-toggle"
            :aria-expanded="showAll.toString()"
            @click="toggleFriends"
          >
            {{ showAll ? 'عرض أقل' : 'عرض المزيد' }}
          </button>
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
