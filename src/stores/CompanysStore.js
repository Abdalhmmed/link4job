import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompanysStore = defineStore("CompanyStore", () => {
  const loading = ref(false);
  const error = ref(null);

  let _cache = null;

  const _loadJSON = async () => {
    if (_cache) return _cache;

    const res = await fetch("/data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load data.json");

    const data = await res.json();
    _cache = data;
    return data;
  };

  const fetchCompanys = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return data.companys ?? [];
    } catch (err) {
      console.error("Error fetching company:", err);
      error.value = "Failed to load company list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchCompanyById = async (companieId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const companies = data.companys ?? [];
      return companies.find(c => String(c.id) === String(companieId)) || null;
    } catch (err) {
      console.error("Error fetching companie:", err);
      error.value = "Failed to load companie details.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchCompanyByOwnerId = async (owner) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const companies = data.companys ?? [];
      return companies.find(c => String(c.owner_user_id) === String(owner)) || null;
    } catch (err) {
      console.error("Error fetching companie:", err);
      error.value = "Failed to load companie details.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const countCompanysById = async (theId) => {
    try {
      const company = await fetchCompanyById(theId);
      return company ? 1 : 0;
    } catch (err) {
      console.error(`Error count companie ${theId}:`, err);
      return 0;
    }
  };

  const clearCache = () => { _cache = null; };
  const forceReloadJSON = async () => {
    _cache = null;
    return await _loadJSON();
  };

  return {
    loading,
    error,
    fetchCompanys,
    fetchCompanyById,
    countCompanysById,
    fetchCompanyByOwnerId,
    clearCache,
    forceReloadJSON,
  };
});
