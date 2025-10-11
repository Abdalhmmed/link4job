<script setup>
import PostProfile from '@/components/PostProfile.vue';
import ProjectCard from '@/components/ProjectCard.vue';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFollowersStore } from '@/stores/FollowersStore';
import { useLikesStore } from '@/stores/LikesStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useCompanysStore } from '@/stores/CompanysStore';
import { useUserStore } from '@/stores/UserStore';
import { useJobsStore } from '@/stores/JobsStore';
import JobsCard from '@/components/JobsCard.vue';
import { useEmployeesStore } from '@/stores/EmployeesStore';
import EmployeeCard from '@/components/EmployeeCard.vue';

const CompanysStore = useCompanysStore();
const EmployeesStore = useEmployeesStore();
const UserStore = useUserStore()
const FollowersStore = useFollowersStore();
const LikesStore = useLikesStore();
const ProjectsStore = useProjectsStore()
const PostsStore = usePostsStore()
const JobsStore = useJobsStore()
const route = useRoute();

const company = ref([])
const user =ref([])
const MyFollowers = ref([])
const MyLikes = ref([])
const MySkills = ref([])
const MyProject = ref([])
const MyPost = ref([])
const MyJob = ref([])
const MyEmployee = ref([])

const follow = ref(false);
const like = ref(false);
const showAllEmployees = ref(false)


onMounted( async () =>{
  const id = Number(route.params.id);

  company.value = await CompanysStore.fetchCompanyById(id)

  user.value = await UserStore.fetchUserById(company.value.owner_user_id)

  MyFollowers.value = await FollowersStore.countFollowersById(id, "company");

  MyLikes.value = await LikesStore.countLikesById(id, "company")

  MyProject.value = await ProjectsStore.filterProjectsByCompanyId(id)

  MyPost.value = await PostsStore.filterPostsByCompanyId(id)

  MyJob.value = await JobsStore.fetchJobByCompanyId(id)

  MyEmployee.value = await EmployeesStore.filterEmployeeByCompanyId(id)

  console.log('id: ', id);
  console.log('company: ', company.value);
  console.log('user: ', user.value);
  console.log('MyFollowers: ', MyFollowers.value);
  console.log('MyLikes: ', MyLikes.value);
  console.log('MySkills: ', MySkills.value);
  console.log('MyProject: ', MyProject.value);
  console.log('MyPost: ', MyPost.value);
  console.log('MyJob: ', MyJob.value);

} )

console.log('route.params.id:', route.params.id)

</script>


