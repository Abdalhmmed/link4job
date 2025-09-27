<script setup>
import { ref } from 'vue';
import PostProfile from '@/components/PostProfile.vue';

const projct = ref(true);
const post = ref(true);
const jobs = ref(true);
const follow = ref(false);
const like = ref(false);
const showAllEmployees = ref(false);

const props = defineProps({
  status: {
    type: String,
    default: "guest",
  },
  user: {
    type: Boolean,
    default: false,
  }
});

const employees = ref([
  { username: "leithkhaled", role: "CIO", img: "https://picsum.photos/50?emp1" }, 
  { username: "saraali", role: "مدير مالي", img: "https://picsum.photos/50?emp2" },
  { username: "fahdhussein", role: "مهندس برمجيات", img: "https://picsum.photos/50?emp3" },
  { username: "nadhasmir", role: "مسؤول تسويق", img: "https://picsum.photos/50?emp4" },
  { username: "khaledadel", role: "مطور", img: "https://picsum.photos/50?emp5" },
  { username: "laylajamil", role: "محاسبة", img: "https://picsum.photos/50?emp6" },
]);
</script>

<template>
<section class="py-5">
  <div class="container">
    <div class="bg-white rounded-3 shadow-soft p-0 mb-4">
      <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400?company');"></div>

      <div class="p-4 d-flex align-items-center justify-content-between flex-wrap">
        <div class="d-flex align-items-center">
          <img src="https://picsum.photos/200?logo" alt="Company Logo" class="rounded-circle me-3" width="100" height="100">
          <div>
            <h3 class="fw-bold gradient-text mb-1">
              شركة التقنيات الحديثة 
              <i class="bi bi-patch-check-fill text-primary" title="حساب موثق"></i>
            </h3>
            <p class="text-muted mb-0">حلول تقنية مبتكرة</p>
          </div>
        </div>

        <div class="text-center">
          <div v-if="user" class="d-flex gap-2 mt-3 mt-md-0">
            <button class="btn btn-outline-projects rounded-pill btn-sm"><i class="bi bi-images"></i> المشاريع</button>
            <button class="btn btn-outline-posts rounded-pill btn-sm"><i class="bi bi-pencil-square"></i> المنشورات</button>
            <button class="btn btn-outline-jobs rounded-pill btn-sm"><i class="bi bi-briefcase"></i> الوظائف</button>
            <button class="btn btn-gradient rounded-pill btn-sm"><i class="bi bi-building"></i> تعديل الملف</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">

      <!-- بيانات الشركة -->
      <div class="col-lg-4">
        <div class="bg-white rounded-3 shadow-soft p-4" 
             :style="{ height: showAllEmployees ? 'auto' : '820px', transition: 'all 0.3s ease' }">

          <h5 class="fw-bold mb-3">بيانات الشركة</h5>
          <ul class="list-unstyled d-grid gap-3 text-secondary">
            <li><i class="bi bi-envelope text-primary ms-2"></i> company@example.com</li>
            <li><i class="bi bi-telephone text-success ms-2"></i> +967770000001</li>
            <li><i class="bi bi-geo-alt text-danger ms-2"></i> صنعاء</li>
            <li><i class="bi bi-building text-warning ms-2"></i> نوع الشركة: تقنيات</li>

            <li>
              <i class="bi bi-person-check text-info ms-2"></i> مدير الشركة
              <div class="manager-card mt-2 p-2 rounded-3 d-flex align-items-center shadow-sm">
                <img :src="employees[0].img" class="rounded-circle me-3 border border-2 border-primary shadow-sm" alt="Manager" width="55" height="55">
                <div>
                  <h6 class="mb-0">
                    <a :href="'/' + employees[0].username" class="fw-bold text-dark text-decoration-none hover-primary">
                      {{ employees[0].username }}
                    </a>
                  </h6>
                  <small class="text-muted">{{ employees[0].role }}</small>
                </div>
              </div>
            </li>
          </ul>

          <hr>
          <div class="d-flex justify-content-between text-center">
            <div>
              <h6 class="fw-bold mb-0">120</h6>
              <small class="text-muted">متابعين</small>
            </div>
            <div>
              <h6 class="fw-bold mb-0">85</h6>
              <small class="text-muted">إعجابات</small>
            </div>
          </div>

          <hr>
          <h5 class="fw-bold mb-3">الموظفين</h5>
          <div class="d-grid gap-2">
            <div 
              v-for="(employee, index) in showAllEmployees ? employees.slice(1) : employees.slice(1,5)" 
              :key="index" 
              class="employee-card p-2 rounded-3 d-flex align-items-center">
              
              <img :src="employee.img" class="rounded-circle me-3 border shadow-sm" alt="User" width="45" height="45">
              <div>
                <h6 class="mb-0">
                  <a :href="'/' + employee.username" class="fw-semibold text-dark text-decoration-none hover-primary">
                    {{ employee.username }}
                  </a>
                </h6>
                <small class="text-secondary">{{ employee.role }}</small>
              </div>
            </div>

            <div v-if="employees.length > 5 && !showAllEmployees" class="text-center mt-2">
              <button class="btn btn-outline-primary btn-xs rounded-pill px-3 py-1" @click="showAllEmployees = true">
                عرض المزيد
              </button>
            </div>
            <div v-if="showAllEmployees && employees.length > 5" class="text-center mt-2">
              <button class="btn btn-outline-secondary btn-xs rounded-pill px-3 py-1" @click="showAllEmployees = false">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">

        <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
          <h5 class="fw-bold mb-4">المشاريع</h5>
          <div v-if="projct" class="row g-3">
            <div v-for="n in 3" :key="n" class="col-12 col-md-6">
              <div class="project-card p-3 rounded-4 shadow-sm">
                <img :src="`https://picsum.photos/400/230?proj${n}`" class="img-fluid rounded-3 mb-2" alt="project">
                <h6 class="fw-bold text-truncate" title="مشروع تطوير تطبيق شامل لإدارة المتاجر الإلكترونية">
                  مشروع تطوير تطبيق شامل لإدارة المتاجر الإلكترونية
                </h6>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <div class="text-muted small">
                    <i class="bi bi-hand-thumbs-up"></i> 54
                    <i class="bi bi-chat-left-text ms-2"></i> 12
                  </div>
                  <button class="btn btn-outline-projects btn-sm rounded-pill px-3">تفاصيل</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-muted">لا يوجد بيانات حاليا</div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
          <h5 class="fw-bold mb-4">المنشورات</h5>
          <div v-if="post" class="row g-3">
            <div class="col-12 col-md-6 col-lg-4" v-for="n in 4" :key="n">
              <div class="post-card bg-light rounded-4 p-2 shadow-sm">
                <PostProfile :n="n" :user="user" />

              </div>
            </div>
          </div>
          <div v-else class="text-muted">لا يوجد بيانات حاليا</div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
          <h5 class="fw-bold mb-4">الوظائف</h5>
          <div v-if="jobs" class="d-grid gap-3">
            <div class="job-card p-3 rounded-3 border shadow-sm" v-for="i in 2" :key="i">
              <h6 class="fw-bold mb-1">مطور واجهات أمامية</h6>
              <small class="text-secondary">دوام كامل • صنعاء</small>
              <div class="text-end mt-2">
                <button class="btn btn-outline-jobs btn-sm rounded-pill px-3 py-1">تقديم</button>
              </div>
            </div>
          </div>
          <div v-else class="text-muted">لا توجد وظائف حاليا</div>
        </div>
        
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ألوان الأقسام */
.btn-outline-projects {
  color: #6a11cb;
  border-color: #6a11cb;
}
.btn-outline-projects:hover {
  background-color: #6a11cb;
  color: white;
}

