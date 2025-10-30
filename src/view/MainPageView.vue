<script setup>
import FriendsCard from '@/components/FriendsCard.vue';
import MainPosCard from '@/components/MainPosCard.vue';
import UserCard from '@/components/UserCard.vue';

import { useFollowersStore } from '@/stores/FollowersStore';
import { onMounted, ref } from 'vue';

const FollowersStore = useFollowersStore();
const friend = ref([]); 
const user = ref('');


const id = localStorage.getItem("userId")

onMounted(async () => {
  friend.value = await FollowersStore.fetchFriendsByUserId(id);
});
</script>

<template>
  <div class="o">
    <UserCard/>
    <MainPosCard/>
    <FriendsCard :friends="friend" />
  </div>
</template>

<style scoped>
.o {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2rem;
}
</style>
