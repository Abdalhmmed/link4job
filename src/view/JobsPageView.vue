<script setup>
import JobsGridCard from '@/components/JobsGridCard.vue';
import JobsListCard from '@/components/JobsListCard.vue';

import { useJobsStore } from '@/stores/JobsStore';
import { onMounted, ref, computed } from 'vue';

const JobStore = useJobsStore();

const status = ref("grid");

const country = ref('');
const job_type = ref('');
const work_mode = ref('');
const currency = ref('');

const showMobileFilter = ref(false);

const jobs = ref([]);
const loading = computed(() => JobStore.loading);
const jobsNon = computed(() => !loading.value && (!jobs.value || jobs.value.length === 0));

const changeView = (mode) => {
  status.value = mode;
};

const theFilter = async () => {
  jobs.value = await JobStore.filterJobs({
    country: country.value,
    job_type: job_type.value,
    work_mode: work_mode.value,
    currency: currency.value,
  }) || [];
  showMobileFilter.value = false;
};

const resetFilter = async () => {
  country.value = '';
  job_type.value = '';
  work_mode.value = '';
  currency.value = '';
  jobs.value = await JobStore.fetchJobs() || [];
};

onMounted(async () => {
  jobs.value = await JobStore.fetchJobs() || [];
});
</script>

<template>
  <div class="hero py-4">
    <div class="container">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="m-0">منشورات التوظيف</h4>

        <div class="d-flex gap-2 align-items-center">
          <button class="btn btn-primary d-lg-none" @click="showMobileFilter = true">
            <i class="bi bi-funnel"></i>
          </button>

          <button class="btn btn-outline-secondary" :class="{ active: status === 'list' }" @click="changeView('list')">
            <i class="bi bi-list"></i>
          </button>

          <button class="btn btn-outline-secondary" :class="{ active: status === 'grid' }" @click="changeView('grid')">
            <i class="bi bi-grid"></i>
          </button>
        </div>
      </div>

      <div class="row">

        <div class="col-lg-8">

          <div v-if="loading">
            <div class="row g-4">
              <div v-for="n in 6" :key="n" class="col-12">
                <div class="placeholder-card p-3 mb-3 shimmer rounded-3"></div>
              </div>
            </div>
          </div>

          <div v-else-if="jobsNon">
            <div class="text-muted p-4 rounded-3" style="background:#fff;">
              لا توجد أي وظائف في الوقت الحالي
            </div>
          </div>

          <div v-else>
            <div v-show="status === 'grid'" class="row g-4">
              <JobsGridCard v-for="job in jobs" :job="job" :key="job.id" />
            </div>

            <div v-show="status === 'list'" class="row g-3">
              <JobsListCard v-for="job in jobs" :job="job" :key="job.id" />
            </div>
          </div>

        </div>

        <aside class="col-lg-4 mt-4 mt-lg-0 d-none d-lg-block">
          <div class="bg-white rounded-2xl shadow-soft p-4">
            <h5 class="fw-bold mb-3">تصفية</h5>

            <div class="mb-3">
              <label class="form-label">نوع الدوام</label>
              <select class="form-select" v-model="job_type">
                <option value="">الكل</option>
                <option value="full_time">دوام كامل</option>
                <option value="contract">دوام جزئي</option>
                <option value="flexible">دوام مرن</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">المدينة</label>
              <select class="form-select" v-model="country">
                <option value="">الكل</option>
                <option value="Saudi Arabia">السعودية</option>
                <option value="Yemen">اليمن</option>
                <option value="USA">أمريكا</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">فترة العمل</label>
              <select class="form-select" v-model="work_mode">
                <option value="">الكل</option>
                <option value="on_site">حضوري</option>
                <option value="remote">عن بعد كامل</option>
                <option value="hybrid">عن بعد جزئي</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">الراتب</label>
              <select class="form-select" v-model="currency">
                <option value="">الكل</option>
                <option value="SAR">ريال سعودي</option>
                <option value="YR">ريال يمني</option>
                <option value="USD">دولار أمريكي</option>
              </select>
            </div>

            <div class="d-flex gap-2 justify-content-between">
              <button class="btn btn-primary flex-grow-1" @click="theFilter">
                <i class="bi bi-funnel me-1"></i> تطبيق
              </button>
              <button class="btn btn-outline-secondary" @click="resetFilter">إعادة تعيين</button>
            </div>
          </div>
        </aside>

      </div>
    </div>

    <div v-if="showMobileFilter" class="mobile-overlay" @click="showMobileFilter = false"></div>

    <div class="mobile-filter-drawer" :class="{ active: showMobileFilter }">
      <div class="bg-white rounded-2xl shadow-soft p-4">
        <h5 class="fw-bold mb-3">تصفية</h5>

        <div class="mb-3">
          <label class="form-label">نوع الدوام</label>
          <select class="form-select" v-model="job_type">
            <option value="">الكل</option>
            <option value="full_time">دوام كامل</option>
            <option value="contract">دوام جزئي</option>
            <option value="flexible">دوام مرن</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">المدينة</label>
          <select class="form-select" v-model="country">
            <option value="">الكل</option>
            <option value="Saudi Arabia">السعودية</option>
            <option value="Yemen">اليمن</option>
            <option value="USA">أمريكا</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">فترة العمل</label>
          <select class="form-select" v-model="work_mode">
            <option value="">الكل</option>
            <option value="on_site">حضوري</option>
            <option value="remote">عن بعد كامل</option>
            <option value="hybrid">عن بعد جزئي</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">الراتب</label>
          <select class="form-select" v-model="currency">
            <option value="">الكل</option>
            <option value="SAR">ريال سعودي</option>
            <option value="YR">ريال يمني</option>
            <option value="USD">دولار أمريكي</option>
          </select>
        </div>

        <div class="d-flex gap-2 justify-content-between">
          <button class="btn btn-primary flex-grow-1" @click="theFilter">
            <i class="bi bi-funnel me-1"></i> تطبيق
          </button>
          <button class="btn btn-outline-secondary" @click="resetFilter">إعادة تعيين</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-filter-drawer {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 380px;
  transform: translate(59%, -50%) scale(0.8);
  background: white;
  z-index: 999;
  padding: 20px;
  border-radius: 20px;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  max-height: 80vh;
}

.mobile-filter-drawer.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.placeholder-card {
  height: 100px;
  background: #e9ecef;
  border-radius: 12px;
}
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 120px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: shimmer 1.3s infinite;
}
@keyframes shimmer {
  100% { transform: translateX(400%); }
}
.container { max-width: 1200px; }

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 998;
}
</style>
