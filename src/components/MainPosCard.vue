<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  posts: {
    type: Array,
    default: () => ([
      {
        id: 1,
        author: 'سارة',
        date: '٢٣ سبتمبر',
        group: 'مجموعة: شتاء',
        content: 'توهّج قصّة بسيطة، وتفاصيل تنطق بالرقة — قماش ناعم كهمس الظهر.',
        images: [
          'https://images.unsplash.com/photo-1520975919203-8e51e2d4d3b6?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=800&auto=format&fit=crop'
        ],
        likes: 45,
        liked: false,
        comments: [
          { author: 'منى', text: 'هل يتوفر بالمقاس M؟', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }
        ],
        details: 'الخامة: قطن مخلوط — طول: 130 سم — مصدر: تركيه'
      },
      {
        id: 2,
        author: 'أمل',
        date: '١٠ أكتوبر',
        group: 'صفحة: الموضة',
        content: 'تفصيل أنيق وجريء — أحببت تنسيقه مع حزام بسيط. ما رأيكن؟',
        images: [
          'https://images.unsplash.com/photo-1520975919203-8e51e2d4d3b6?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=800&auto=format&fit=crop'
        ],
        likes: 128,
        liked: false,
        comments: [
          { author: 'علي', text: 'ما المقاسات المتاحة؟', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { author: 'سلمى', text: 'هل يصل للبلاد الخليجية؟', avatar: 'https://randomuser.me/api/portraits/women/24.jpg' }
        ],
        details: 'الخامة: شيفون — طول: 135 سم — اللون: عاجي'
      }
    ])
  }
});

const postsState = reactive(props.posts.map(p => ({
  ...p,
  commentsVisible: false,
  detailsVisible: false
})));

// Functions
const findPost = id => postsState.find(p => p.id === id);

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
  postsState.forEach(p => {
    p.commentsVisible = false;
    p.detailsVisible = false;
  });
}

function onKeyDown(e) {
  if (e.key === 'Escape') closeAllPanels();
}

onMounted(() => window.addEventListener('keydown', onKeyDown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown));
</script>

