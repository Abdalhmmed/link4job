<script setup>
import FrindesChat from './FrindesChat.vue';
import { onMounted } from 'vue';

const props = defineProps({
    frindesId: {
        type: Object,
        default: {
            id: 0,
            frinde_id: 0,
            type: 'user'
        }
    }
})

onMounted( async () => {

})

</script>

<template>
 <div class="friends-list">
    <div class="friends-header">
      <button class="btn btn-light" onclick="togglePanel('friends')"><i class="bi bi-arrow-left"></i></button>
      <h6 class="m-0">الأصدقاء</h6>
    </div>
    <div class="friend-search-wrapper">
      <input type="text" class="form-control" id="friendSearch" placeholder="ابحث عن صديق...">
      <button id="friendSearchBtn"><i class="bi bi-search"></i></button>
    </div>
    
    
    <FrindesChat v-for="frinde in frindesId" :key="frinde.id" :user_id="frinde"/>

  </div>
</template>

<style scoped>

    .friends-list {
      background: #fff;
      box-shadow: 0 0 12px rgba(0,0,0,0.05);
      overflow-y: auto;
      position: sticky;
      top: 0;
      height: 90vh; 
      border-radius: 12px;
      transition: transform .3s ease;
      z-index: 10;
    }

    .friends-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      font-weight: bold;
    }

    .friend-search-wrapper {
      display: flex;
      gap: 8px;
      padding: 8px 12px;
    }

    #friendSearchBtn {
      background: var(--brand);
      color: #fff;
      border: none;
      border-radius: 25px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #friendSearch {
      flex-grow: 1;
      border-radius: 25px;
      padding: 8px 16px;
      border: 1px solid #ddd;
    }
    
    #friendSearch:focus {
      outline: none;
      border-color: var(--brand);
      box-shadow: 0 0 8px rgba(79,70,229,0.2);
    }

    @media(max-width:991px){
      .friends-list, .notifications-panel { 
        width: 80%; 
        transform: translateX(100%);
        z-index: 1050;
      }
      .friends-list.active, .notifications-panel.active { transform: translateX(0); }
    }

</style>