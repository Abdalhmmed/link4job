<script setup>
import { useChatsStore } from '@/stores/ChatsStore'
import { useUserStore } from '@/stores/UserStore'
import { inject, onMounted, ref, watch } from 'vue'

const ChatId = inject('ChatId')
const myId = ref("2")

const UsersStore = useUserStore()
const ChatsStore = useChatsStore()

const friend = ref(null)
const chats = ref([])

async function loadChatData() {
  if (!ChatId?.value) return
  try {
    friend.value = await UsersStore.fetchUserById(ChatId.value)
    chats.value = await ChatsStore.filterChatBetweenUsers(myId.value, ChatId.value)
    console.log("تم تحميل بيانات المحادثة:", ChatId.value)
  } catch (err) {
    console.error("خطأ أثناء تحميل البيانات:", err)
  }
}

watch(
  ChatId,
  async (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      await loadChatData()
    }
  },
  { immediate: true }
)

onMounted(loadChatData)
</script>

<template>
  <div class="chat-window">
    <div class="chat-header" v-if="friend">
      <img :src="`https://picsum.photos/seed/${friend.id}/45/45`" :alt="friend.name" />
      <div>
        <strong>{{ friend.name }}</strong>
        <div class="text-secondary small">متصل الآن</div>
      </div>
    </div>

    <div v-else class="p-3 text-center text-muted">جاري تحميل البيانات...</div>

    <div v-for="chat in chats" :key="chat.id" class="chat-messages" id="chatMessages">
      <div  :class="['message', chat.user_id == myId ? 'me' : 'user']">
        {{ chat.text }}
      </div>
      <small :class="['tiem', chat.user_id == myId ? 'me' : 'user']">{{ chat.taim }}</small>
    </div>

    <div class="chat-input">
      <label for="fileInput"><i class="bi bi-paperclip"></i></label>
      <input type="file" id="fileInput" hidden />
      <input
        type="text"
        class="form-control"
        id="chatMessageInput"
        placeholder="اكتب رسالتك..."
      />
      <button class="btn btn-primary" id="sendMessageBtn">
        <i class="bi bi-send-fill"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
:root {
  --msg-me-bg: linear-gradient(135deg, #2e5cb8, #1e3a8a);
  --msg-me-text: #ffffff;
  --msg-user-bg: linear-gradient(135deg, #fdf3f4, #fae8e8);
  --msg-user-text: #4b5563;
  --chat-bg: #faf9f7;
}

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
  background: #fffafc;
}

.chat-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.chat-messages {
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.message {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 20px;
  word-break: break-word;
  position: relative;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.message:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.message.me {
  align-self: flex-end;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #fff;
  border-radius: 4px 18px 18px 18px;
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
  padding: 10px 14px;
  max-width: 75%;
  font-size: 15px;
  line-height: 1.4;
  transition: transform 0.2s ease;
}

.message.me:hover {
  transform: translateY(-2px);
}

.message.user {
  align-self: flex-start;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: #fff;
  border-radius: 18px 4px 18px 18px;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
  padding: 10px 14px;
  max-width: 75%;
  font-size: 15px;
  line-height: 1.4;
  transition: transform 0.2s ease;
}

.message.user:hover {
  transform: translateY(-2px);
}

.message {
  display: inline-block;
  margin: 6px 0;
  word-wrap: break-word;
  font-family: 'Tajawal', sans-serif;
}

.message small {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 4px;
  text-align: right;
}
.message.user small {
  text-align: left;
}

.tiem.me{
  align-self: flex-end;
}

.tiem.user{
  align-self: flex-start;
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
  transition: all 0.2s ease;
}

.chat-input input[type="text"]:focus {
  outline: none;
  border-color: #2e5cb8;
  box-shadow: 0 0 4px rgba(46, 92, 184, 0.3);
}

.chat-input button {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #2e5cb8, #1e3a8a);
  border: none;
}

.chat-input label {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: #f3f4f6;
  border-radius: 50%;
  border: 1px solid #ddd;
  transition: background 0.2s ease;
}

.chat-input label:hover {
  background: #e5e7eb;
}
</style>
