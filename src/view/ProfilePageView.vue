<script setup>
import PostProfile from '@/components/PostProfile.vue';
import { ref, defineProps } from 'vue';

const gender = 'male'
const projct = ref(true);
const post = ref(true);
const follow = ref(false);
const like = ref(false);

const props = defineProps({
   status: {
    type: String,
    default: "guest",
   },
   user: {
    type: Boolean,
    default: false,
   }
})

</script>

<template>
    <section class="hero py-5">
      <div class="container">
        <div class="bg-white rounded-2xl shadow-soft p-0 mb-4" style="border: 1rem white solid;">
          
          <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400');"></div>
          
          <div class="p-4 d-flex justify-content-between ">
            <div class="d-flex align-items-center">
              <img src="https://picsum.photos/200" alt="Profile" class="profile-img me-3">
              <div>
                <h3 class="fw-bold gradient-text mb-1">أحمد سعيد</h3>
                <p class="text-muted mb-0">مبرمج ويب</p>
                <small class="text-secondary">28 سنة - يمني</small>
              </div>
            </div>

            <div class="text-center">
              <div v-if="!user" class="d-flex gap-2 mt-3 mt-md-0">
                <button @click="follow = !(follow)" class="btn btn-outline-success" :class="{ active: follow == true }">
                  <i :class="follow ? 'bi bi-person-dash-fill' : 'bi bi-person-plus'"></i> {{ follow ? 'الغاء المتابعة' : 'متابعة'}}
                </button>
                <button @click="like = !(like)" class="btn btn-outline-primary" :class="{ active: like == true }">
                  <i class="bi bi-hand-thumbs-up"></i> {{ like ? ' الغاء الاعجاب' : 'اعجاب'}}
                </button>
              </div>
              <div v-if="user" class="d-flex gap-2 mt-3 mt-md-0 ">             
                <button class="btn btn-outline-success">
                  <i class="bi bi-images"></i> قامة المشاريع
                </button>
                <button class="btn btn-outline-primary">
                  <i class="bi bi-pencil-square"></i> قامة المنشورات
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
            <div class="bg-white rounded-2xl shadow-soft p-4 " style="height: 100%; max-height: 651.094px;">
              <h5 class="fw-bold mb-3">بيانات الحساب</h5>
              <ul class="list-unstyled d-grid gap-3 text-secondary">
                <li><i class="bi bi-envelope text-primary ms-2"></i> ahmed1@example.com</li>
                <li><i class="bi bi-telephone text-success ms-2"></i> +967770000001</li>
                <li><i class="bi bi-geo-alt text-danger ms-2"></i> صنعاء</li>
                <li><i class="bi bi-person-badge text-warning ms-2"></i> نوع الحساب: موظف</li>
                <li><i :class="{ 'bi bi-gender-male text-primary ms-2' : gender === 'male', 'bi bi-gender-female text-skin ms-2' : gender === 'female' }"></i> {{ gender }}</li>
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
              <div v-if="status === 'adminAccount'">
                <h5 class="fw-bold mb-3">بيانات الشركة</h5>
                <ul class="list-unstyled d-grid gap-3 text-secondary">
                    <li><i class="bi bi-envelope text-primary ms-2"></i> company@example.com</li>
                    <li><i class="bi bi-telephone text-success ms-2"></i> +967770000001</li>
                    <li><i class="bi bi-geo-alt text-danger ms-2"></i> صنعاء</li>
                    <li><i class="bi bi-building text-warning ms-2"></i> نوع الشركة: تقنيات</li>
                </ul>
              </div>
            </div>
          </div>


          <div class="col-lg-8">
            <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
              <h5 class="fw-bold mb-4">تعريف شخصي</h5>
              <div>
                <dav>
                  <span>
                    مسؤول في شركة تطوير مواقع و تطبيقات, خبره كبيره في مجال العمال في كل ما يتعلق ببرمرجة المواقع, حاليا اعمل كمشرف لقسم تطوير المواقع 
                  </span>
                </dav>
              </div>
            </div>

            <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
              <h5 class="fw-bold mb-4">المشاريع</h5>
              <div v-if="projct" class="row g-3">
                <div v-for="n in 3" :key="n" class="col-12 col-md-6">
                  <div class="project-card p-3 rounded-4 shadow-sm">
                    <img :src="`https://picsum.photos/400/230?proj${n}`" class="img-fluid rounded-3 mb-2" alt="project">
                    <h6 class="fw-bold text-truncate" title="مشروع تطوير تطبيق شامل لإدارة المتاجر الإلكترونية">
                      مشروع تطوير تطبيق شامل لإدارة المتاجر الإلكترونية
                    </h6>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <div class="text-muted small">
                        <i class="bi bi-hand-thumbs-up"></i> 54
                        <i class="bi bi-chat-left-text ms-2"></i> 12
                      </div>
                      <button class="btn btn-outline-projects btn-sm rounded-pill px-3">تفاصيل</button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted">لا يوجد بيانات حاليا</div>
            </div>

            <div class="bg-white rounded-2xl shadow-soft p-4 mb-4">
              <h5 class="fw-bold mb-4">المنشورات</h5>
              <div v-if="post" class="row g-3">
                <div class="col-12 col-md-6 col-lg-4" v-for="n in 4" :key="n">
                  <div class="post-card bg-light rounded-4 p-2 shadow-sm">
                    <PostProfile :n="n" :user="user" />
                  </div>
                </div>
              </div>
              <div v-else class="text-muted">لا يوجد بيانات حاليا</div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
</template>