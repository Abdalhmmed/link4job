<script setup>
import { onMounted, ref } from 'vue'
import { useNotificationsStore } from '@/stores/NotificationsStore'
import { useUserStore } from '@/stores/UserStore'
import { useLikesStore } from '@/stores/LikesStore'
import { useFollowersStore } from '@/stores/FollowersStore'
import dayjs from 'dayjs'

const NotificationsStore = useNotificationsStore()
const UsersStore = useUserStore()
const LikesStore = useLikesStore()
const FollowersStore = useFollowersStore()

const id = localStorage.getItem("userId")
const notifications = ref([])
const user = ref({})
const like = ref({})
const follow = ref({})

function truncateMessage(msg, maxLength = 30) {
  if (!msg) return ''
  return msg.length > maxLength ? msg.slice(0, maxLength) + '…' : msg
}

function removeNotification(n) {
  const index = notifications.value.indexOf(n)
  if (index > -1) notifications.value.splice(index, 1)
}

onMounted(async () => {
  try {
    user.value = await UsersStore.fetchUserById(id)
    if (user.value) {
      like.value = await LikesStore.countLikesById(id, 'user')
      follow.value = await FollowersStore.countFollowersById(id, 'user')
      const raw = await NotificationsStore.fetchNotificationByUserId(id)
      notifications.value = raw.map((n) => ({
        ...n,
        message: truncateMessage(n.message),
        date: dayjs(n.created_at || new Date()).format('DD MMM YYYY - hh:mm A'),
      }))
    }
  } catch (error) {
    console.error('error message: ', error)
  }
})
</script>

<template>
  <div class="profile-wrapper">
    <article class="profile-card">
      <div class="profile-banner" style="background-image:url('https://picsum.photos/1000/1000')"></div>
      <div class="avatar-wrap">
        <img class="avatar" :src="`https://picsum.photos/500/500/?${user.id}`" alt="صورة المستخدم" />
      </div>
      <div class="profile-body">
        <div class="header" v-if="UsersStore.loading">
          <div class="skeleton skeleton-title mb-2"></div>
          <div class="skeleton skeleton-text mb-1"></div>
          <div class="skeleton skeleton-small"></div>
        </div>
        <div class="header" v-else>
          <div>
            <h4>{{ user.name }}</h4>
            <p class="role">{{ user.role }}</p>
            <small class="text-secondary">{{ user.address }} • {{ user.industry }}</small>
          </div>
          <span class="badge bg-success-subtle text-success">مؤكد</span>
        </div>
        <div class="profile-stats">
          <div class="stat">
            <div v-if="LikesStore.loading" class="skeleton skeleton-number"></div>
            <div v-else class="value">{{ like }}</div>
            <small>إعجابات</small>
          </div>
          <div class="stat">
            <div v-if="FollowersStore.loading" class="skeleton skeleton-number"></div>
            <div v-else class="value">{{ follow }}</div>
            <small>متابعون</small>
          </div>
        </div>
        <hr class="divider" />
        <div class="notifications">
          <div class="header mb-2 d-flex justify-content-between align-items-center">
            <samp>الإشعارات</samp>
          </div>
          <div v-if="NotificationsStore.loading" class="notifications-loading">
            <div class="skeleton skeleton-notification mb-2" v-for="i in 3" :key="i"></div>
          </div>
          <transition-group name="fade" tag="div" class="notifications-list p-2" v-else>
            <div
              v-for="n in notifications.slice(0, 10)"
              :key="n.id"
              class="notification-card p-3 mb-2 rounded shadow-sm"
              :class="'notification-' + n.reactant_type"
            >
              <div class="d-flex justify-content-between align-items-start">
                <div class="content d-flex align-items-start gap-2">
                  <i :class="'bi ' + n.icon + ' fs-5 icon-' + n.reactant_type"></i>
                  <div>
                    <strong class="d-block mb-1">{{ n.title }}</strong>
                    <span class="notification-text">{{ n.message }}</span>
                    <div class="date mt-1 text-muted">{{ n.date }}</div>
                  </div>
                </div>
                <button class="remove-btn fs-4" @click="removeNotification(n)">&times;</button>
              </div>
            </div>
            <div v-if="notifications && notifications.length === 0" class="notification-card p-3 mb-2 text-center text-muted">
              لا توجد إشعارات
            </div>
          </transition-group>
          <div class="footer mt-2">
            <button class="btn btn-outline-primary w-100 position-relative">
              <span v-if="notifications && notifications.length > 3" class="notifications-count-badge">
                {{ notifications.length > 99 ? '99+' : notifications.length }}
              </span>
              <i class="bi bi-list-check"></i> عرض جميع الإشعارات
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
:root {
  --brand: #4f46e5;
  --accent: #22c55e;
  --text-dark: #1f2937;
  --text-muted: #6b7280;
  --bg-light: #f9fafb;
}
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: var(--bg-light);
}
.profile-card {
  width: 25rem;
  max-width: 340px;
  height: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
  position: relative;
  transition: transform 0.3s ease;
  scrollbar-width: thin;
}
.profile-card::-webkit-scrollbar {
  width: 6px;
}
.profile-card::-webkit-scrollbar-thumb {
  background-color: #cfcfcf;
  border-radius: 10px;
}
.profile-banner {
  height: 140px;
  background-size: cover;
  background-position: center;
  border: 7px solid #ffffff;
}
.avatar-wrap {
  position: absolute;
  top: 80px;
  left: 50%;
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
.header h4 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-dark);
}
.role {
  font-size: 0.9rem;
  color: var(--accent);
}
.divider {
  border: none;
  border-top: 1px solid #eee;
  margin: 1rem 0;
}
.profile-stats {
  display: flex;
  justify-content: space-around;
  margin: 1.2rem 0;
}
.stat .value {
  font-weight: bold;
  font-size: 1.2rem;
}
.stat small {
  color: var(--text-muted);
}
.notifications {
  text-align: right;
  direction: rtl;
}
.notification-card {
  padding: 0.75rem 1rem !important;
  font-size: 0.8rem !important;
  border-radius: 12px;
  transition: transform 0.25s ease;
}
.notification-card:hover {
  transform: scale(1.02);
}
.notification-text {
  font-size: 0.75rem !important;
  color: #333;
  line-height: 1.3;
}
.icon-system,
.icon-user,
.icon-security,
.icon-company {
  font-size: 1rem !important;
}
.notification-system { background-color: #fff8e1; }
.notification-user { background-color: #e7f1ff; }
.notification-security { background-color: #ffe5e5; }
.notification-company { background-color: #e6f7e6; }
.icon-system { color: #f5c518; }
.icon-user { color: #1890ff; }
.icon-security { color: #ff4d4f; }
.icon-company { color: #52c41a; }
.remove-btn {
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
}
.remove-btn:hover {
  color: #000;
}
.notifications-count-badge {
  position: absolute;
  background-color: #ff3b30;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
}
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
</style>
