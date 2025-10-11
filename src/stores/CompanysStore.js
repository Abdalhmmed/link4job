import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCompanysStore = defineStore("CompanyStore", () => {

  const loading = ref(false);
  const error = ref(null);

  const apiURL = "http://localhost:3000/companys";

  const fetchCompanys = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(apiURL);
      return res.data;

    } catch (err) {
      console.error("Error fetching company:", err);
      error.value = " Failed to load company list.";

    } finally {
      loading.value = false;
    }
  };

  const fetchCompanyById = async (companieId) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(`${apiURL}/${companieId}`);
      return res.data;

    } catch (err) {
      console.error("Error fetching companie:", err);
      error.value = " Failed to load companie details.";

    } finally {
      loading.value = false;
    }
  };

  const countCompanysById = async (theId) => {
    try {
      const followersList = await fetchCompanyById(theId);
      return followersList.length;

    } catch (err) {
      console.error(`Error count companie ${theId}:`, err);
      return 0;
    }
  };


  return {
    loading,
    error,
    fetchCompanys,
    fetchCompanyById,
    countCompanysById,
  };
});
