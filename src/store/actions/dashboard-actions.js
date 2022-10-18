import axiosInstance from "../../axios/axiosInstance";

export const getAllDashboardCount = () => {
   axiosInstance.get(`/dashboard/api/v1/get/dashboard-count`)
      .then((res) => {
         return res?.data?.result;
      })
      .catch((err) => {
         return err.response.data.result
      });
};

export const getAllStudentDashboardCount = () => {
   axiosInstance.get(`/dashboard/api/v1/get-student/dashboard-count`)
      .then((res) => {
         sessionStorage.setItem("studentDashboardData", JSON.stringify(res?.data?.result));
         // return res?.data?.result;

      })
      .catch((err) => {
         return err.response.data.result
      });
};