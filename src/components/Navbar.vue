<script setup>

</script>

<template>
<nav class="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          <i class="bi bi-stars me-1 text-primary"></i> <span class="gradient-text">link 4 job</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li class="nav-item"><a class="nav-link active" href="#about">من نحن</a></li>
            <li class="nav-item"><a class="nav-link" href="#goals">أهدافنا</a></li>
            <li class="nav-item"><a class="nav-link" href="#achievements">إنجازاتنا</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">تواصل</a></li>
          </ul>
          <div class="d-flex gap-2">
            <a href="#contact" class="btn btn-outline-primary">تواصل معنا</a>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal">
              <i class="bi bi-person-circle ms-1"></i> دخول / حساب جديد
            </button>
          </div>
        </div>
      </div>
    </nav>
</template>


