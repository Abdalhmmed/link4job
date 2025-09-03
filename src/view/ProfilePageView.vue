<script setup>
import { ref, defineProps } from 'vue';

const gender = 'male'
const projct = true
const like = ref(false)

const props = defineProps({
   status: {
    type: String,
    default: "guest",
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
              <button class="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 mx-auto" :class="{ active: like}" @click="like = !like ">
                <i class="bi bi-hand-thumbs-up"></i>
                <span>أعجبني</span>
              </button>
              <p class="mt-2 mb-0 text-muted">
                <span >25</span> أعجابات
              </p>
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
                <div class="col-6 col-md-4">
                  <img src="https://picsum.photos/300/200?1" class="img-fluid rounded-2xl shadow-sm" alt="project">
                </div>
                <div class="col-6 col-md-4">
                  <img src="https://picsum.photos/300/200?2" class="img-fluid rounded-2xl shadow-sm" alt="project">
                </div>
                <div class="col-6 col-md-4">
                  <img src="https://picsum.photos/300/200?3" class="img-fluid rounded-2xl shadow-sm" alt="project">
                </div>
              </div>

              <div v-else class="row g-3">
                <div class="col-6 col-md-4">
                 <span class="text-muted">لا يوجد بيانات حاليا</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
</template>