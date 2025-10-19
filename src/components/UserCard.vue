<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      id: '0',
      name: 'غير معروف',
      role: 'مدير',
      address: 'غير محدد',
      industry: 'الموضة'
    })
  },
  like: {
    type: Number,
    default: 0
  },
  follow: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="profile-wrapper">
    <article class="profile-card" role="region" aria-label="بطاقة المستخدم">
      <div 
        class="profile-banner" 
        style="background-image:url('https://picsum.photos/1000/1000')" 
        aria-hidden="true">
      </div>

      <div class="avatar-wrap">
        <img 
          class="avatar" 
          src="https://picsum.photos/500/500" 
          alt="صورة المستخدم">
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
          <h6>الإشعارات</h6>
          <ul>
            <li>🔔 متابع جديد — علي</li>
            <li>💬 تعليق جديد على منشورك</li>
            <li>🧾 تم استقبال طلب عرض سعر</li>
          </ul>
        </div>

        <button class="btn-contact" aria-label="تواصل">تواصل الآن</button>
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
  width: 100%;
  max-width: 340px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
  overflow: hidden;
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
.notifications h6 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.notifications ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}
.notifications li {
  padding: 3px 0;
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
}
.btn-contact:hover {
  opacity: 0.85;
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
