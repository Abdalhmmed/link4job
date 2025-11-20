<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const ChatId = inject('ChatId');

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
});

function OpenChat() {
  if (ChatId && typeof ChatId === 'object' && 'value' in ChatId) {
    ChatId.value = props.user.id;
  }
  router.push({ name: 'ChatPage' });
}
</script>


<template>
  <div class="friend-item">
    <router-link
      :to="{ name: 'ProfilePage', params: { id: user.id } }"
      class="d-flex align-items-center flex-grow-1 text-decoration-none text-dark"
    >
      <img :src="`https://picsum.photos/200/200?${user.id}`" :alt="user.name" class="friend-img" />

      <div class="friend-body ms-2">
        <strong>{{ user.name }}</strong>
        <div class="text-secondary small">{{ user.status }}</div>
      </div>
    </router-link>

    <div @click="OpenChat()">
      <button class="btn btn-sm btn-outline-primary rounded-circle ms-2" title="محادثة">
        <i class="bi bi-chat-dots"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.friend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.friend-item:hover {
  background: #f1f5f9;
}

.friend-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}

.friend-body strong {
  font-size: 15px;
}

.friend-body .small {
  color: #6b7280;
}

.btn-outline-primary {
  border-color: #4f46e5;
  color: #4f46e5;
}

.btn-outline-primary:hover {
  background: #4f46e5;
  color: white;
}
</style>
