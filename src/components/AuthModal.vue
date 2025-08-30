<script setup>

</script>

<template>
    <div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-2xl shadow-soft">
          <div class="modal-header">
            <h5 class="modal-title" id="authTitle">تسجيل الدخول / إنشاء حساب</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs mb-3" id="authTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">دخول</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="false">حساب جديد</button>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                <form class="d-grid gap-3">
                  <div>
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" class="form-control" placeholder="name@example.com" />
                  </div>
                  <div>
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" class="form-control" placeholder="••••••••" />
                  </div>
                  <button class="btn btn-primary">تسجيل الدخول</button>
                </form>
              </div>
              <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                <form class="d-grid gap-3">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label">الاسم الأول</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">اسم العائلة</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div>
                    <label class="form-label">البريد الإلكتروني</label>
                    <input type="email" class="form-control" />
                  </div>
                  <div>
                    <label class="form-label">كلمة المرور</label>
                    <input type="password" class="form-control" />
                  </div>
                  <button class="btn btn-success">إنشاء حساب</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>