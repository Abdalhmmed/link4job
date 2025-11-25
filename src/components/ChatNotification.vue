<script setup>
import { useNotificationsStore } from '@/stores/NotificationsStore'
import { ref, inject, onMounted } from 'vue'

const NotificationsStore = useNotificationsStore()
const Notification = inject("Notification")
const notifications = ref([])

function closeNotificationCard() {
  Notification.value = false
}

function removeNotification(n) {
  const index = notifications.value.indexOf(n)
  if (index > -1) notifications.value.splice(index, 1)
}

onMounted(async () => {
  try {
    notifications.value = await NotificationsStore.fetchNotificationByUserId(localStorage.getItem("userId"))
  } catch (e) {
    notifications.value = []
  }
})
</script>

<template>
  <div class="notifications-panel">
    <div class="notifications-header">
      <h6 class="m-0">الإشعارات</h6>
      <button class="btn-close" @click="closeNotificationCard()"></button>
    </div>

    <div v-if="NotificationsStore.loading">
      <div v-for="n in 3" :key="`skeleton-${n}`" class="notification-loading shimmer"></div>
    </div>

    <div v-else>
      <div v-for="n in notifications" :key="n.id" class="notification-item" :class="'notification-' + n.reactant_type">
        <i :class="'bi ' + n.icon + ' icon-' + n.reactant_type"></i>
        <div class="notification-text">
          <strong>{{ n.title }}</strong>
          <p>{{ n.message }}</p>
          <span class="date">{{ n.date }}</span>
        </div>
        <button class="remove-btn" @click="removeNotification(n)">&times;</button>
      </div>

      <div v-if="notifications.length === 0" class="no-notifications">
        لا توجد إشعارات حالياً
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-loading {
  display: flex;
  align-items: flex-start;
  background-color: #f2f2f2;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin: 0.8rem;
  padding: 1rem;
  gap: 10px;
  height: 6rem;
}

.shimmer {
  position: relative;
  overflow: hidden;
  background: #d1d5db;
}
.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shimmer 1.6s infinite;
}
@keyframes shimmer {
  100% { left: 100%; }
}

.notifications-panel {
  background: #fff;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  overflow-y: auto;
  height: 90vh;
  border-radius: 12px;
  transition: transform .3s ease;
  z-index: 10;
  padding-bottom: 12px;
}

.notifications-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.btn-close {
  border: none;
  background: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
.btn-close:hover {
  color: #000;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
  position: relative;
  margin: 0.5rem;
  padding: 1rem;
  gap: 8px;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.notification-text {
  flex: 1;
  margin-left: 0.6rem;
}

.notification-text strong {
  display: block;
  font-size: 0.95rem;
  color: #222;
  margin-bottom: 0.2rem;
}

.notification-text p {
  margin: 0;
  font-size: 0.85rem;
  color: #555;
}

.notification-text .date {
  display: block;
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.3rem;
}

.remove-btn {
  border: none;
  background: none;
  color: #bbb;
  font-size: 1.3rem;
  cursor: pointer;
  position: absolute;
  top: 6px;
  left: 8px;
  transition: color 0.2s;
}
.remove-btn:hover {
  color: #444;
}

.notification-system { background-color: #fffceb; }
.notification-user { background-color: #f1f7ff; }
.notification-company { background-color: #f3fff3; }
.notification-security { background-color: #ffe5e5; }

.icon-system { color: #f5c518; font-size: 1.4rem; }
.icon-user { color: #2196f3; font-size: 1.4rem; }
.icon-company { color: #52c41a; font-size: 1.4rem; }
.icon-security { color: #ff4d4f; font-size: 1.4rem; }

.no-notifications {
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  padding: 2rem 0;
}

@media (min-width: 992px) {
  .notifications-panel { height: calc(100vh - 32px); border-radius: 12px; }
}
</style>
