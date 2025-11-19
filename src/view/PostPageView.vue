<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import FriendsCard from "@/components/FriendsCard.vue";
import UserCard from "@/components/UserCard.vue";
import CommentCard from "@/components/CommentCard.vue";
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
const likes = ref([]);
const commentsCount = ref(0);
const author = ref(null);
const loading = ref(true);
const newComment = ref("");

async function fetchPostData() {
  const id = Number(route.params.id);
  if (!id) return;

  loading.value = true;
  try {
    post.value = await PostStore.fetchPostById(id);
    if (!post.value) return;

    const [user, likeData, count] = await Promise.all([
      UserStore.fetchUserById(post.value.user_id),
      LikesStore.filterLikesByPostId(id),
      CommentsStore.countCommentsById(id, "post"),
    ]);

    author.value = user;
    likes.value = likeData || [];
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

onMounted(fetchPostData);
</script>

<template>
  <div class="post-page">
    <UserCard />

    <div style="width: 45%; margin-top: 1.6rem;">
      <div class="d-flex justify-content-between">
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
            alt="صورة المستخدم"
            class="avatar"
          />
          <div>
            <strong>{{ author?.name || "مستخدم مجهول" }}</strong>
            <div class="small-muted">{{ author?.role || "عضو" }}</div>
          </div>
        </router-link>

        <h4 class="fw-bold mb-2">{{ post.title }}</h4>
        <p class="text-secondary">{{ post.content }}</p>

        <img
          v-if="post.image"
          :src="post.image"
          alt="صورة المنشور"
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

        <CommentCard :post="post" />
      </div>
    </div>

    <FriendsCard />
  </div>
</template>


<style scoped>
.post-page {
  display: flex;
  gap: 20px;
  justify-content: center;
  font-family: "Noto Sans Arabic", sans-serif;
  align-items: flex-start;
  margin-top: 2rem;
}

.post {
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.08);
  transition: 0.3s;
  width: 43rem;
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
  transition: all 0.2s ease-in-out;
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

.like-comment {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 10px;
  color: #555;
  font-size: 14px;
}

.comment-input {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid #eee;
  padding-top: 12px;
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
  transition: 0.2s;
}
.comment-input textarea:focus {
  outline: none;
  border-color: #a78bfa;
  box-shadow: 0 0 4px rgba(167, 139, 250, 0.3);
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
  transition: 0.2s;
  cursor: pointer;
}
.send-btn:hover {
  background-color: #4338ca;
}
.send-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

.comment-content {
  flex: 1;
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

a,
a:visited,
a:focus,
a:active,
.router-link-active,
.router-link-exact-active {
  text-decoration: none !important;
  color: inherit !important;
  outline: none !important;
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
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.08);
}
</style>
