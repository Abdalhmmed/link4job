<script setup>

</script>

<template>
    <header class="hero">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <div class="bg-white rounded-2xl p-4 p-lg-5 shadow-soft hero-card">
              <div class="d-flex align-items-start gap-3">
                <div class="flex-shrink-0">
                  <div class="display-1 fw-bold gradient-text">404</div>
                </div>
                <div>
                  <h1 class="h3 fw-bold mb-2">الصفحة غير موجودة</h1>
                  <p class="text-secondary mb-3 lh-lg">
                    عذراً... يبدو أن الصفحة التي تبحث عنها تاهت بين السطور. دعنا نرشدك إلى حيث يجب أن تكون — أو نأخذك إلى بداية الرحلة.
                  </p>

                  <div class="d-flex flex-column flex-sm-row gap-2 mb-3">
                    <router-link :to="{ name: 'HomePage' }" class="btn btn-primary btn-lg"><i class="bi bi-house-door ms-1"></i> العودة للرئيسية</router-link>
                    <!-- <router-link href="/sitemap" class="btn btn-outline-secondary btn-lg">عرض الخريطة</router-link> -->
                  </div>

                  <form class="d-flex gap-2" role="search" action="/search" method="get">
                    <input name="q" class="form-control form-control-lg" type="search" placeholder="ابحث عن محتوى، مقال، أو خدمة" aria-label="Search">
                    <button class="btn btn-ghost btn-lg" type="submit"><i class="bi bi-search"></i></button>
                  </form>

                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="row g-3">
                <div class="col-md-4">
                  <router-link :to="{ name: 'HomePage' }" href="" class="text-decoration-none">
                    <div class="bg-white rounded-2xl p-3 shadow-soft h-100">
                      <i class="bi bi-journals fs-3 text-primary"></i>
                      <h6 class="mt-2 mb-1">الصفحة العامة</h6>
                      <p class="mb-0 text-secondary small">تصفح اخر المنشورات والمشاريع الجديدة.</p>
                    </div>
                  </router-link>
                </div>
                <div class="col-md-4">
                  <router-link :to="{ name: 'JobsPage' }" href="" class="text-decoration-none">
                    <div class="bg-white rounded-2xl p-3 shadow-soft h-100">
                      <i class="bi  bi-clipboard2-check fs-3 text-success"></i>
                      <h6 class="mt-2 mb-1 text-success">الوظائف</h6>
                      <p class="mb-0 text-secondary small">اطلع على اخر الوظائف الموجودة في سوق العمل.</p>
                    </div>
                  </router-link>
                </div>
                <div class="col-md-4">
                  <a href="/contact" class="text-decoration-none">
                    <div class="bg-white rounded-2xl p-3 shadow-soft h-100">
                      <i class="bi bi-headset fs-3 text-info"></i>
                      <h6 class="mt-2 mb-1 text-info">الدعم</h6>
                      <p class="mb-0 text-secondary small">نحن هنا للمساعدة 24/7.</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div class="col-lg-5">
            <div class="bg-white rounded-2xl p-4 p-lg-5 shadow-soft text-center">
              <img src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200&auto=format&fit=crop" class="w-100 rounded-2xl mb-3" alt="404 illustration">
              <h5 class="fw-bold mb-2">قلب الموقع يهدهد الصفحات الضائعة</h5>
              <p class="text-secondary mb-3">إذا كنت تعتقد أن هذا خطأ، بإمكانك التواصل معنا لنقوم بالبحث والتصحيح فورًا.</p>
              <a href="" class="btn btn-outline-primary">ابلغ عن المشكلة</a>
            </div>

            <div class="bg-white rounded-2xl p-3 mt-3 shadow-soft text-center">
              <div class="stat">+120</div>
              <div class="text-secondary">عملاء سعداء</div>
            </div>
          </div>
        </div>
      </div>
    </header>
</template>

<style scoped>
    :root {
    --brand: #4f46e5; 
    --brand-2: #22c55e; 
    }
    body { background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%); }
    .hero {
    background: radial-gradient(1200px 500px at 80% -10%, rgba(79,70,229,.12), transparent),
                linear-gradient(135deg, rgba(34,197,94,.05), rgba(79,70,229,.05));
    padding: 6rem 0;
    }
    .shadow-soft { box-shadow: 0 10px 30px rgba(0,0,0,.06); }
    .rounded-2xl { border-radius: 1.25rem; }
    .blur-backdrop { backdrop-filter: blur(6px); }
    .gradient-text {
    background: linear-gradient(90deg, var(--brand), var(--brand-2));
    -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .stat { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; }
    .badge-soft { background: rgba(79,70,229,.08); color: var(--brand); }
    a { text-decoration: none; }
    .hero-card { min-height: 260px; }
    .btn-ghost { border: 1px dashed rgba(0,0,0,.08); }
    @media (max-width: 767px) {
    .hero { padding: 3.5rem 0; }
    }
</style>