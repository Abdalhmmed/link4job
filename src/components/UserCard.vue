
<script setup>
import { useNotificationsStore } from '@/stores/NotificationsStore'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const NotificationsStore = useNotificationsStore()

const notifications = ref([])
const loading = ref(true)

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      id: '0',
      name: 'غير معروف',
      role: 'مدير',
      address: 'غير محدد',
      industry: 'الموضة',
    }),
  },
  like: { type: Number, default: 0 },
  follow: { type: Number, default: 0 },
})

function removeNotification(n) {
  const index = notifications.value.indexOf(n)
  if (index > -1) notifications.value.splice(index, 1)
}

onMounted(async () => {
  try {
    notifications.value = await NotificationsStore.fetchNotificationByUserId(props.user.id)
    notifications.value = notifications.value.map((n) => ({
      ...n,
      date: dayjs(n.created_at || new Date()).format('DD MMM YYYY - hh:mm A'),
    }))
  } catch (error) {
    console.error('خطأ أثناء تحميل الإشعارات:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="profile-wrapper">
    <article class="profile-card" role="region" aria-label="بطاقة المستخدم">
      <div
        class="profile-banner"
        style="background-image:url('https://picsum.photos/1000/1000')"
        aria-hidden="true"
      ></div>

      <div class="avatar-wrap">
        <img class="avatar" src="https://picsum.photos/500/500" alt="صورة المستخدم" />
      </div>

      <div class="profile-body">
        <div class="header">
          <div>
            <h4>{{ user.name }}</h4>
            <p class="role">{{ user.role }}</p>
            <small class="text-secondary">{{ user.address }} • {{ user.industry }}</small>
          </div>
          <span class="badge bg-success-subtle text-success">مؤكد</span>
        </div>

        <div class="profile-stats">
          <div class="stat">
            <div class="value">{{ like }}</div>
            <small>إعجابات</small>
          </div>
          <div class="stat">
            <div class="value">{{ follow }}</div>
            <small>متابعون</small>
          </div>
        </div>

        <hr class="divider" />

        <div class="notifications">
          <div class="header mb-2 d-flex justify-content-between align-items-center">
            <samp>الإشعارات</samp>
          </div>

          <div v-if="loading" class="text-center py-3 text-muted">
            <i class="bi bi-arrow-repeat spin"></i> جاري تحميل الإشعارات...
          </div>

          <transition-group name="fade" tag="div" class="notifications-list p-2" v-else>
            <div
              v-for="n in notifications.slice(0, 3)"
              :key="n.id"
              class="notification-card p-3 mb-2 rounded shadow-sm"
              :class="'notification-' + n.reactant_type"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div class="content d-flex align-items-start gap-2">
                  <i :class="'bi ' + n.icon + ' fs-5 icon-' + n.reactant_type"></i>
                  <div>
                    <strong class="d-block mb-1">{{ n.title }}</strong>
                    <span class="d-block">{{ n.message }}</span>
                    <div class="date mt-1 text-muted">{{ n.date }}</div>
                  </div>
                </div>
                <button class="remove-btn fs-4" @click="removeNotification(n)">&times;</button>
              </div>
            </div>

            <div
              v-if="notifications && notifications.length === 0"
              class="notification-card p-3 mb-2 text-center text-muted"
            >
              لا توجد إشعارات
            </div>
          </transition-group>

          <div class="footer mt-2">
            <button class="btn btn-outline-primary w-100">
              <div
              v-if="notifications && notifications.length > 3"
              class="notifications-count-badge"
              >
                {{ notifications.length > 99 ? '99+' : notifications.length }}
              </div>
              <i class="bi bi-list-check"></i> عرض جميع الإشعارات
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}


.notifications-list {
  position: relative;
}

.notification-card {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.notification-card:hover {
  transform: scale(1.02);
}

:root {
  --brand: #4f46e5;
  --accent: #22c55e;
  --text-dark: #1f2937;
  --text-muted: #6b7280;
  --bg-light: #f9fafb;
}

/* تنسيق عام */
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: var(--bg-light);
}

.profile-card {
  width: 100%;
  max-width: 340px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.profile-banner {
  height: 140px;
  background-size: cover;
  background-position: center;
}

.avatar-wrap {
  position: absolute;
  top: 204px;
  left: 76.5%;
  transform: translateX(-50%);
}

.avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}

.profile-body {
  padding: 80px 20px 25px;
  text-align: center;
}

.header {
  margin-bottom: 1rem;
}
.header h4 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-dark);
}
.header .role {
  font-size: 0.9rem;
  color: var(--accent);
  margin-top: 2px;
  margin-bottom: 2px;
}

.badge {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 8px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin: 1.2rem 0;
}
.stat {
  text-align: center;
}
.stat .value {
  font-weight: bold;
  font-size: 1.2rem;
}
.stat small {
  color: var(--text-muted);
}

.divider {
  border: none;
  border-top: 1px solid #eee;
  margin: 1rem 0;
}

.notifications {
  text-align: right;
  direction: rtl;
}

.btn-contact {
  margin-top: 1rem;
  background: linear-gradient(90deg, var(--accent), var(--brand));
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
  display: inline-block;
  text-decoration: none;
}
.btn-contact:hover {
  opacity: 0.85;
}

/* الرسوم */
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.notification-card.notification-system {
  background-color: #fff8e1;
}
.notification-card.notification-user {
  background-color: #e7f1ff;
}
.notification-card.notification-security {
  background-color: #ffe5e5;
}
.notification-card.notification-company {
  background-color: #e6f7e6;
}

.icon-system {
  color: #f5c518;
}
.icon-user {
  color: #1890ff;
}
.icon-security {
  color: #ff4d4f;
}
.icon-company {
  color: #52c41a;
}

/* مؤثرات */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* الشاشات الصغيرة */
@media (max-width: 520px) {
  .profile-card {
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
  .avatar {
    width: 95px;
    height: 95px;
  }
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

</style>
