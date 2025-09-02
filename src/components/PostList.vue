<script setup>

</script>

<template>
  <div class="row g-3 m-0">
    <div class="col-12" v-for="n in 10" :key="n">
      <div class="card h-100 rounded-2xl shadow-sm border-0">
        <div class="card-body d-flex align-items-center">
          
          <!-- صورة -->
          <div class="me-3" style="width: 180px; flex-shrink: 0;">
            <img
              src="https://via.placeholder.com/250x150"
              alt="صورة المنشور"
              class="img-fluid rounded-3"
              style="height: 120px; object-fit: cover; width: 100%;"
            />
          </div>

          <!-- نص -->
          <div class="flex-grow-1">
            <h5 class="fw-bold mb-2">عنوان المنشور</h5>
            <p class="text-secondary small mb-3">
              We are looking for web development interns. We are looking for web
              development interns.
            </p>
            <button class="btn btn-primary px-4 rounded-pill">تفاصيل</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
