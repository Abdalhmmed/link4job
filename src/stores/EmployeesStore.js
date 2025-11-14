import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmployeesStore = defineStore("EmployeesStore", () => {
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

  const fetchEmployees = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return data.companyEmployees ?? [];
    } catch (err) {
      console.error("Error fetching Employees:", err);
      error.value = "Failed to load Employees details.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchEmployeeById = async (employeeId) => {
    try {
      const data = await _loadJSON();
      const employees = data.companyEmployees ?? [];
      return employees.find(emp => String(emp.id) === String(employeeId)) || null;
    } catch (err) {
      console.error(`Error fetching Employee ${employeeId}:`, err);
      return null;
    }
  };

  const filterEmployeeByUserId = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await _loadJSON();
      return (data.companyEmployees ?? []).filter(emp => String(emp.user_id) === String(userId));
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
      const data = await _loadJSON();
      return (data.companyEmployees ?? []).filter(emp => String(emp.company_id) === String(companyId));
    } catch (err) {
      console.error(`Error fetching employee company ${companyId}:`, err);
      error.value = "Failed to load employee details.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  const countEmployeesByUserId = async (theId, the) => {
    try {
      if (the === "user") {
        const list = await filterEmployeeByUserId(theId);
        return list.length;
      } else if (the === "company") {
        const list = await filterEmployeeByCompanyId(theId);
        return list.length;
      }
      return 0;
    } catch (err) {
      console.error(`Error counting employees ${the} ${theId}:`, err);
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
    fetchEmployees,
    fetchEmployeeById,
    filterEmployeeByUserId,
    filterEmployeeByCompanyId,
    countEmployeesByUserId,
    clearCache,
    forceReloadJSON,
  };
});
