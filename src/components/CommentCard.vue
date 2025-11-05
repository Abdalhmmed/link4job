<script setup>
import { useCommentsStore } from '@/stores/CommentsStore';
import { useUserStore } from '@/stores/UserStore';
import { onMounted, ref } from 'vue';

const CommentsStore = useCommentsStore();
const UserStore = useUserStore();

const comments = ref([]);
const users = ref({});
const loading = ref(true);

const props = defineProps({
  post: {
    type: [Object, Number],
    required: true,
  },
});

async function loadComments() {
  try {
    loading.value = true;
    const postId = typeof props.post === 'object' ? props.post.id : props.post;

    comments.value = await CommentsStore.filterCommentsByPostId(postId);

    const uniqueUserIds = [...new Set(comments.value.map(c => c.user_id))];
    const userPromises = uniqueUserIds.map(async (id) => {
      const user = await UserStore.fetchUserById(id);
      users.value[id] = user;
    });

    await Promise.all(userPromises);
  } finally {
    loading.value = false;
  }
}

onMounted(loadComments);
</script>

<template>
  <div class="comments-list mt-4">
    <div v-if="loading" class="text-center text-muted py-3">
      <i class="bi bi-arrow-repeat spin"></i>
    </div>

    <div v-else-if="comments.length === 0" class="text-center text-muted py-3">
      لا توجد تعليقات بعد، كن أول من يشارك رأيه 
    </div>

    <div v-else>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <img
          :src="users[comment.user_id]?.avatar_url || `https://picsum.photos/44/44?${comment.user_id}`"
          alt="avatar"
          class="avatar"
        />
        <div class="comment-body">
          <router-link
            :to="{ name: 'ProfilePage', params: { id: comment.user_id } }"
            class="comment-user"
          >
            <strong>{{ users[comment.user_id]?.name || 'مستخدم مجهول' }}</strong>
            <div class="small-muted">{{ users[comment.user_id]?.role || 'عضو' }}</div>
          </router-link>

          <p class="comment-text">{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-list {
  width: 100%;
  margin-top: 1rem;
  font-family: "Noto Sans Arabic", sans-serif;
}

.comment {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background-color: #f9fafb;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;
}

.comment-user:hover {
  background-color: #f1f5f9;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.comment-body {
  flex: 1;
}

.comment-user {
  display: flex;
  flex-direction: column;
  text-decoration: none !important;
  color: inherit !important;
  border-radius: 10px;
}

.comment-text {
  margin-top: 5px;
  font-size: 0.95rem;
  color: #333;
  white-space: pre-wrap;
}

.small-muted {
  color: #777;
  font-size: 0.85rem;
}

.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
