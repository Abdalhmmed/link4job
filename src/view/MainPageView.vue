<script setup>
import FriendsCard from '@/components/FriendsCard.vue';
import MainPosCard from '@/components/MainPosCard.vue';
import UserCard from '@/components/UserCard.vue';
import UsersSearch from '@/components/UsersSearch.vue';

</script>
<template>
  <div class="o">
    <UserCard/>
    <MainPosCard/>
    <div>
      <FriendsCard />
      <UsersSearch />
    </div>
    
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
