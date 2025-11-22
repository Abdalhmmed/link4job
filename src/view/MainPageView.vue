<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import UserCard from '@/components/UserCard.vue';
import MainPosCard from '@/components/MainPosCard.vue';
import FriendsCard from '@/components/FriendsCard.vue';
import UsersSearch from '@/components/UsersSearch.vue';

const lastScroll = ref(0);
const navbarHidden = ref(false);
const sticky = ref(false);

const drawerState = ref({
  user: false,
  friends: false,
  search: false,
  composer: false,
});

function closeAll() {
  drawerState.value.user = false;
  drawerState.value.friends = false;
  drawerState.value.search = false;
  drawerState.value.composer = false;
}

function toggleDrawer(key) {
  for (const k in drawerState.value) {
    drawerState.value[k] = k === key ? !drawerState.value[k] : false;
  }
}

function handleScroll() {
  const current = window.scrollY || window.pageYOffset;
  sticky.value = current > 50;
  if (sticky.value) {
    navbarHidden.value = current > lastScroll.value;
  } else {
    navbarHidden.value = false;
  }
  lastScroll.value = current;
}

function handleKey(e) {
  if (e.key === 'Escape') closeAll();
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('keydown', handleKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKey);
});
</script>

<template>
  <div class="page-wrap">
    <header
      class="top-actions navbar"
      :class="{ sticky: sticky, hidden: navbarHidden }"
    >
      <div class="actions-inner">
        <div class="action-block">
          <button
            class="action-btn"
            @click="toggleDrawer('user')"
            :aria-pressed="String(drawerState.user)"
          >
            <i class="bi bi-person-circle"></i>
          </button>
          <div class="action-label">بيانات الحساب</div>
        </div>

        <div class="action-block">
          <button
            class="action-btn"
            @click="toggleDrawer('friends')"
            :aria-pressed="String(drawerState.friends)"
          >
            <i class="bi bi-people"></i>
          </button>
          <div class="action-label">الأصدقاء</div>
        </div>

        <div class="action-block">
          <button
            class="action-btn"
            @click="toggleDrawer('search')"
            :aria-pressed="String(drawerState.search)"
          >
            <i class="bi bi-search"></i>
          </button>
          <div class="action-label">بحث</div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="left-col">
        <UserCard />
      </section>

      <section class="center-col">
        <MainPosCard v-model:composerVisible="drawerState.composer" />
      </section>

      <section class="right-col">
        <FriendsCard />
        <UsersSearch />
      </section>
    </main>

    <div
      v-if="drawerState.user || drawerState.friends || drawerState.search || drawerState.composer"
      class="overlay"
      @click="closeAll"
    ></div>

    <aside
      class="drawer drawer-user"
      :class="{ active: drawerState.user }"
      aria-hidden="!drawerState.user"
    >
      <UserCard />
    </aside>

    <aside
      class="drawer drawer-friends"
      :class="{ active: drawerState.friends }"
      aria-hidden="!drawerState.friends"
    >
      <FriendsCard />
    </aside>

    <aside
      class="drawer drawer-search"
      :class="{ active: drawerState.search }"
      aria-hidden="!drawerState.search"
    >
      <UsersSearch />
    </aside>
  </div>
</template>

<style scoped>
.page-wrap {
  padding: 1rem;
}

.navbar {
  position: absolute;
  top: 3.5rem;
  left: 0;
  right: 0;
  padding: 1rem;
  background: white;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
}

.navbar.sticky {
  position: fixed;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.navbar.hidden {
  transform: translateY(-100%);
}

.actions-inner {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.action-block {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.action-label {
  font-size: 0.95rem;
  color: #333;
  user-select: none;
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: none;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  cursor: pointer;
}

.content {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  justify-content: center;
  margin-top: 1rem;
}

.left-col {
  flex: 0 0 320px;
}

.center-col {
  flex: 1 1 720px;
  max-width: 880px;
  width: 100%;
}

.right-col {
  flex: 0 0 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 90;
}

.drawer {
  position: fixed;
  top: 500%;
  right: -120%;
  transform: translateY(-50%);
  width: 92%;
  max-width: 420px;
  max-height: 88vh;
  overflow-y: auto;
  background: #fff;
  z-index: 100;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  transition: right 0.32s ease, transform 0.32s ease, opacity 0.32s ease;
  opacity: 0;
  padding: 1rem;
}

.drawer.active {
  right: 4%;
  opacity: 1;
  transform: translateY(-50%);
}

@media (max-width: 991px) {
  .content {
    flex-direction: column;
    align-items: stretch;
  }

  .left-col,
  .right-col {
    display: none;
  }

  .center-col {
    width: 100%;
    max-width: 100%;
  }

  .drawer.active {
    right: 4%;
  }
}

.open-composer-btn {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  background: #007bff;
  color: white;
  border: none;
  padding: 14px 18px;
  border-radius: 50px;
  font-size: 20px;
  z-index: 1002;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (min-width: 769px) {
  .open-composer-btn {
    display: none;
  }
}

@media (min-width: 992px) {
  .navbar {
    display: none !important;
  }
}

</style>
