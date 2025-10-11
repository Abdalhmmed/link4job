import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useLikesStore = defineStore("LikesStore", () => {

    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/likes";

    const fetchLikes = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(apiURL);
            return res.data;

        } catch (err) {
            console.error("Error fetching likes:", err);
            error.value = " Failed to load likes list.";
        } finally {
            loading.value = false;
        }
    };

    const fetchLikeById = async (likeId) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${apiURL}/${likeId}`);
            return res.data;

        } catch (err) {
            console.error("Error fetching like:", err);
            error.value = " Failed to load like details.";
        } finally {
            loading.value = false;
        }
    };

    const filterLikesByUserId = async (userid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { target_type: 'user', target_id: userid }
            });

            return res.data;
        } catch (err) {
            console.error(`Error fetching likes for the user ${userid} :`, err);
            error.value = "Failed to load likes list.";
        } finally {
            loading.value = false;
        }
    };

    const filterLikesByPostId = async (postid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { target_type: 'post', target_id: postid }
            });

            console.log('filterLikesByPostId:', res.data)

            return res.data; 

        } catch (err) {
            console.error(`Error fetching likes for the post ${postid} :`, err);
            error.value = "Failed to load likes list.";
            return 0; 
        } finally {
            loading.value = false;
        }
    };

    const filterLikesByProjectId = async (projectid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { target_type: 'project', target_id: projectid }
            });

            console.log('filterLikesByProjectId:', res.data)

            return res.data; 

        } catch (err) {
            console.error(`Error fetching likes for the project ${projectid} :`, err);
            error.value = "Failed to load likes list.";
            return 0; 
        } finally {
            loading.value = false;
        }
    };

    const filterLikesByCompanyId = async (companyId) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { target_type: 'company', target_id: companyId }
            });

            console.log('filterLikesByCompanyId:', res.data)

            return res.data; 

        } catch (err) {
            console.error(`Error fetching likes for the company ${companyId} :`, err);
            error.value = "Failed to load likes list.";
            return 0; 
        } finally {
            loading.value = false;
        }
    };

    const filterLikesByTheUserId = async (userid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { user_type: 'user', user_id: userid }
            });

            return res.data;
        } catch (err) {
            console.error(`Error fetching likes for the user ${userid} :`, err);
            error.value = "Failed to load likes list.";
        } finally {
            loading.value = false;
        }
    };

    const filterLikesByTheCompanyId = async (companyId) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { user_type: 'company', user_id: companyId }
            });

            return res.data;
        } catch (err) {
            console.error(`Error fetching likes for the company ${companyId} :`, err);
            error.value = "Failed to load likes list.";
        } finally {
            loading.value = false;
        }
    };


    const countLikesById = async (theId, the) => {
        try {
            if (the === "user") {
                const followersList = await filterLikesByUserId(theId);
                console.log('likse: :',followersList.value)
                return followersList.length;
            } else if (the === "post") {
                const followersList = await filterLikesByPostId(theId);
                console.log('likse: :',followersList.value)
                return followersList.length;
            } else if (the === "project") {
                const followersList = await filterLikesByProjectId(theId);
                console.log('likse: :',followersList.value)
                return followersList.length;
            } else if (the === "company") {
                const followersList = await filterLikesByCompanyId(theId);
                console.log('likse: :',followersList.value)
                return followersList.length;
            } else {
                return 0;
            }
        } catch (err) {
            console.error(`Error count likes ${the} ${theId}:`, err);
            return 0;
        }
    };



    return {
        loading,
        error,
        fetchLikes,
        fetchLikeById,
        countLikesById,
        filterLikesByUserId,
        filterLikesByProjectId,
        filterLikesByCompanyId,
        filterLikesByPostId,
    };
});