<template>
<section class="py-5">
  <div class="container">
    <div class="bg-white rounded-3 shadow-soft p-0 mb-4">
      <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400?company');"></div>

      <div class="p-4 d-flex align-items-center justify-content-between flex-wrap">
        <div class="d-flex align-items-center">
          <img src="https://picsum.photos/200?logo" alt="company Logo" class="rounded-circle me-3" width="100" height="100">
          <div>
            <h3 class="fw-bold gradient-text mb-1">
              {{ company.name  }}
              <i v-if="company.documented" class="bi bi-patch-check-fill text-primary" title="حساب موثق"></i>
            </h3>
            <p class="text-muted mb-0">{{ company.role }}</p>
          </div>
        </div>

         <div class="text-center">
            <div v-if="!user" class="d-flex gap-2 mt-3 mt-md-0">
              <button @click="follow = !(follow)" class="btn btn-outline-success" :class="{ active: follow == true }">
                <i :class="follow ? 'bi bi-person-dash-fill' : 'bi bi-person-plus'"></i> {{ follow ? 'الغاء المتابعة' : 'متابعة'}}
              </button>
              <button @click="like = !(like)" class="btn btn-outline-primary" :class="{ active: like == true }">
                <i class="bi bi-hand-thumbs-up"></i> {{ like ? ' الغاء الاعجاب' : 'اعجاب'}}
              </button>
            </div>
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

      <div class="col-lg-4">
        <div class="bg-white rounded-3 shadow-soft p-4"
             >

          <h5 class="fw-bold mb-3">بيانات الشركة</h5>
          <ul class="list-unstyled d-grid gap-3 text-secondary">
            <li><i class="bi bi-envelope text-primary ms-2"></i> {{ company.email }} </li>
            <li><i class="bi bi-telephone text-success ms-2"></i> {{ `${company.phone} ${company.international_key}` }}</li>
            <li><i class="bi bi-geo-alt text-danger ms-2"></i> {{ company.address }}</li>
            <li><i class="bi bi-building text-warning ms-2"></i> نوع الشركة: {{ company.account_type }}</li>

            <li>
              <i class="bi bi-person-check text-info ms-2"></i> مدير الشركة
              <div class="manager-card mt-2 p-2 rounded-3 d-flex align-items-center shadow-sm">
                <img src="https://picsum.photos/50?emp1" class="rounded-circle me-3 border border-2 border-primary shadow-sm" alt="Manager" width="55" height="55">
                <router-link  :to="{name: 'ProfilePage',  params: { id: user.id }} " class="no-link-style">
                  <h6 class="mb-0">
                    <a href="" class="fw-bold text-dark text-decoration-none hover-primary">
                      {{ user.name }}
                    </a>
                  </h6>
                  <small class="text-muted"> {{ user.role }} </small>
                </router-link>
              </div>
            </li>
          </ul>

          <hr>
          <div class="d-flex justify-content-between text-center">
            <div>
              <h6 class="fw-bold mb-0">{{ MyFollowers }}</h6>
              <small class="text-muted">متابعين</small>
            </div>
            <div>
              <h6 class="fw-bold mb-0">{{ MyLikes }}</h6>
              <small class="text-muted">إعجابات</small>
            </div>
          </div>

          <div v-if="MyEmployee" >
            <hr>
            <h5 class="fw-bold mb-3">الموظفين</h5>
            <div class="d-grid gap-2">
              <router-link :to="{name: 'ProfilePage',  params: { id: MyEmployee.user_id }}" 
                v-for="employee in MyEmployee ? MyEmployee : MyEmployee.slice(1,5)" 
                :key="employee.id" 
                class="employee-card p-2 rounded-3 d-flex align-items-center no-link-style">

                  <EmployeeCard :employee="employee.user_id" />

              </router-link >

              <div v-if="MyEmployee.length > 5 && !showAllEmployees" class="text-center mt-2">
                <button class="btn btn-outline-primary btn-xs rounded-pill px-3 py-1" @click="showAllEmployees = true">
                  عرض المزيد
                </button>
              </div>
              <div v-if="showAllEmployees && MyEmployee.length > 5" class="text-center mt-2">
                <button class="btn btn-outline-secondary btn-xs rounded-pill px-3 py-1" @click="showAllEmployees = false">
                  إغلاق
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div class="col-lg-8">

        <div v-if="MyProject">
          <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
            <h5 class="fw-bold mb-4">المشاريع</h5>
            <div class="row g-3">
                <div v-for="Project in MyProject" :key="Project.id" class="col-12 col-md-6">
                <ProjectCard :Project="Project" />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
          <h5 class="fw-bold mb-4">المنشورات</h5>
            <div v-if="MyPost" class="row g-3">
              <div class="col-12 col-md-6 col-lg-4" v-for="Post in MyPost" :key="Post">
                <div class="post-card bg-light rounded-4 p-2 shadow-sm">
                  <PostProfile :Post="Post" />
                </div>
              </div>
            </div>
          <div v-else class="text-muted">لا يوجد اي منشورات حاليا</div>
        </div>

        <div  v-if="MyJob" class="bg-white rounded-2xl shadow-soft p-4 mb-4">
          <h5 class="fw-bold mb-4">الوظائف</h5>
          <div class="d-grid gap-3">
            <div class="job-card p-3 rounded-3 border shadow-sm" v-for="job in MyJob" :key="job.id">
              <JobsCard :job="job" />
            </div>
          </div>
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

.no-link-style {
  text-decoration: none;   
  color: inherit;         
}

</style>
