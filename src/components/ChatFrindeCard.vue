<script setup>
import { ref, provide } from 'vue';
import ChatCard from '@/components/ChatCard.vue';
import ChatFrindeCard from '@/components/ChatFrindeCard.vue';
import ChatNotification from '@/components/ChatNotification.vue';

const ChatId = ref(null);
const Notification = ref(false);

provide('ChatId', ChatId);
provide('Notification', Notification);

const showFriends = ref(false);
const showNotifications = ref(false);

function closeAllDrawers() {
  showFriends.value = false;
  showNotifications.value = false;
}

function toggleFriends() {
  showNotifications.value = false;
  showFriends.value = !showFriends.value;
}

function toggleNotifications() {
  showFriends.value = false;
  showNotifications.value = !showNotifications.value;
}
</script>

<template>
  <div class="chat-layout">
    <div v-if="showFriends || showNotifications" class="mobile-overlay" @click="closeAllDrawers"></div>

    <ChatNotification class="panel notifications-panel" :class="[{ 'drawer-right': true, active: showNotifications }]"/>

    <ChatCard class="panel chat-panel" />

    <ChatFrindeCard class="panel friends-panel" :class="[{ 'drawer-left': true, active: showFriends }]"/>

    <div class="mobile-fab d-md-none">
      <button class="fab-btn" @click="toggleFriends">
        <i class="bi bi-people"></i>
      </button>

      <button class="fab-btn" @click="toggleNotifications">
        <i class="bi bi-bell"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-layout {
  display: grid;
  grid-template-columns: 16% 64% 20%;
  min-height: 100vh;
  gap: 10px;
  margin: 1rem 0;
  align-items: start;
  position: relative;
}

.panel {
  background: transparent;
}

.chat-panel {
  overflow: visible;
}

.friends-panel,
.notifications-panel {
  background: #fff;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  overflow-y: auto;
  height: 90vh;
  border-radius: 12px;
  transition: transform .35s ease;
  z-index: 10;
}

.chat-topbar {
  display: none;
  position: sticky;
  top: 0;
  z-index: 30;
  background: #ffffff;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 50;
}

.mobile-fab {
  position: fixed;
  right: 16px;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 60;
}

.fab-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
  border: none;
  box-shadow: 0 6px 18px rgba(79,70,229,0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.drawer-left,
.drawer-right {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 82%;
  height: 100vh;
  max-width: 420px;
  z-index: 55;
  transition: transform .35s ease;
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.12);
  transform: translateX(-122%);
}

.drawer-right {
  right: 0;
  left: auto;
  transform: translateX(122%);
}

.drawer-left.active {
  transform: translateX(-22%);
}

.drawer-right.active {
  transform: translateX(0);
}

@media (max-width: 991.98px) {
  .chat-layout {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0 12px;
  }

  .friends-panel,
  .notifications-panel {
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }

  .friends-panel.active,
  .notifications-panel.active {
    box-shadow: 0 0 30px rgba(0,0,0,0.25);
  }

  .mobile-fab { display: flex; }
}

@media (min-width: 992px) {
  .drawer-left,
  .drawer-right {
    position: static;
    transform: none;
    width: auto;
    max-width: none;
    height: auto;
    box-shadow: none;
    background: transparent;
  }

  .mobile-overlay { display: none; }
  .mobile-fab { display: none; }
  .chat-topbar { display: none; }
}
</style>
