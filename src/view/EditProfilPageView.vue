<script setup>
const props = defineProps({
   status: {
    type: String,
    default: "employe",
   } 
});
</script>

<template>
      <!-- PROFILE SECTION -->
  <section class="py-5">
    <div class="container">
      <div class="bg-white rounded-2xl shadow-soft p-0 mb-4">
        <!-- Banner -->
        <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400');"></div>
       
        <!-- Profile Info -->
        <div class="p-4 text-center">
          <img src="https://picsum.photos/200" alt="Profile" class="profile-img">
          <h3 class="fw-bold gradient-text mb-1 mt-3">تعديل الحساب</h3>
          <p class="text-muted mb-0">يمكنك تحديث بياناتك الشخصية هنا</p>
        </div>
      </div>

      <!-- EDIT FORM -->
      <div class="bg-white rounded-2xl shadow-soft p-4">
        <form>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">الاسم الكامل</label>
              <input type="text" class="form-control" value="أحمد سعيد" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">البريد الإلكتروني</label>
              <input type="email" class="form-control" value="ahmed1@example.com" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">رقم الهاتف</label>
              <input type="tel" class="form-control" value="+967770000001" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">المدينة</label>
              <input type="text" class="form-control" value="صنعاء">
            </div>
            <div class="col-md-6">
              <label class="form-label">العمر</label>
              <input type="number" class="form-control" value="28">
            </div>
            <div class="col-md-6">
              <label class="form-label">الجنس</label>
              <select class="form-select">
                <option selected>ذكر</option>
                <option>أنثى</option>
              </select>
            </div>

            <div v-if="status === 'employe'" class="col-md-6">
              <label class="form-label">نوع الحساب</label>
              <select class="form-select">
                <option selected>اختر نوع الحساب</option>
                <option> موظف حر</option>
                <option>موظف</option>
                <option>باحث عن عمل</option>
                <option>طالب</option>
                <option>متدرب</option>
              </select>
            </div>

            <div v-if="status === 'adminAccount'" class="col-md-6">
                <label for="accountType" class="form-label">نوع الحساب</label>
                <select id="accountType" v-model="accountType" class="form-select">
                    <option selected>اختر نوع الحساب</option>
                    <option>رئيس شركة</option>
                    <option>مدير موارد بشرية</option>
                    <option>موظف</option>
                </select>
            </div>


            <div class="col-md-6">
              <label class="form-label">الوصف القصير</label>
              <textarea class="form-control" rows="2" placeholder="نبذة قصيرة عنك"></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label">الصورة الشخصية</label>
              <input type="file" class="form-control">
            </div>
            <div class="col-md-6">
              <label class="form-label">الصورة الخلفية</label>
              <input type="file" class="form-control">
            </div>
            <div class="col-12">
              <label class="form-label">التعريف الشخصي</label>
              <textarea class="form-control" rows="4" placeholder="اكتب نبذة تعريفية مفصلة عنك..."></textarea>
            </div>
          </div>

          <div class="text-center mt-4 d-flex align-items-center justify-content-center">
            <button type="submit" class="btn btn-primary px-4 mx-2">
              <i class="bi bi-save me-1"></i> حفظ التغييرات
            </button>
            
            <button type="reset" class="btn btn-outline-secondary px-4 mx-2">
              <i class="bi bi-x-circle me-1"></i> إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>