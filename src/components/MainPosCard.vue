<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { usePostsStore } from "@/stores/PostsStore";
import PostsCard from "./PostsCard.vue";

const UserStore = useUserStore();
const PostsStore = usePostsStore();

const user = ref(null);
const posts = ref([]);
const error = ref(null);
const loadingUser = ref(true);
const loadingPosts = ref(true);

const showComposer = ref(false);

onMounted(async () => {
  try {
    loadingUser.value = true;
    const id = localStorage.getItem("userId");
    if (!id) throw new Error("لم يتم العثور على معرف المستخدم");

    user.value = await UserStore.fetchUserById(id);
    loadingUser.value = false;
  } catch (e) {
    error.value = `خطأ في تحميل بيانات المستخدم: ${e.message}`;
    loadingUser.value = false;
  }

  try {
    loadingPosts.value = true;
    posts.value = await PostsStore.fetchPosts();
    loadingPosts.value = false;
  } catch (e) {
    error.value = `خطأ في تحميل المنشورات: ${e.message}`;
    loadingPosts.value = false;
  }
});

function toggleComposer() {
  showComposer.value = !showComposer.value;
}
</script>

<template>
  <div class="feed-component" role="region">
    <section v-if="error" class="text-center py-4 text-danger">{{ error }}</section>

    <section v-else-if="loadingUser || loadingPosts" class="composer">
      <div class="composer-inner">
        <div class="img-loading"></div>
        <div class="composer-body">
          <strong>جارٍ التحميل، الرجاء الانتظار...</strong>
          <textarea
            class="form-control mt-2 composer-textarea"
            rows="3"
            placeholder="جارٍ التحميل..."
            disabled
          ></textarea>
        </div>
      </div>
    </section>

    <section v-else class="composer desktop-only">
      <div class="composer-inner">
        <img
          class="composer-avatar"
          :src="`https://picsum.photos/40/40?${user.id}`"
          alt="صورة المستخدم"
          loading="lazy"
        />
        <div class="composer-body">
          <strong>{{ user.name || '' }}</strong>
          <div class="small text-secondary">اكتب منشورًا</div>
          <textarea
            class="form-control mt-2 composer-textarea"
            rows="3"
            placeholder="بماذا تفكر اليوم؟"
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

    <PostsCard v-for="post in posts" :post="post" :key="post.id" />

    <button
      class="open-composer-btn mobile-only"
      @click="toggleComposer"
      :aria-pressed="String(showComposer)"
      aria-label="فتح صندوق الكتابة"
    >
      <i class="bi" :class="showComposer ? 'bi-x-lg' : 'bi-pencil-square'"></i>
    </button>

    <section v-if="showComposer" class="composer mobile-composer">
      <div class="composer-inner">
        <img
          class="composer-avatar"
          :src="`https://picsum.photos/40/40?${user.id}`"
          alt="صورة المستخدم"
          loading="lazy"
        />
        <div class="composer-body">
          <strong>{{ user.name || '' }}</strong>
          <div class="small text-secondary">اكتب منشورًا</div>
          <textarea
            class="form-control mt-2 composer-textarea"
            rows="3"
            placeholder="بماذا تفكر اليوم؟"
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
  </div>
</template>

<style scoped>
  .feed-component {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: "Noto Sans Arabic", system-ui;
  color: #1f2937;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 1rem;
}

.composer {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(18, 24, 40, 0.04);
  margin: 0 auto 18px;
  width: 100%;
  max-width: 760px;
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
  flex-shrink: 0;
}
.composer-textarea {
  resize: none;
  min-height: 72px;
  background: #f8fafc;
  border: 1px solid #e6e9ee;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
}
.composer-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.composer-body {
  width: 100%;
  max-width: 600px;
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
  .post {
    margin-top: 8rem;
  }
  .composer-body {
    max-width: 100%;
  }
  .feed-component {
    padding: 0 0.75rem;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: inline-flex;
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
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .mobile-composer {
    position: fixed;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 520px;
    background: #fff;
    padding: 15px;
    border-radius: 16px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.18);
    z-index: 1003;
    max-height: 70vh;
    overflow-y: auto;
  }
}

@media (min-width: 601px) {
  .mobile-only {
    display: none !important;
  }
  .mobile-composer {
    display: none !important;
  }
  .desktop-only {
    display: block !important;
  }
}

</style>