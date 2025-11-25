<script setup>
import { onMounted, onBeforeUnmount, provide, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import NotificationsCard from './NotificationsCard.vue';
import AuthModal from './AuthModal.vue';

const UserStore = useUserStore();

const Notification = ref(false);
provide("Notification", Notification);

const theAuthModal = ref(false);
provide("theAuthModal", theAuthModal);

const user = ref(null);

const loadUser = async () => {
  const id = localStorage.getItem("userId");
  if (id) {
    user.value = await UserStore.fetchUserById(id);
  } else {
    user.value = null;
  }
};

let lastUserId = localStorage.getItem("userId");

const checkUserIdChange = async () => {
  const currentId = localStorage.getItem("userId");
  if (currentId !== lastUserId) {
    lastUserId = currentId;
    await loadUser();
  }
};

let intervalId;

const isMobile = ref(window.innerWidth <= 991);

function handleResize() {
  isMobile.value = window.innerWidth <= 991;
  if (!isMobile.value) document.body.style.overflow = '';
}

onMounted(async () => {
  await loadUser();
  window.addEventListener("storage", loadUser);
  intervalId = setInterval(checkUserIdChange, 1000);
  window.addEventListener('resize', handleResize);

  // اذا ضغط المستخدم على زر الـ navbar (فتح/اغلاق القائمه) اغلق لوح الاشعارات لو كان مفتوحًا
  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.addEventListener('click', navTogglerListener);
  }

  // إذا كانت هناك أحداث كولابس من Bootstrap، استمع لحدث show.bs.collapse كي تغلق الاشعارات عند فتح الناف بار
  const collapseEl = document.getElementById('mainNav');
  if (collapseEl) {
    // حماية في حال لم يكن Bootstrap موجوداً
    try {
      collapseEl.addEventListener('show.bs.collapse', () => {
        if (Notification.value) {
          Notification.value = false;
          document.body.style.overflow = '';
        }
      });
    } catch (e) {
      // تجاهل إذا لم تتوفر أحداث bootstrap
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", loadUser);
  clearInterval(intervalId);
  window.removeEventListener('resize', handleResize);

  const toggler = document.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.removeEventListener('click', navTogglerListener);
  }

  const collapseEl = document.getElementById('mainNav');
  if (collapseEl) {
    try {
      collapseEl.removeEventListener('show.bs.collapse', () => {
        if (Notification.value) {
          Notification.value = false;
          document.body.style.overflow = '';
        }
      });
    } catch (e) {}
  }
});

function navTogglerListener() {
  if (isMobile.value && Notification.value) {
    Notification.value = false;
    document.body.style.overflow = '';
  }
}

function ObenNotification() {
  // اضغط مرتين يغلق ويعيد الفتح — سلوك تبديل
  if (Notification.value) {
    Notification.value = false;
    document.body.style.overflow = '';
  } else {
    Notification.value = true;
    if (isMobile.value) {
      // عند فتح اللوح في الهاتف امنع التمرير بالخلفية
      document.body.style.overflow = 'hidden';
    }
  }
}

function ObenAuthModal() {
  theAuthModal.value = true;
}
</script>

<template>
<nav class="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
  <div class="container">
    <router-link :to="{ name: 'HomePage' }" class="navbar-brand fw-bold">
      <i class="bi bi-stars me-1 text-primary"></i>
      <span class="gradient-text">Link 4 job</span>
    </router-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="mainNav">
      <ul v-if="!user" class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
        <li class="nav-item"><a class="nav-link active" href="#about">من نحن</a></li>
        <li class="nav-item"><a class="nav-link" href="#goals">أهدافنا</a></li>
        <li class="nav-item"><a class="nav-link" href="#achievements">إنجازاتنا</a></li>
        <li class="nav-item"><a class="nav-link" href="#contact">تواصل</a></li>
      </ul>

      <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
        <li class="nav-item"><router-link :to="{ name: 'MainPage' }" class="nav-link active">الصفحة العامة</router-link></li>
        <li class="nav-item"><router-link :to="{ name: 'JobsPage' }" class="nav-link">الوظائف</router-link></li>
        <li class="nav-item"><router-link :to="{ name: 'ChatPage' }" class="nav-link">الدردشة</router-link></li>
      </ul>

      <div v-if="!user" class="d-flex gap-2" @click="ObenAuthModal()">
        <a href="#contact" class="btn btn-outline-primary">تواصل معنا</a>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal">
          <i class="bi bi-person-circle ms-1"></i> دخول / حساب جديد
        </button>
      </div>

      <div v-else-if="user.account_type === 'user'" class="d-flex gap-2 align-items-center position-relative">
        <button
          @click="ObenNotification"
          class="btn btn-outline-secondary position-relative"
          type="button"
          :aria-expanded="Notification"
        >
          <i class="bi bi-bell"></i>
        </button>

        <NotificationsCard
          v-if="Notification"
          :mobile="isMobile"
          @close="Notification.value = false; document.body.style.overflow = ''"
        />

        <router-link :to="{ name: 'ProfilePage', params: { id: user.id } }">
          <button class="btn btn-primary">
            {{ user.name }} <i class="bi bi-person-circle ms-1"></i>
          </button>
        </router-link>
      </div>

      <div v-else-if="user.account_type === 'adminAccount'" class="d-flex gap-2 align-items-center position-relative">
        <button
          @click="ObenNotification"
          class="btn btn-outline-secondary position-relative"
          type="button"
          :aria-expanded="Notification"
        >
          <i class="bi bi-bell"></i>
        </button>

        <NotificationsCard
          v-if="Notification"
          :mobile="isMobile"
          @close="Notification.value = false; document.body.style.overflow = ''"
        />

        <router-link :to="{ name: 'CompanyPage', params: { id: user.id } }">
          <button class="btn btn-outline-primary">
            {{ user.name }} <i class="bi bi-building ms-1"></i>
          </button>
        </router-link>

        <router-link :to="{ name: 'ProfilePage', params: { id: user.id } }">
          <button class="btn btn-primary">
            {{ user.name }} <i class="bi bi-person-circle ms-1"></i>
          </button>
        </router-link>
      </div>

      <AuthModal v-if="theAuthModal" />
    </div>
  </div>
</nav>
</template>

<style scoped>
</style>
