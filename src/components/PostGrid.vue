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
    <div class="row g-4 m-0">
        <div class="col-12 col-md-6 col-lg-4" v-for="job in jobs" :key="job.id">
        <div class="card h-100 rounded-2xl shadow-sm border-0">
            <div class="card-body d-flex flex-column align-items-start">
            <h5 class="fw-bold mt-2 text-center">{{ job.titel }}</h5>
            <div class="text-center w-100 mt-2 mb-4">
                <img
                src=""
                alt="صورة المنشور"
                class="img-fluid rounded-3"
                style="max-height: 180px; object-fit: cover"
                />
            </div>
            <p class="text-secondary small flex-grow-1">
                {{ job.description }}
            </p>
            <div class="text-center">
                <button class="btn btn-primary px-4 rounded-pill" @click="JobStore.fetchJobById(job.id)">تفاصيل</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>