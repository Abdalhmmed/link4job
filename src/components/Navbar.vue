<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';

const UserStore = useUserStore();

const users = ref(null)
const user = ref(null)

const id = ref(2)
onMounted( async () =>{

  user.value = await UserStore.fetchUserById(id.value);

} )
</script> 

<template>
<nav class="navbar navbar-expand-lg bg-white sticky-top shadow-sm">
      <div class="container">
        <router-link :to="{name: 'HomePage'}" class="navbar-brand fw-bold">
          <i class="bi bi-stars me-1 text-primary"></i> <span  class="gradient-text"> Link 4 job </span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <ul v-if="!user" class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li class="nav-item"><a class="nav-link active" href="#about">من نحن</a></li>
            <li class="nav-item"><a class="nav-link" href="#goals">أهدافنا</a></li>
            <li class="nav-item"><a class="nav-link" href="#achievements">إنجازاتنا</a></li>
            <li class="nav-item"><a class="nav-link" href="#contact">تواصل</a></li>
          </ul>

          <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li class="nav-item"><router-link :to="{ name: 'MainPage' }" class="nav-link active"> الصفحة العامة </router-link></li>
            <li class="nav-item"><router-link :to="{ name: 'JobsPage' }" class="nav-link">الوظاف</router-link></li>
            <li v-if="user.account_type === 'adminAccount'" class="nav-item"><router-link :to="{ name: 'HomePage' }" class="nav-link"> الشركاء</router-link></li>
            <li v-if="user.account_type === 'user'" class="nav-item"><router-link :to="{ name: 'HomePage' }" class="nav-link"> الاشعراة</router-link></li>
          </ul>

          <div v-if="!user" class="d-flex gap-2">
            <a href="#contact" class="btn btn-outline-primary">تواصل معنا</a>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authModal">
              <i class="bi bi-person-circle ms-1"></i> دخول / حساب جديد
            </button>
          </div>

          <div v-else-if="user.account_type === 'user'" class="d-flex gap-2">
            <router-link :to="{name: 'ProfilePage',  params: { id: user.id }}">
              <button class="btn btn-primary">
                  {{ user.name }}  <i class="bi bi-person-circle ms-1"></i>
              </button>
            </router-link>
          </div>

          <div v-else-if="user.account_type === 'adminAccount'" class="d-flex gap-2">
            <router-link :to="{name: 'CompaniePage' , params: { id: user.id } }">
              <button class="btn btn-outline-primary"> 
                {{ user.name }} <i class="bi bi-building ms-1"></i>
              </button>
            </router-link>
            <router-link :to="{name: 'ProfilePage', params: { id: user.id }}">
              <button class="btn btn-primary">
                  {{ user.name }}  <i class="bi bi-person-circle ms-1"></i>
              </button>
            </router-link>
          </div>
          

        </div>
      </div>
    </nav>
</template>


