import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostsStore = defineStore("PostsStore", () => {

  const loading = ref(false);
  const error = ref(null);

  const PFapiURL = "/attachments";


  let _cache = null;

  const _loadJSON = async () => {
    if (_cache) return _cache;
    const res = await fetch("/data.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load /data.json`);
    const data = await res.json();
    _cache = data;
    return data;
  };

  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const posts = data.posts ?? [];  
      return posts;
    } catch (err) {
      console.error("Error fetching posts:", err);
      error.value = "Failed to load posts.";
      return [];
    } finally {
      loading.value = false;
    }
  };


  const fetchPostById = async (postId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const posts = data.posts ?? [];
      const post = posts.find(p => String(p.id) === String(postId)) || null;
      return post;
    } catch (err) {
      console.error(`Error fetching post ${postId}:`, err);
      return null;
    } finally {
      loading.value = false;
    }
  };


  const filterPostsByUserId = async (userId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const posts = data.posts ?? [];

      const filtered = posts.filter(
        p => String(p.user_id) === String(userId) && p.user_type === "user"
      );

      return filtered;
    } catch (err) {
      console.error(`Error filtering posts of user ${userId}:`, err);
      error.value = "Failed to load user posts.";
      return [];
    } finally {
      loading.value = false;
    }
  };


  const filterPostsByCompanyId = async (companyId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const posts = data.posts ?? [];

      const filtered = posts.filter(
        p => p.user_type === "company" &&
             String(p.user_id) === String(companyId)
      );

      return filtered;
    } catch (err) {
      console.error(`Error filtering posts of company ${companyId}:`, err);
      error.value = "Failed to load company posts.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countPostsByUserId = async (theId, the) => {
    try {
      if (the === "user") {
        const posts = await filterPostsByUserId(theId);
        return posts.length;
      } else if (the === "company") {
        const posts = await filterPostsByCompanyId(theId);
        return posts.length;
      }

      return 0;

    } catch (err) {
      console.error(`Error counting posts of ${theId}:`, err);
      return 0;
    }
  };


  const getPostAttachments = async (postId) => {
    try {
      const data = await _loadJSON();
      const attachments = data.attachments ?? [];

      return attachments.filter(
        a => String(a.parent_id) === String(postId) &&
             String(a.parent_type) === "post"
      );
    } catch (err) {
      console.error(`Error filtering attachments for post ${postId}:`, err);
      return [];
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
    fetchPosts,
    fetchPostById,
    filterPostsByUserId,
    filterPostsByCompanyId,
    countPostsByUserId,
    getPostAttachments,
    clearCache,
    forceReloadJSON,
    PFapiURL
  };
});
