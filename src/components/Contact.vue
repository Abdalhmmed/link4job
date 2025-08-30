<script setup>

</script>

<template>
 <section id="contact" class="py-5">
      <div class="container ">
        <div class="text-center  mb-4">
          <h2 class="section-title fw-bold">تواصل <span>معنا</span></h2>
          <p class="text-secondary">يسعدنا سماعك دائمًا.</p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-lg-6">
            <form class="bg-white rounded-2xl p-4 p-lg-5 shadow-soft">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">الاسم</label>
                  <input type="text" class="form-control" placeholder="اسمك الكامل" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">البريد الإلكتروني</label>
                  <input type="email" class="form-control" placeholder="name@example.com" />
                </div>
                <div class="col-12">
                  <label class="form-label">الموضوع</label>
                  <input type="text" class="form-control" placeholder="موضوع الرسالة" />
                </div>
                <div class="col-12">
                  <label class="form-label">الرسالة</label>
                  <textarea class="form-control" rows="5" placeholder="اكتب رسالتك هنا..."></textarea>
                </div>
                <div class="col-12 d-grid d-sm-flex gap-2">
                  <button type="submit" class="btn btn-primary px-4"><i class="bi bi-send ms-1"></i> إرسال</button>
                  <button type="reset" class="btn btn-outline-secondary">تفريغ</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>


