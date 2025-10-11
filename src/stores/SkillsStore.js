import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useSkillsStore = defineStore("SkillsStore", () => {
  const skills = ref([]);
  const theuserSkills = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const apiURL = "http://localhost:3000/skills";
  const USapiURL = "http://localhost:3000/user_skills";

  // 🧠 جلب كل المهارات
  const fetchSkills = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await axios.get(apiURL);
      skills.value = res.data;
    } catch (err) {
      console.error("Error fetching skills:", err);
      error.value = "حدث خطأ أثناء تحميل قائمة المهارات.";
    } finally {
      loading.value = false;
    }
  };

  // 🧩 جلب مهارة واحدة حسب ID
  const fetchSkillById = async (skillId) => {
    try {
      const res = await axios.get(`${apiURL}/${skillId}`);
      return res.data;
    } catch (err) {
      console.error(`Error fetching skill ${skillId}:`, err);
      return null;
    }
  };

  // 👤 جلب مهارات مستخدم معيّن
  const filterSkillsByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    theuserSkills.value = [];

    try {
      // ✅ تأكدنا أن الحقل مطابق لقواعد db.json => user_id
      const userSkillsRes = await axios.get(USapiURL, {
        params: { user_id: userId },
      });

      const userSkillsData = userSkillsRes.data;

      // ✅ في قاعدة البيانات الحقل اسمه skill_id وليس skillsId
      const skillIds = userSkillsData.map((us) => us.skill_id);

      const skillPromises = skillIds.map((id) => fetchSkillById(id));
      const skillResults = await Promise.all(skillPromises);

      theuserSkills.value = skillResults.filter((s) => s !== null);

      return theuserSkills.value;
    } catch (err) {
      console.error(`Error fetching user skills for user ${userId}:`, err);
      error.value = "فشل تحميل مهارات المستخدم.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  // 🔢 عدّ المهارات الخاصة بالمستخدم
  const countSkillsByUserId = async (theId, the) => {
    try {
      let countSkills = [];

      if (the === "user") {
        countSkills = await filterSkillsByUserId(theId);
      }

      if (the === "job") {
        // يمكن لاحقًا إضافة عد مهارات الوظيفة
      }

      return countSkills.length;
    } catch (err) {
      console.error(`Error counting user skills for ${theId}:`, err);
      return 0;
    }
  };

  return {
    skills,
    theuserSkills,
    loading,
    error,
    fetchSkills,
    fetchSkillById,
    filterSkillsByUserId,
    countSkillsByUserId,
  };
});
