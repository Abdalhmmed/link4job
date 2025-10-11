<script setup>
import { useCommentsStore } from '@/stores/CommentsStore'
import { useLikesStore } from '@/stores/LikesStore'
import { onMounted, ref } from 'vue'

const props = defineProps({
  Project: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: 'خطاء ما',
      description: 'ليس من المفترض ظهور هذا البيانات',
    })
  }
})

const LikesStore = useLikesStore()
const likeCount = ref(0)

const CommentsStore = useCommentsStore()
const CommentsCount = ref(0)

onMounted(async () => {

  const filteredlikes = await LikesStore.countLikesById(props.Project.id, 'project')
  console.log("filtered:", filteredlikes.value)
  likeCount.value = filteredlikes ?? 0

  console.log('Project:', props.Project.id, 'Likes:', likeCount.value)

  const filteredComments = await CommentsStore.countCommentsById(props.Project.id, 'project')
  console.log("filtered:", filteredComments.value)
  CommentsCount.value = filteredComments ?? 0

  console.log('Project:', props.Project.id, 'Likes:', likeCount.value)
  console.log('Project:', props.Project.id, 'Comments:', CommentsCount.value)

})
</script>

<template>
  <div class="project-card p-3 rounded-4 shadow-sm">
    <img
      src="https://picsum.photos/400/230?proj"
      class="img-fluid rounded-3 mb-2"
      alt="project"
    />

    <h6 class="fw-bold text-truncate" :title="Project.title">
      {{ Project.title }}
    </h6>

    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="text-muted small">
        <i class="bi bi-hand-thumbs-up"></i> {{ likeCount }}
        <i class="bi bi-chat-left-text ms-2"></i> {{ CommentsCount }}
      </div>
      <router-link :to="{name: 'ProjectPage',  params: { id: Project.id }}">
        <button class="btn btn-outline-projects btn-sm rounded-pill px-3">
          تفاصيل
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.btn-outline-projects {
  color: #6a11cb;
  border-color: #6a11cb;
}
.btn-outline-projects:hover {
  background-color: #6a11cb;
  color: white;
}
</style>
