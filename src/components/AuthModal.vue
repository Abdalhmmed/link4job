<script setup>
import { inject, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";

const isModalVisible = ref(true);
const loginEmail = ref("");
const loginPassword = ref("");
const userData = ref(null);
const loading = ref(false);
const errorMsg = ref("");
const logoutMsg = ref("");
const showWelcome = ref(true);
const UserStore = useUserStore();

const theAuthModal = inject("theAuthModal");


const handleLogin = async () => {
  errorMsg.value = "";
  logoutMsg.value = "";
  loading.value = true;

  try {
    const result = await UserStore.fetchUserByLogin(loginEmail.value, loginPassword.value);
    if (result && result.id) {
      localStorage.setItem("userId", result.id);
      localStorage.setItem("userEmail", loginEmail.value);
      localStorage.setItem("userData", JSON.stringify(result));
      userData.value = result;
      showWelcome.value = true;
    } else {
      errorMsg.value = "هناك خطأ في البريد أو كلمة المرور";
    }
  } catch {
    errorMsg.value = "هناك خطأ في الاتصال بالخادم";
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  loading.value = true;
  errorMsg.value = "";
  logoutMsg.value = "";

  setTimeout(() => {
    localStorage.clear();
    userData.value = null;
    loading.value = false;
    logoutMsg.value = "تم تسجيل الخروج";
    loginEmail.value = "";
    loginPassword.value = "";
    showWelcome.value = false;
  }, 1000);
};

const closeWelcome = () => {
  showWelcome.value = false;
};

const closeAuthModal = () => {
  theAuthModal.value = false;
};


if (localStorage.getItem("userData")) {
  userData.value = JSON.parse(localStorage.getItem("userData"));
  showWelcome.value = true;
}
</script>

<template>
  <div v-if="isModalVisible" class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-2xl shadow-soft">
        <div class="modal-header">
          <h5 class="modal-title" id="authTitle">تسجيل الدخول / إنشاء حساب</h5>
          <button type="button" class="btn-close" @click="closeAuthModal()" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div v-if="loading" class="text-center text-primary mb-3">
            الرجاء الانتظار...
          </div>

          <div v-else-if="userData && showWelcome" class="position-relative border rounded p-3 mb-3">
            <button type="button" class="btn position-absolute top-0 end-0 m-2" @click="closeWelcome">
              <i class="bi bi-arrow-90deg-left"></i>
            </button>
            <div class="text-center mb-3">مرحبا {{ userData.email }}</div>
            <div class="d-flex gap-2">
              <button class="btn btn-danger flex-fill" @click="handleLogout">تسجيل الخروج</button>
            </div>
          </div>

          <div v-else-if="userData && !showWelcome">
            <button class="btn btn-primary w-100 " @click="showWelcome = true">عرض الترحيب</button>
            <button class="btn btn-secondary w-100 mb-3 mt-3" >إعدادات</button>
            <button class="btn btn-danger w-100" @click="handleLogout">تسجيل الخروج</button>
          </div>

          <div v-else>
            <ul class="nav nav-tabs mb-3" id="authTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">دخول</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">حساب جديد</button>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                <form class="d-grid gap-3" @submit.prevent="handleLogin">
                  <div>
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" class="form-control" placeholder="name@example.com" v-model="loginEmail" />
                  </div>
                  <div>
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" class="form-control" placeholder="••••••••" v-model="loginPassword" />
                  </div>
                  <div v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</div>
                  <button class="btn btn-primary">تسجيل الدخول</button>
                </form>
              </div>

              <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                <form class="d-grid gap-3">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">الاسم الأول</label>
                      <input type="text" class="form-control" disabled />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">اسم العائلة</label>
                      <input type="text" class="form-control" disabled />
                    </div>
                  </div>
                  <div>
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" class="form-control" disabled />
                  </div>
                  <div>
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" class="form-control" disabled />
                  </div>
                  <button class="btn btn-success" disabled>إنشاء حساب</button>
                </form>
              </div>
            </div>
          </div>

          <div v-if="logoutMsg" class="text-success text-center mt-2">{{ logoutMsg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
