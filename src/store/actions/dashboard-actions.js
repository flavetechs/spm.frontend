import axiosInstance from "../../axios/axiosInstance";


export var dashboardCount;



export const getAllDashboardCount = () => {
    axiosInstance.get(`/dashboard/api/v1/get/dashboard-count`)
        .then((res) => {
            sessionStorage.setItem('dashboardData', JSON.stringify(res.data.result));
        })
        .catch((err) => {
           return err.response.data.result
        });
};