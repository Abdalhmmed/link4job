<script setup>
import PostGrid from '@/components/PostGrid.vue';
import PostList from '@/components/PostList.vue';
import { useJobsStore } from '@/stores/JobsStore';
import { onMounted, ref } from 'vue';

const JobStore = useJobsStore();

const status = ref("grid");

const country = ref('');
const type = ref('');
const work_mode = ref('');
const currency = ref('');

const thejobs = ref([]);

const changeView = (mode) => {
  status.value = mode;
};

const theFilter = async () => {
  thejobs.value = await JobStore.filterJobs({
    country: country.value,
    job_type: type.value,  
    work_mode: work_mode.value,
    currency: currency.value,
  });
};

const resetFilter = async () => {
  country.value = '';
  type.value = '';
  work_mode.value = '';
  currency.value = '';
  thejobs.value = await JobStore.fetchJobs();
};

onMounted(async () => {
  thejobs.value = await JobStore.fetchJobs();
});
</script>

<template>
  <div class="hero py-5 py-lg-6 d-flex">
    <div>
      <div class="mb-4">
        <h4 class="ps-1">منشورات التوظيف</h4>
      </div>

      <PostGrid v-show="status === 'grid'" :jobs="thejobs" />
      <PostList v-show="status === 'list'" :jobs="thejobs" />
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
          <h4 class="fw-bold mb-4">تصفية</h4>

          <div class="row g-3 d-flex flex-column">
            <!-- نوع الدوام -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">نوع الدوام</label>
              <select class="form-select" v-model="type">
                <option value="">الكل</option>
                <option value="full_time">دوام كامل</option>
                <option value="contract">دوام جزئي</option>
                <option value="flexible">دوام مرن</option>
              </select>
            </div>

            <!-- الدولة -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">المدينة</label>
              <select class="form-select" v-model="country">
                <option value="">الكل</option>
                <option value="Saudi Arabia">السعودية</option>
                <option value="Yemen">اليمن</option>
                <option value="USA">أمريكا</option>
              </select>
            </div>

            <!-- وضع العمل -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">فترة العمل</label>
              <select class="form-select" v-model="work_mode">
                <option value="">الكل</option>
                <option value="on_site">حضوري</option>
                <option value="remote">عن بعد كامل</option>
                <option value="hybrid">عن بعد جزئي</option>
              </select>
            </div>

            <!-- العملة -->
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">الراتب</label>
              <select class="form-select" v-model="currency">
                <option value="">الكل</option>
                <option value="SAR">ريال سعودي</option>
                <option value="YR">ريال يمني</option>
                <option value="USD">دولار أمريكي</option>
              </select>
            </div>
          </div>

          <div class="mt-4 d-flex gap-2 justify-content-center">
            <button class="btn btn-primary px-4" @click="theFilter">
              <i class="bi bi-funnel ms-1"></i> تطبيق
            </button>
            <button class="btn btn-outline-secondary" @click="resetFilter">
              إعادة تعيين
            </button>
          </div>

          <br />

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
