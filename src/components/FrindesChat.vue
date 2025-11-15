<script setup>
import { useUserStore } from '@/stores/UserStore'
import { inject, onMounted, ref, computed } from 'vue'

const ChatId = inject('ChatId')
const UsersStore = useUserStore()

const user = ref(null)
const loading = ref(true)
const error = ref(null)

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      id: 0,
      name: "error",
      img: "error",
      status: "error"
    })
  }
})

function OpenChat(id) {
  if (ChatId && ChatId.value !== id) {
    ChatId.value = id
  }
}

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    user.value = await UsersStore.fetchUserById(props.user?.id)
  } catch (err) {
    console.error("خطأ أثناء جلب بيانات المستخدم:", err)
    error.value = "فشل في تحميل بيانات المستخدم."
  } finally {
    loading.value = false
  }
})

const isActive = computed(() => ChatId && ChatId.value === user.value?.id)
</script>

<template>
  <div v-if="user"
    class="friend-item"
    @click="OpenChat(user.id)"
    :class="{ active: isActive }"
  >
    <img
      :src="user.avatar_url || `https://picsum.photos/seed/${user.id}/45/45`"
      alt="صورة المستخدم"
    />
    <div class="friend-info">
      <strong class="friend-name">{{ user.name }}</strong>
      <span class="friend-status">متصل الآن</span>
    </div>
  </div>
</template>


<style scoped>
.friend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 12px;
  margin: 6px 8px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  background-color: #fff;
}
.friend-item:hover {
  background-color: #f9f9f9;
  transform: scale(1.01);
}
.friend-item.active {
  background-color: #e6f2ff;
  border: 1px solid #c5e3ff;
}
.friend-item img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}
.friend-info {
  display: flex;
  flex-direction: column;
}
.friend-name {
  font-weight: 600;
  color: #333;
}
.friend-status {
  font-size: 12px;
  color: #4a4a4a;
}

.friend-item.loading {
  opacity: 0.7;
  pointer-events: none;
}
.avatar-skeleton {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(90deg, #eee, #f8f8f8, #eee);
  animation: pulse 1.2s infinite linear;
}
.skeleton-info {
  flex: 1;
}
.line {
  height: 10px;
  background: linear-gradient(90deg, #eee, #f8f8f8, #eee);
  border-radius: 6px;
  margin-bottom: 6px;
  animation: pulse 1.2s infinite linear;
}
.line.short {
  width: 60%;
}
.line.long {
  width: 40%;
}
@keyframes pulse {
  0% {
    background-position: -100px;
  }
  100% {
    background-position: 200px;
  }
}
</style>
