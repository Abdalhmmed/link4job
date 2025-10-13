// src/stores/JobStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export const useJobsStore = defineStore("JobsStore", () => {
  const router = useRouter();

  const loading = ref(false);        
  const error = ref(null);           

  const apiURL = "http://localhost:3000/jobs";

  const fetchJobs = async () => {
    try {
      loading.value = true;
      const res = await axios.get(apiURL);
      return res.data;

    } catch (err) {
      console.error("Error fetching jobs:", err);
      error.value = " Failed to load jobs list.";
    } finally {
      loading.value = false;
    }
  };

  const fetchJobById = async (jobId) => {
    try {
      loading.value = true;
      const res = await axios.get(`${apiURL}/${jobId}`);
      return res.data;

    } catch (err) {
      console.error(`Error fetching job ${jobId} :`, err);
      error.value = " Failed to load job list.";    } finally {
      loading.value = false;
    }
  };

  const fetchJobByCompanyId = async (companyId) => {
    try {
      loading.value = true;
      const res = await axios.get(apiURL,{
        params: { company_id: companyId }
      });
      return res.data;

    } catch (err) {
      console.error(`Error fetching job for the company ${companyId} :`, err);
      error.value = " Failed to load job list.";    } finally {
      loading.value = false;
    }
  };

  const filterJobs = async (filters = {}) => {
    try {
      loading.value = true;
      let query = [];

      if (filters.country) query.push(`country=${filters.country}`);
      if (filters.work_mode) query.push(`work_mode=${filters.work_mode}`);
      if (filters.job_type) query.push(`job_type=${filters.job_type}`);
      if (filters.currency) query.push(`currency=${filters.currency}`);

      const res = await axios.get(`${apiURL}?${query.join("&")}`);
      return res.data;
      
    } catch (err) {
        console.error(`Error count jobs `, err);
    } finally {
      loading.value = false;
    }
  };

    const countJobById = async (theId, the) => {
      try {
        if (the === "jops"){
          const followersList = await filterLikesByUserId(theId);
          return followersList.length;
        } else if (the === "compony"){
          const followersList = await fetchJobByCompanyId(theId);
          return followersList.length;
        }
      } catch (err) {
        console.error(`Error count jobs ${the} ${theId}:`, err);
        return 0;
      }
    };


  return {
    loading,
    error,
    fetchJobs,
    fetchJobById,
    filterJobs,
    countJobById,
    fetchJobByCompanyId,
  };
});
