<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

import FriendsCard from "@/components/FriendsCard.vue";
import UserCard from "@/components/UserCard.vue";
import CommentCard from "@/components/CommentCard.vue";
import UsersSearch from "@/components/UsersSearch.vue";

import { usePostsStore } from "@/stores/PostsStore";
import { useLikesStore } from "@/stores/LikesStore";
import { useCommentsStore } from "@/stores/CommentsStore";
import { useUserStore } from "@/stores/UserStore";

const router = useRouter();
const route = useRoute();

const PostStore = usePostsStore();
const LikesStore = useLikesStore();
const CommentsStore = useCommentsStore();
const UserStore = useUserStore();

const post = ref(null);
const author = ref(null);
const likes = ref([]);
const commentsCount = ref(0);
const loading = ref(true);
const newComment = ref("");

const lastScroll = ref(0);
const navbarHidden = ref(false);
const sticky = ref(false);

const drawerState = ref({
  user: false,
  friends: false,
  search: false,
});

function closeAll() {
  Object.keys(drawerState.value).forEach(k => (drawerState.value[k] = false));
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
  if (e.key === "Escape") closeAll();
}

async function fetchPostData() {
  const id = Number(route.params.id);
  if (!id) return;
  loading.value = true;
  try {
    post.value = await PostStore.fetchPostById(id);
    if (!post.value) return;
    const [user, likeList, count] = await Promise.all([
      UserStore.fetchUserById(post.value.user_id),
      LikesStore.filterLikesByPostId(id),
      CommentsStore.countCommentsById(id, "post"),
    ]);
    author.value = user;
    likes.value = likeList || [];
    commentsCount.value = count;
    post.value.liked = likes.value.some(
      (l) => l.user_id === UserStore.currentUser?.id
    );
    post.value.likes = likes.value.length;
  } finally {
    loading.value = false;
  }
}

function toggleLike() {
  if (!post.value) return;
  if (post.value.liked) {
    post.value.liked = false;
    post.value.likes = Math.max(0, post.value.likes - 1);
    LikesStore.removeLike(post.value.id, UserStore.currentUser.id);
  } else {
    post.value.liked = true;
    post.value.likes++;
    LikesStore.addLike({
      post_id: post.value.id,
      user_id: UserStore.currentUser.id,
    });
  }
}

function goBack() {
  router.back();
}

onMounted(() => {
  fetchPostData();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKey);
});
</script>

<template>
  <div class="page-wrap">
    <header class="top-actions navbar" :class="{ sticky, hidden: navbarHidden }">
      <div class="actions-inner">
        <div class="action-block">
          <button class="action-btn" @click="toggleDrawer('user')" :aria-pressed="String(drawerState.user)">
            <i class="bi bi-person-circle"></i>
          </button>
          <div class="action-label">بيانات</div>
        </div>

        <div class="action-block">
          <button class="action-btn" @click="toggleDrawer('friends')" :aria-pressed="String(drawerState.friends)">
            <i class="bi bi-people"></i>
          </button>
          <div class="action-label">الأصدقاء</div>
        </div>

        <div class="action-block">
          <button class="action-btn" @click="toggleDrawer('search')" :aria-pressed="String(drawerState.search)">
            <i class="bi bi-search"></i>
          </button>
          <div class="action-label">بحث</div>
        </div>
      </div>
    </header>

    <main class="post-page">
      <aside class="left-col">
        <UserCard />
      </aside>

      <section class="center-col">
        <div class="main-wrap">
          <div class="actions-top">
            <button class="beak-arrow" @click="goBack">
              <i class="bi bi-arrow-90deg-right"></i>
            </button>

            <button class="beak-arrow">
              <i class="bi bi-share-fill"></i>
            </button>
          </div>

          <div v-if="loading" class="post shimmer postCard">
            <div class="post-header mb-3" style="width: 680px; height: 417px;"></div>
          </div>

          <div v-else-if="post" class="post">
            <router-link
              :to="{ name: 'ProfilePage', params: { id: author?.id } }"
              class="post-header mb-3"
            >
              <img
                :src="author?.avatar_url || 'https://picsum.photos/200'"
                alt="user"
                class="avatar"
              />
              <div>
                <strong>{{ author?.name || 'مستخدم مجهول' }}</strong>
                <div class="small-muted">{{ author?.role || 'عضو' }}</div>
              </div>
            </router-link>

            <h4 class="fw-bold mb-2">{{ post.title }}</h4>
            <p class="text-secondary">{{ post.content }}</p>

            <img
              v-if="post.image"
              :src="post.image"
              alt="post"
              class="post-img mb-3"
            />

            <div class="like-comment">
              <div>
                <button
                  class="btn btn-sm btn-light btn-like"
                  :class="{ active: post.liked }"
                  @click="toggleLike"
                  :aria-pressed="post.liked.toString()"
                >
                  <i :class="post.liked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'" class="m-1"></i>
                  <strong>{{ post.likes }}</strong>
                </button>
                الاعجابات
              </div>

              <div>
                <i class="bi bi-chat text-secondary me-1"></i>
                <strong>{{ commentsCount }}</strong> تعليقات
              </div>
            </div>

            <div class="comment-input mt-3">
              <img
                :src="UserStore.currentUser?.avatar_url || 'https://picsum.photos/40'"
                alt="avatar"
                class="avatar"
              />

              <div class="input-area">
                <textarea
                  v-model="newComment"
                  class="form-control"
                  rows="2"
                  placeholder="اكتب تعليقك هنا..."
                ></textarea>
              </div>

              <button class="send-btn">
                <i class="bi bi-send"></i>
              </button>
            </div>

            <CommentCard :post="post.id" />
          </div>
        </div>
      </section>

      <aside class="right-col">
        <FriendsCard />
      </aside>
    </main>

    <div
      v-if="drawerState.user || drawerState.friends || drawerState.search"
      class="overlay"
      @click="closeAll"
    ></div>

    <aside class="drawer drawer-user" :class="{ active: drawerState.user }" :aria-hidden="!drawerState.user">
      <UserCard />
    </aside>

    <aside class="drawer drawer-friends" :class="{ active: drawerState.friends }" :aria-hidden="!drawerState.friends">
      <FriendsCard />
    </aside>

    <aside class="drawer drawer-search" :class="{ active: drawerState.search }" :aria-hidden="!drawerState.search">
      <UsersSearch />
    </aside>
  </div>
