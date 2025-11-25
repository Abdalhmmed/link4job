<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import ChatCard from '@/components/ChatCard.vue'
import ChatFrindeCard from '@/components/ChatFrindeCard.vue'
import ChatNotification from '@/components/ChatNotification.vue'

const showFriends = ref(false)
const showNotifications = ref(false)
const isDesktop = ref(window.innerWidth >= 992)

function updateIsDesktop() {
  isDesktop.value = window.innerWidth >= 992
  if (isDesktop.value) {
    showFriends.value = true
    showNotifications.value = true
  } else {
    showFriends.value = false
    showNotifications.value = false
  }
}

onMounted(() => {
  updateIsDesktop()
  window.addEventListener('resize', updateIsDesktop)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsDesktop)
})

function closeAllDrawers() {
  if (!isDesktop.value) {
    showFriends.value = false
    showNotifications.value = false
  }
}

function toggleFriends() {
  if (isDesktop.value) return
  showNotifications.value = false
  showFriends.value = !showFriends.value
}

function toggleNotifications() {
  if (isDesktop.value) return
  showFriends.value = false
  showNotifications.value = !showNotifications.value
}

const showMobileOverlay = computed(() => (!isDesktop.value) && (showFriends.value || showNotifications.value))
</script>

<template>
  <div class="chat-layout">

    <div v-if="showMobileOverlay" class="mobile-overlay" @click="closeAllDrawers"></div>

    <aside
      :class="[
        isDesktop ? 'sidebar-left desktop-sidebar' : 'drawer-left',
        { active: showFriends && !isDesktop }
      ]"
      aria-hidden="!showFriends && !isDesktop"
    >
     <ChatNotification /> 
    </aside>

    <main class="chat-main">
      <div class="top-controls" v-if="!isDesktop">
        <button class="control-btn" @click="toggleNotifications" :aria-pressed="showFriends"><i class="bi bi-people"></i></button>
        <button class="control-btn" @click="toggleFriends" :aria-pressed="showNotifications"><i class="bi bi-bell"></i></button>
      </div>

      <ChatCard />
    </main>

    <aside
      :class="[
        isDesktop ? 'sidebar-right desktop-sidebar' : 'drawer-right',
        { active: showNotifications && !isDesktop }
      ]"
      aria-hidden="!showNotifications && !isDesktop"
    >
      <ChatFrindeCard />
    </aside>

  </div>
</template>

<style scoped>
.chat-layout {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;
  gap: 10px;
  margin: 1rem 0;
  position: relative;
  padding: 0 12px;
  justify-content: center;
}

.chat-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.top-controls {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 6px 4px;
  z-index: 20;
}

.control-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(0,0,0,0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  box-shadow: 0 6px 18px rgba(15,23,42,0.04);
  cursor: pointer;
}
.control-btn:active { transform: translateY(1px); }
.control-btn i { pointer-events: none; }

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 90;
}

.drawer-left,
.drawer-right {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 82%;
  max-width: 420px;
  height: 100vh;
  z-index: 95;
  transition: transform .35s ease;
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.12);
  border-radius: 0;
}

.drawer-left,
.drawer-right {
  z-index: 95;
}

.drawer-left {
  left: 0;
  transform: translateX(-110%);
}

.drawer-right {
  right: 0;
  transform: translateX(110%);
}

.drawer-left.active {
  transform: translateX(0);
}

.drawer-right.active {
  transform: translateX(0);
}

@media (min-width: 992px) {
  .chat-layout {
    grid-template-columns: 20% 60% 20%;
    gap: 18px;
    padding: 1rem 2rem;
    align-items: start;
  }

  .desktop-sidebar {
    position: static;
    transform: none !important;
    box-shadow: none;
    height: auto;
    width: 100%;
    z-index: auto;
  }

  .chat-main {
    display: block;
  }

  .top-controls {
    display: none;
  }

  .drawer-left,
  .drawer-right,
  .mobile-overlay {
    display: none;
  }
}

@media (max-width: 991px) {
  .desktop-sidebar {
    display: none;
  }
}
</style>