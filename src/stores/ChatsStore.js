import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

   
export const useChatsStore = defineStore('ChatsStore', () => {

    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/chats";

    const fetchChats = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(apiURL);
            return res.data;
        } catch (err) {
            console.error("Error fetching chats:", err);
            error.value = " Failed to load chats list.";
        } finally {
            loading.value = false;
        }
    }

    const fetchChatById = async (ChatID) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${apiURL}/${ChatID}`);
            console.log("value1 ",res.data)
            return res.data;

        } catch (err) {
            console.error("Error fetching chat:", err);
            error.value = " Failed to load chats details.";
        } finally {
            loading.value = false;
        }
    };

    const filterChteByUserId = async (userId) => {
        loading.value = true;
        error.value = null;

        try {
            const userChatRes = await axios.get(apiURL, {
            params: { user_id: userId },
        });

        return userChatRes.data;

        } catch (err) {
            console.error(`Error fetching user Chat ${userId}:`, err);
            error.value = "Failed to load Chat details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const filterChatBetweenUsers = async (user1, user2) => {
        loading.value = true;
        error.value = null;

        try {
            const usersChatRes = await axios.get(apiURL);
            const allChats = usersChatRes.data;

            // تصفية الرسائل بين المستخدمين في الاتجاهين
            const filtered = allChats.filter(
            msg =>
                (msg.user_id === user1 && msg.the_target_id === user2) ||
                (msg.user_id === user2 && msg.the_target_id === user1)
            );

            return filtered;

        } catch (err) {
            console.error("Error fetching user Chat:", err);
            error.value = "Failed to load Chat details.";
            return [];
        } finally {
            loading.value = false;
        }
    };


    return{
        loading,
        error,
        fetchChats,
        fetchChatById,
        filterChteByUserId,
        filterChatBetweenUsers,
        
    }
})