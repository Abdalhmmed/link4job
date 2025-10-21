<script setup>
const props = defineProps({
  friend: {
    type: Object,
    default: () => ({
      id: '0',
      name: 'غير معروف',
      img: 'https://cdn-icons-png.flaticon.com/512/847/847969.png', 
      status: 'غير متصل'
    })
  }
});
</script>

<template>
  <div class="friend-item">
    <router-link
      :to="{ name: 'ProfilePage', params: { id: friend.id } }"
      class="d-flex align-items-center flex-grow-1 text-decoration-none text-dark"
    >
      <img :src="friend.img" :alt="friend.name" class="friend-img" loading="lazy" />

      <div class="friend-body ms-2">
        <strong>{{ friend.name }}</strong>
        <div class="text-secondary small">{{ friend.status }}</div>
      </div>
    </router-link>

    <router-link :to="{ name: 'ChatPage' }">
      <button class="btn btn-sm btn-outline-primary rounded-circle ms-2" title="محادثة">
        <i class="bi bi-chat-dots"></i>
      </button>
    </router-link>
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
