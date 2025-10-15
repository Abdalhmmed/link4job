<script setup>

</script>

<template>
    <div class="theman">
    <section>
      <article class="profile-card" role="region" aria-label="بطاقة المستخدم المستقلة">
        <div class="profile-banner" style="background-image:url('https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop')" aria-hidden="true"></div>
        <div class="avatar-wrap">
          <img class="avatar" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="صورة زين">
        </div>

        <div class="profile-body">
          <div class="d-flex align-items-start justify-content-between">
            <div>
              <h4 class="mb-0">زين — مدير متجر</h4>
              <small class="text-secondary">صنعاء • تجارة الملابس</small>
            </div>
            <div class="text-end">
              <span class="badge bg-light text-secondary">مؤكد</span>
            </div>
          </div>

          <div class="profile-stats" aria-live="polite">
            <div class="stat">
              <div class="fw-bold">8.4k</div>
              <small class="text-secondary">إعجابات</small>
            </div>
            <div class="stat">
              <div class="fw-bold">2.1k</div>
              <small class="text-secondary">متابع</small>
            </div>
          </div>

          <div class="thin-divider" role="separator" aria-hidden="true"></div>

          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">الإشعارات</h6>
              <ul class="list-unstyled small text-secondary mb-0">
                <li>🔔 متابع جديد — علي</li>
                <li>💬 تعليق جديد على منشورك</li>
                <li>🧾 تم استقبال طلب عرض سعر</li>
              </ul>
            </div>
          </div>

        </div>
      </article>
    </section>
    </div>
</template>

<style scoped>

    :root{ --brand: #4f46e5; --brand-2: #22c55e; --muted:#6b7280; }
    *{box-sizing:border-box}
    body{ background:#f6f8fb; color:#1f2937; -webkit-font-smoothing:antialiased; display:flex; flex-direction:column; min-height:100vh; }

    /* NAV kept simple and consistent */
    nav.navbar{ box-shadow:0 6px 18px rgba(18,24,40,.04); }

    main{ flex:1; display:flex; align-items:center; justify-content:center; padding:24px; }

    /* PROFILE CARD (centered, self-contained) */
    .profile-card{ width:100%; max-width:317px; background:#fff; border-radius:16px; padding:0; overflow:visible; position:relative; box-shadow:0 12px 40px rgba(18,24,40,.06); }
    .profile-banner{ height:140px; border-top-left-radius:16px; border-top-right-radius:16px; background-size:cover; background-position:center; position:relative; }
    .avatar-wrap{ position:absolute; left:50%; transform:translateX(-50%); bottom:255px; width:112px; height:112px; display:flex; align-items:center; justify-content:center; }
    .avatar{ width:112px; height:112px; border-radius:50%; border:6px solid #fff; object-fit:cover; box-shadow:0 10px 30px rgba(0,0,0,.12); }
    .profile-body{ padding:56px 20px 20px 20px; }
    .profile-stats{ display:flex; gap:8px; justify-content:space-between; align-items:center; padding:12px 0; }
    .profile-stats .stat{ text-align:center; flex:1; }
    .thin-divider{ height:1px; background:#e6e9ee; margin:12px 0; }

    .btn-contact{ background:linear-gradient(90deg,var(--brand-2),var(--brand)); color:#fff; border:0; padding:8px 14px; border-radius:999px; }

    footer.footer{ text-align:center; padding:14px 6px; font-size:13px; color:var(--muted); background:transparent; }

    @media(max-width:520px){ .profile-card{ padding-bottom:18px; } .avatar{ width:96px; height:96px; border-width:5px; } }
    
    .theman{
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        margin-top: 2rem;
    }
</style>