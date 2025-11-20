<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useCommentsStore } from "@/stores/CommentsStore";
import { useLikesStore } from "@/stores/LikesStore";
import { useUserStore } from "@/stores/UserStore";

const router = useRouter();

const CommentsStore = useCommentsStore();
const LikesStore = useLikesStore();
const UserStore = useUserStore();

const props = defineProps({
  post: {
    type: Object,
    default: () => ({
      id: "0",
      title: "error",
      author: "error",
      avatar: "error",
      date: "error",
      content: "error",
      liked: false,
      commentsVisible: false,
      likes: 0,
      user_id: null,
    }),
  },
});

const placeholderAvatar = "https://picsum.photos/80";

const commentsVisible = ref(props.post.commentsVisible);
const liked = ref(!!props.post.liked);
const likesCount = ref(props.post.likes || 0);
const commentsCount = ref(0);
const userPosting = ref({ name: props.post.author, role: "عضو" });

const comments = ref([]);
const users = ref({});

async function refreshData() {
  commentsCount.value = await CommentsStore.countCommentsById(props.post.id, "post");
  likesCount.value = await LikesStore.countLikesById(props.post.id, "post");

  if (props.post.user_id) {
    const user = await UserStore.fetchUserById(props.post.user_id);
    userPosting.value = user || { name: props.post.author, role: "عضو" };
  }
}

async function loadCommentsAndUsers() {
  try {
    comments.value = await CommentsStore.filterCommentsByPostId(props.post.id);

    if (comments.value.length > 0) {
      const allUsers = await UserStore.fetchUsers();
      const commentUserIds = new Set(comments.value.map(c => c.user_id));
      const filteredUsers = allUsers.filter(u => commentUserIds.has(u.id));

      const userMap = {};
      filteredUsers.forEach(u => {
        userMap[u.id] = u;
      });
      users.value = userMap;
    } else {
      users.value = {};
    }
  } catch (error) {
    console.error('Failed loading comments or users:', error);
    comments.value = [];
    users.value = {};
  }
}

onMounted(async () => {
  await refreshData();
  if (commentsVisible.value) {
    await loadCommentsAndUsers();
  }
});

watch(commentsVisible, async (newVal) => {
  if (newVal) {
    await loadCommentsAndUsers();
  }
});

function toggleComments() {
  commentsVisible.value = !commentsVisible.value;
}

function goToDetails() {
  router.push({ name: "PostPage", params: { id: props.post.id } }).catch(() => {});
}

function openAuthorProfile() {
  if (props.post.user_id) {
    router.push({ name: "ProfilePage", params: { id: props.post.user_id } }).catch(() => {});
  }
}

async function toggleLike() {
  if (liked.value) {
    liked.value = false;
    likesCount.value = Math.max(0, likesCount.value - 1);
    await LikesStore.removeLike(props.post.id, "post");
  } else {
    liked.value = true;
    likesCount.value++;
    await LikesStore.addLike(props.post.id, "post");
  }
}


const loading = computed(() => CommentsStore.loading);

</script>

