import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatsStore = defineStore("ChatsStore", () => {
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

  const fetchChats = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return data.chats ?? [];
    } catch (err) {
      console.error("Error fetching chats:", err);
      error.value = "Failed to load chats list.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchChatById = async (ChatID) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const chats = data.chats ?? [];
      return chats.find(c => String(c.id) === String(ChatID)) || null;
    } catch (err) {
      console.error("Error fetching chat:", err);
      error.value = "Failed to load chat details.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const filterChteByUserId = async (userId) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      return (data.chats ?? []).filter(
        c => String(c.user_id) === String(userId)
      );
    } catch (err) {
      console.error(`Error fetching user chats ${userId}:`, err);
      error.value = "Failed to load chats.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const filterChatBetweenUsers = async (user1, user2) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const chats = data.chats ?? [];

      return chats.filter(
        msg =>
          (String(msg.user_id) === String(user1) &&
           String(msg.the_target_id) === String(user2)) ||
          (String(msg.user_id) === String(user2) &&
           String(msg.the_target_id) === String(user1))
      );
    } catch (err) {
      console.error("Error filtering chat between users:", err);
      error.value = "Failed to load chat details.";
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
    loading,
    error,
    fetchChats,
    fetchChatById,
    filterChteByUserId,
    filterChatBetweenUsers,
    clearCache,
    forceReloadJSON
  };
});
