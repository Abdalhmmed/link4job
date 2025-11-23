<script setup>
import PostProfile from '@/components/PostProfile.vue';
import ProjectCard from '@/components/ProjectCard.vue';

import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import { useFollowersStore } from '@/stores/FollowersStore';
import { useLikesStore } from '@/stores/LikesStore';
import { useSkillsStore } from '@/stores/SkillsStore';
import { useProjectsStore } from '@/stores/ProjectsStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useCompanysStore } from '@/stores/CompanysStore';

const UserStore = useUserStore();
const FollowersStore = useFollowersStore();
const LikesStore = useLikesStore();
const SkillsStore = useSkillsStore();
const ProjectsStore = useProjectsStore();
const PostsStore = usePostsStore();
const CompanyStore = useCompanysStore();
const route = useRoute();

const user = ref(null);
const MyFollowers = ref(0);
const MyLikes = ref(0);
const MySkills = ref([]);
const MyProject = ref([]);
const MyPost = ref([]);
const MyCompany = ref(null);
const Myadmin = ref(null);

const follow = ref(false);
const like = ref(false);

const theuser = ref(false);

const isMobile = ref(false);
const showDetails = ref(false); 
const showProjectsExpanded = ref(false);
const showPostsExpanded = ref(false);

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

function updateIsMobile() {
  isMobile.value = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false;
}

onMounted(async () => {
  updateIsMobile();

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIsMobile);
  }

  const id = Number(route.params.id);

  if (id == localStorage.getItem("userId")) {
    theuser.value = true;
  } else {
    theuser.value = false;
  }

  user.value = await UserStore.fetchUserById(id);

  if (user.value) {
    MyFollowers.value = await FollowersStore.countFollowersById(id, 'user');
    MyLikes.value = await LikesStore.countLikesById(id, 'user');
    MySkills.value = await SkillsStore.filterSkillsByUserId(id);
    MyProject.value = await ProjectsStore.filterProjectsByUserId(id);
    MyPost.value = await PostsStore.filterPostsByUserId(id);

    if (user.value.company_id_belongs) {
      MyCompany.value = await CompanyStore.fetchCompanyById(user.value.company_id_belongs);

      if (MyCompany.value?.owner_user_id) {
        Myadmin.value = await UserStore.fetchUserById(MyCompany.value.owner_user_id);
      }
    }
    else if(user.value.account_type == "adminAccount")  {
      MyCompany.value = await CompanyStore.fetchCompanyByOwnerId(user.value,id);

      if (MyCompany.value?.owner_user_id == user.value.id) {
        Myadmin.value = user.value;
      }
    }
  } else {
    route.path = {name: 'not-found'};
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateIsMobile);
  }
});
</script>

