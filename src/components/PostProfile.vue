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
  n: {   
    type: Number,
    default: 1
  }
});
</script>

<template>
        <div class="card h-100 border-0 shadow-sm rounded-3">
            <img :src="'https://picsum.photos/350/200?'+n" class="card-img-top rounded-3" alt="صورة المنشور">
            <div class="card-body d-flex flex-column">
            <h6 class="fw-bold text-center">{{ Post.titel }}</h6>
            <p class="text-secondary small flex-grow-1 text-center">
                {{ Post.description }}
            </p>
            <div class="text-center">
                <button class="btn btn-primary px-4 rounded-pill">تفاصيل</button>
            </div>
            </div>
        </div>
</template>