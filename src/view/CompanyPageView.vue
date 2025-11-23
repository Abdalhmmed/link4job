<script setup>
import PostProfile from '@/components/PostProfile.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import JobsCard from '@/components/JobsCard.vue';
import EmployeeCard from '@/components/EmployeeCard.vue';

import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFollowersStore } from '@/stores/FollowersStore';
import { useLikesStore } from '@/stores/LikesStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useCompanysStore } from '@/stores/CompanysStore';
import { useJobsStore } from '@/stores/JobsStore';
import { useEmployeesStore } from '@/stores/EmployeesStore';
import { useUserStore } from '@/stores/UserStore';

const CompanysStore = useCompanysStore();
const EmployeesStore = useEmployeesStore();
const UserStore = useUserStore();
const FollowersStore = useFollowersStore();
const LikesStore = useLikesStore();
const ProjectsStore = useProjectsStore();
const PostsStore = usePostsStore();
const JobsStore = useJobsStore();
const route = useRoute();
const router = useRouter();

const company = ref(null);
const user = ref(null);
const MyFollowers = ref(0);
const MyLikes = ref(0);
const MyProject = ref([]);
const MyPost = ref([]);
const MyJob = ref([]);
const MyEmployee = ref([]);

const follow = ref(false);
const like = ref(false);
const showAllEmployees = ref(false);
const showEmployeesMobile = ref(false);

const owner = localStorage.getItem("userid");
const isMobile = ref(false);
const showProjectsExpanded = ref(false);
const showPostsExpanded = ref(false);

function updateIsMobile() {
  isMobile.value = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;
}

const displayedProjects = computed(() => {
  if (!isMobile.value) return MyProject.value || [];
  if (!MyProject.value) return [];
  return showProjectsExpanded.value ? MyProject.value : MyProject.value.slice(0, 3);
});

const displayedPosts = computed(() => {
  if (!isMobile.value) return MyPost.value || [];
  if (!MyPost.value) return [];
  return showPostsExpanded.value ? MyPost.value : MyPost.value.slice(0, 3);
});

onMounted(async () => {
  updateIsMobile();
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIsMobile);
  }

  const id = Number(route.params.id);
  if (!id) {
    router.push({ name: 'not-found' });
    return;
  }

  company.value = await CompanysStore.fetchCompanyById(id);

  if (company.value) {
    user.value = await UserStore.fetchUserById(company.value.owner_user_id);
    MyFollowers.value = await FollowersStore.countFollowersById(id, "company");
    MyLikes.value = await LikesStore.countLikesById(id, "company");
    MyProject.value = await ProjectsStore.filterProjectsByCompanyId(id);
    MyPost.value = await PostsStore.filterPostsByCompanyId(id);
    MyJob.value = await JobsStore.fetchJobByCompanyId(id);
    MyEmployee.value = await EmployeesStore.filterEmployeeByCompanyId(id);
  } else {
    router.push({ name: 'not-found' });
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateIsMobile);
  }
});
</script>

