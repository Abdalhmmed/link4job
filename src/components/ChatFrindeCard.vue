<script setup>
import { useRouter } from 'vue-router'
import FrindesChat from './FrindesChat.vue'
import { inject, ref, onMounted, watch } from 'vue'
import { useFollowersStore } from '@/stores/FollowersStore'
import { useUserStore } from '@/stores/UserStore'

const router = useRouter()
const ChatId = inject('ChatId')
const FollowersStore = useFollowersStore()
const UsersStore = useUserStore()

const friends = ref([])  
const users = ref([])
const friendSearch = ref('')
const filtered = ref([])  

onMounted(async () => {
  const id = localStorage.getItem('userId');
  friends.value = await FollowersStore.fetchFriendsByUserId(id);

  if (friends.value && friends.value.length > 0) {
    users.value = [];
    for (const f of friends.value) {
      const u = await UsersStore.fetchUserById(f.friend_id);
      users.value.push(u);
    }
    filtered.value = [...users.value];  
  }
});

const filterUsersByName = () => {
  if (friendSearch.value.trim() === "") {
    filtered.value = [...users.value]; 
    return;
  }

  filtered.value = users.value.filter(user =>
   user.name.toLowerCase().includes(friendSearch.value.toLowerCase()));
};

watch(friendSearch, () => {
  filterUsersByName();
});

function goBack() {
  ChatId.value = null
  router.back()
}
</script>

<template>
  <div class="friends-list">
    <div class="friends-header">
      <button class="btn btn-light" @click="goBack"><i class="bi bi-arrow-left"></i></button>
      <h6 class="m-0">الأصدقاء</h6>
    </div>

    <div class="friend-search-wrapper">
      <input 
        type="text" 
        class="form-control" 
        placeholder="ابحث عن صديق..." 
        v-model="friendSearch" 
      />
    </div>

    <div v-if="filtered.length === 0 && friendSearch !== ''" class="no-results">
      لا يوجد نتيجة
    </div>

    <div v-else-if="filtered.length === 0 && friendSearch === ''">
      لا يوجد أصدقاء
    </div>

    <FrindesChat
      v-else
      v-for="user in filtered"
      :key="user.id"
      :user="user"
    />
  </div>
</template>




<style scoped>
    .friends-list {
      background: #fff;
      box-shadow: 0 0 12px rgba(0,0,0,0.05);
      overflow-y: auto;
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