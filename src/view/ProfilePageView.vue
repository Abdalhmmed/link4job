<script setup>
import PostProfile from '@/components/PostProfile.vue';
import ProjectCard from '@/components/ProjectCard.vue';

import { onMounted, ref } from 'vue';
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

onMounted(async () => {
  const id = Number(route.params.id);

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
  } else {
    route.path = {name: 'not-found'}
  }
});
</script>

<template>
  <section class="hero py-5" v-if="user">
    <div class="container">
      <div class="bg-white rounded-2xl shadow-soft p-0 mb-4" style="border: 1rem white solid;">
        <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400');"></div>
        <div class="p-4 d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <img src="https://picsum.photos/200" alt="Profile" class="profile-img me-3" />
            <div>
              <h3 class="fw-bold gradient-text mb-1">{{ user?.name }}</h3>
              <p class="text-muted mb-0">{{ user?.industry }}</p>
              <small class="text-secondary">{{ user?.address }} - {{ user?.age }}</small>
            </div>
          </div>

          <div class="text-center">
            <div v-if="!UserStore.theuser" class="d-flex gap-2 mt-3 mt-md-0">
              <button @click="follow = !follow" class="btn btn-outline-success" :class="{ active: follow }">
                <i :class="follow ? 'bi bi-person-dash-fill' : 'bi bi-person-plus'"></i>
                {{ follow ? 'الغاء المتابعة' : 'متابعة' }}
              </button>
              <button @click="like = !like" class="btn btn-outline-primary" :class="{ active: like }">
                <i class="bi bi-hand-thumbs-up"></i>
                {{ like ? ' الغاء الاعجاب' : 'اعجاب' }}
              </button>
            </div>

            <div v-else class="d-flex gap-2 mt-3 mt-md-0">
              <button class="btn btn-outline-success">
                <i class="bi bi-images"></i> قائمة المشاريع
              </button>
              <button class="btn btn-outline-primary">
                <i class="bi bi-pencil-square"></i> قائمة المنشورات
              </button>
              <button class="btn btn-gradient">
                <i class="bi bi-person"></i> تعديل الملف
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="bg-white rounded-2xl shadow-soft p-4" style="max-height: 900px;">
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

            <div v-if="MySkills && MySkills.length" class="skills-section">
              <hr />
              <h5 class="fw-bold mb-3">المهارات التقنية</h5>
              <div class="d-flex flex-wrap gap-2">
                <div
                  v-for="skills in MySkills"
                  :key="skills.id"
                  class="skill-card p-2 px-3 rounded-pill border text-dark"
                  style="background-color: #f5f5f5; border: 1px solid #ddd;"
                >
                  <i class="bi bi-gear-fill me-1 text-primary"></i> {{ skills.name }}
                </div>
              </div>
            </div>

            <div v-if="MyCompany && MyCompany?.name">
              <hr />
              <h5 class="fw-bold mb-3">{{ `شركة: ${MyCompany?.name}` }}</h5>
              <ul class="list-unstyled d-grid gap-3 text-secondary">
                <li><i class="bi bi-envelope text-primary ms-2"></i>{{ MyCompany?.email }}</li>
                <li><i class="bi bi-telephone text-success ms-2"></i>{{ MyCompany?.phone }}</li>
                <li><i class="bi bi-geo-alt text-danger ms-2"></i>{{ MyCompany?.address }}</li>
                <li><i class="bi bi-building text-warning ms-2"></i> مجال الشركة: {{ MyCompany?.role }}</li>

                <li v-if="Myadmin && Myadmin?.name">
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
              </ul>
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
                <div v-for="Project in MyProject" :key="Project.id" class="col-12 col-md-6">
                  <ProjectCard :Project="Project" />
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
            <h5 class="fw-bold mb-4">المنشورات</h5>
            <div v-if="MyPost && MyPost.length" class="row g-3">
              <div class="col-12 col-md-6 col-lg-4" v-for="Post in MyPost" :key="Post.id">
                <div class="post-card bg-light rounded-4 p-2 shadow-sm">
                  <PostProfile :Post="Post" />
                </div>
              </div>
            </div>
            <div v-else class="text-muted">لا يوجد أي منشورات حالياً</div>
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
