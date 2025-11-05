<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { usePostsStore } from "@/stores/PostsStore";
import { useUserStore } from "@/stores/UserStore";
import { useLikesStore } from "@/stores/LikesStore";
import { useCommentsStore } from "@/stores/CommentsStore";
import CommentCard from "./CommentCard.vue";

const postsStore = usePostsStore();
const UserStore = useUserStore();
const likesStore = useLikesStore();
const commentsStore = useCommentsStore();

const user = ref('')

const postsState = ref([]);
const loading = ref(true);
const error = ref(null);

const findPost = (id) => postsState.value.find((p) => p.id === id);

function toggleLike(id) {
  const p = findPost(id);
  if (!p) return;
  p.liked = !p.liked;
  p.likes = p.liked ? p.likes + 1 : Math.max(0, p.likes - 1);
}

function toggleComments(id) {
  const p = findPost(id);
  if (p) p.commentsVisible = !p.commentsVisible;
}

function closeAllPanels() {
  postsState.value.forEach((p) => {
    p.commentsVisible = false;
    p.detailsVisible = false;
  });
}

function onKeyDown(e) {
  if (e.key === "Escape") closeAllPanels();
}

onMounted(async () => {
  window.addEventListener("keydown", onKeyDown);
  try {
    loading.value = true;
    const posts = await postsStore.fetchPosts();

    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
        const [user, likes, comments] = await Promise.all([
          UserStore.fetchUserById(post.user_id),
          likesStore.filterLikesByPostId(post.id),
          commentsStore.filterCommentsByPostId(post.id),
        ]);

        return {
          ...post,
          author: user?.name || "مستخدم غير معروف",
          avatar: user?.avatar_url || "https://picsum.photos/200/200",
          date: new Date(post.created_at).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
          }),
          likes: likes?.length || 0,
          comments:
            comments?.map((c) => ({
              author: c.user_id,
              text: c.content,
              avatar: "https://picsum.photos/40/40?random=" + c.user_id,
            })) || [],
          liked: false,
          commentsVisible: false,
          detailsVisible: false,
          details: post.title || "",
          images: post.images || [],
          group: user?.account_type === "company" ? "منشور شركة" : "منشور مستخدم",
          content: post.content,
        };
      })
    );

    postsState.value = enrichedPosts;
  } catch (err) {
    console.error("Error loading feed:", err);
    error.value = "حدث خطأ أثناء تحميل المنشورات.";
  } finally {
    loading.value = false;
  }

  user.value = await UserStore.fetchUserById(localStorage.getItem("userId")) 
});

onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
</script>

<template>
  <div class="feed-component" role="region">
    <section v-if="error" class="text-center py-4 text-danger">{{ error }}</section>

    <section v-if="UserStore.loading" class="composer">
      <div class="composer-inner">
        <div class="img-loading"></div>
        <div class="composer-body">
          <strong></strong>
          <div class="small text-secondary">جاري التحميل الرجاء الانتظار </div>
          <textarea
            class="form-control mt-2 composer-textarea"
            rows="3"
            placeholder=" تحميل . . ."
          ></textarea>
          <div class="composer-actions mt-2">
            <button class="btn btn-sm btn-outline-secondary">
               تحميل
            </button>
            <button class="btn btn-sm btn-primary ms-auto">
               انتظر
            </button>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="composer">
      <div class="composer-inner">
        <img
          class="composer-avatar"
          :src="`https://picsum.photos/40/40?${user.id}`"
          alt="`صورة`"
          loading="lazy"
        />
        <div class="composer-body">
          <strong>{{ user.name? user.name : '' }}</strong>
          <div class="small text-secondary">اكتب منشورًا</div>
          <textarea
            class="form-control mt-2 composer-textarea"
            rows="3"
            placeholder="بماذا تفكر اليوم يا"
          ></textarea>
          <div class="composer-actions mt-2">
            <button class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-image"></i> صورة
            </button>
            <button class="btn btn-sm btn-primary ms-auto">
              <i class="bi bi-send-fill"></i> نشر
            </button>
          </div>
        </div>
      </div>
    </section>


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


    <section class="feed-wrapper" v-else-if="!loading && !error">
      <article
        v-for="post in postsState"
        :key="post.id"
        class="post"
        :aria-label="`منشور ${post.author}`"
      >
        <div class="post-color-line"></div>

        <div class="meta">
          <img :src="post.avatar" :alt="`صورة ${post.author}`" loading="lazy" />
          <div class="meta-body">
            <div class="d-flex justify-content-between" style="width: 40rem;">
              <div>
                <strong>{{ post.author }}</strong>
                <div class="text-secondary small">{{ post.date }}</div>
              </div>
              <small class="text-secondary">{{ post.group }}</small>
            </div>

            <p class="content">{{ post.content }}</p>

            <div v-if="post.images?.length" class="images">
              <img
                v-for="(img, i) in post.images"
                :key="i"
                :src="img"
                :alt="`صورة ${i + 1}`"
                loading="lazy"
              />
            </div>

            <div class="actions">
              <div class="left-actions">
                <button
                  class="btn btn-sm btn-light btn-like"
                  :class="{ active: post.liked }"
                  @click="toggleLike(post.id)"
                  :aria-pressed="post.liked.toString()"
                >
                  <i class="bi bi-heart"></i> <span>{{ post.likes }}</span>
                </button>
                <button class="btn btn-sm btn-light" style="margin: 0px 6px;" @click="toggleComments(post.id)">
                  <i class="bi bi-chat"></i> <span>{{ post.comments.length }}</span>
                </button>
                <router-link :to="{ name: 'PostPage', params: { id: post.id}}" class="btn btn-sm btn-light">
                  <i class="bi bi-info-circle"></i> تفاصيل
                </router-link>
              </div>
              <div class="ms-auto small text-secondary">شارك · حفظ</div>
            </div>

            <CommentCard  v-if="post.commentsVisible" :post="post.id" />

          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
:root {
  --brand: #4f46e5;
  --accent: #22c55e;
  --muted: #6b7280;
}

.feed-component {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: "Noto Sans Arabic", system-ui;
  color: #1f2937;
}
.feed-wrapper {
  width: 47rem;
  margin: 0 auto;
}

.composer {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.04);
  max-width: 760px;
  margin: 0 auto 18px;
}
.composer-inner {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.composer-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}
.composer-textarea {
  resize: none;
  min-height: 72px;
  background: #f8fafc;
  border: 1px solid #e6e9ee;
  border-radius: 8px;
  padding: 10px;
}
.composer-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.composer-body{
  width: 41rem;
}

.post {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.04);
  margin-bottom: 18px;
  overflow: hidden;
  transition: box-shadow 0.18s ease;
}
.post-color-line {
  height: 6px;
  border-radius: 4px;
  margin: -14px -14px 10px;
  background: linear-gradient(90deg, var(--brand), var(--accent));
}
.meta {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.meta img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}
.content {
  margin-top: 8px;
  color: #263046;
  line-height: 1.6;
}
.images {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.images img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
.btn-like.active {
  color: var(--accent);
  font-weight: 700;
}

.comments-panel {
  margin-top: 12px;
  border-top: 1px solid #eef2f7;
  padding-top: 10px;
}
.comment-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.comment-item img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
}
.comment-body {
  background: #fbfffd;
  padding: 8px 12px;
  border-radius: 10px;
  color: var(--muted);
}

@media (max-width: 600px) {
  .images {
    grid-template-columns: 1fr;
  }
  .meta img,
  .composer-avatar {
    width: 48px;
    height: 48px;
  }
}

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
