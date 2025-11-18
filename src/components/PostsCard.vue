<script setup>
import { reactive, watch, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CommentCard from "./CommentCard.vue"; 
import { useCommentsStore } from "@/stores/CommentsStore";
import { useLikesStore } from "@/stores/LikesStore";
import { useUserStore } from "@/stores/UserStore";

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
      group: "error",
      content: "error",
      image: "error",
      images: [''],
      liked: false,
      commentsVisible: false,
    }),
  },
});

const router = useRouter();
const placeholderAvatar = "https://picsum.photos/80";

const postState = reactive({
  ...props.post,
  commentsVisible: props.post.commentsVisible ?? false,
  likes: props.post.likes ?? 0,
  liked: !!props.post.liked,
});

const commentsCount = ref(0);
const likesCount = ref(0);
const userPosting = ref('')

onMounted(async () => {
  commentsCount.value = await CommentsStore.countCommentsById(postState.id, "post");
  likesCount.value = await LikesStore.countLikesById(postState.id, "post");
  userPosting.value = await UserStore.fetchUserById(postState.user_id);
});

watch(
  () => props.post,
  (newP) => {
    Object.assign(postState, {
      ...newP,
      commentsVisible: newP.commentsVisible ?? postState.commentsVisible,
    });
  },
  { deep: true }
);

function toggleComments() {
  postState.commentsVisible = !postState.commentsVisible;
}

function goToDetails() {
  router.push({ name: "PostPage", params: { id: postState.id } }).catch(() => {});
}

function openAuthorProfile() {
  if (postState.user_id) {
    router.push({ name: "ProfilePage", params: { id: postState.user_id } }).catch(() => {});
  }
}

async function toggleLike() {
  postState.liked = !postState.liked;

  await LikesStore.toggleLike(postState.id, "post");

  likesCount.value = await LikesStore.countLikesById(postState.id, "post");
}

function shareClicked() {
  console.log("share clicked");
}
</script>

<template>
    <section v-if="CommentsStore.loading" class="feed-wrapper">
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
      <div class="small-muted">{{ postState.date }}</div>
    </div>

    <div class="post card">

      <div class="post-header" @click="openAuthorProfile">
        <img :src="postState.avatar || placeholderAvatar" alt="صورة المستخدم" class="avatar" />
        <div>
          <strong>{{ userPosting.name }}</strong>
          <div class="small-muted">{{ userPosting.role || 'عضو' }}</div>
        </div>
      </div>

      <h4 v-if="postState.title" class="fw-bold mb-2">{{ postState.title }}</h4>
      <p class="text-secondary">{{ postState.content }}</p>

      <img
        v-if="postState.image || (postState.images && postState.images[0])"
        :src="postState.image || postState.images[0]"
        alt="صورة المنشور"
        class="post-img mb-3"
      />

      <div class="like-comment">

        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-sm btn-light btn-like"
            :class="{ active: postState.liked }"
            @click="toggleLike"
            :aria-pressed="String(postState.liked)"
            title="إعجاب"
          >
            <i :class="postState.liked ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
            <strong class="ms-1">{{ likesCount }}</strong>
          </button>
          <span class="text-muted">الإعجابات</span>

          <button class="btn btn-sm btn-light" title="مشاركة" @click.prevent="shareClicked">
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

      <CommentCard v-if="postState.commentsVisible" :post="postState.id" />

    </div>
  </main>
</template>


<style scoped>
.post-page {
  display: grid;
  grid-template-columns: 18rem 1fr 16rem;
  gap: 20px;
  font-family: "Noto Sans Arabic", sans-serif;
  align-items: start;
  padding: 2rem;
  direction: rtl;
}

.left-col,
.right-col {
  min-height: 100px;
}

.user-card {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.04);
  display: flex;
  gap: 10px;
  align-items: center;
}

.friends-card {
  background: #fff;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.04);
  min-height: 200px;
}

.post-wrapper {
  width: 100%;
}

.controls {
  margin-bottom: 1rem;
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
  cursor: pointer;
}

.beak-arrow:hover{

}

.post.card {
  background: #fff;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.08);
  transition: 0.3s;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
}
.post-header:hover {
  background: #f8fafc;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
}

.post-img {
  width: 100%;
  height: auto;
  max-height: 420px;
  object-fit: cover;
  border-radius: 10px;
}

.like-comment {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 10px;
  color: #555;
  font-size: 14px;
  margin-top: 10px;
}

.btn-like {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.btn-like.active i {
  color: #e11d48; 
}

.comment-input {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid #eee;
  padding-top: 12px;
  margin-top: 12px;
}

.comment-input .input-area {
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
.send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.comments-panel {
  margin-top: 12px;
  border-top: 1px solid #eef2f7;
  padding-top: 10px;
}

.comment {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #f9fafb;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.comment-content { flex: 1; }
.small-muted { color: #777; font-size: 0.85rem; }

.skeleton {
  background: #f4f4f4;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 6px 18px rgba(18, 24, 40, 0.04);
  margin-bottom: 18px;
  overflow: hidden;
}
.skeleton-avatar,
.skeleton-text,
.skeleton-line,
.skeleton-image {
  background: #e3e3e3;
  border-radius: 6px;
}
.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
.skeleton-text {
  height: 12px;
  margin: 6px 0;
}
.skeleton-image {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  margin-top: 14px;
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
</style>
