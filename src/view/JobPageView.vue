<script setup>
import { useCompanysStore } from '@/stores/CompanysStore';
import { useJobsStore } from '@/stores/JobsStore'
import { useSkillsStore } from '@/stores/SkillsStore';
import { useUserStore } from '@/stores/UserStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const JobsStore = useJobsStore();
const CompanysStore = useCompanysStore();
const SkillsStore = useSkillsStore()
const UserStore = useUserStore()


const job = ref('');
const skills = ref('');
const company = ref('');
const user = ref('')


onMounted( async () => {
  const id = String(route.params.id)
  job.value = await JobsStore.fetchJobById(id);
  skills.value = await SkillsStore.filterSkillsByJobId(id)
  company.value = await CompanysStore.fetchCompanyById(job.value.company_id)
  user.value = await UserStore.fetchUserById(company.value.owner_user_id)


  console.log('job: ', job.value.company_id)
  console.log('job: ', job.value)
})

</script>

<template>

    <div class="hero py-5">
      <section>
        <div class="container">
          <div class="row g-4">
            
            <div class="col-lg-8">
              <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5 mb-4">
                <span class="badge bg-primary-subtle text-primary px-3 py-2 mb-3">وظيفة</span>
                <h2 class="fw-bold mb-3 gradient-text">{{ job.title }}</h2>
                <p class="text-muted mb-4 fs-5">{{ job.description }}</p>
                <img v-if="job.img" src="https://picsum.photos/949/240" alt="صورة المنشور" class="img-fluid rounded-3 mb-3" />
                <div class="d-flex align-items-center gap-2 text-secondary small">
                  <i class="bi bi-calendar-event"></i>
                  <span>تاريخ النشر: {{ job.publish_date }}</span>
                </div>
              </div>

              <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5 mb-4">
                <h4 class="fw-bold mb-4 border-end pe-3 border-3 border-primary">تفاصيل الوظيفة</h4>
                <ul class="list-unstyled d-grid gap-3 text-secondary fs-6">
                  <li><i class="bi bi-check-circle-fill text-success ms-2"></i> المتطلبات:
                    <div class="mt-3">
                      <div class="row g-2">
                        <div 
                          v-for="skill in skills" 
                          :key="skill.id"
                          class="col-auto"
                        >
                          <span class="badge bg-light border border-primary text-primary px-3 py-2 d-flex align-items-center gap-2">
                            <i class="bi bi-gear-fill"></i> {{ skill.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li><i class="bi bi-lightbulb-fill text-warning ms-2"></i> الخبرات المطلوبة: خبرة سابقة بمشاريع جامعية أو تدريبية</li>
                  <li><i class="bi bi-clock-fill text-primary ms-2"></i> أوقات الدوام: {{ job.job_type }}</li>
                  <li><i class="bi bi-cash-stack text-success ms-2"></i> الراتب: {{` ${job.salary}  ${job.currency} `}}</li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="bg-white rounded-2xl shadow-soft overflow-hidden p-0 position-relative">

                <div class="position-relative">
                  <img 
                    src="https://picsum.photos/600/200" 
                    alt="صورة البانر" 
                    class="img-fluid w-100" 
                    style="object-fit: cover; height: 180px;"
                  />

                  <div 
                    class="position-absolute start-50 translate-middle-x" 
                    style="bottom: -60px;"  
                  >
                    <img 
                      src="https://picsum.photos/150" 
                      alt="صورة الحساب" 
                      class="rounded-circle border border-4 border-white shadow" 
                      style="width: 120px; height: 120px; object-fit: cover;"
                    />
                  </div>
                </div>

                <div class="text-center pt-5 pb-4 px-4" style="margin-top: 70px;"> 
                <div class="d-flex align-items-center justify-content-center gap-2 mt-3">
                  <h5 class="fw-bold mb-0">{{ company.name }}</h5>
                  <i 
                    v-if="company.documented" 
                    class="bi bi-patch-check-fill text-primary fs-5" 
                    title="حساب موثق"
                    style="vertical-align: middle;"
                  ></i>
                </div>

                  <ul class="list-unstyled text-secondary text-start d-grid gap-2 fs-6 mt-3">
                    <li><i class="bi bi-envelope text-primary ms-2"></i> {{ company.email }}</li>
                    <li><i class="bi bi-telephone text-success ms-2"></i> {{ `${company.phone} ${company.international_key}` }}</li>
                    <li><i class="bi bi-geo-alt text-danger ms-2"></i> {{ company.address }}</li>
                    <li><i class="bi bi-building text-warning ms-2"></i> نوع الشركة: {{ company.account_type }}</li>
                    <li>
                      <i class="bi bi-person-check text-info ms-2"></i> مدير الشركة
                      <router-link  :to="{name: 'ProfilePage',  params: { id: user.id }} " class="no-link-style">
                        <div class="manager-card mt-2 p-2 rounded-3 d-flex align-items-center shadow-sm">
                          <img src="https://picsum.photos/50?emp1" class="rounded-circle me-3 border border-2 border-primary shadow-sm" alt="Manager" width="55" height="55">
                          <div>
                            <h6 class="mb-0">
                              <a href="" class="fw-bold text-dark text-decoration-none hover-primary">
                                {{ user.name }}
                              </a>
                            </h6>
                            <small class="text-muted"> {{ user.role }} </small>
                          </div>
                        </div>
                      </router-link>
                    </li>                  
                  </ul>

                  <p class="text-muted small mt-3">  {{ company.role  }}</p>
                  <router-link  :to="{name: 'CompanyPage',  params: { id: company.id }}" class="btn btn-gradient w-100 mt-3">
                    <i class="bi bi-buildings ms-1"></i> تفقد حساب الشركة
                  </router-link>
                </div>

              </div>
            </div>


          </div>
        </div>
      </section>
    </div>
    
    <div class="container py-5">
      <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5">
        <h4 class="fw-bold mb-4 gradient-text">أرسل خطاب التقديم</h4>
        <form>
          <div class="mb-3">
            <textarea class="form-control rounded-3" rows="6" placeholder="اكتب خطابك هنا..."></textarea>
          </div>
          <button type="submit" class="btn btn-gradient d-flex align-items-center gap-2 px-4">
            <i class="bi bi-send-fill"></i> إرسال الطلب
          </button>
        </form>
      </div>
    </div>

</template>
<style scoped>
.badge {
  transition: all 0.2s ease-in-out;
}
.badge:hover {
  background-color: #0d6efd;
  color: white;
  transform: scale(1.05);
}

.manager-card {
  background: #f8f9ff;
  transition: all 0.3s ease;
}
.manager-card:hover {
  background: #eef2ff;
}

.no-link-style {
  text-decoration: none;   
  color: inherit;         
}

.hover-primary:hover {
  color: #2575fc !important;
}
</style>
