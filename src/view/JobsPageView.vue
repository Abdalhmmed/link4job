<script setup>
import JobsGridCard from '@/components/JobsGridCard.vue';
import JobsListCard from '@/components/JobsListCard.vue';

import { useJobsStore } from '@/stores/JobsStore';
import { onMounted, ref } from 'vue';

const JobStore = useJobsStore();

const status = ref("grid");

const country = ref('');
const job_type = ref('');
const work_mode = ref('');
const currency = ref('');

const jobs = ref('');
const jobsNon = ref(false)

const changeView = (mode) => {
  status.value = mode;
};

const theFilter = async () => {
  jobs.value = await JobStore.filterJobs({
    country: country.value,
    job_type: job_type.value,
    work_mode: work_mode.value,
    currency: currency.value,
  });
  if (jobs.value.length > 0){
    jobsNon.value = false
  } else{
    jobsNon.value = true
  }
};

const resetFilter = async () => {
  country.value = '';
  job_type.value = '';
  work_mode.value = '';
  currency.value = '';
  jobs.value = await JobStore.fetchJobs();
  if (jobs.value.length > 0){
    jobsNon.value = false
  } else{
    jobsNon.value = true
  }
};

onMounted(async () => {
  jobs.value = await JobStore.fetchJobs(); 
  if (jobs.value.length > 0){
    jobsNon.value = false
  } else{
    jobsNon.value = true
  }
});
</script>

<template>
  <div class="hero py-5 py-lg-6 d-flex" style="justify-content: space-between;">

    <div v-if="JobStore.loading">
      <div class="mb-4">
        <h4 class="ps-1">منشورات التوظيف</h4>
        
      </div>

      <div class="row g-4 m-0" v-show="status === 'grid'">
          <div class="col-12 col-md-6 col-lg-4 mb-4" style="width: 360px; height: 312px;" v-for="n in 3" :key="n">
            <div class="card h-100 rounded-3 shadow-sm border-0 jobcard-loading shimmer">
              <div class="card-body d-flex flex-column">
              </div>
            </div>
          </div>
      </div>

      <div class="row g-3 m-0" v-show="status === 'list'">
        <div class="col-12 mb-3" v-for="n in 3" :key="n">
          <div class="card h-100 rounded-3 shadow-sm border-0 jobcard-loading shimmer" style="width: 1136px; height: 192px;">
            <div class="card-body d-flex align-items-center">
            </div>
          </div>
        </div>
      </div>

    </div>

    <div v-else-if="jobsNon == true && !JobStore.loading">
      <div class="mb-4">
        <h4 class="ps-1">منشورات التوظيف</h4>
        
      </div>

      <div class="fs-1" style="color: #747575;">
        لا توجد اي وظاف في الوقت الحالي
      </div>

    </div>

    <div v-else>
      <div class="mb-4">
        <h4 class="ps-1">منشورات التوظيف</h4>
        
      </div>

      <div class="row g-4 m-0" v-show="status === 'grid'">
        <JobsGridCard v-for="job in jobs" :job="job" :key="job.id" />
      </div>

      <div class="row g-3 m-0" v-show="status === 'list'">
        <JobsListCard v-for="job in jobs" :job="job" :key="job.id" />
      </div>

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
      </div>
    </div>
  </div>
</template>


<style scoped>
.jobcard-loading{
  background: #d6d6d6;
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
  width: 100px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  100% {
    transform: translateX(500%);
  }
}
</style>