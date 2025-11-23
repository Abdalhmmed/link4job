<script setup>

</script>

<template>

    <header class="hero">
      <br>
      <br>
      <div class="container">
        <div class="row align-items-center g-4">

          <div class="col-lg-7">
            <div class="bg-white rounded-2xl p-4 p-lg-5 shadow-soft hero-card">
              <div class="d-flex align-items-start gap-3">
                <div class="flex-shrink-0">
                  <div class="display-1 fw-bold gradient-text">
                    <i class="bi bi-tools"></i>
                  </div>
                </div>
                <div>
                  <h1 class="h3 fw-bold mb-2">قريبًا… أوشكت اللمسات الأخيرة!</h1>
                  <p class="text-secondary mb-3 lh-lg">
                    الموقع يخضع لبعض التحسينات…  
                    لا تقلق، ما زلنا نضبط البراغي ونلمّع الواجهات.  
                    خلال وقت قصير سنعود بشكل أسرع، أجمل، وأقوى!
                  </p>

                  <div class="d-flex flex-column flex-sm-row gap-2 mb-3">
                    <router-link :to="{ name: 'HomePoge'}"  href="/" class="btn btn-primary btn-lg">
                      <i class="bi bi-house-door ms-1"></i> العودة للرئيسية
                    </router-link>
                    <router-link :to="{ name: 'HomePoge'}" href="/contact" class="btn btn-outline-secondary btn-lg">
                      تواصل معنا
                    </router-link>
                  </div>

                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="row g-3">
                <div class="col-md-4">
                  <div class="bg-white rounded-2xl p-3 shadow-soft h-100 text-center">
                    <i class="bi bi-lightning-charge fs-3 text-warning"></i>
                    <h6 class="mt-2 mb-1">تحسين السرعة</h6>
                    <p class="mb-0 text-secondary small">نطور الأداء للأفضل.</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="bg-white rounded-2xl p-3 shadow-soft h-100 text-center">
                    <i class="bi bi-brush fs-3 text-success"></i>
                    <h6 class="mt-2 mb-1">تجربة جديدة</h6>
                    <p class="mb-0 text-secondary small">واجهة أحدث وأكثر سلاسة.</p>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="bg-white rounded-2xl p-3 shadow-soft h-100 text-center">
                    <i class="bi bi-shield-check fs-3 text-info"></i>
                    <h6 class="mt-2 mb-1">أمان أعلى</h6> 
                    <p class="mb-0 text-secondary small">طبقات حماية إضافية.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="col-lg-5">
            <div class="bg-white rounded-2xl p-4 p-lg-5 shadow-soft text-center">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop"
                   class="w-100 rounded-2xl mb-3" alt="Under maintenance" />
              <h5 class="fw-bold mb-2">نعيد صياغة التجربة من جديد</h5>
              <p class="text-secondary mb-3">ترقّب الإطلاق الجديد… سيكون مختلفًا بالكامل.</p>
              <a href="/contact" class="btn btn-outline-primary">هل لديك استفسار؟</a>
            </div>

            <div class="bg-white rounded-2xl p-3 mt-3 shadow-soft text-center">
              <div class="stat">90%</div>
              <div class="text-secondary">من التحديث اكتمل</div>
            </div>
          </div>

        </div>
      </div>
    </header>
    <br>
    <br>
</template>

<style scoped>

</style>