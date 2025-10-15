import { createRouter, createWebHistory } from "vue-router";
import HomePageView from "@/view/HomePageView.vue";
import PostsPageView from "@/view/PostsPageView.vue";
import PostPageView from "@/view/PostPageView.vue";
import ProfilePageView from "@/view/ProfilePageView.vue";
import CompanyPageView from "@/view/CompanyPageView.vue";
import EditCompanyPageView from "@/view/EditCompanyPageView.vue";
import EditProfilPageView from "@/view/EditProfilPageView.vue";
import JobsPageView from "@/view/JobsPageView.vue";
import JobPageView from "@/view/JobPageView.vue";
import ProjectsPageView from "@/view/ProjectsPage.vue";
import ProjectPageView from "@/view/ProjectPage.vue";
import NotFoundView from "@/view/NotFoundView.vue";
import MainPageView from "@/view/MainPageView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'HomePage', component: HomePageView },
    { path: '/Post/:id', name: 'PostPage', component: PostPageView },
    { path: '/Jop/:id', name: 'JobPage', component: JobPageView },
    { path: '/Profile/:id', name: 'ProfilePage', component: ProfilePageView },
    { path: '/Project/:id', name: 'ProjectPage', component: ProjectPageView },
    { path: '/CompanyPage/:id', name: 'CompanyPage', component: CompanyPageView },
    { path: '/PostsPage', name: 'PostsPage', component: PostsPageView },
    { path: '/JobsPage', name: 'JobsPage', component: JobsPageView },
    { path: '/ProjectsPage', name: 'ProjectsPage', component: ProjectsPageView },
    { path: '/EditCompanyPage', name: 'EditCompanyPage', component: EditCompanyPageView },
    { path: '/EditProfilPage', name: 'EditProfilPage', component: EditProfilPageView },
    { path: '/MainPage', name: 'MainPage', component: MainPageView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ]
});

export default router;



// createdAt
// : 
// "2025-08-26T04:47:40Z"
// email
// : 
// "info1@datastudio1.com"
// followersCount
// : 
// 13124
// id
// : 
// "c1"
// jobs
// : 
// []
// location
// : 
// "مسقط"
// managerId
// : 
// "u2"
// name
// : 
// "DataStudio 1"
// phone
// : 
// "+966545570755"
// workField
// : 
// "التجارة الإلكترونية"
  