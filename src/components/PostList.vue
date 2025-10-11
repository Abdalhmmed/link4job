<script setup>
const props = defineProps({
    jobs: {
        type: Object,
        required: true,
        default: () => ({
            job: [0],
            error: 'هناك خطاء'
        })
    }
    
})
</script>

<template>
  <div class="row g-3 m-0">
    <div class="col-12" v-for="job in jobs" :key="job.id">
      <div class="card h-100 rounded-2xl shadow-sm border-0">
        <div class="card-body d-flex align-items-center">
          
          <!-- صورة -->
          <div class="me-3" style="width: 180px; flex-shrink: 0;">
            <img
              src=""
              alt="صورة المنشور"
              class="img-fluid rounded-3"
              style="height: 120px; object-fit: cover; width: 100%;"
            />
          </div>

          <!-- نص -->
          <div class="flex-grow-1">
            <h5 class="fw-bold mb-2">{{ job.titel }}</h5>
            <p class="text-secondary small mb-3">
              {{job.description}}
            </p>
            <button class="btn btn-primary px-4 rounded-pill">تفاصيل</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
