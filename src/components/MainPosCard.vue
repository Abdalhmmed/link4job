<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { usePostsStore } from "@/stores/PostsStore";
import { useUserStore } from "@/stores/UserStore";
import { useLikesStore } from "@/stores/LikesStore";
import { useCommentsStore } from "@/stores/CommentsStore";

const postsStore = usePostsStore();
const userStore = useUserStore();
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

function toggleDetails(id) {
  const p = findPost(id);
  if (p) p.detailsVisible = !p.detailsVisible;
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

// تحميل البيانات من API
onMounted(async () => {
  window.addEventListener("keydown", onKeyDown);
  try {
    loading.value = true;
    const posts = await postsStore.fetchPosts();

    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
        const [user, likes, comments] = await Promise.all([
          userStore.fetchUserById(post.user_id),
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

  user.value = await userStore.fetchUserById(2) 
});

onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown));
</script>

<template>
  <div class="feed-component" role="region" aria-label="منشورات الثوب الناعم">
    <section v-if="loading" class="text-center py-4 text-secondary">⏳ جاري تحميل المنشورات...</section>
    <section v-if="error" class="text-center py-4 text-danger">{{ error }}</section>

    <section class="composer" aria-label="منشئ المنشور (عرض)">
      <div class="composer-inner">
        <img
          class="composer-avatar"
          src="https://picsum.photos/40/40?1"
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

    <section class="feed-wrapper" v-if="!loading && !error">
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
            <div class="d-flex justify-content-between">
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
                <button class="btn btn-sm btn-light s" @click="toggleComments(post.id)">
                  <i class="bi bi-chat"></i> <span>{{ post.comments.length }}</span>
                </button>
                <button class="btn btn-sm btn-light" @click="toggleDetails(post.id)">
                  <i class="bi bi-info-circle"></i> تفاصيل
                </button>
              </div>
              <div class="ms-auto small text-secondary">شارك · حفظ</div>
            </div>

            <div v-if="post.detailsVisible" class="details small text-secondary mt-2">
              {{ post.details }}
            </div>

            <div v-if="post.commentsVisible" class="comments-panel mt-2">
              <ul class="comments-list">
                <li v-for="(c, i) in post.comments" :key="i" class="comment-item">
                  <img :src="c.avatar" :alt="c.author" />
                  <div class="comment-body">
                    <strong>{{ c.author }}</strong>
                    <div class="comment-meta">{{ c.text }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.s {
  margin: 0rem 1rem;
}
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
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.composer {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(18, 24, 40, 0.04);
  width: 100%;
  max-width: 760px;
  margin: 0 auto 18px;
  box-sizing: border-box;
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
.composer-body {
  flex: 1;
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

/* 📰 post style */
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
  background: linear-gradient(180deg, #f5fffacc, #fff0);
  border-radius: 0 0 12px 12px;
  padding-top: 10px;
}
.comment-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
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
}
.comment-meta {
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

.post {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.04);
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

/* 🎨 خط علوي متدرّج مثل النموذج */
.post-color-line {
  height: 6px;
  border-radius: 4px;
  margin: -14px -14px 10px -14px;
  background: linear-gradient(90deg, var(--brand), var(--accent));
}

/* 🌈 تدرّج متناوب بين الأزرق والأخضر لكل منشور */
.post:nth-child(odd) .post-color-line {
  background: linear-gradient(90deg, #4f46e5, #22c55e); /* بنفسجـي → أخضر */
}

.post:nth-child(even) .post-color-line {
  background: linear-gradient(90deg, #22c55e, #4f46e5); /* أخضر → بنفسجـي */
}

/* ✨ تأثير ناعم عند المرور */
.post:hover .post-color-line {
  filter: brightness(1.15);
  transition: filter 0.3s ease;
}

</style>

