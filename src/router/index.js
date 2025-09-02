import { createRouter , createWebHistory } from "vue-router";
import HomePageView from "@/view/HomePageView.vue";
import PostsPageView from "@/view/PostsPageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/HomePage', name: 'HomePage', component: HomePageView }, 
    { path: '/PostsPage', name: 'Posts', component: PostsPageView }, 
  ]
});

export default router;
