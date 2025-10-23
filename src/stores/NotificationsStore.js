import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationsStore = defineStore("NotificationsStore", () => {

    const loading = ref(false)
    const error = ref(null)

    const apiURL = "http://localhost:3000/notification";

    const fetchNotifications = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(apiURL);
            return res.data;
        } catch (err) {
            console.error("Error fetching Notifications:", err);
            error.value = "Error fetching notification";
        } finally {
            loading.value = false;
        }
    };

    const fetchNotificationById = async (notificationID) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${apiURL}/${notificationID}`);
            return res.data;
        } catch (err) {
            console.error("Error fetching Notification:", err);
            error.value = "Error fetching notification";
        } finally {
            loading.value = false;
        }
    };

    const fetchNotificationByUserId = async (userID) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(apiURL, {
                params: {user_id: userID}
                });
            return res.data;
        } catch (err) {
            console.error("Error fetching Notification:", err);
            error.value = "Error fetching notification";
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        error,
        fetchNotifications,
        fetchNotificationById,
        fetchNotificationByUserId
    }
})