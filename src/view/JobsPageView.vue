```vue
<script setup>
import JobsGridCard from '@/components/JobsGridCard.vue';
import JobsListCard from '@/components/JobsListCard.vue';
import { useJobsStore } from '@/stores/JobsStore';
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';

const JobStore = useJobsStore();

const status = ref('grid');

const country = ref('');
const job_type = ref('');
const work_mode = ref('');
const currency = ref('');

const showMobileFilter = ref(false);

const jobs = ref([]);
const loading = computed(() => JobStore.loading);
const jobsNon = computed(() => !loading.value && (!jobs.value || jobs.value.length === 0));

const isMobile = ref(window.innerWidth <= 600.98);

function handleResize() {
  isMobile.value = window.innerWidth <= 600.98;
  if (isMobile.value) {
    status.value = 'grid';
  }
}

onMounted(async () => {
  window.addEventListener('resize', handleResize);
  handleResize();
  jobs.value = (await JobStore.fetchJobs()) || [];
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const changeView = (mode) => {
  if (isMobile.value) return;
  status.value = mode;
};

const theFilter = async () => {
  jobs.value = (await JobStore.filterJobs({
    country: country.value,
    job_type: job_type.value,
    work_mode: work_mode.value,
    currency: currency.value,
  })) || [];
  showMobileFilter.value = false;
};

const resetFilter = async () => {
  country.value = '';
  job_type.value = '';
  work_mode.value = '';
  currency.value = '';
  jobs.value = (await JobStore.fetchJobs()) || [];
  showMobileFilter.value = false;
};
</script>

<template>
  <div class="hero py-4">
    <div class="container main-grid">

      <div class="content-area">

        <div class="d-flex justify-content-between align-items-center mb-4 header-row">
          <h4 class="m-0">منشورات التوظيف</h4>
        </div>

        <div v-if="loading" class="loading-area">
          <div class="row g-4">
            <div v-for="n in 6" :key="'l-'+n" class="col-12">
              <div class="placeholder-card p-3 mb-3 shimmer rounded-3"></div>
            </div>
          </div>
        </div>

        <div v-else-if="jobsNon" class="no-jobs-area">
          <div class="text-muted p-4 rounded-3" style="background:#fff;">
            لا توجد أي وظائف في الوقت الحالي
          </div>
        </div>

        <div v-else class="jobs-area">
          <div v-show="status === 'grid'" class="row g-4">
            <JobsGridCard v-for="job in jobs" :job="job" :key="job.id" />
          </div>

          <div v-show="status === 'list'" class="row g-3">
            <JobsListCard v-for="job in jobs" :job="job" :key="job.id" />
          </div>
        </div>

      </div>

      <aside class="filter-aside d-none d-lg-block">
        <div class="brand text-center mb-4">
          <div class="fw-bold display-4 fs-1">
            <i class="bi bi-stars me-2 text-primary"></i>
            <span class="gradient-text">link 4 job</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5 filter-card">
          <h4 class="fw-bold mb-4">تصفية</h4>

          <div class="row g-3 d-flex flex-column">
            <div class="col-12 w-100">
              <label class="form-label fw-semibold">نوع الدوام</label>
              <select class="form-select" v-model="job_type">
                <option value="">الكل</option>
                <option value="full_time">دوام كامل</option>
                <option value="contract">دوام جزئي</option>
                <option value="flexible">دوام مرن</option>
              </select>
            </div>

            <div class="col-12 w-100">
              <label class="form-label fw-semibold">المدينة</label>
              <select class="form-select" v-model="country">
                <option value="">الكل</option>
                <option value="Saudi Arabia">السعودية</option>
                <option value="Yemen">اليمن</option>
                <option value="USA">أمريكا</option>
              </select>
            </div>

            <div class="col-12 w-100">
              <label class="form-label fw-semibold">فترة العمل</label>
              <select class="form-select" v-model="work_mode">
                <option value="">الكل</option>
                <option value="on_site">حضوري</option>
                <option value="remote">عن بعد كامل</option>
                <option value="hybrid">عن بعد جزئي</option>
              </select>
            </div>

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
      </aside>

    </div>

    <div v-if="showMobileFilter" class="mobile-overlay" @click="showMobileFilter = false"></div>

    <div class="mobile-filter-drawer" :class="{ active: showMobileFilter }" @click.stop>
      <div class="bg-white rounded-2xl shadow-soft p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold m-0">تصفية</h5>
          <button class="btn btn-sm btn-outline-secondary" @click="showMobileFilter = false"><i class="bi bi-x-lg"></i></button>
        </div>

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
.container {margin: 0px; display: flex; gap: 2rem; align-items: flex-start; padding: 0 1rem; }
.main-grid { display: flex; gap: 1.5rem; max-width: 100%;}
.content-area { width: 80%; }
@media (max-width: 600.98px) {
  .main-grid { grid-template-columns: 1fr; }
  .filter-aside { display: none !important; }
  .content-area { width: 100%; }
}

.filter-aside { width: 340px; }
.filter-card { width: 100%; box-sizing: border-box; }
.brand { margin-bottom: 1rem; }

.placeholder-card { height: 100px; background: #e9ecef; border-radius: 12px; }
.shimmer { position: relative; overflow: hidden; }
.shimmer::after { content: ""; position: absolute; top: 0; left: -150px; width: 120px; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: shimmer 1.3s infinite; }
@keyframes shimmer { 100% { transform: translateX(400%); } }

.mobile-filter-drawer {
  position: fixed;
  top: -50%;
  left: -40%;
  width: 90%;
  max-width: 380px;
  transform: translate(59%, -50%) scale(0.8);
  background: white;
  z-index: 999;
  padding: 20px;
  border-radius: 20px;
  opacity: 0;
  transition: all 0.28s cubic-bezier(.2,.9,.2,1);
  overflow-y: auto;
  max-height: 80vh;
  box-shadow: 0 12px 40px rgba(0,0,0,0.18);
}
.mobile-filter-drawer.active { opacity: 1; transform: translate(50%, 120%) scale(1); }
.mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 998; }

.header-row { gap: 1rem; }
.loading-area .placeholder-card { height: 90px; }
.jobs-area { width: 100%; }

.hero { padding-bottom: 2.5rem; }
.rounded-2xl { border-radius: 1rem; }
.shadow-soft { box-shadow: 0 8px 24px rgba(13,38,59,0.08); }
.gradient-text { background: linear-gradient(90deg,#4f46e5,#06b6d4); -webkit-background-clip: text; background-clip: text; color: transparent; }
.btn.active { box-shadow: inset 0 0 0 2px rgba(0,0,0,0.06); }
</style>
```
