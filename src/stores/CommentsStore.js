import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useCommentsStore = defineStore("CommentsStore", () => {

    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/comments";

    const fetchComments = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(apiURL);
            return res.data;

        } catch (err) {
            console.error("Error fetching comments:", err);
            error.value = " Failed to load comments list.";
        } finally {
            loading.value = false;
        }
    };

    const fetchCommentsById = async (commentsId) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${apiURL}/${commentsId}`);
            return res.data;

        } catch (err) {
            console.error("Error fetching comments:", err);
            error.value = " Failed to load comments details.";
        } finally {
            loading.value = false;
        }
    };

    const filterCommentsByUserId = async (userid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
            params: { user_type: "user" , user_id: userid }
            });

            return res.data;
        } catch (err) {
            console.error(`Error fetching comments for the user ${userid} :`, err);
            error.value = "Failed to load comments list.";
        } finally {
            loading.value = false;
        }
    };

    const filterCommentsByCompanyId = async (companyid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
            params: { user_type: "company" , user_id: companyid }
            });

            return res.data;
        } catch (err) {
            console.error(`Error fetching comments for the company ${userid} :`, err);
            error.value = "Failed to load comments list.";
        } finally {
            loading.value = false;
        }
    };

    const filterCommentsByPostId = async (postid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { parent_type: 'post', parent_id: postid }
            });

            return res.data; 

        } catch (err) {
            console.error(`Error fetching comments for the post ${postid} :`, err);
            error.value = "Failed to load comments list.";
            return 0; 
        } finally {
            loading.value = false;
        }
    };

    const filterCommentsByProjectId = async (projectid) => {
        loading.value = true;
        error.value = null;

        try {
            const res = await axios.get(apiURL, {
                params: { parent_type: 'project', parent_id: projectid }
            });

            return res.data; 

        } catch (err) {
            console.error(`Error fetching comments for the project ${projectid} :`, err);
            error.value = "Failed to load comments list.";
            return 0; 
        } finally {
            loading.value = false;
        }
    };


    const countCommentsById = async (theId, the) => {
        try {
            if (the === "user") {
                const followersList = await filterCommentsByUserId(theId);
                return followersList.length;

            } else if (the === "company") {
                const followersList = await filterCommentsByCompanyId(theId);
                return followersList.length;

            } else if (the === "post") {
                const followersList = await filterCommentsByPostId(theId);
                return followersList.length;

            } else if (the === "project") {
                const followersList = await filterCommentsByProjectId(theId);
                return followersList.length;

            } else {
                return 0;
            }
        } catch (err) {
            console.error(`Error count comments for the ${the} ${theId}:`, err);
            return 0;
        }
    };



    return {
        loading,
        error,
        fetchComments,
        fetchCommentsById,
        countCommentsById,
        filterCommentsByUserId,
        filterCommentsByProjectId,
        filterCommentsByPostId,
        filterCommentsByCompanyId
    };
});
