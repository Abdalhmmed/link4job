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

      if (filters.city) query.push(`city=${filters.city}`);
      if (filters.remoteType) query.push(`remoteType=${filters.remoteType}`);
      if (filters.type) query.push(`type=${filters.type}`);
      if (filters.salary) query.push(`salary=${filters.salary}`);

      const res = await axios.get(`${apiURL}?${query.join("&")}`);
      jobs.value = res.data;
      console.log("ok")
    } catch (err) {
      error.value = "تعذر تحميل الوظائف حسب الفلترة";
    } finally {
      loading.value = false;
    }
  };

    const countJobById = async (theId, the) => {
      try {
        if (the === "jops"){
          const followersList = await filterLikesByUserId(theId);
          console.log('jobs: :',followersList.value)
          return followersList.length;
        } else if (the === "compony"){
          const followersList = await fetchJobByCompanyId(theId);
          console.log('jobs: :',followersList.value)
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
