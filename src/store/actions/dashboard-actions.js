import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/dashboard-action-types";

export async function getAllDashboardCount() {
   await axiosInstance.get(`/smp/server/dashboard/api/v1/get/dashboard-count`)
      .then(async (res) => {
         localStorage.setItem('dashboardCount', JSON.stringify(res?.data?.result));
         
         return res.data.result;
      })
      .catch((err) => {
         return err.response.data.result
      });
};

export const getAppSetupStatus = () => (dispatch) => {
   dispatch({
      type: actions.FETCH_SETUP_STATUS_LOADING
  });
   axiosInstance.get(`smp/server/dashboard/api/v1/get/portal-status`)
   .then((res) => {
      dispatch({
          type: actions.FETCH_SETUP_STATUS_SUCCESS,
          payload: res.data.result
      });
  }).catch(err => {
      dispatch({
          type: actions.FETCH_SETUP_STATUS_FAILED,
          payload: err.response.data.result
      })
  });
};

export const getAllStudentDashboardCount = async () => {
   axiosInstance.get(`/smp/server/dashboard/api/v1/get-student/dashboard-count`)
      .then(async (res) => {
         localStorage.setItem('studentDashboardData', JSON.stringify(res?.data?.result));
         return res?.data?.result;

      })
      .catch((err) => {
         return err.response.data.result
      });
};

export const getAllParentDashboardCount = async () => {
   axiosInstance.get(`/smp/server/smp/maywards/api/v1/get/dashboard-count`)
      .then(async (res) => {
         localStorage.setItem('parentDashboardData', JSON.stringify(res?.data?.result));
         return res?.data?.result;

      })
      .catch((err) => {
         return err.response.data.result
      });
};