<template>
  <section class="hero py-5" v-if="user">
    <div class="container">
      <div class="bg-white rounded-2xl shadow-soft p-0 mb-4" style="border: 1rem white solid;">
        <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400');"></div>
        <div class="p-4 d-flex justify-content-between align-items-start">
          <div class="d-flex align-items-center">
            <img src="https://picsum.photos/200" alt="Profile" class="profile-img me-3" />
            <div>
              <h3 class="fw-bold gradient-text mb-1">{{ user?.name }}</h3>
              <p class="text-muted mb-0">{{ user?.industry }}</p>
              <small class="text-secondary">{{ user?.address }} - {{ user?.age }}</small>
            </div>
          </div>

          <div class="text-center">
            <div v-if="!theuser" class="d-flex gap-2 mt-3 mt-md-0">
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
              <button class="btn btn-outline-success btn-action" aria-label="قائمة المشاريع">
                <i class="bi bi-images"></i>
                <span class="btn-text ms-1">قائمة المشاريع</span>
              </button>
              <button class="btn btn-outline-primary btn-action" aria-label="قائمة المنشورات">
                <i class="bi bi-pencil-square"></i>
                <span class="btn-text ms-1">قائمة المنشورات</span>
              </button>
              <button class="btn btn-gradient btn-action" aria-label="تعديل الملف">
                <i class="bi bi-person"></i>
                <span class="btn-text ms-1">تعديل الملف</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="bg-white rounded-2xl shadow-soft p-4" style="max-height: 955px;">
            <h5 class="fw-bold mb-3">بيانات الحساب</h5>
            <ul class="list-unstyled d-grid gap-3 text-secondary">
              <li><i class="bi bi-envelope text-primary ms-2"></i> {{ user?.email }}</li>
              <li><i class="bi bi-telephone text-success ms-2"></i> {{ user?.phone }} {{ user?.international_key }}</li>
              <li><i class="bi bi-geo-alt text-danger ms-2"></i> {{ user?.address }}</li>
              <li><i class="bi bi-person-badge text-warning ms-2"></i> مجال العمل : {{ user?.role }}</li>
              <li>
                <i :class="{ 
                  'bi bi-gender-male text-primary ms-2': user?.gender === 'male', 
                  'bi bi-gender-female text-skin ms-2': user?.gender === 'female' 
                }"></i>
                 {{ user?.gender }}
              </li>
            </ul>

            <hr />

            <div class="d-flex justify-content-between text-center">
              <div>
                <h6 id="followersCount" class="fw-bold mb-0">{{ MyFollowers }}</h6>
                <small class="text-muted">متابعين</small>
              </div>
              <div>
                <h6 id="likesCount" class="fw-bold mb-0">{{ MyLikes }}</h6>
                <small class="text-muted">إعجابات</small>
              </div>
            </div>

            <div class="mt-3">
              <div v-if="showDetails">
                <div v-if="MySkills && MySkills.length" class="skills-section mb-3">
                  <h5 class="fw-bold mb-2">المهارات التقنية</h5>
                  <div class="d-flex flex-wrap gap-2">
                    <div
                      v-for="skills in MySkills"
                      :key="skills.id"
                      class="skill-card p-2 px-3 rounded-pill border text-dark"
                    >
                      <i class="bi bi-gear-fill me-1 text-primary"></i> {{ skills.name }}
                    </div>
                  </div>
                </div>

                <div v-if="MyCompany && MyCompany?.name" class="company-section">
                  <h5 class="fw-bold mb-2">{{ `شركة: ${MyCompany?.name}` }}</h5>
                  <ul class="list-unstyled d-grid gap-2 text-secondary">
                    <li><i class="bi bi-envelope text-primary ms-2"></i>{{ MyCompany?.email }}</li>
                    <li><i class="bi bi-telephone text-success ms-2"></i>{{ MyCompany?.phone }}</li>
                    <li><i class="bi bi-geo-alt text-danger ms-2"></i>{{ MyCompany?.address }}</li>
                    <li><i class="bi bi-building text-warning ms-2"></i> مجال الشركة: {{ MyCompany?.role }}</li>

                    <li v-if="Myadmin && Myadmin?.name" class="mt-2">
                      <i class="bi bi-person-check text-info ms-2"></i> مدير الشركة
                      <router-link :to="{name: 'ProfilePage', params: { id: Myadmin.id }}" class="manager-card mt-2 p-2 rounded-3 d-flex align-items-center shadow-sm no-link-style">
                        <img
                          src="https://picsum.photos/50?emp1"
                          class="rounded-circle me-3 border border-2 border-primary shadow-sm"
                          alt="Manager"
                          width="55"
                          height="55"
                        />
                        <div>
                          <h6 class="mb-0">
                            <div class="fw-bold text-dark text-decoration-none hover-primary">
                              {{ Myadmin?.name }}
                            </div>
                          </h6>
                          <small class="text-muted">{{ Myadmin?.role }}</small>
                        </div>
                      </router-link>
                    </li>

                    <router-link  :to="{name: 'CompanyPage',  params: { id: MyCompany.id }}" class="btn btn-gradient w-100 mt-3">
                      <i class="bi bi-buildings ms-1"></i> تفقد حساب الشركة
                    </router-link>
                  </ul>
                </div>

              </div>
                <div v-if="!showDetails" class="text-center mt-2">
                  <button class="btn btn-outline-primary btn-xs rounded-pill px-3 py-1" @click="showDetails = true">عرض المزيد</button>
                </div>
                <div v-if="showDetails" class="text-center mt-2">
                  <button class="btn btn-outline-secondary btn-xs rounded-pill px-3 py-1" @click="showDetails = false">إغلاق</button>
              </div>
            </div>

          </div>
        </div>

        <div class="col-lg-8">
          <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
            <h5 class="fw-bold mb-4">تعريف شخصي</h5>
            <div><span>{{ user?.bio }}</span></div>
          </div>

          <div v-if="MyProject && MyProject.length">
            <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
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

@media (max-width: 768px) {
  .btn-text { display: none !important; }
  .btn-action {
    padding: .45rem .5rem;
    width: 44px;
    height: 44px;
    justify-content: center;
    border-radius: 10px;
  }
  .profile-img { width: 56px; height: 56px; } 
  .profile-banner { height: 160px; background-size: cover; }
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

.skill-card {
  background-color: #f5f5f5; 
  border: 1px solid #ddd;
}

.more-toggle:focus, .btn-action:focus {
  outline: 3px solid rgba(13,110,253,0.15);
  outline-offset: 2px;
}
</style>
