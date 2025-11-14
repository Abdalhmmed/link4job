import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectsStore = defineStore("ProjectsStore", () => {
  const theuserProjects = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const PFapiURL = "/attachments"; 

  let _cache = null;
  const _loadJSON = async () => {
    if (_cache) return _cache;
    const res = await fetch("/data.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load /data.json (status ${res.status})`);
    const data = await res.json();
    _cache = data;
    return data;
  };

  const _matchProjectFilters = (proj, params = {}) => {
    if (params.q) {
      const q = String(params.q).toLowerCase();
      if (!JSON.stringify(proj).toLowerCase().includes(q)) return false;
    }

    const keys = ["user_id", "user_type", "title", "id"];
    for (const k of keys) {
      if (params[k] !== undefined && params[k] !== null) {
        if (String(proj[k]) !== String(params[k])) return false;
      }
    }

    return true;
  };


  const fetchProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const projects = data.projects ?? [];
      return projects;
    } catch (err) {
      console.error("Error fetching projects (from data.json):", err);
      error.value = "Failed to load projects.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchProjectById = async (ProjectId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const projects = data.projects ?? [];
      const proj = projects.find(p => String(p.id) === String(ProjectId)) || null;
      return proj;
    } catch (err) {
      console.error(`Error fetching project ${ProjectId} (from data.json):`, err);
      error.value = "Failed to load project details.";
      return null;
    } finally {
      loading.value = false;
    }
  };


  const filterProjectsByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const projects = data.projects ?? [];
      const userProjects = projects.filter(p => String(p.user_type) === "user" && String(p.user_id) === String(userId));
      theuserProjects.value = userProjects;
      return userProjects;
    } catch (err) {
      console.error(`Error filtering projects by user ${userId}:`, err);
      error.value = "Failed to load user projects.";
      return [];
    } finally {
      loading.value = false;
    }
  };


  const filterProjectsByCompanyId = async (companyId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const projects = data.projects ?? [];
      const compProjects = projects.filter(p => String(p.user_type) === "company" && String(p.user_id) === String(companyId));
      theuserProjects.value = compProjects;
      return compProjects;
    } catch (err) {
      console.error(`Error filtering projects by company ${companyId}:`, err);
      error.value = "Failed to load company projects.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countProjectsByUserId = async (theId, type = null) => {
    try {
      if (type === "user") {
        const arr = await filterProjectsByUserId(theId);
        return arr.length;
      } else if (type === "company") {
        const arr = await filterProjectsByCompanyId(theId);
        return arr.length;
      } else {
        const data = await _loadJSON();
        const projects = data.projects ?? [];
        return projects.filter(p => String(p.user_id) === String(theId)).length;
      }
    } catch (err) {
      console.error(`Error counting projects for ${theId}:`, err);
      return 0;
    }
  };

  const getProjectAttachments = async (projectId) => {
    try {
      const data = await _loadJSON();
      const attachments = data.attachments ?? [];
      return attachments.filter(a => String(a.parent_type) === "project" && String(a.parent_id) === String(projectId));
    } catch (err) {
      console.error(`Error getting attachments for project ${projectId}:`, err);
      return [];
    }
  };

  const forceReloadJSON = async () => {
    _cache = null;
    return await _loadJSON();
  };
  const clearCache = () => { _cache = null; };

  return {
    theuserProjects,
    loading,
    error,
    fetchProjects,
    fetchProjectById,
    filterProjectsByUserId,
    filterProjectsByCompanyId,
    countProjectsByUserId,
    getProjectAttachments,
    forceReloadJSON,
    clearCache,
    PFapiURL
  };
});
