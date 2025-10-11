import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useEmployeesStore = defineStore("EmployeesStore", () => {

    const loading = ref(false);
    const error = ref(null);

    const apiURL = "http://localhost:3000/companyEmployees";

    const fetchEmployees = async () => {
        loading.value = true;
        error.value = null;
        try {
        const res = await axios.get(apiURL);
        return res.data;

        } catch (err) {
        console.error("Error fetching Employees:", err);
        error.value = "Failed to load Employees details.";
        } finally {
        loading.value = false;
        }
    };

    const fetchEmployeeById = async (employeeId) => {
        try {
            const res = await axios.get(`${apiURL}/${employeeId}`);
            return res.data; 

        } catch (err) {
            console.error(`Error fetching Employee ${employeeId}:`, err);
            return null;
        }
    };

    const filterEmployeeByUserId = async (userId) => {
        loading.value = true;
        error.value = null;

        try {
            const userEmployeesRes = await axios.get(apiURL, {
                params: { user_id: userId },
            });
            return userEmployeesRes.data;
        
        } catch (err) {
            console.error(`Error fetching employee posts ${userId}:`, err);
            error.value = "Failed to load employee details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const filterEmployeeByCompanyId = async (companyId) => {
        loading.value = true;
        error.value = null;

        try {
            const companyEmployeeRes = await axios.get(apiURL, {
                params: { company_id: companyId },
            });
            console.log('companyEmployeeRes', companyEmployeeRes.data)
            return companyEmployeeRes.data;
        
        } catch (err) {
            console.error(`Error fetching employee company ${companyId}:`, err);
            error.value = "Failed to load employee details.";
            return [];
        } finally {
            loading.value = false;
        }
    };

    const countEmployeesByUserId = async (theId, the) => {
        const countEmployees = ref(null);
        try {
            if (the === "user"){
                countEmployees = await filterEmployeeByUserId(theId);
                return countEmployees.length
            } else if (the === "company"){
                countEmployees = await filterEmployeeByCompanyId(theId);
                return countEmployees.length
            }
        } catch (err) {
            console.error(`Error count user employees ${theId}:`, err);
            return 0;
        }
    };



  return {
    loading,
    error,
    fetchEmployees,
    fetchEmployeeById,
    filterEmployeeByUserId,
    countEmployeesByUserId,
    filterEmployeeByCompanyId
  };
});
