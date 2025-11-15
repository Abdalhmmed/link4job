<script setup>
import ChatCard from '@/components/ChatCard.vue';
import ChatFrindeCard from '@/components/ChatFrindeCard.vue';
import ChatNotification from '@/components/ChatNotification.vue';


</script>

<template>
    
<div class="chat-layout">

  <ChatNotification />

  <ChatCard />

  <ChatFrindeCard/>

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