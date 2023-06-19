import {
  setActivityReportData,
  setBackupClassData,
  setPlanList,
  setPlanLoader,
  setQuestionActivityDone,
} from '@app/actions/planActions';
import { DEMO_PLAN_STATUS, RESPONSE_STATUS } from '@app/constants/constant';
import { API_BASE_URL } from '@app/constants/environmentConstants';
import { getAPIErrorReason, toastNotification, validateUnautorizedRequestError } from '@app/helpers/helpers';
import axios from 'axios';
import { trackActivity } from './analyticsService';
import { captureException } from './errorLogService';

/**
 * @desc Plan - Get Plan List
 * @param {*} payload
 */
export const getPlanList =
  (payload = {}) =>
  async (dispatch) => {
    try {
      dispatch(setPlanLoader(true));
      const response = await axios.post(`${API_BASE_URL}/PlanList`, payload);
      const { data } = response.data;
      if (response.data) dispatch(setPlanLoader(false));
      if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
        dispatch(setPlanList(data));
        return data;
      } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
        toastNotification(response.data?.message);
      }
    } catch (e) {
      console.log('getPlanList', e);
      captureException(e);
      dispatch(validateUnautorizedRequestError(e));
      toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
      return false;
    } finally {
      dispatch(setPlanLoader(false));
    }
  };
/**
 * @desc Plan - Get Plan Type List
 * @param {*} payload
 */
export const getPlanTypeList = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/PlanTypeList`, payload);
    const { data } = response.data;
    if (response.data) dispatch(setPlanLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      return data;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('getPlanTypeList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};
/**
 * @desc Plan - Get Folder File List
 * @param {*} payload
 */
export const getFolderFileList = (payload) => async (dispatch, getState) => {
  try {
    const PlanList = getState().plan?.plan?.PlanList;
    const currentUser = getState().user?.currentUser;

    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/FolderFileList`, payload);
    const { data } = response.data;
    if (response.data) dispatch(setPlanLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      let planItem = PlanList?.find((x) => x?.plan_id === payload?.PlanId);

      const activityPlan = PlanList?.find(
        (x) => Number(x?.is_paid_plan) === Number(RESPONSE_STATUS.SUCCESS) && x?.plan_work_type === 'Daily',
      );
      const workshopPlan = PlanList?.find((x) => x?.plan_work_type === 'Monthly');
      const classPlan = PlanList?.find((x) => x?.plan_work_type === 'Weekly');

      const item = currentUser?.plan_demo_master?.find((x) => x?.plan_id === activityPlan?.plan_id);
      const workshopItem = currentUser?.plan_demo_master?.find((x) => x?.plan_id === workshopPlan?.plan_id);
      const classItem = currentUser?.plan_demo_master?.find((x) => x?.plan_id === classPlan?.plan_id);

      const isDemoAvailable = Number(item?.user_plan_status_demo) === DEMO_PLAN_STATUS.DEFAULT;
      const isWorkshopDemoAvailable = Number(workshopItem?.user_plan_status_demo) === DEMO_PLAN_STATUS.DEFAULT;
      const isClassDemoAvailable = Number(classItem?.user_plan_status_demo) === DEMO_PLAN_STATUS.DEFAULT;

      if (Number(planItem?.is_paid_plan) === Number(RESPONSE_STATUS.FAIL) && !payload?.FolderParentId) {
        if (isDemoAvailable) {
          if (data?.FolderFileList && data?.FolderFileList?.length > 3) {
            const activityItem = {
              ...planItem,
              isActivityPurchaseCard: true,
            };
            data?.FolderFileList?.splice(4, 0, activityItem);
          }
        }
        if (isWorkshopDemoAvailable) {
          if (data?.FolderFileList && data?.FolderFileList?.length > 8) {
            const workshopItem = {
              ...planItem,
              isWorkshopPurchaseCard: true,
            };
            data?.FolderFileList?.splice(9, 0, workshopItem);
          }
        }
        if (isClassDemoAvailable) {
          if (data?.FolderFileList && data?.FolderFileList?.length > 15) {
            const classItem = {
              ...planItem,
              isClassPurchaseCard: true,
            };
            data?.FolderFileList?.splice(16, 0, classItem);
          }
        }
      }
      return data;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('getFolderFileList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Plan - Get Folder List
 * @param {*} payload
 */
export const getFolderList = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/FolderList`, payload);
    const { data } = response.data;
    if (response.data) dispatch(setPlanLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      return data;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('getFolderList', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Activity - Check Question Activity Done
 * @param {*} payload
 */
export const checkQuestionActivityDone = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/CheckQuestionActivityDone`, payload);
    const { data } = response.data;
    if (response.data) dispatch(setPlanLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setQuestionActivityDone(data));
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('checkQuestionActivityDone', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Activity - Add Question Activity Done Report
 * @param {*} payload
 */
export const addQuestionActivityDoneReport = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/AddQuestionActivityDoneReport`, payload);
    if (response.data) dispatch(setPlanLoader(false));
    if (response.data?.status === RESPONSE_STATUS.SUCCESS) {
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('checkQuestionActivityDone', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Plan - Get Work Class Data
 * @param {*} payload
 */
export const getWorkClassData = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/WorkClassData`, payload);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (e) {
    console.log('getWorkClassData', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Plan - Get Backup Class
 * @param {*} payload
 */
export const getBackupClass = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/BackupClass`, payload);
    const { data } = response;
    if (data) {
      dispatch(setPlanLoader(false));
      if (Number(data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
        dispatch(setBackupClassData(data?.BackupClass));
      } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
        toastNotification(response.data?.message);
      }
      return data;
    }
  } catch (e) {
    console.log('getBackupClass', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Plan - Backup Class Request
 * @param {*} payload
 */
export const backupClassRequest = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/BackupRequest`, payload);
    const { data } = response;
    if (data) {
      dispatch(setPlanLoader(false));
      if (Number(data?.status) === Number(RESPONSE_STATUS.SUCCESS)) {
        return true;
      } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
        toastNotification(response.data?.message);
      }
    }
  } catch (e) {
    console.log('backupClassRequest', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

/**
 * @desc Report - Get Activity Report
 * @param {*} payload
 */
export const getActivityReport = (payload) => async (dispatch) => {
  try {
    dispatch(setPlanLoader(true));
    const response = await axios.post(`${API_BASE_URL}/ActivityReport`, payload);
    const { data } = response.data;
    if (data) dispatch(setPlanLoader(false));
    if (response?.data?.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setActivityReportData(data));
      return true;
    } else if (response.data?.status === RESPONSE_STATUS.FAIL) {
      toastNotification(response.data?.message);
    }
  } catch (e) {
    console.log('getActivityReport', e);
    captureException(e);
    dispatch(validateUnautorizedRequestError(e));
    toastNotification(getAPIErrorReason(e) || 'Something goes wrong, please try again.');
    return false;
  } finally {
    dispatch(setPlanLoader(false));
  }
};

export const trackLockedItemActivity = (item, isFile) => {
  let message = 'locked: folder clicked';
  if (isFile) {
    message = 'locked: file clicked';
  }
  trackActivity(message, item);
};
