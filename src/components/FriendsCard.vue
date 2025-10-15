<script setup>
import { ref, computed } from 'vue';

/**
 * Props:
 * - friends: مصفوفة الأصدقاء (كل عنصر: { name, img, status })
 * - maxVisible: عدد العناصر المرئية افتراضياً
 */
const props = defineProps({
  friends: {
    type: Array,
    default: () => ([
      { name: 'علي', img: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'متصل الآن' },
      { name: 'منى', img: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'متصل الآن' },
      { name: 'خالد', img: 'https://randomuser.me/api/portraits/men/65.jpg', status: 'متصل الآن' },
      { name: 'هند', img: 'https://randomuser.me/api/portraits/women/68.jpg', status: 'متصل الآن' },
      { name: 'يوسف', img: 'https://randomuser.me/api/portraits/men/12.jpg', status: 'متصل الآن' },
      { name: 'سلمى', img: 'https://randomuser.me/api/portraits/women/24.jpg', status: 'متصل الآن' },
      { name: 'زياد', img: 'https://randomuser.me/api/portraits/men/76.jpg', status: 'متصل الآن' },
      { name: 'نورة', img: 'https://randomuser.me/api/portraits/women/16.jpg', status: 'متصل الآن' },
      { name: 'باسل', img: 'https://randomuser.me/api/portraits/men/48.jpg', status: 'متصل الآن' },
    ])
  },
  maxVisible: { type: Number, default: 6 }
});

const showAll = ref(false);

const visibleFriends = computed(() => {
  return showAll.value ? props.friends : props.friends.slice(0, props.maxVisible);
});

function toggleFriends() {
  showAll.value = !showAll.value;
}
</script>

<template>
  <div class="friends-component" role="region" aria-label="قائمة الأصدقاء">

    <!-- مركز الصفحة: بطاقة الأصدقاء -->
    <main class="main-wrap">
      <aside class="friends-card" aria-labelledby="friends-title">
        <div class="header d-flex justify-content-between align-items-center mb-2">
          <h6 id="friends-title" class="mb-0">أصدقاؤك</h6>
          <small class="small-muted">{{ props.maxVisible }} كحد افتراضي</small>
        </div>

        <div id="friendsList" class="friends-list">
          <template v-for="(f, idx) in visibleFriends" :key="f.name + idx">
            <div class="friend-item" :aria-label="`${f.name} — ${f.status}`">
              <img :src="f.img" :alt="`${f.name} — صورة`" loading="lazy">
              <div class="friend-body">
                <strong>{{ f.name }}</strong>
                <div class="text-secondary small">{{ f.status }}</div>
              </div>
            </div>
          </template>
        </div>

        <div class="text-center mt-2">
          <button
            id="toggleFriends"
            class="btn btn-sm btn-outline-primary btn-toggle"
            :aria-expanded="showAll.toString()"
            @click="toggleFriends"
          >
            {{ showAll ? 'عرض أقل' : 'عرض المزيد' }}
          </button>
        </div>
      </aside>
    </main>

  </div>
</template>

<style scoped>
/* متغيرات صغيرة للمكوّن */
.friends-component { --muted: #6b7280; --brand: #4f46e5; }

/* عدم التأثير على body — كل التنسيقات داخل الجذر */
.friends-component { display:flex; flex-direction:column; min-height:100vh; background:#f6f8fb; color:#1f2937; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans Arabic', Arial; }

/* NAV */
nav.navbar { background:#fff; box-shadow:0 6px 18px rgba(18,24,40,.04); }
.nav-inner { max-width:1100px; margin:0 auto; padding:10px 18px; display:flex; align-items:center; }
.brand { display:flex; gap:8px; align-items:center; text-decoration:none; color:inherit; font-weight:700; }
.brand .bi { color:var(--brand); font-size:18px; }
.brand-main { margin-right:4px; color:var(--brand); }

/* Main center area */
.main-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:28px; }

/* Card */
.friends-card { width:100%; max-width:360px; background:#fff; border-radius:12px; padding:16px; box-shadow:0 12px 36px rgba(18,24,40,.06); }

/* Items */
.friend-item { display:flex; gap:12px; align-items:center; margin-bottom:10px; }
.friend-item img { width:48px; height:48px; border-radius:8px; object-fit:cover; }
.friend-body { display:flex; flex-direction:column; }

/* Button */
.btn-toggle { width:100%; text-align:center; }

/* small text */
.small-muted { font-size:13px; color:var(--muted); }

/* Footer */
.footer { text-align:center; padding:14px 6px; font-size:13px; color:var(--muted); background:transparent; }

/* Responsive */
@media (max-width:420px) {
  .friends-card { max-width:92%; padding:12px; }
  .friend-item img { width:42px; height:42px; }
}
</style>
