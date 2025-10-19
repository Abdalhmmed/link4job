<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import FriendCard from './FriendCard.vue'

const props = defineProps({
  friends: {
    type: Array,
    default: () => [], 
  },
  maxVisible: { type: Number, default: 6 },
})

const showAll = ref(false)
const fullFriends = ref([]) 

const UsersStore = useUserStore()

const visibleFriends = computed(() => {
  return fullFriends.value && fullFriends.value.length
    ? showAll.value
      ? fullFriends.value
      : fullFriends.value.slice(0, props.maxVisible)
    : []
})

function toggleFriends() {
  showAll.value = !showAll.value
}

const fetchFullFriends = async () => {
  if (!props.friends || !props.friends.length) return

  fullFriends.value = await Promise.all(
    props.friends.map(async (f) => {
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
  () => props.friends,
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
          <small class="small-muted">{{ props.friends.length }} عدد الأصدقاء </small>
        </div>

        <div id="friendsList" class="friends-list">
          <template v-for="friend in visibleFriends" :key="friend.id">
            <FriendCard :friend="friend" />
          </template>
        </div>

        <div v-if="fullFriends.value && fullFriends.value.length > props.maxVisible" class="text-center mt-2">
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
