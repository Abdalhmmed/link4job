<script setup>
import PostGrid from '@/components/PostGrid.vue';
import Postlist from '@/components/Postlist.vue';
import { ref } from 'vue';

const status = ref("grid");


const changeView = (mode) => {
  if (mode === "list") {
    status.value = "list";
  } else if (mode === "grid") {
    status.value = "grid";
  }
};
</script>

<template>

  <div class="hero py-5 py-lg-6 d-flex">
    <div>
      <div class="mb-4">
        <h4 class="ps-1">منشورات التوظيف</h4>
      </div>

      <PostGrid v-if="status === 'grid'" />
      <Postlist v-if="status === 'list'" />

    </div>

    <div>
      <div class="text-center">
        <div class="fw-bold display-4 fs-1">
          <i class="bi bi-stars me-2 text-primary"></i>
          <span class="gradient-text">link 4 job</span>
        </div>
      </div>

      <div class="container my-4">
        <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5" style="width:21rem;">
          <h4 class="fw-bold mb-4">تصفيه</h4>

          <!-- الفلاتر -->
          <div class="row g-3 d-flex flex-column">
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">نوع الوظيفة</label>
              <select class="form-select">
                <option selected>الكل</option>
                <option>دوام</option>
                <option>عن بعد</option>
              </select>
            </div>

            <div class="col-12 w-100">
              <label class="form-label fw-semibold">الوظيفة</label>
              <select class="form-select">
                <option selected>الكل</option>
                <option>مبرمج</option>
                <option>مهندس</option>
                <option>مصمم</option>
                <option>كاتب</option>
                <option>محاسب</option>
                <option>عامل</option>
                <option>امني</option>
              </select>
            </div>

            <div class="col-12 w-100">
              <label class="form-label fw-semibold">المدينة</label>
              <select class="form-select">
                <option selected>الكل</option>
                <option>صنعاء</option>
                <option>عدن</option>
                <option>تعز</option>
              </select>
            </div>

            <div class="col-12 w-100">
              <label class="form-label fw-semibold">فترة العمل</label>
              <select class="form-select">
                <option selected>الكل</option>
                <option>دوام كامل</option>
                <option>من 1h الى 5h</option>
                <option>من 6h الى 12h</option>
                <option>مفتوح</option>
              </select>
            </div>

            <div class="col-12 w-100">
              <label class="form-label fw-semibold">الراتب</label>
              <select class="form-select">
                <option selected>الكل</option>
                <option>100$ - 400$</option>
                <option>500$ - 1000$</option>
                <option>1000$ - 2000$</option>
                <option>2000$+</option>
              </select>
            </div>
          </div>

          <div class="mt-4 d-flex gap-2 justify-content-center">
            <button class="btn btn-primary px-4">
              <i class="bi bi-funnel ms-1"></i> تطبيق
            </button>
            <button class="btn btn-outline-secondary">إعادة تعيين</button>
          </div>

          <br />

          <!-- أزرار التبديل -->
          <h4 class="fw-bold mb-4">فرز</h4>
          <div class="w-100 d-flex">
            <button
              class="btn btn-outline-secondary m-1"
              :class="{ active: status === 'list' }"
              @click="changeView('list')"
            >
              <i class="bi bi-list"></i>
            </button>

            <button
              class="btn btn-outline-secondary m-1"
              :class="{ active: status === 'grid' }"
              @click="changeView('grid')"
            >
              <i class="bi bi-grid"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
