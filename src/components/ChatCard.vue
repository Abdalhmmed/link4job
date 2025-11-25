<script setup>
import { useChatsStore } from '@/stores/ChatsStore'
import { useUserStore } from '@/stores/UserStore'
import { inject, onMounted, ref, watch } from 'vue'

const ChatId = inject('ChatId')
const myId = localStorage.getItem("userId")

const UsersStore = useUserStore()
const ChatsStore = useChatsStore()

const friend = ref(null)
const chats = ref([])

async function loadChatData() {
  if (!ChatId?.value) return
  try {
    friend.value = await UsersStore.fetchUserById(ChatId.value)
    chats.value = await ChatsStore.filterChatBetweenUsers(myId, ChatId.value)
  } catch (err) {
    friend.value = null
    chats.value = []
  }
}

watch(ChatId, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) await loadChatData()
}, { immediate: true })

onMounted(loadChatData)
</script>

<template>
  <div class="chat-window" v-if="UsersStore.loading && ChatsStore.loading">
    <div class="chat-header">
      <div class="img-loading shimmer"></div>
      <div class="text shimmer" style="width: 100px; height: 14px; border-radius: 8px;"></div>
    </div>

    <div class="h-100 overflow-auto chat-loading">
      <div v-for="n in 6" :key="n" class="chat-messages" id="chatMessages">
        <div class="message-loading shimmer" :class="n % 2 === 0 ? 'me' : 'user'"></div>
      </div>
    </div>
  </div>

  <div class="chat-window" v-else-if="friend">
    <div class="chat-header">
      <img :src="`https://picsum.photos/seed/${friend.id}/45/45`" :alt="friend.name" />
      <div>
        <strong>{{ friend.name }}</strong>
        <div class="text-secondary small">متصل الآن</div>
      </div>
    </div>

    <div class="h-100 overflow-auto p-3">
      <div v-for="chat in chats" :key="chat.id" class="chat-messages" id="chatMessages">
        <div :class="['message', chat.user_id == myId ? 'me' : 'user']">
          {{ chat.text }}
        </div>
        <small :class="['tiem', chat.user_id == myId ? 'me' : 'user']">{{ chat.taim }}</small>
      </div>
    </div>

    <div class="chat-input">
      <label for="fileInput"><i class="bi bi-paperclip"></i></label>
      <input type="file" id="fileInput" hidden />
      <input type="text" class="form-control" id="chatMessageInput" placeholder="اكتب رسالتك..." disabled />
      <button class="btn btn-primary" id="sendMessageBtn">
        <i class="bi bi-send-fill"></i>
      </button>
    </div>
  </div>

  <div class="chat-window" v-else>
    <div class="chat-header">
      <div>
        <strong></strong>
        <div class="text-secondary small"></div>
      </div>
    </div>

    <div class="empty-chat">
      <div class="empty-card">
        <i class="bi bi-chat-dots-fill"></i>
        <h5>ابدأ محادثة جديدة 💬</h5>
        <p>يمكنك الآن التواصل مع أصدقائك ومشاركة اللحظات الجميلة ✨</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tiem.user{ align-self: flex-start; }
.tiem.me{ align-self: flex-end; }

.empty-chat {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #f9fafb, #f3f4f6);
  padding: 24px;
}

.empty-card {
  text-align: center;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  padding: 40px 30px;
  max-width: 380px;
  animation: fadeIn 0.8s ease;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.empty-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.empty-card i {
  font-size: 2.8rem;
  color: #4f46e5;
  margin-bottom: 10px;
}

.empty-card h5 {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6px;
  font-family: 'Tajawal', sans-serif;
}

.empty-card p {
  font-size: 0.95rem;
  color: #6b7280;
  font-family: 'Tajawal', sans-serif;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.shimmer { position: relative; overflow: hidden; background: #d1d5db; }
.shimmer::after { content: ''; position: absolute; top: 0; left: -150px; width: 100px; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 1.6s infinite; }
@keyframes shimmer { 100% { left: 100%; } }

.img-loading { width: 50px; height: 50px; border-radius: 50%; }

.message-loading {
  max-width: 70%;
  border-radius: 20px;
  position: relative;
  margin: 8px 0;
  height: 2.8rem;
  width: 7rem;
}

.message-loading.me { align-self: flex-end; border-radius: 4px 18px 18px 18px; }
.message-loading.user { align-self: flex-start; border-radius: 18px 4px 18px 18px; }

.chat-loading {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;
}

:root { --chat-bg: #faf9f7; }

.chat-window {
  display: flex;
  flex-direction: column;
  background: var(--chat-bg);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  overflow: hidden;
  height: 90vh;
  border: 1px solid #eee;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background: #ffffff;
}

.chat-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.chat-messages { display: flex; flex-direction: column; }

.message {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 20px;
  margin: 6px 0;
  word-wrap: break-word;
  font-family: 'Tajawal', sans-serif;
}

.message.me {
  align-self: flex-end;
  border-radius: 4px 20px 20px 20px;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #fff;
}

.message.user {
  align-self: flex-start;
  border-radius: 20px 4px 20px 20px;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: #fff;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: #fff;
  align-items: center;
}
.chat-input input[type="text"] {
  flex-grow: 1;
  border-radius: 25px;
  padding: 12px 16px;
  border: 1px solid #ddd;
}
.chat-input button {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  border: none;
  color: white;
}
.chat-input label {
  width: 45px;
  height: 45px;
  background: #f3f4f6;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.chat-input label:hover {
  background: #e5e7eb;
}
</style>
