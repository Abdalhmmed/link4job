<script setup>
import { useChatsStore } from '@/stores/ChatsStore';
import { useUserStore } from '@/stores/UserStore';
import { inject, onMounted, ref } from 'vue';


const ChatId = inject('ChatId')

const myId = ref("2")

const UsersStore = useUserStore()
const ChatsStore = useChatsStore()

const friende = ref('');
const chats = ref('');

onMounted( async () => {
    friende.value = await UsersStore.fetchUserById(ChatId.value)
    chats.value = await ChatsStore.filterChatBetweenUsers(myId.value ,ChatId.value)
})

</script>

<template>
    <div class="chat-window">
        <div class="chat-header">
            <img :src="`https://picsum.photos/seed/${friende.id}/45/45`" alt="منى">
            <div>
                <strong>{{ friende.name }}</strong>
                <div class="text-secondary small">متصل الآن</div>
            </div>
        </div>

        <div class="chat-messages" id="chatMessages">
            <div
                v-for="chat in chats"
                :key="chat.id"
                :class="['message', chat.user_id == myId ? 'me' : 'user']"
            >
                {{ chat.text }}
                <small>{{ chat.taim }}</small>
            </div>
        </div>

        <div class="chat-input">
        <label for="fileInput"><i class="bi bi-paperclip"></i></label>
        <input type="file" id="fileInput" hidden>
        <input type="text" class="form-control" id="chatMessageInput" placeholder="اكتب رسالتك...">
        <button class="btn btn-primary" id="sendMessageBtn"><i class="bi bi-send-fill"></i></button>
        </div>
    </div>
</template>
<style scoped>
:root {
  --msg-me-bg: #1e40af;        /* أزرق داكن */
  --msg-me-text: #ffffff;      /* نص أبيض */
  --msg-user-bg: #d1fae5;      /* أخضر فاتح */
  --msg-user-text: #065f46;    /* نص غامق */
}

.chat-window {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  border-radius: 12px;
  overflow: hidden;
  height: 90vh;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background: #f9fafb;
}

.chat-header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f3f4f6;
}

.message {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 20px;
  word-break: break-word;
  position: relative;
  transition: transform 0.2s ease;
}

.message:hover { transform: scale(1.02); }

/* رسائل المستخدم */
.message.me {
  align-self: flex-end;
  background: var(--msg-me-bg);
  color: var(--msg-me-text);
  border-bottom-right-radius: 4px;
}

/* رسائل الصديق */
.message.user {
  align-self: flex-start;
  background: var(--msg-user-bg);
  color: var(--msg-user-text);
  border-bottom-left-radius: 4px;
}

.message small {
  display: block;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 4px;
  text-align: right;
}
.message.user small { text-align: left; }

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
  border-color: #1e40af;
  box-shadow: 0 0 4px rgba(30,64,175,0.3);
}

.chat-input button {
  border-radius: 50%;
  width: 45px;
  height: 45px;
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
}
</style>
