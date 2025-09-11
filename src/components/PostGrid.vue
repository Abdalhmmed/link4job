<script setup>

</script>

<template>
    <div class="row g-4 m-0">
        <div class="col-12 col-md-6 col-lg-4" v-for="n in 10" :key="n">
        <div class="card h-100 rounded-2xl shadow-sm border-0">
            <div class="card-body d-flex flex-column align-items-start">
            <h5 class="fw-bold mt-2 text-center">عنوان المنشور</h5>
            <div class="text-center w-100 mt-2 mb-4">
                <img
                :src="'https://picsum.photos/350/150?'+n"
                alt="صورة المنشور"
                class="img-fluid rounded-3"
                style="max-height: 180px; object-fit: cover"
                />
            </div>
            <p class="text-secondary small flex-grow-1">
                We are looking for web development interns. We are looking for web
                development interns.
            </p>
            <div class="text-center">
                <button class="btn btn-primary px-4 rounded-pill">تفاصيل</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>