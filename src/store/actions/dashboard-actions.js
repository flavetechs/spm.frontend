import axiosInstance from "../../axios/axiosInstance";

export async function getAllDashboardCount () {
  await axiosInstance.get(`/dashboard/api/v1/get/dashboard-count`)
      .then(async (res) => {
         localStorage.setItem('dashboardCount', JSON.stringify(res?.data?.result));
         return res?.data?.result;
      })
      .catch((err) => {
         return err.response.data.result  
      });
};

export const getAllStudentDashboardCount = async () => {
   axiosInstance.get(`/dashboard/api/v1/get-student/dashboard-count`)
      .then(async (res) => {
         localStorage.setItem('studentDashboardData', JSON.stringify(res?.data?.result));
         return res?.data?.result;

      })
      .catch((err) => {
         return err.response.data.result
      });
};