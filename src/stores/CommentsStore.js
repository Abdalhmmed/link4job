import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommentsStore = defineStore("CommentsStore", () => {
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

  const fetchComments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return data.comments ?? [];
    } catch (err) {
      console.error("Error fetching comments:", err);
      error.value = "Failed to load comments list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchCommentsById = async (commentsId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      const comments = data.comments ?? [];
      return comments.find(c => String(c.id) === String(commentsId)) || null;
    } catch (err) {
      console.error("Error fetching comments:", err);
      error.value = "Failed to load comments details.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const filterCommentsByUserId = async (userid) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return (data.comments ?? []).filter(
        c => String(c.user_type) === "user" && String(c.user_id) === String(userid)
      );
    } catch (err) {
      console.error(`Error fetching comments for the user ${userid}:`, err);
      error.value = "Failed to load comments list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterCommentsByCompanyId = async (companyid) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return (data.comments ?? []).filter(
        c => String(c.user_type) === "company" && String(c.user_id) === String(companyid)
      );
    } catch (err) {
      console.error(`Error fetching comments for the company ${companyid}:`, err);
      error.value = "Failed to load comments list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterCommentsByPostId = async (postid) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return (data.comments ?? []).filter(
        c => String(c.parent_type) === "post" && String(c.parent_id) === String(postid)
      );
    } catch (err) {
      console.error(`Error fetching comments for the post ${postid}:`, err);
      error.value = "Failed to load comments list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterCommentsByProjectId = async (projectid) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return (data.comments ?? []).filter(
        c => String(c.parent_type) === "project" && String(c.parent_id) === String(projectid)
      );
    } catch (err) {
      console.error(`Error fetching comments for the project ${projectid}:`, err);
      error.value = "Failed to load comments list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countCommentsById = async (theId, the) => {
    try {
      if (the === "user") {
        const list = await filterCommentsByUserId(theId);
        return list.length;
      } else if (the === "company") {
        const list = await filterCommentsByCompanyId(theId);
        return list.length;
      } else if (the === "post") {
        const list = await filterCommentsByPostId(theId);
        return list.length;
      } else if (the === "project") {
        const list = await filterCommentsByProjectId(theId);
        return list.length;
      }
      return 0;
    } catch (err) {
      console.error(`Error count comments for the ${the} ${theId}:`, err);
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
    fetchComments,
    fetchCommentsById,
    filterCommentsByUserId,
    filterCommentsByCompanyId,
    filterCommentsByPostId,
    filterCommentsByProjectId,
    countCommentsById,
    clearCache,
    forceReloadJSON,
  };
});