<template>
  <div class="feed-component" role="region" aria-label="منشورات الثوب الناعم">

    <!-- 🖋 Composer -->
    <section class="composer" aria-label="منشئ المنشور (عرض)">
      <div class="composer-inner">
        <img class="composer-avatar"
             src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
             alt="أنت" loading="lazy">
        <div class="composer-body">
          <strong>زين</strong>
          <div class="small text-secondary">اكتب منشورًا — عنصر عرض ثابت</div>
          <textarea class="form-control mt-2 composer-textarea" rows="3" disabled>عنصر ثابت للمعاينة</textarea>
          <div class="composer-actions mt-2">
            <button class="btn btn-sm btn-outline-secondary" disabled><i class="bi bi-image"></i> صورة</button>
            <button class="btn btn-sm btn-primary ms-auto" disabled><i class="bi bi-send-fill"></i> نشر</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 💬 Feed -->
    <section class="feed-wrapper">
        <article
            v-for="post in postsState"
            :key="post.id"
            class="post"
            :aria-label="`منشور ${post.author}`"
        >
            <!-- الخط الملون أعلى المنشور -->
            <div class="post-color-line"></div>

            <div class="meta">
            <img
                :src="post.author === 'سارة'
                ? 'https://images.unsplash.com/photo-1544385561-1a9c86d98c60?q=80&w=800&auto=format&fit=crop'
                : 'https://images.unsplash.com/photo-1545996124-1b9b8c0f3f75?q=80&w=800&auto=format&fit=crop'"
                :alt="`صورة ${post.author}`"
                loading="lazy"
            >
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
                <img v-for="(img, i) in post.images" :key="i" :src="img" :alt="`صورة ${i+1}`" loading="lazy">
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
                    <button class="btn btn-sm btn-light" @click="toggleComments(post.id)">
                    <i class="bi bi-chat"></i> <span>{{ post.comments.length }}</span>
                    </button>
                    <button class="btn btn-sm btn-light" @click="toggleDetails(post.id)">
                    <i class="bi bi-info-circle"></i> تفاصيل
                    </button>
                </div>
                <div class="ms-auto small text-secondary">شارك · حفظ</div>
                </div>

                <div v-if="post.detailsVisible" class="details small text-secondary mt-2">{{ post.details }}</div>

                <div v-if="post.commentsVisible" class="comments-panel mt-2">
                <ul class="comments-list">
                    <li v-for="(c, i) in post.comments" :key="i" class="comment-item">
                    <img :src="c.avatar" :alt="c.author">
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
:root { --brand:#4f46e5; --accent:#22c55e; --muted:#6b7280; }
.feed-component { display:flex; flex-direction:column; gap:18px; font-family:'Noto Sans Arabic',system-ui; color:#1f2937; }

.feed-wrapper { width:100%; max-width:760px; margin:0 auto; }

/* Composer */
.composer {
  background:#fff; border-radius:12px; padding:14px;
  box-shadow:0 10px 30px rgba(18,24,40,.04);
  width:100%; max-width:760px; margin:0 auto 18px; box-sizing:border-box;
}
.composer-inner { display:flex; gap:12px; align-items:flex-start; }
.composer-avatar { width:56px; height:56px; border-radius:50%; object-fit:cover; }
.composer-body { flex:1; }
.composer-textarea {
  resize:none; min-height:72px; background:#f8fafc;
  border:1px solid #e6e9ee; border-radius:8px; padding:10px;
}
.composer-actions { display:flex; gap:8px; align-items:center; }

/* Post */
.post {
  background:#fff; border-radius:12px; padding:14px;
  box-shadow:0 10px 30px rgba(18,24,40,.04); margin-bottom:18px;
}
.post-color-line { height:6px; border-radius:4px; margin:-14px -14px 10px; background:linear-gradient(90deg,var(--brand),var(--accent)); }
.meta { display:flex; gap:12px; align-items:flex-start; }
.meta img { width:56px; height:56px; border-radius:50%; object-fit:cover; }
.content { margin-top:8px; color:#263046; line-height:1.6; }
.images { margin-top:10px; display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
.images img { width:100%; height:160px; object-fit:cover; border-radius:8px; }
.actions { display:flex; align-items:center; gap:8px; margin-top:12px; }
.btn-like.active { color:var(--accent); font-weight:700; }

/* Comments */
.comments-panel { margin-top:12px; border-top:1px solid #eef2f7; background:linear-gradient(180deg,#f5fffacc,#fff0); border-radius:0 0 12px 12px; padding-top:10px; }
.comment-item { display:flex; gap:10px; align-items:flex-start; margin-bottom:10px; }
.comment-item img { width:36px; height:36px; border-radius:8px; object-fit:cover; }
.comment-body { background:#fbfffd; padding:8px 12px; border-radius:10px; }
.comment-meta { color:var(--muted); }

@media(max-width:600px){
  .images{ grid-template-columns:1fr; }
  .meta img, .composer-avatar{ width:48px; height:48px; }
}

:root {
  --brand: #4f46e5;    /* أزرق ناعم */
  --brand-2: #22c55e;  /* أخضر أنيق */
}

/* منشور */
.post {
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(18,24,40,.04);
  margin-bottom: 18px;
  position: relative;
  overflow: hidden;
  transition: transform .18s ease, box-shadow .18s ease;
}
.post:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(18,24,40,.06);
}

/* الخط الملون */
.post .post-color-line {
  height: 6px;
  border-radius: 4px;
  margin: -14px -14px 10px -14px;
}

/* جعل الألوان تتناوب بين الأزرق والأخضر */
.post:nth-child(odd) .post-color-line {
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
}
.post:nth-child(even) .post-color-line {
  background: linear-gradient(90deg, var(--brand-2), var(--brand));
}

</style>