<template>
  <section v-if="loading" class="feed-wrapper">
    <article v-for="n in 4" :key="n" class="post skeleton">
      <div class="skeleton-line shimmer"></div>
      <div class="meta">
        <div class="skeleton-avatar shimmer"></div>
        <div class="meta-body">
          <div class="skeleton-text shimmer" style="width: 40%; height: 14px"></div>
          <div class="skeleton-text shimmer" style="width: 60%; height: 12px"></div>
        </div>
      </div>
      <div class="skeleton-text shimmer" style="width: 90%; height: 12px; margin-top: 14px"></div>
      <div class="skeleton-text shimmer" style="width: 80%; height: 12px"></div>
      <div class="skeleton-image shimmer" style="margin-top: 14px"></div>
    </article>
  </section>

  <main v-else class="post-wrapper">
    <div class="controls d-flex justify-content-between">
      <div class="small-muted">{{ props.post.date }}</div>
    </div>

    <div class="post">
      <div class="post-header" @click="openAuthorProfile" style="cursor: pointer;">
        <img :src="`https://picsum.photos/44/44?${userPosting.id}`" alt="صورة المستخدم" class="avatar" />
        <div>
          <strong>{{ userPosting.name }}</strong>
          <div class="small-muted">{{ userPosting.role }}</div>
        </div>
      </div>

      <h4 v-if="props.post.title" class="fw-bold mb-2">{{ props.post.title }}</h4>
      <p class="text-secondary">{{ props.post.content }}</p>

      <div class="like-comment">
        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-sm btn-light btn-like"
            :class="{ active: liked }"
            @click="toggleLike"
            :aria-pressed="String(liked)"
            title="إعجاب"
          >
            <i :class="liked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
            <strong class="ms-1">{{ likesCount }}</strong>
          </button>
          <span class="text-muted">الإعجابات</span>

          <button class="btn btn-sm btn-light" title="مشاركة">
            <i class="bi bi-share-fill"></i>
          </button>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-light" @click="toggleComments" title="عرض/إخفاء التعليقات">
            <i class="bi bi-chat"></i>
            <strong class="ms-1">
              <span class="text-muted">تعليقات</span> {{ commentsCount }}
            </strong>
          </button>

          <button class="btn btn-sm btn-light" @click="goToDetails" title="تفاصيل المنشور">
            <i class="bi bi-info-circle"></i> تفاصيل
          </button>
        </div>
      </div>
    </div>

    

    <div v-if="commentsVisible" class="comments-list mt-4">
      <hr>
      <div v-if="loading" class="text-center text-muted py-3">
        <i class="bi bi-arrow-repeat spin"></i>
      </div>

      <div v-else-if="comments.length === 0" class="text-center text-muted py-3">
        لا توجد تعليقات بعد، كن أول من يشارك رأيه
      </div>

      <div v-else>
        <div v-for="comment in comments" :key="comment.id" class="comment d-flex gap-2 mb-3">
          <img
            :src="users[comment.user_id]?.avatar_url || `https://picsum.photos/44/44?${comment.user_id}`"
            alt="avatar"
            class="avatar rounded-circle"
            width="44"
            height="44"
          />
          <div class="comment-body flex-grow-1">
            <router-link
              :to="{ name: 'ProfilePage', params: { id: comment.user_id } }"
              class="comment-user d-block"
            >
              <strong>{{ users[comment.user_id]?.name || 'مستخدم مجهول' }}</strong>
              <div class="small-muted">{{ users[comment.user_id]?.role || 'عضو' }}</div>
            </router-link>

            <p class="comment-text mb-0">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.post-wrapper {
  font-family: "Noto Sans Arabic", sans-serif;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgb(0 0 0 / 0.05);
}

.post {
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  cursor: pointer;
  padding-bottom: 0.5rem;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.post-header div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-header strong {
  font-size: 1.1rem;
  color: #222;
}

.small-muted {
  color: #666;
  font-size: 0.85rem;
  margin-top: 2px;
  user-select: none;
}

h4 {
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #111;
}

.text-secondary {
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 16px;
  white-space: pre-wrap;
}

.like-comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.like-comment > div {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-like {
  background-color: transparent;
  border: none;
  color: #666;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-like i {
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.btn-sm.btn-light {
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-sm.btn-light:hover {
  background-color: #f0f0f0;
}

.controls {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 12px;
  text-align: right;
  user-select: none;
}

.comments-list {
  font-family: "Noto Sans Arabic", sans-serif;
  margin-top: 1.25rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgb(0 0 0 / 0.05);
  padding: 1rem 1.25rem;
}

.comment {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 12px;
  border-radius: 12px;
  background-color: #f5f7fa;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.03);
}

.avatar.rounded-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 3px 8px rgba(0,0,0,0.12);
  flex-shrink: 0;
}

.comment-body {
  flex: 1;
}

.comment-user {
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  color: #222 !important;
  border-radius: 10px;
  user-select: none;
}

.comment-user strong {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2px;
}

.comment-text {
  margin-top: 6px;
  font-size: 0.97rem;
  color: #333;
  white-space: pre-wrap;
  line-height: 1.4;
}

.small-muted {
  color: #666;
  font-size: 0.82rem;
}

.text-center.text-muted.py-3 {
  font-size: 1rem;
  color: #999;
  padding: 1rem 0;
}

.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
  color: #888;
  font-size: 1.4rem;
  user-select: none;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* skeleton loading */
.skeleton-line,
.skeleton-text,
.skeleton-avatar,
.skeleton-image {
  background: #eee;
  border-radius: 6px;
}

.skeleton-line {
  height: 12px;
  margin-bottom: 10px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton-text {
  height: 14px;
  margin-bottom: 8px;
}

.skeleton-image {
  width: 100%;
  height: 160px;
  border-radius: 12px;
}

.shimmer {
  animation: shimmer 1.5s infinite linear;
  background: linear-gradient(
    to right,
    #eeeeee 0%,
    #dddddd 50%,
    #eeeeee 100%
  );
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
