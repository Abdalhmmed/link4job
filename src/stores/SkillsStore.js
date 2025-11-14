import { defineStore } from "pinia";
import { ref } from "vue";

export const useSkillsStore = defineStore("SkillsStore", () => {
  const skills = ref([]);
  const filteredSkills = ref([]);
  const loading = ref(false);
  const error = ref(null);

  let _cache = null;

  const skillCache = {};

  const loadJSON = async () => {
    if (_cache) return _cache;
    const res = await fetch("/data.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load /data.json (status ${res.status})`);
    const data = await res.json();
    _cache = data;
    return data;
  };

  const forceReloadJSON = async () => {
    _cache = null;
    return await loadJSON();
  };

  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await loadJSON();

      const list = Array.isArray(data) ? data : data.skills ?? [];

      skills.value = list;
      return skills.value;
    } catch (err) {
      console.error("Error fetching skills (from data.json):", err);
      error.value = "فشل في تحميل قائمة المهارات.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchSkillById = async (skillId) => {
    try {
      if (skillCache[skillId]) return skillCache[skillId];

      const data = await loadJSON();
      const list = Array.isArray(data) ? data : data.skills ?? [];

      const skill = list.find(s => String(s.id) === String(skillId)) || null;
      if (skill) skillCache[skillId] = skill;
      return skill;
    } catch (err) {
      console.error(`Error fetching skill ${skillId} (from data.json):`, err);
      error.value = "فشل في تحميل بيانات المهارة.";
      return null;
    }
  };

  const filterSkillsByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    filteredSkills.value = [];

    try {
      const data = await loadJSON();
      const userSkills = data.user_skills ?? [];
      const list = Array.isArray(userSkills) ? userSkills.filter(us => String(us.user_id) === String(userId)) : [];

      const skillIds = list.map(us => us.skill_id);

      const skillResults = await Promise.all(skillIds.map(id => fetchSkillById(id)));
      filteredSkills.value = skillResults.filter(s => s !== null);
      return filteredSkills.value;
    } catch (err) {
      console.error(`Error fetching user skills for ${userId} (from data.json):`, err);
      error.value = "فشل في تحميل مهارات المستخدم.";
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
      const data = await loadJSON();
      const jobSkills = data.job_skills ?? [];
      const list = Array.isArray(jobSkills) ? jobSkills.filter(js => String(js.job_id) === String(jobId)) : [];

      const skillIds = list.map(js => js.skill_id);

      const skillResults = await Promise.all(skillIds.map(id => fetchSkillById(id)));
      filteredSkills.value = skillResults.filter(s => s !== null);
      return filteredSkills.value;
    } catch (err) {
      console.error(`Error fetching job skills for ${jobId} (from data.json):`, err);
      error.value = "فشل في تحميل مهارات الوظيفة.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countSkillsById = async (theId, the) => {
    try {
      if (the === "user") {
        const list = await filterSkillsByUserId(theId);
        return Array.isArray(list) ? list.length : 0;
      }

      if (the === "job") {
        const list = await filterSkillsByJobId(theId);
        return Array.isArray(list) ? list.length : 0;
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
    forceReloadJSON
  };
});
