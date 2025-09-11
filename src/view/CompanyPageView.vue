<script setup>
import PostProfile from '@/components/PostProfile.vue';
import { ref } from 'vue';

const follow = ref(false);
const like = ref(false);

const props = defineProps({
  user: {
    type: Boolean,
    default: false,
  } 
});

</script>

<template>
    <!-- COMPANY SECTION -->
  <section class="py-5">
    <div class="container">
      <div class="bg-white rounded-3 shadow-soft p-0 mb-4">
        <!-- Banner -->
        <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400?company');"></div>

        <!-- Company Info -->
        <div class="p-4 d-flex align-items-center justify-content-between flex-wrap">
          <div class="d-flex align-items-center">
            <img src="https://picsum.photos/200?logo" alt="Company Logo" class="rounded-circle me-3" width="100" height="100">
            <div>
              <h3 class="fw-bold gradient-text mb-1">
                شركة التقنيات الحديثة 
                <i class="bi bi-patch-check-fill text-primary" title="حساب موثق"></i>
              </h3>
              <p class="text-muted mb-0">حلول تقنية مبتكرة</p>
            </div>
          </div>
          <div v-if="!user" class="d-flex gap-2 mt-3 mt-md-0">
            <button @click="follow = !(follow)" class="btn btn-outline-success" :class="{ active: follow == true }">
              <i :class="follow ? 'bi bi-person-dash-fill' : 'bi bi-person-plus'"></i> {{ follow ? 'تمت المتابعة' : 'متابعة'}}
            </button>
            <button @click="like = !(like)" class="btn btn-outline-primary" :class="{ active: like == true }">
              <i class="bi bi-hand-thumbs-up"></i> {{ like ? ' الغاء الاعجاب' : 'اعجاب'}}
            </button>
          </div>
          <button v-if="user" class="btn btn-outline-primary">
            <i class="bi bi-pencil"></i> تعديل
          </button>
        </div>
      </div>

      <!-- Info + Posts -->
      <div class="row g-4">
        <!-- Company Info -->
        <div class="col-lg-4">
          <div class="bg-white rounded-3 shadow-soft p-4 h-100">
            <h5 class="fw-bold mb-3">بيانات الشركة</h5>
            <ul class="list-unstyled d-grid gap-3 text-secondary">
              <li><i class="bi bi-envelope text-primary ms-2"></i> company@example.com</li>
              <li><i class="bi bi-telephone text-success ms-2"></i> +967770000001</li>
              <li><i class="bi bi-geo-alt text-danger ms-2"></i> صنعاء</li>
              <li><i class="bi bi-building text-warning ms-2"></i> نوع الشركة: تقنيات</li>
              <li><i class="bi bi-person-check text-info ms-2"></i> صاحب الشركة: أحمد سعيد</li>
            </ul>
            <hr>
            <div class="d-flex justify-content-between text-center">
              <div>
                <h6 id="followersCount" class="fw-bold mb-0">120</h6>
                <small class="text-muted">متابعين</small>
              </div>
              <div>
                <h6 id="likesCount" class="fw-bold mb-0">85</h6>

                <small class="text-muted">إعجابات</small>
              </div>
            </div>
            <hr>
            <h5 class="fw-bold mb-3">الموظفين</h5>
            <div v-for="n in 4">
              <div class="d-flex align-items-center mb-3">
                <img :src="`https://picsum.photos/50?emp${n}`" class="rounded-circle me-2" alt="User">
                <div>
                  <h6 class="mb-0">ليث خالد</h6>
                  <small class="text-secondary">CIO</small>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <!-- Posts -->
        <div class="col-lg-8">
          <div class="bg-white rounded-3 shadow-soft p-4 mb-4">
            <h5 class="fw-bold mb-4">منشورات الموظفين</h5>
            <div class="row g-4">
              <div class="col-12 col-md-6 col-lg-4" v-for="n in 4" :key="n">
                <PostProfile :n = n />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>