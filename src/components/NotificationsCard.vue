<script setup>
import { useNotificationsStore } from '@/stores/NotificationsStore';
import { ref, inject, onMounted, onBeforeUnmount, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({ mobile: { type: Boolean, default: false } });
const emit = defineEmits(['close', 'viewAll']);

const NotificationsStore = useNotificationsStore();
const Notification = inject('Notification');

const notifications = ref([]);
const isMobile = ref(window.innerWidth <= 991);

function handleResize() {
  isMobile.value = window.innerWidth <= 991;
}

onMounted(async () => {
  try {
    notifications.value = (await NotificationsStore.fetchNotificationByUserId(localStorage.getItem("userId"))) || [];
  } catch (e) {
    notifications.value = [];
  }
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

function closeNotificationCard() {
  if (Notification && typeof Notification === 'object') Notification.value = false;
  document.body.style.overflow = '';
  emit('close');
}

function removeNotification(n) {
  const index = notifications.value.findIndex(item => item.id === n.id);
  if (index > -1) notifications.value.splice(index, 1);
}

function viewAllNotifications() {
  emit('viewAll');
}
  
watch(() => Notification && Notification.value, (val) => {
  if (!val) document.body.style.overflow = '';
});
</script>

<template>
  <div
    class="dropdown-notification"
    :class="{ 'mobile-sheet': isMobile }"
    role="dialog"
    aria-modal="true"
  >
    <div class="header">
        <samp>الإشعارات</samp>
        <button class="close-btn fs-4" @click="closeNotificationCard">&times;</button>
    </div>

    <div class="notifications-list p-2">
        <div v-for="n in notifications" :key="n.id" class="notification-card p-3 mb-2 rounded shadow-sm" :class="'notification-' + n.reactant_type">
          <div class="d-flex justify-content-between align-items-start">
            <div class="content d-flex align-items-start gap-2">
              <i :class="'bi '+ n.icon + ' fs-5 icon-' + n.reactant_type"></i>
              <div>
                <strong class="d-block mb-1">{{ n.title }}</strong>
                <span class="d-block">{{ n.message }}</span>
                <div class="date mt-1 text-muted">{{ n.date }}</div>
              </div>
            </div>
            <button class="remove-btn fs-4" @click="removeNotification(n)">&times;</button>
          </div>
        </div>

      <div v-if="notifications.length === 0" class="notification-card p-3 mb-2 rounded shadow-sm text-center text-muted">
        لا توجد إشعارات
      </div>
    </div>

    <div class="footer">
        <button class="btn btn-outline-primary w-100" @click="viewAllNotifications">
          <div v-if="notifications && notifications.length > 3" class="notifications-count-badge">
            {{ notifications.length > 99 ? '99+' : notifications.length }}
          </div>
          <i class="bi bi-list-check"></i> عرض جميع الإشعارات 
        </button>
    </div>
  </div>
</template>

<style scoped>
.notifications-count-badge {
  position: absolute;
  background-color: #ff3b30;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.dropdown-notification {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 22rem;
  max-height: 28rem;
  top: 4rem;
  right: -8rem;
  border-radius: 12px;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1000;
  font-family: 'Tajawal', sans-serif;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.dropdown-notification.mobile-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  margin: 0;
  width: 100%;
  height: 60vh;
  max-height: 80vh;
  border-radius: 12px 12px 0 0;
  padding-bottom: 0;
  z-index: 2000;
  overflow: hidden;
  animation: slideUp 0.28s ease;
}

.header, .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.close-btn, .remove-btn {
  background-color: transparent;
  border: none;
  color: #878787;
  cursor: pointer;
  transition: 0.2s;
}
.close-btn:hover, .remove-btn:hover {
  color: #0c0b0b;
}

.notifications-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 0.6rem;
}

.notification-card.notification-system { background-color: #fff8e1; }
.notification-card.notification-user { background-color: #e7f1ff; }
.notification-card.notification-security { background-color: #ffe5e5; }
.notification-card.notification-company { background-color: #e6f7e6; }

.notification-card .content strong { font-weight: 600; font-size: 0.95rem; }
.notification-card .content span { font-size: 0.9rem; }
.notification-card .date { font-size: 0.75rem; color: #6b7280; }

.icon-system { color: #f5c518; }   
.icon-user { color: #1890ff; }     
.icon-security { color: #ff4d4f; } 
.icon-company { color: #52c41a; }  

.notifications-list::-webkit-scrollbar { width: 8px; }
.notifications-list::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.12);
  border-radius: 6px;
}

@keyframes slideUp {
  from { transform: translateY(12%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 991px) {
  .dropdown-notification { width: 100%; right: 0; top: auto; left: 0; }
}
</style>