</template>

<style scoped>
.page-wrap {
  padding: 1rem;
  font-family: "Noto Sans Arabic", sans-serif;
}

.top-actions {
  position: absolute;
  top: 3.5rem;
  left: 0;
  right: 0;
  padding: 1rem;
  background: white;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
}

.top-actions.sticky {
  position: fixed;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.top-actions.hidden {
  transform: translateY(-100%);
}

.actions-inner {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
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

.post-page {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 6rem;
}

.left-col {
  flex: 0 0 320px;
}

.center-col {
  flex: 1 1 720px;
  max-width: 720px;
  width: 100%;
}

.right-col {
  flex: 0 0 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-wrap {
  width: 100%;
  margin-top: 0;
}

.actions-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.beak-arrow {
  border: none;
  border-radius: 11px;
  width: 3rem;
  height: 3rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.08);
}

.post {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.08);
  transition: 0.3s;
}

.post:hover {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 15px;
  padding: 6px 1px;
  transition: 0.2s;
}

.post-header:hover {
  background: #f1f5f9;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
}

.post-img {
  width: 100%;
  border-radius: 12px;
  margin: 12px 0;
}

.like-comment {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 10px;
  color: #555;
  font-size: 14px;
}

.btn-like {
  border: none;
  background: #f3f4f6;
  padding: 6px 12px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-like.active {
  background: #fee2e2;
}

.comment-input {
  display: flex;
  gap: 10px;
  border-top: 1px solid #eee;
  padding-top: 12px;
  margin-top: 12px;
}

.input-area {
  flex-grow: 1;
}

.comment-input textarea {
  width: 100%;
  resize: none;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 8px 10px;
  font-size: 0.95rem;
}

.send-btn {
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 10px;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.small-muted {
  color: #777;
  font-size: 0.85rem;
}

.postCard {
  background-color: #cdcccc;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 100px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(900%);
  }
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 990;
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
  z-index: 1000;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  transition: right 0.32s ease, opacity 0.32s ease, transform 0.32s ease;
  opacity: 0;
  padding: 1rem;
}

.drawer.active {
  right: 4%;
  opacity: 1;
  transform: translateY(-50%);
}

@media (max-width: 991px) {
  .left-col,
  .right-col {
    display: none;
  }
  .post-page {
    margin-top: 4.5rem;
  }
  .drawer.active {
    top: 53%;
  }
}

@media (min-width: 992px) {
  .top-actions {
    display: none !important;
  }
}
</style>
