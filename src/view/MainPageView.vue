<script setup>
import FriendsCard from '@/components/FriendsCard.vue';
import MainPosCard from '@/components/MainPosCard.vue';
import UserCard from '@/components/UserCard.vue';

import { useFollowersStore } from '@/stores/FollowersStore';
import { useLikesStore } from '@/stores/LikesStore';
import { useUserStore } from '@/stores/UserStore';
import { onMounted, ref } from 'vue';

const FollowersStore = useFollowersStore();
const UsersStore = useUserStore();
const LikesStore = useLikesStore();
const friend = ref([]); 
const user = ref('');
const like = ref(0);
const follow = ref(0);

const id = localStorage.getItem("userId")

onMounted(async () => {
  friend.value = await FollowersStore.fetchFriendsByUserId(id);
  user.value = await UsersStore.fetchUserById(id);
  like.value = await LikesStore.countLikesById(id,'user');
  follow.value = await FollowersStore.countFollowersById(id,'user')
  console.log('friend: ', friend.value);
  console.log('like: ', like.value);
  console.log('follow: ', follow.value);
});
</script>

<template>
  <div class="o">
    <UserCard :user="user" :like="like" :follow="follow"/>
    <MainPosCard :user="user" />
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
