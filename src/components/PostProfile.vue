<script setup>
const props = defineProps({
  Post: {
    type: Object,
    required: true,
    default: () => ({
      title: 'عنوان المنشور',
      description: 'وصف قصير للمنشور يوضح محتواه بشكل مختصر ومفيد.'
    })
  },
  user: {
    type: Boolean,
    default: false
  },
  n: {   
    type: Number,
    default: 1
  }
});
</script>

<template>
  <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
    <div class="post-img-wrapper position-relative">
      <img :src="'https://picsum.photos/350/200?'+n" class="card-img-top" alt="صورة المنشور">
      <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
    </div>

    <div class="card-body d-flex flex-column text-center">
      <h5 class="fw-bold gradient-text mb-2">{{ Post.title }}</h5>
      <p class="text-muted small flex-grow-1">{{ Post.description }}</p>

      <div class="d-flex justify-content-between align-items-center px-2 mt-2">
        <div class="text-muted small">
          <i class="bi bi-hand-thumbs-up"></i> 34
          <i class="bi bi-chat-left-text ms-2"></i> 7
        </div>
        <button class="btn btn-outline-posts btn-sm rounded-pill px-3">تفاصيل</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  transition: transform 0.3s ease;
}

.card-img-top:hover {
  transform: scale(1.05);
}

.post-img-wrapper .overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.3));
}

.gradient-text {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-hover {
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn-outline-posts {
  color: #2575fc;
  border-color: #2575fc;
}
.btn-outline-posts:hover {
  background-color: #2575fc;
  color: white;
}
</style>
