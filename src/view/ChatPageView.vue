<script setup>
import ChatCard from '@/components/ChatCard.vue';
import ChatFrindeCard from '@/components/ChatFrindeCard.vue';
import ChatNotification from '@/components/ChatNotification.vue';
import { useFollowersStore } from '@/stores/FollowersStore';
import { onMounted, provide, ref } from 'vue';

const FollowersStore = useFollowersStore()
const frindes = ref();

const ChatId = ref(null);

ChatId.value = "1";

provide('ChatId', ChatId)

onMounted( async () => {
  frindes.value = await FollowersStore.fetchFriendsByUserId(2);
   console.log('friend1: ', frindes.value);
})

</script>

<template>
    
<div class="chat-layout">

  <ChatNotification />

  <ChatCard />

  <ChatFrindeCard :frindesId="frindes"/>

</div>

</template>

<style scoped>

    .chat-layout {
      display: grid;
      grid-template-columns: 16% 64% 18%;
      min-height: 100vh;
      gap: 10px;
      margin: 1rem  0px;
    }

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

    @media(max-width:991px){
      .chat-layout { grid-template-columns: 100%; }
    }
</style>