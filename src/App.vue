<script setup>
import HomePageView from './view/HomePageView.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue';
import PostsPageView from './view/PostsPageView.vue';
import PostPageView from './view/PostPageView.vue';
import ProfilePageView from './view/ProfilePageView.vue';
import { ref } from 'vue';

const user = ref('adminAccount');
</script>

<template>
  <div id="app" class="bg-light" dir="rtl">
    <Navbar :status= user />
    
    <!-- <HomePageView /> -->
    <!-- <PostsPageView /> -->
    <!-- <PostPageView /> -->
    <ProfilePageView :status= user />

    <Footer />
  </div>
</template>

<style>
:root {
  --brand: #4f46e5;
  --brand-2: #22c55e;
}
.hero {
  background: radial-gradient(
      1000px 500px at 80% -10%,
      rgba(79, 70, 229, 0.12),
      transparent
    ),
    linear-gradient(135deg, rgba(34, 197, 94, 0.06), rgba(79, 70, 229, 0.06));
}
.shadow-soft {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.rounded-2xl {
  border-radius: 1.25rem;
}
.gradient-text {
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.btn-gradient {
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
  color: #fff !important;
  border: none;
  border-radius: 0.75rem;
  transition: 0.3s ease;
}
.btn-gradient:hover {
  opacity: 0.9;
}
a {
  text-decoration: none;
}
.profile-banner {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
}
.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  margin-top: -60px;
}
.text-skin {
  color: #e94dca;
}
</style>
