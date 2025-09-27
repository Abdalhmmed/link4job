<script setup>
import { ref } from "vue";

const props = defineProps({
  status: {
    type: String,
    default: "adminAccount",
  },
});

</script>

<template>
  <section class="py-5">
    <div class="container">
      <div class="bg-white rounded-2xl shadow-soft p-0 mb-4">
        <div class="profile-banner" style="background-image: url('https://picsum.photos/1200/400');"></div>
        <div class="p-4 text-center">
          <img src="https://picsum.photos/200" alt="Logo الشركة" class="profile-img rounded-circle">
          <h3 class="fw-bold gradient-text mb-1 mt-3">تعديل بيانات الشركة</h3>
          <p class="text-muted mb-0">يمكنك تحديث معلومات شركتك هنا</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-soft p-4">
        <form>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">اسم الشركة</label>
              <input type="text" class="form-control" required>
            </div>

            <div class="col-md-6">
              <label class="form-label">البريد الإلكتروني</label>
              <input type="email" class="form-control" required>
            </div>

            <div class="col-md-6">
              <label class="form-label">رقم التواصل</label>
              <input type="tel" class="form-control" required>
            </div>

            <div class="col-md-6">
              <label class="form-label">نوع الشركة</label>
              <select class="form-select">
                <option selected disabled>اختر نوع الشركة</option>
                <option>شركة مساهمة</option>
                <option>شركة محدودة</option>
                <option>شركة خاصة</option>
                <option>شراكة</option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">الدولة</label>
              <input type="text" class="form-control" required>
            </div>

            <div class="col-md-6">
              <label class="form-label">المدينة</label>
              <input type="text" class="form-control"required>
            </div>

            <div class="col-md-6">
              <label class="form-label">وصف الشركة القصير</label>
              <textarea class="form-control" rows="2" placeholder="نبذة قصيرة عن الشركة"></textarea>
            </div>

            <div class="col-md-6">
              <label class="form-label">شعار الشركة</label>
              <input type="file" class="form-control">
            </div>

            <div class="col-md-6">
              <label class="form-label">صورة خلفية الشركة</label>
              <input type="file" class="form-control">
            </div>

            <div class="col-12">
              <label class="form-label">وصف الشركة التفصيلي (اختياري)</label>
              <textarea class="form-control" rows="4" placeholder="اكتب وصفاً تفصيلياً عن الشركة"></textarea>
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
