import { defineStore } from "pinia";
import { ref } from "vue";

export const useFollowersStore = defineStore("FollowersStore", () => {
  const followers = ref(null);
  const theuserFollowers = ref(null);
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

  const fetchFollowers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      followers.value = data.followers ?? [];
    } catch (err) {
      console.error("Error fetching Followers:", err);
      error.value = "Failed to load Followers list.";
      followers.value = [];
    } finally {
      loading.value = false;
    }
  };

  const fetchFollowerById = async (followerId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const follower = (data.followers ?? []).find(
        f => String(f.id) === String(followerId)
      );
      return follower || null;
    } catch (err) {
      console.error("Error fetching Follower:", err);
      error.value = "Failed to load Follower details.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const filterFollowersByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    theuserFollowers.value = [];
    try {
      const data = await _loadJSON();
      theuserFollowers.value = (data.followers ?? []).filter(
        f => String(f.target_type) === "user" && String(f.target_id) === String(userId)
      );
      return theuserFollowers.value;
    } catch (err) {
      console.error(`Error fetching user Followers ${userId}:`, err);
      error.value = "Failed to load Follower details.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterFollowersByCompanyId = async (companyId) => {
    loading.value = true;
    error.value = null;
    theuserFollowers.value = [];
    try {
      const data = await _loadJSON();
      theuserFollowers.value = (data.followers ?? []).filter(
        f => String(f.target_type) === "company" && String(f.target_id) === String(companyId)
      );
      return theuserFollowers.value;
    } catch (err) {
      console.error(`Error fetching company Followers ${companyId}:`, err);
      error.value = "Failed to load Follower details.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countFollowersById = async (theId, the) => {
    try {
      if (the === "user") {
        const list = await filterFollowersByUserId(theId);
        return list.length;
      } else if (the === "company") {
        const list = await filterFollowersByCompanyId(theId);
        return list.length;
      } else {
        console.error(`Invalid type for countFollowersById: ${the}`);
        return 0;
      }
    } catch (err) {
      console.error(`Error counting followers for ${the} ${theId}:`, err);
      return 0;
    }
  };

  const fetchFriendsByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const allFollowers = data.followers ?? [];

      const iFollow = allFollowers.filter(f =>
        f.user_type === "user" &&
        f.user_id == userId &&
        f.target_type === "user" &&
        f.status === "active"
      );

      const theyFollowMe = allFollowers.filter(f =>
        f.target_type === "user" &&
        f.target_id == userId &&
        f.user_type === "user" &&
        f.status === "active"
      );

      const friends = iFollow.filter(f =>
        theyFollowMe.some(tfm => tfm.user_id == f.target_id)
      );

      return friends.map(f => ({
        id: f.id,
        friend_id: f.target_id,
        created_at: f.created_at,
      }));
    } catch (err) {
      console.error(`Error fetching friends for user ${userId}:`, err);
      error.value = "فشل في تحميل الأصدقاء.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const clearCache = () => { _cache = null; };
  const forceReloadJSON = async () => {
    _cache = null;
    return await _loadJSON();
  };

  return {
    followers,
    theuserFollowers,
    loading,
    error,

    fetchFollowers,
    fetchFollowerById,
    filterFollowersByUserId,
    filterFollowersByCompanyId,
    countFollowersById,
    fetchFriendsByUserId,

    clearCache,
    forceReloadJSON,
  };
});
