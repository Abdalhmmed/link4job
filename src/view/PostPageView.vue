<script setup>
</script>

<template>

    <div class="hero py-5">
      <section>
        <div class="container">
          <div class="row g-4">
            
            <div class="col-lg-8">
              <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5 mb-4">
                <span class="badge bg-primary-subtle text-primary px-3 py-2 mb-3">منشور</span>
                <h2 class="fw-bold mb-3 gradient-text">فرصة تدريب صيفية</h2>
                <p class="text-muted mb-4 fs-5">We are looking for web development interns.</p>
                <img src="https://picsum.photos/949/240" alt="صورة المنشور" class="img-fluid rounded-3 mb-3" />
                <div class="d-flex align-items-center gap-2 text-secondary small">
                  <i class="bi bi-calendar-event"></i>
                  <span>تاريخ النشر: 2025-09-02</span>
                </div>
              </div>

              <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5 mb-4">
                <h4 class="fw-bold mb-4 border-end pe-3 border-3 border-primary">تفاصيل الوظيفة</h4>
                <ul class="list-unstyled d-grid gap-3 text-secondary fs-6">
                  <li><i class="bi bi-check-circle-fill text-success ms-2"></i> المتطلبات: معرفة بأساسيات HTML, CSS, JavaScript</li>
                  <li><i class="bi bi-lightbulb-fill text-warning ms-2"></i> الخبرات المطلوبة: خبرة سابقة بمشاريع جامعية أو تدريبية</li>
                  <li><i class="bi bi-clock-fill text-primary ms-2"></i> أوقات الدوام: الأحد – الخميس (8 صباحاً – 3 عصراً)</li>
                  <li><i class="bi bi-cash-stack text-success ms-2"></i> الراتب: 200$ شهرياً + مكافآت</li>
                </ul>
              </div>
            </div>


            <div class="col-lg-4">
              <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5 h-100">
                <h5 class="fw-bold mb-3 border-end pe-2 border-3 border-success">بيانات الشركة</h5>
                <img src="https://picsum.photos/399/240" alt="صورة المنشور" class="img-fluid rounded-3 mb-3" />
                <ul class="list-unstyled d-grid gap-3 text-secondary mb-4 fs-6">
                  <li><i class="bi bi-building ms-2 text-primary"></i> Tech Solutions</li>
                  <li><i class="bi bi-diagram-3 ms-2 text-success"></i> IT</li>
                  <li><i class="bi bi-person-badge ms-2 text-info"></i> رئيس الفريق التقني</li>
                  <li><i class="bi bi-telephone ms-2 text-warning"></i> +967770000011</li>
                  <li><i class="bi bi-globe ms-2 text-danger"></i> www.techsolutions.com</li>
                </ul>
                <p class="text-muted">شركة تطوير برمجيات</p>
                <a href="" class="btn btn-gradient w-100">
                  <i class="bi bi-envelope ms-1"></i> تواصل مع المسؤول
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
    
    <div class="container py-5">
      <div class="bg-white rounded-2xl shadow-soft p-4 p-lg-5">
        <h4 class="fw-bold mb-4 gradient-text">أرسل خطاب التقديم</h4>
        <form>
          <div class="mb-3">
            <textarea class="form-control rounded-3" rows="6" placeholder="اكتب خطابك هنا..."></textarea>
          </div>
          <button type="submit" class="btn btn-gradient d-flex align-items-center gap-2 px-4">
            <i class="bi bi-send-fill"></i> إرسال الطلب
          </button>
        </form>
      </div>
    </div>

</template>