<template>
  <section class="py-5" v-if="company">
    <div class="container">
      <div class="bg-white rounded-2xl shadow-soft p-0 mb-4" style="border: 1rem white solid;">
        <div class="profile-banner" :style="`background-image: url('${company.banner || 'https://picsum.photos/1200/400?company'}')`"></div>
        <div class="p-4 d-flex justify-content-between align-items-start flex-wrap">
          <div class="d-flex align-items-center">
            <img :src="company.logo || 'https://picsum.photos/200?logo'" alt="company Logo" class="profile-img me-3" />
            <div>
              <h3 class="fw-bold gradient-text mb-1">
                {{ company.name }}
                <i v-if="company.documented" class="bi bi-patch-check-fill text-primary" title="حساب موثق"></i>
              </h3>
              <p class="text-muted mb-0">{{ company.role }}</p>
              <small class="text-secondary">{{ company.address }}</small>
            </div>
          </div>

          <div class="text-center">
            <div v-if="owner != user?.id" class="d-flex gap-2 mt-3 mt-md-0">
              <button @click="follow = !follow" class="btn btn-outline-success btn-action" :class="{ active: follow }" aria-label="متابعة">
                <i :class="follow ? 'bi bi-person-dash-fill' : 'bi bi-person-plus'"></i>
                <span class="btn-text ms-1">{{ follow ? 'الغاء المتابعة' : 'متابعة' }}</span>
              </button>
              <button @click="like = !like" class="btn btn-outline-primary btn-action" :class="{ active: like }" aria-label="اعجاب">
                <i class="bi bi-hand-thumbs-up"></i>
                <span class="btn-text ms-1">{{ like ? 'الغاء الاعجاب' : 'اعجاب' }}</span>
              </button>
            </div>

            <div v-else class="d-flex gap-2 mt-3 mt-md-0">
              <button class="btn btn-outline-projects btn-action" aria-label="المشاريع">
                <i class="bi bi-images"></i>
                <span class="btn-text ms-1">المشاريع</span>
              </button>
              <button class="btn btn-outline-posts btn-action" aria-label="المنشورات">
                <i class="bi bi-pencil-square"></i>
                <span class="btn-text ms-1">المنشورات</span>
              </button>
              <button class="btn btn-outline-jobs btn-action" aria-label="الوظائف">
                <i class="bi bi-briefcase"></i>
                <span class="btn-text ms-1">الوظائف</span>
              </button>
              <button class="btn btn-gradient btn-action" aria-label="تعديل الملف">
                <i class="bi bi-building"></i>
                <span class="btn-text ms-1">تعديل الملف</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="bg-white rounded-2xl shadow-soft p-4" style="max-height: 955px;">
            <h5 class="fw-bold mb-3">بيانات الشركة</h5>
            <ul class="list-unstyled d-grid gap-3 text-secondary">
              <li><i class="bi bi-envelope text-primary ms-2"></i> {{ company.email }}</li>
              <li><i class="bi bi-telephone text-success ms-2"></i> {{ `${company.phone} ${company.international_key || ''}` }}</li>
              <li><i class="bi bi-geo-alt text-danger ms-2"></i> {{ company.address }}</li>
              <li><i class="bi bi-building text-warning ms-2"></i> نوع الشركة: {{ company.account_type }}</li>

              <li>
                <i class="bi bi-person-check text-info ms-2"></i> مدير الشركة
                <div v-if="user" class="manager-card mt-2 p-2 rounded-3 d-flex align-items-center shadow-sm">
                  <img :src="user.avatar_url || 'https://picsum.photos/50?emp1'" class="rounded-circle me-3 border border-2 border-primary shadow-sm" width="55" height="55" />
                  <router-link :to="{ name: 'ProfilePage', params: { id: user.id } }" class="no-link-style">
                    <h6 class="mb-0">
                      <div class="fw-bold text-dark text-decoration-none hover-primary">
                        {{ user.name }}
                      </div>
                    </h6>
                    <small class="text-muted">{{ user.role }}</small>
                  </router-link>
                </div>
              </li>
            </ul>

            <hr />

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

            <div v-if="MyEmployee && MyEmployee.length">
              <hr />
              <h5 class="fw-bold mb-3">الموظفين</h5>

              <div v-if="!isMobile" class="d-grid gap-2">
                <router-link
                  v-for="employee in (showAllEmployees ? MyEmployee : MyEmployee.slice(0,5))"
                  :key="employee.id"
                  :to="{ name: 'ProfilePage', params: { id: employee.user_id } }"
                  class="employee-card p-2 rounded-3 d-flex align-items-center no-link-style"
                >
                  <EmployeeCard :employee="employee.user_id" />
                </router-link>

                <div v-if="MyEmployee.length > 5 && !showAllEmployees" class="text-center mt-2">
                  <button class="btn btn-outline-primary btn-xs rounded-pill px-3 py-1" @click="showAllEmployees = true">عرض المزيد</button>
                </div>
                <div v-if="showAllEmployees && MyEmployee.length > 5" class="text-center mt-2">
                  <button class="btn btn-outline-secondary btn-xs rounded-pill px-3 py-1" @click="showAllEmployees = false">إغلاق</button>
                </div>
              </div>

              <div v-else class="mobile-employees">
                <div v-if="!showEmployeesMobile" class="text-center mt-2">
                  <button class="btn btn-outline-primary btn-xs rounded-pill px-3 py-1 d-inline-flex align-items-center" @click="showEmployeesMobile = true">
                    <span>اظهر المزيد</span>
                    <i class="bi bi-chevron-down ms-2"></i>
                  </button>
                </div>

                <div v-else class="d-grid gap-2">
                  <router-link
                    v-for="employee in MyEmployee"
                    :key="employee.id"
                    :to="{ name: 'ProfilePage', params: { id: employee.user_id } }"
                    class="employee-card p-2 rounded-3 d-flex align-items-center no-link-style"
                  >
                    <EmployeeCard :employee="employee.user_id" />
                  </router-link>

                  <div class="text-center mt-2">
                    <button class="btn btn-outline-secondary btn-xs rounded-pill px-3 py-1 d-inline-flex align-items-center" @click="showEmployeesMobile = false">
                      <span>اقل</span>
                      <i class="bi bi-chevron-up ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div v-if="MyProject && MyProject.length" class="bg-white rounded-2xl shadow-soft p-4 mb-4">
            <h5 class="fw-bold mb-4">المشاريع</h5>
            <div class="row g-3">
              <div v-for="Project in displayedProjects" :key="Project.id" class="col-12 col-md-6">
                <ProjectCard :Project="Project" />
              </div>
            </div>

            <div v-if="isMobile && MyProject.length > 3" class="mt-3 text-center">
              <a class="more-toggle link-primary" role="button" @click="showProjectsExpanded = !showProjectsExpanded">
                <span>{{ showProjectsExpanded ? 'أقل' : 'المزيد' }}</span>
                <i :class="showProjectsExpanded ? 'bi bi-chevron-up ms-2' : 'bi bi-chevron-down ms-2'"></i>
              </a>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
            <h5 class="fw-bold mb-4">المنشورات</h5>
            <div v-if="MyPost && MyPost.length" class="row g-3">
              <div class="col-12 col-md-6 col-lg-4" v-for="Post in displayedPosts" :key="Post.id">
                <div class="post-card bg-light rounded-4 p-2 shadow-sm">
                  <PostProfile :Post="Post" />
                </div>
              </div>
            </div>
            <div v-else class="text-muted">لا يوجد أي منشورات حالياً</div>

            <div v-if="isMobile && MyPost.length > 3" class="mt-3 text-center">
              <a class="more-toggle link-primary" role="button" @click="showPostsExpanded = !showPostsExpanded">
                <span>{{ showPostsExpanded ? 'أقل' : 'المزيد' }}</span>
                <i :class="showPostsExpanded ? 'bi bi-chevron-up ms-2' : 'bi bi-chevron-down ms-2'"></i>
              </a>
            </div>
          </div>

          <div v-if="MyJob && MyJob.length" class="bg-white rounded-2xl shadow-soft p-4 mb-4">
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

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .btn-action {
    padding: .45rem .5rem;
    width: auto;
    height: 44px;
    justify-content: center;
    border-radius: 10px;
  }
  .profile-img { width: 56px; height: 56px; }
  .profile-banner { height: 160px; background-size: cover; }
  .employee-card { padding: 10px; }
  .mobile-employees { transition: all .25s ease; }
}

@media (min-width: 769px) {
  .btn-action { padding: .5rem .75rem; }
}

.more-toggle {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: #0d6efd;
  user-select: none;
}
.more-toggle.link-primary { color: #0d6efd; text-decoration: none; }
.more-toggle .more-text {
  font-weight: 600;
}

.project-card {
  background: #fafaff;
  border: 1px solid #ececff;
  transition: 0.3s ease;
}
.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 10px rgba(106,17,203,0.15);
}

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

.more-toggle:focus, .btn-action:focus {
  outline: 3px solid rgba(13,110,253,0.15);
  outline-offset: 2px;
}
</style>
