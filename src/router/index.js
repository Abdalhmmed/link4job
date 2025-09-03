import { createRouter , createWebHistory } from "vue-router";
import HomePageView from "@/view/HomePageView.vue";
import PostsPageView from "@/view/PostsPageView.vue";
import PostPageView from "@/view/PostPageView.vue";
import ProfilePageView from "@/view/ProfilePageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/link4job.com/HomePage', name: 'HomePage', component: HomePageView }, 
    { path: '/link4job.com/PostsPage', name: 'PostsPage', component: PostsPageView }, 
    { path: '/link4job.com/PostPage/id', name: 'PostPage', component: PostPageView }, 
    { path: '/link4job.com/Profile/id', name: 'ProfilePage', component: ProfilePageView }, 
  ]
});

export default router;
