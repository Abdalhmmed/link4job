<script setup>
import FriendsCard from '@/components/FriendsCard.vue';
import MainPosCard from '@/components/MainPosCard.vue';
import UserCard from '@/components/UserCard.vue';

</script>
<template>
  <div class="o">
    <UserCard/>
    <MainPosCard/>
    <FriendsCard />
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
