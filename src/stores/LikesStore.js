import { defineStore } from "pinia";
import { ref } from "vue";

export const useLikesStore = defineStore("LikesStore", () => {

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

  const fetchLikes = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return data.likes ?? [];
    } catch (err) {
      console.error("Error fetching likes:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchLikeById = async (likeId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const likes = data.likes ?? [];
      return likes.find(l => String(l.id) === String(likeId)) || null;
    } catch (err) {
      console.error("Error fetching like by ID:", err);
      error.value = "Failed to load like.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const filterLikesByUserId = async (userId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.likes ?? []).filter(
        l =>
          String(l.target_type) === "user" &&
          String(l.target_id) === String(userId)
      );
    } catch (err) {
      console.error("Error filtering user likes:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterLikesByPostId = async (postId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.likes ?? []).filter(
        l =>
          String(l.target_type) === "post" &&
          String(l.target_id) === String(postId)
      );
    } catch (err) {
      console.error("Error filtering post likes:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterLikesByProjectId = async (projectId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.likes ?? []).filter(
        l =>
          String(l.target_type) === "project" &&
          String(l.target_id) === String(projectId)
      );
    } catch (err) {
      console.error("Error filtering project likes:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterLikesByCompanyId = async (companyId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.likes ?? []).filter(
        l =>
          String(l.target_type) === "company" &&
          String(l.target_id) === String(companyId)
      );
    } catch (err) {
      console.error("Error filtering company likes:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };


  const filterLikesByTheUserId = async (userId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.likes ?? []).filter(
        l =>
          String(l.user_type) === "user" &&
          String(l.user_id) === String(userId)
      );
    } catch (err) {
      console.error("Error filtering likes by user:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterLikesByTheCompanyId = async (companyId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.likes ?? []).filter(
        l =>
          String(l.user_type) === "company" &&
          String(l.user_id) === String(companyId)
      );
    } catch (err) {
      console.error("Error filtering likes by company:", err);
      error.value = "Failed to load likes.";
      return [];
    } finally {
      loading.value = false;
    }
  };


  const countLikesById = async (theId, the) => {
    try {
      if (the === "user") {
        return (await filterLikesByUserId(theId)).length;
      } else if (the === "post") {
        return (await filterLikesByPostId(theId)).length;
      } else if (the === "project") {
        return (await filterLikesByProjectId(theId)).length;
      } else if (the === "company") {
        return (await filterLikesByCompanyId(theId)).length;
      }
      return 0;
    } catch (err) {
      console.error(`Error counting likes for ${the} ${theId}:`, err);
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

    fetchLikes,
    fetchLikeById,

    filterLikesByUserId,
    filterLikesByPostId,
    filterLikesByProjectId,
    filterLikesByCompanyId,

    filterLikesByTheUserId,
    filterLikesByTheCompanyId,

    countLikesById,

    clearCache,
    forceReloadJSON
  };
});
