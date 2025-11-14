import { defineStore } from "pinia";
import { ref } from "vue";


export const useNotificationsStore = defineStore("NotificationsStore", () => {

  const loading = ref(false);
  const error = ref(null);

  let _cache = null;

  const _loadJSON = async () => {
    if (_cache) return _cache;

    const res = await fetch("/data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load /data.json");

    const data = await res.json();
    _cache = data;
    return data;
  };


  const fetchNotifications = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const notifications = data.notification ?? [];  
      return notifications;

    } catch (err) {
      console.error("Error fetching notifications:", err);
      error.value = "Failed to load notifications";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchNotificationById = async (notificationID) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const notifications = data.notification ?? [];

      const result = notifications.find(
        n => String(n.id) === String(notificationID)
      );

      return result || null;

    } catch (err) {
      console.error("Error fetching notification by id:", err);
      error.value = "Failed to load notification";
      return null;

    } finally {
      loading.value = false;
    }
  };

  const fetchNotificationByUserId = async (userID) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await _loadJSON();
      const notifications = data.notification ?? [];

      const result = notifications.filter(
        n => String(n.user_id) === String(userID)
      );

      return result;

    } catch (err) {
      console.error("Error fetching notifications for user:", err);
      error.value = "Failed to load notification list";
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

    fetchNotifications,
    fetchNotificationById,
    fetchNotificationByUserId,

    clearCache,
    forceReloadJSON
  };
});
