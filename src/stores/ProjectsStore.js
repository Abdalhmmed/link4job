import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProjectsStore = defineStore("ProjectsStore", () => {

    const theuserProjects = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/projects";
    const PFapiURL = "http://localhost:3000/attachments";

    const fetchProjects = async () => {
        loading.value = true;
        error.value = null;
        try {
        const res = await axios.get(apiURL);
        return res.data;

        } catch (err) {
        console.error("Error fetching Project:", err);
        error.value = "Failed to load Follower details.";
        } finally {
        loading.value = false;
        }
    };

    const fetchProjectById = async (ProjectId) => {
        try {
            const res = await axios.get(`${apiURL}/${ProjectId}`);
            return res.data; 

        } catch (err) {
            console.error(`Error fetching Project ${ProjectId}:`, err);
            return null;
        }
    };

    const filterProjectsByUserId = async (userId) => {
        loading.value = true;
        error.value = null;

        try {
            const userProjectsRes = await axios.get(apiURL, {
                params: { user_type: "user", user_id: userId },
            });
            return userProjectsRes.data;
        
        } catch (err) {
            console.error(`Error fetching user Project ${userId}:`, err);
            error.value = "Failed to load Follower details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const filterProjectsByCompanyId = async (companyId) => {
        loading.value = true;
        error.value = null;

        try {
            const userProjectsRes = await axios.get(apiURL, {
                params: { user_type: "company", user_id: companyId },
            });
            return userProjectsRes.data;
        
        } catch (err) {
            console.error(`Error fetching company Project ${companyId}:`, err);
            error.value = "Failed to load Follower details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const countProjectsByUserId = async (theId) => {
        const countProjects = ref(null);
        try {
            if (the === "user"){
                countProjects = await filterProjectsByUserId(theId);
            } else if (the === "company"){
                countProjects = await filterProjectsByCompanyId(theId);
            }
            return countProjects.length
        } catch (err) {
            console.error(`Error count user Project ${theId}:`, err);
            return 0;
        }
    };



  return {
    theuserProjects,
    loading,
    error,
    fetchProjects,
    fetchProjectById,
    filterProjectsByUserId,
    countProjectsByUserId,
    filterProjectsByCompanyId
  };
});
