<script setup>
import { useNotificationsStore } from '@/stores/NotificationsStore';
import { ref, inject, onMounted } from 'vue';

const NotificationsStore = useNotificationsStore()

const Notification = inject("Notification");

const notifications = ref([])

function closeNotificationCard() {
  Notification.value = false;
}

function removeNotification(n) {
  const index = notifications.indexOf(n);
  if(index > -1) notifications.splice(index, 1);
}


onMounted( async () => {
    notifications.value = await NotificationsStore.fetchNotificationByUserId(2)
    console.log("notifications: ", notifications.value)
})


</script>

<template>
  <div class="dropdown-notification shadow-lg" v-if="Notification">

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
        <button class="btn btn-outline-primary w-100"><i class="bi bi-list-check"></i> عرض المزيد</button>
    </div>
  </div>
</template>

<style scoped>
.dropdown-notification {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 22rem;
  max-height: 28rem;
  top: 4rem;
  left: 16rem;
  border-radius: 12px;
  background-color: #ffffff;
  overflow: hidden;
  z-index: 1000;
  font-family: 'Tajawal', sans-serif;
}

.header, .footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
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
}

.notification-card.notification-system { background-color: #fff8e1; }
.notification-card.notification-user { background-color: #e7f1ff; }
.notification-card.notification-security { background-color: #ffe5e5; }
.notification-card.notification-company { background-color: #e6f7e6; }

.notification-card .content strong { font-weight: 600; font-size: 0.9rem; }
.notification-card .content span { font-size: 0.85rem; }
.notification-card .date { font-size: 0.75rem; }

/* ألوان الأيقونات */
.icon-system { color: #f5c518; }   /* أصفر */
.icon-user { color: #1890ff; }     /* أزرق */
.icon-security { color: #ff4d4f; } /* أحمر */
.icon-company { color: #52c41a; }  /* أخضر */

.notifications-list::-webkit-scrollbar { width: 6px; }
.notifications-list::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 3px;
}

/* fade animation */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
