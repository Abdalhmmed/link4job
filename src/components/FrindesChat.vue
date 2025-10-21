<script setup>
import { useUserStore } from '@/stores/UserStore'
import { inject, onMounted, ref, computed } from 'vue'

const ChatId = inject('ChatId')
const UsersStore = useUserStore()
const user = ref(null)
const loading = ref(false)

const props = defineProps({
  user_id: {
    type: Object,
    default: () => ({ id: 0 })
  }
})

function OpenChat(id) {
  ChatId.value = id
}

onMounted(async () => {
  if (props.user_id.id) {
    loading.value = true
    user.value = await UsersStore.fetchUserById(props.user_id.id)
    loading.value = false
  }
})

const isActive = computed(() => ChatId.value === user.value?.id)
</script>

<template>
  <div
    v-if="user && !loading"
    class="friend-item"
    @click="OpenChat(user.id)"
    :class="{ active: isActive }"
  >
    <img :src="`https://picsum.photos/seed/${user.id}/45/45`" alt="صورة المستخدم" />

    <div class="friend-info">
      <strong class="friend-name">{{ user.name }}</strong>
      <span class="friend-status"> متصل الآن</span>
    </div>
  </div>

  <div v-else class="friend-item loading">
    <div class="avatar-skeleton"></div>
    <div class="skeleton-info">
      <div class="line short"></div>
      <div class="line long"></div>
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

/* 🎨 تأثير التحميل (skeleton) */
.friend-item.loading {
  opacity: 0.7;
  pointer-events: none;
}
.avatar-skeleton {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(90deg, #eee, #f8f8f8, #eee);
  animation: pulse 1.2s infinite;
}
.skeleton-info {
  flex: 1;
}
.line {
  height: 10px;
  background: linear-gradient(90deg, #eee, #f8f8f8, #eee);
  border-radius: 6px;
  margin-bottom: 6px;
  animation: pulse 1.2s infinite;
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