.btn-outline-posts {
  color: #2575fc;
  border-color: #2575fc;
}
.btn-outline-posts:hover {
  background-color: #2575fc;
  color: white;
}

.btn-outline-jobs {
  color: #28a745;
  border-color: #28a745;
}
.btn-outline-jobs:hover {
  background-color: #28a745;
  color: white;
}

/* بطاقات المشاريع */
.project-card {
  background: #fafaff;
  border: 1px solid #ececff;
  transition: 0.3s ease;
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 10px rgba(106,17,203,0.15);
}

/* بطاقات المنشورات */
.post-card {
  background: #f8f9ff;
  border: 1px solid #e6e9ff;
  transition: 0.3s ease;
}
.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 8px rgba(37,117,252,0.15);
}

.manager-card {
  background: #f8f9ff;
  transition: all 0.3s ease;
}
.manager-card:hover {
  background: #eef2ff;
}

.employee-card {
  background: #fafbfc;
  border: 1px solid #f1f1f1;
  transition: 0.25s ease;
}
.employee-card:hover {
  background: #f0f7ff;
  transform: translateY(-2px);
}

.job-card {
  background: #fafafa;
  transition: 0.3s ease;
}
.job-card:hover {
  background: #f6fbff;
  transform: scale(1.01);
}

.btn-xs {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem !important;
}

.hover-primary:hover {
  color: #2575fc !important;
}
</style>
