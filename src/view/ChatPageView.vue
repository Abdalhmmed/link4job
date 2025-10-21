<script setup>
import ChatCard from '@/components/ChatCard.vue';
import ChatFrindeCard from '@/components/ChatFrindeCard.vue';
import { useFollowersStore } from '@/stores/FollowersStore';
import { onMounted, provide, ref } from 'vue';

const FollowersStore = useFollowersStore()
const frindes = ref();

const ChatId = ref(null);

ChatId.value = "1";

provide('ChatId', ChatId)

onMounted( async () => {
  frindes.value = await FollowersStore.fetchFriendsByUserId(2);
  console.log('frindes: ', frindes.value)
})

</script>

<template>
    
<div class="chat-layout">

  <div class="notifications-panel">
    <div class="notifications-header">
      <button class="btn btn-light" onclick="togglePanel('notifications')"><i class="bi bi-arrow-right"></i></button>
      <h6 class="m-0">الإشعارات</h6>
    </div>
    <div class="notification-item"><i class="bi bi-bell text-warning me-2"></i> تم إرسال طلب جديد</div>
    <div class="notification-item"><i class="bi bi-chat-left-text text-info me-2"></i> رد من أمل على رسالتك</div>
    <div class="notification-item"><i class="bi bi-person-check text-success me-2"></i> منى أضافتك كصديقة</div>
  </div>

  <ChatCard />

  <ChatFrindeCard :frindesId="frindes"/>

</div>

</template>

<style scoped>
    :root {
      --brand: #4f46e5;
      --light: #f8f9fa;
      --msg-user: #dbeafe;
      --msg-me: #4f46e5;
      --msg-me-text: #fff;
      --online-green: #22c55e;
    }

    body {
      background: #f6f8fb;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }

    .chat-layout {
        display: grid;
        grid-template-columns: 16% 64% 18%;
        min-height: 100vh;
        gap: 10px;
    }

    /* Notifications & Friends */
    .notifications-panel, .friends-list {
      background: #fff;
      box-shadow: 0 0 12px rgba(0,0,0,0.05);
      overflow-y: auto;
      position: sticky;
      top: 0;
      height: 90vh; /* تقليل الطول */
      border-radius: 12px;
      transition: transform .3s ease;
      z-index: 10;
    }

    .notifications-header, .friends-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      font-weight: bold;
    }

    .notification-item, .friend-item {
      padding: 10px 16px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background .2s, transform .2s;
    }
    .notification-item:hover, .friend-item:hover { 
      background: #f0f4ff; 
      transform: scale(1.02);
    }

    /* Friends */
    .friend-item {
      display: flex;
      align-items: center;
      gap: 12px;
      border-radius: 12px;
      margin: 6px 8px;
    }
    .friend-item img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
    }

    /* Search Field with Button */
    .friend-search-wrapper {
      display: flex;
      gap: 8px;
      padding: 8px 12px;
    }
    #friendSearch {
      flex-grow: 1;
      border-radius: 25px;
      padding: 8px 16px;
      border: 1px solid #ddd;
    }
    #friendSearch:focus {
      outline: none;
      border-color: var(--brand);
      box-shadow: 0 0 8px rgba(79,70,229,0.2);
    }
    #friendSearchBtn {
      background: var(--brand);
      color: #fff;
      border: none;
      border-radius: 25px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Chat */
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
      font-weight: bold;
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
      scroll-behavior: smooth;
      background: #f6f8fb;
    }

    .message {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 20px;
      word-break: break-word;
      transition: transform .2s;
      position: relative;
    }
    .message:hover { transform: scale(1.02); }
    .message.me { background: var(--msg-me); color: var(--msg-me-text); align-self: flex-start; }
    .message.user { background: var(--msg-user); align-self: flex-end; }
    .message small {
      position: absolute;
      bottom: -18px;
      font-size: 0.75rem;
      color: #999;
    }
    .message.me small { right: 8px; }
    .message.user small { left: 8px; }

    /* Chat Input */
    .chat-input {
      display: flex;
      gap: 10px;
      padding: 12px 16px;
      border-top: 1px solid #eee;
      background: #fff;
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

    /* Responsive */
    @media(max-width:991px){
      .chat-layout { grid-template-columns: 100%; }
      .friends-list, .notifications-panel { 
        width: 80%; 
        transform: translateX(100%);
        z-index: 1050;
      }
      .friends-list.active, .notifications-panel.active { transform: translateX(0); }
    }
</style>