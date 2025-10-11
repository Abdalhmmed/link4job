<script setup>
import PostGrid from '@/components/PostGrid.vue';
import PostList from '@/components/PostList.vue';
import { onMounted, ref } from 'vue';

const status = ref("grid");

const city = ref('')
const type = ref('')
const remoteType = ref('')
const salary = ref('')

const filter = ref({})

const changeView = (mode) => {
  if (mode === "list") {
    status.value = "list";
  } else if (mode === "grid") {
    status.value = "grid";
  }
};


function theFilter(){
  JobStore.filterJobs({city: city.value, type: type.value, remoteType: remoteType.value, salary: salary.value})
}

onMounted(async () => {
  await JobStore.fetchJobs()
})


</script>

<template>

  <div class="hero py-5 py-lg-6 d-flex">
    <div>
      <div class="mb-4">
        <h4 class="ps-1">منشورات التوظيف</h4>
      </div>

      <PostGrid v-show="status === 'grid'" :jobs="JobStore.jobs" />
      <PostList v-show="status === 'list'" :jobs="JobStore.jobs"/>

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
           <!-- type -->
          <div class="row g-3 d-flex flex-column">
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">نوع الدوام</label>
              <select class="form-select" v-model="type">
                <option selected ="" value="">الكل</option>
                <option value="دوام كامل">دوام كامل</option>
                <option value="دوام جزئي">دوام جزئي</option>
                <option value="دوام مرن">دوام مرن</option>
              </select>
            </div>

            <!-- <div class="col-12 w-100">
              <label class="form-label fw-semibold">الوظيفة</label>
              <select class="form-select" v-model="city">
                <option selected ="">الكل</option>
                <option ="مبرمج">مبرمج</option>
                <option ="مهندس">مهندس</option>
                <option ="مصمم">مصمم</option>
                <option ="كاتب">كاتب</option>
                <option ="محاسب">محاسب</option>
                <option ="عامل">عامل</option>
                <option ="امني">امني</option>
              </select>
            </div> -->

            <!-- city -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">المدينة</label>
              <select class="form-select" v-model="city">
                <option selected ="" value="">الكل</option>
                <option value="الرياض">الرياض</option>
                <option value="جدة">جدة</option>
                <option value="صنعاء">صنعاء</option>
                <option value="عدن">عدن</option>
                <option value="الدمام">الدمام</option>
                <option value="تعز">تعز</option>
              </select>
            </div>

            <!-- remoteType -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">فترة العمل</label>
              <select class="form-select" v-model="remoteType">
                <option selected ="" value="">الكل</option>
                <option value="حضوري">حضوري</option>
                <option value="عن بعد كامل">عن بعد كامل</option>
                <option value="عن بعد جزئي">عن بعد جزئي</option>
                <option value="مرن">مرن</option>
              </select>
            </div>
            
            <!-- salary -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">الراتب</label>
              <select class="form-select" v-model="salary">
                <option selected ="" value="">الكل</option>
                <option value="2000 - 4000 ريال">2000 - 4000 ريال</option>
                <option value="5000 - 8000 ريال">5000 - 8000 ريال</option>
                <option value="1500 - 2500 دولار">1500 - 2500 دولار</option>
                <option value="10000+">10000+</option>
              </select>
            </div>
          </div>

          <div class="mt-4 d-flex gap-2 justify-content-center">
            <button class="btn btn-primary px-4" @click="theFilter()">
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
