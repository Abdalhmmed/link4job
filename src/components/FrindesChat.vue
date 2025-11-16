<script setup>
import { inject, computed } from 'vue'

const ChatId = inject('ChatId')

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

const isActive = computed(() => ChatId && ChatId.value === props.user.id)
</script>

<template>
  <div
    v-if="user"
    class="friend-item"
    @click="OpenChat(props.user.id)"
    :class="{ active: isActive }"
  >
    <img
      :src="props.user.avatar_url || `https://picsum.photos/seed/${props.user.id}/45/45`"
      alt="صورة المستخدم"
    />
    <div class="friend-info">
      <strong class="friend-name">{{ props.user.name }}</strong>
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
