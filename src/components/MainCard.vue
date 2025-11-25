<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isOpen = ref(false);
const MainCard = ref(null);

function toggleCard() {
  isOpen.value = !isOpen.value;

  if (MainCard.value) {
    MainCard.value.style.right = isOpen.value ? "1rem" : "-33rem";
  }
}

function login(data) {
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userData", JSON.stringify(data));
    location.reload();
    router.push({ name: "ProfilePage", params: { id: data.id } });
}

function login_admin() {
  alert("هذا الحساب غير متاح حالياً — سيتم إضافته في المستقبل");
}

const adminAccount = {
  id: "11",
  name: "11sahar",
  account_type: "adminAccount",
  role: "owner",
  gender: "female",
  international_key: "+967",
  phone: "771000011",
  email: "user11@gmail.com",
  password_hash: "000000000000",
  avatar_url: "https://picsum.photos/200/200?11",
  banner_url: "https://picsum.photos/800/200?11",
  bio: "مديرة تقنية ومؤسسة شركة تقنتو — تقود الفرق وتضع البصمة الفنية.",
  industry: "Software Development",
  address: "Yemen",
  age: 38,
  created_at: "2025-11-14 20:50:00",
  updated_at: "2025-11-14 20:50:00",
  company_id_belongs: null,
};

const user = {
  id: "1",
  name: "1fatima",
  account_type: "user",
  role: "software_engineer",
  gender: "female",
  international_key: "+967",
  phone: "771000001",
  email: "user1@gmail.com",
  password_hash: "000000000000",
  avatar_url: "https://picsum.photos/200/200?1",
  banner_url: "https://picsum.photos/800/200?1",
  bio: "مهندسة برمجيات متخصصة في واجهات المستخدم وتحسين الأداء.",
  industry: "Software Development",
  address: "Yemen",
  age: 28,
  created_at: "2025-11-14 20:00:00",
  updated_at: "2025-11-14 20:00:00",
  company_id_belongs: "1",
};
</script>

<template>
  <div 
    ref="MainCard"
    class="slider-card bg-white rounded-2xl shadow-soft blur-backdrop"
  >
    <button class="btn btn-light rounded-circle shadow hide-btn" @click="toggleCard">
      <i :class="isOpen ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"></i>
    </button>

    <div class="text-center px-4 mt-3">
      <p class="fw-bold mb-1 gradient-text fs-5">مرحبا بك في link4job</p>

      <p class="text-secondary mb-1">موقع تجريبي خاص بالمبرمج عبدالحيميد دعبان</p>
      <p class="text-secondary mb-1">يمكنك تسجيل الدخول عبر 14 حساب من 1 إلى 14</p>

      <p class="text-secondary small mb-2">
        example: <strong>user1@gmail.com</strong>,
        password: <strong>000000000000</strong>
      </p>

      <p class="fw-semibold text-secondary">أو يمكنك الدخول عبر أحد هذه الحسابات:</p>
    </div>

    <div class="d-flex gap-2 justify-content-center mt-3">
      <button class="btn btn-primary px-4 rounded-pill shadow-soft" @click="login(user)">
        <i class="bi bi-person-circle ms-1"></i> user
      </button>

      <button class="btn btn-primary px-4 rounded-pill shadow-soft" @click="login(adminAccount)">
        <i class="bi bi-key-fill ms-1"></i> adminAccount
      </button>

      <button class="btn btn-dark px-4 rounded-pill shadow-soft" @click="login_admin()">
        <i class="bi bi-shield-lock ms-1"></i> admin
      </button>
    </div>
  </div>
</template>


<style scoped>
:root {
  --brand: #4f46e5; 
  --brand-2: #22c55e; 
}

.gradient-text {
  background: linear-gradient(90deg, var(--brand), var(--brand-2));
  -webkit-background-clip: text;
  color: transparent;
}

.shadow-soft {
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
}

.slider-card {
  width: 33rem;
  height: 17rem;
  top: 25rem;
  right: -33rem;
  transition: 0.4s ease;
  padding: 1.2rem 0;
  z-index: 10;
  position: fixed;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
}

.slider-card.open {
  right: 0;
}

.hide-btn {
  position: absolute;
  top: 50%;
  left: -1.8rem;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
}

.rounded-2xl {
  border-radius: 1.25rem;
}
</style>