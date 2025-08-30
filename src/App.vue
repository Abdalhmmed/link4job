<script setup>
  import Navbar from "./components/Navbar.vue";
  import Hero from "./components/Hero.vue";
  import About from "./components/About.vue";
  import Goals from "./components/Goals.vue";
  import Achievements from "./components/Achievements.vue";
  import Features from "./components/Features.vue";
  import Contact from "./components/Contact.vue";
  import Footer from "./components/Footer.vue";
  import AuthModal from "./components/AuthModal.vue";
</script>

<template>
  <div id="app" class="bg-light" dir="rtl">
    <Navbar />
    <Hero />
    <About />
    <Goals />
    <Achievements />
    <Features />
    <Contact />
    <Footer />
    <AuthModal />
  </div>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.rtl.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

:root {
  --brand: #4f46e5;
  --brand-2: #22c55e;
}
.hero {
  background: radial-gradient(1200px 500px at 80% -10%, rgba(79,70,229,.15), transparent),
              linear-gradient(135deg, rgba(34,197,94,.08), rgba(79,70,229,.08));
}
.shadow-soft { box-shadow: 0 10px 30px rgba(0,0,0,.08); }
.rounded-2xl { border-radius: 1.25rem; }
.blur-backdrop { backdrop-filter: blur(6px); }
.section-title span { color: var(--brand); }
.badge-soft { background: rgba(79,70,229,.1); color: var(--brand); }
.gradient-text {
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 800; }
.nav-link.active { color: var(--brand)!important; }
a { text-decoration: none; }
</style>
