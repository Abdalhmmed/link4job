import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePostsStore = defineStore("PostsStore", () => {

    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/posts";
    const PFapiURL = "http://localhost:3000/attachments";

    const fetchPosts = async () => {
        loading.value = true;
        error.value = null;
        try {
        const res = await axios.get(apiURL);
        return res.data;

        } catch (err) {
        console.error("Error fetching Posts:", err);
        error.value = "Failed to load Follower details.";
        } finally {
        loading.value = false;
        }
    };

    const fetchPostById = async (postId) => {
        try {
            const res = await axios.get(`${apiURL}/${postId}`);
            return res.data; 

        } catch (err) {
            console.error(`Error fetching post ${postId}:`, err);
            return null;
        }
    };

    const filterPostsByUserId = async (userId) => {
        loading.value = true;
        error.value = null;

        try {
            const userPostsRes = await axios.get(apiURL, {
                params: { user_id: userId },
            });
            return userPostsRes.data;
        
        } catch (err) {
            console.error(`Error fetching user posts ${userId}:`, err);
            error.value = "Failed to load Follower details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const filterPostsByCompanyId = async (companyId) => {
        loading.value = true;
        error.value = null;

        try {
            const userPostsRes = await axios.get(apiURL, {
                params: { user_type: "company", user_id: companyId },
            });
            return userPostsRes.data;
        
        } catch (err) {
            console.error(`Error fetching company posts ${companyId}:`, err);
            error.value = "Failed to load post details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const countPostsByUserId = async (theId, the) => {
        const countPosts = ref(null);
        try {
            if (the === "user"){
                countPosts = await filterPostsByUserId(theId);
            } else if (the === "company") {
                countPosts = await filterPostsByCompanyId(theId)
            }
            return countPosts.length
        } catch (err) {
            console.error(`Error count user post ${theId}:`, err);
            return 0;
        }
    };



  return {
    loading,
    error,
    fetchPosts,
    fetchPostById,
    filterPostsByUserId,
    countPostsByUserId,
    filterPostsByCompanyId
  };
});
