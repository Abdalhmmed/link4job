<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: 'خطاء ما',
      country: 'ليس من المفترض ظهور هذا البيانات',
      job_type: 'ليس من المفترض ظهور هذا البيانات',
    })
  }
})

</script>

<template>
    <h6 class="fw-bold mb-1"> {{ job.title }}</h6>
    <small class="text-secondary"> {{ ` ${ job.country } - ${ job.job_type } ` }}</small>
        <div class="text-end mt-2">
        <router-link :to="{name: 'JobPage',  params: { id: job.id }}">
          <button class="btn btn-outline-jobs btn-sm rounded-pill px-3 py-1">
            تقديم
          </button>
        </router-link>
    </div>
</template>

<style scoped> 
.btn-outline-jobs {
  color: #28a745;
  border-color: #28a745;
}
.btn-outline-jobs:hover {
  background-color: #28a745;
  color: white;
}
</style>