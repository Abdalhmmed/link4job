import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {
  const loading = ref(false);
  const error = ref(null);


  let _cache = null;

  const loadJSON = async () => {
    if (_cache) return _cache;
    const res = await fetch("/data.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load /data.json (status ${res.status})`);
    const data = await res.json();
    _cache = data;
    return data;
  };


  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await loadJSON();


      const users = Array.isArray(data)
        ? data
        : data.users ?? [];

      return users;
    } catch (err) {
      console.error("Error fetching users (from data.json):", err);
      error.value = "فشل في تحميل قائمة المستخدمين.";
      return []; 
    } finally {
      loading.value = false;
    }
  };


  const fetchUserById = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await loadJSON();
      const users = Array.isArray(data) ? data : data.users ?? [];

      const user = users.find(u => u.id == userId) || null;
      return user;
    } catch (err) {
      console.error("Error fetching user by id (from data.json):", err);
      error.value = "فشل في تحميل بيانات المستخدم.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchUserByLogin = async (email, passwordHash) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await loadJSON();
      const users = Array.isArray(data) ? data : data.users ?? [];


      const user = users.find(
        u => String(u.email) === String(email) && String(u.password_hash) === String(passwordHash)
      );

      return user || null;
    } catch (err) {
      console.error("Error fetching user by login (from data.json):", err);
      error.value = "فشل في تحميل بيانات المستخدم.";
      return null;
    } finally {
      loading.value = false;
    }
  };


  const countUserByUserId = async (theId) => {
    try {
      const data = await loadJSON();
      const followers = data.followers ?? [];
      const list = Array.isArray(followers) ? followers.filter(f => f.user_id == theId) : [];
      return list.length;
    } catch (err) {
      console.error("Error counting followers (from data.json):", err);
      return 0;
    }
  };

  const forceReloadJSON = async () => {
    _cache = null;
    return await loadJSON();
  };

  return {
    loading,
    error,
    fetchUsers,
    fetchUserById,
    fetchUserByLogin,
    countUserByUserId,
    forceReloadJSON
  };
});
