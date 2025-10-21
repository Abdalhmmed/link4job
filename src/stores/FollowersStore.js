import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useFollowersStore = defineStore("FollowersStore", () => {

    const followers = ref(null);
    const theuserFollowers = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/followers";

    const fetchFollowers = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(apiURL);
            followers.value = res.data;
        } catch (err) {
            console.error("Error fetching Followers:", err);
            error.value = " Failed to load Followers list.";
        } finally {
            loading.value = false;
        }
    };

    const fetchFollowerById = async (followerId) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await axios.get(`${apiURL}/${followerId}`);
            console.log("value1 ",res.data)
            return res.data;

        } catch (err) {
            console.error("Error fetching Follower:", err);
            error.value = " Failed to load Follower details.";
        } finally {
            loading.value = false;
        }
    };

    const filterFollowersByUserId = async (userId) => {
        loading.value = true;
        error.value = null;
        theuserFollowers.value = [];

        try {
            const userFollowerRes = await axios.get(apiURL, {
            params: { target_type: "user" ,target_id: userId },
        });

        theuserFollowers.value = userFollowerRes.data;


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
            const userFollowerRes = await axios.get(apiURL, {
            params: { target_type: "company" ,target_id: companyId },
        });

        theuserFollowers.value = userFollowerRes.data;


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
                const followersList = await filterFollowersByUserId(theId);
                return followersList.length;
            } else if (the === "company") {
                const followersList = await filterFollowersByCompanyId(theId);
                return followersList.length;
            } else {
                console.error(`Error count ${the} Followers ${theId}, no ${the}`, err);
                return 0;
            }
        } catch (err) {
            console.error(`Error count ${the} Followers ${theId}:`, err);
            return 0;
        }
    };


    const fetchFriendsByUserId = async (userId) => {
        loading.value = true;
        error.value = null;

        try {
            const myFollowsRes = await axios.get(apiURL, {
            params: {
                user_type: "user",
                user_id: userId,
                target_type: "user",
                status: "active",
            },
            });
            const iFollow = myFollowsRes.data;

            const theyFollowMeRes = await axios.get(apiURL, {
            params: {
                target_type: "user",
                target_id: userId,
                user_type: "user",
                status: "active",
            },
            });
            const theyFollowMe = theyFollowMeRes.data;

            const friends = iFollow.filter((follow) =>
            theyFollowMe.some((theirFollow) => theirFollow.user_id == follow.target_id)
            );

            return friends.map((f) => ({
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




    return {
        followers,
        loading,
        error,
        fetchFollowers,
        fetchFollowerById,
        filterFollowersByUserId,
        countFollowersById,
        filterFollowersByCompanyId,
        fetchFriendsByUserId
    };

});
