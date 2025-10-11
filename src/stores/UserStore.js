import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("UserStore", () => {

  const loading = ref(false);
  const error = ref(null);

  const apiURL = "http://localhost:3000/users";

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(apiURL);
      return res.data;

    } catch (err) {
      console.error("Error fetching users:", err);
      error.value = " Failed to load users list.";

    } finally {
      loading.value = false;
    }
  };

  const fetchUserById = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${apiURL}/${userId}`);
      return res.data;

    } catch (err) {
      console.error("Error fetching user:", err);
      error.value = " Failed to load user details.";

    } finally {
      loading.value = false;
    }
  };

  const countUserByUserId = async (theId) => {
    try {
        const followersList = await filterFollowersByUserId(theId);
        return followersList.length;

    } catch (err) {
        console.error(`Error count user Followers ${theId}:`, err);
        return 0;
    }
  };


  return {
    loading,
    error,
    fetchUsers,
    fetchUserById,
    countUserByUserId,
  };
});
