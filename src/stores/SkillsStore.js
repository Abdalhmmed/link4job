import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useSkillsStore = defineStore("SkillsStore", () => {
  const skills = ref([]);
  const filteredSkills = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const apiURL = "http://localhost:3000/skills";
  const USapiURL = "http://localhost:3000/user_skills";
  const JSapiURL = "http://localhost:3000/job_skills";

  const skillCache = {};

  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await axios.get(apiURL);
      skills.value = res.data;
    } catch (err) {
      console.error("Error fetching skills:", err);
      error.value = "Error fetching skill list";
    } finally {
      loading.value = false;
    }
  };

  const fetchSkillById = async (skillId) => {
    try {
      if (skillCache[skillId]) return skillCache[skillId];

      const res = await axios.get(`${apiURL}/${skillId}`);
      skillCache[skillId] = res.data;
      return res.data;

    } catch (err) {
      console.error(`Error fetching skill ${skillId}:`, err);
      return null;
    }
  };

  const filterSkillsByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    filteredSkills.value = [];

    try {
      const userSkillsRes = await axios.get(USapiURL, {
        params: { user_id: userId },
      });

      const skillIds = userSkillsRes.data.map((us) => us.skill_id);

      const skillResults = await Promise.all(
        skillIds.map((id) => fetchSkillById(id))
      );

      filteredSkills.value = skillResults.filter((s) => s !== null);
      return filteredSkills.value;

    } catch (err) {
      console.error(`Error fetching user skills for ${userId}:`, err);
      error.value = "Error fetching user skills";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterSkillsByJobId = async (jobId) => {
    loading.value = true;
    error.value = null;
    filteredSkills.value = [];

    try {
      const jobSkillsRes = await axios.get(JSapiURL, {
        params: { job_id: jobId },
      });

      const skillIds = jobSkillsRes.data.map((js) => js.skill_id);

      const skillResults = await Promise.all(
        skillIds.map((id) => fetchSkillById(id))
      );

      filteredSkills.value = skillResults.filter((s) => s !== null);
      return filteredSkills.value;

    } catch (err) {
      console.error(`Error fetching job skills for ${jobId}:`, err);
      error.value = "Error fetching job skills";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countSkillsById = async (theId, the) => {
    try {
      if (the === "user") {
        const list = await filterSkillsByUserId(theId);
        return list.length;
      }

      if (the === "job") {
        const list = await filterSkillsByJobId(theId);
        return list.length;
      }

      return 0;

    } catch (err) {
      console.error(`Error counting skills for ${the} ${theId}:`, err);
      return 0;
    }
  };

  return {
    skills,
    filteredSkills,
    loading,
    error,
    fetchSkills,
    fetchSkillById,
    filterSkillsByUserId,
    filterSkillsByJobId,
    countSkillsById,
  };
});
