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