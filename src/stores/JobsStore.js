import { defineStore } from "pinia";
import { ref } from "vue";

export const useJobsStore = defineStore("JobsStore", () => {
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

  const fetchJobs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return data.jobs ?? [];
    } catch (err) {
      console.error("Error fetching jobs:", err);
      error.value = "Failed to load jobs list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchJobById = async (jobId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const jobs = data.jobs ?? [];
      return jobs.find(job => String(job.id) === String(jobId)) || null;
    } catch (err) {
      console.error(`Error fetching job ${jobId}:`, err);
      error.value = "Failed to load job.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchJobByCompanyId = async (companyId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.jobs ?? []).filter(job => String(job.company_id) === String(companyId));
    } catch (err) {
      console.error(`Error fetching jobs for company ${companyId}:`, err);
      error.value = "Failed to load jobs.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterJobs = async (filters = {}) => {
    loading.value = true;
    error.value = null;

    try {
      let jobs = (await _loadJSON()).jobs ?? [];

      if (filters.country)
        jobs = jobs.filter(job => job.country === filters.country);
      if (filters.work_mode)
        jobs = jobs.filter(job => job.work_mode === filters.work_mode);
      if (filters.job_type)
        jobs = jobs.filter(job => job.job_type === filters.job_type);
      if (filters.currency)
        jobs = jobs.filter(job => job.currency === filters.currency);

      return jobs;
    } catch (err) {
      console.error("Error filtering jobs:", err);
      error.value = "Failed to filter jobs.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countJobById = async (theId, the) => {
    try {
      if (the === "jops") {
        return 0;
      } else if (the === "compony") {
        const jobs = await fetchJobByCompanyId(theId);
        return jobs.length;
      }
      return 0;
    } catch (err) {
      console.error(`Error counting jobs for ${the} ${theId}:`, err);
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

    fetchJobs,
    fetchJobById,
    fetchJobByCompanyId,
    filterJobs,
    countJobById,

    clearCache,
    forceReloadJSON,
  };
});
