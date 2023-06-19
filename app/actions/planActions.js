import { createAction } from '@reduxjs/toolkit';
import * as Actions from './types';

/**
 * @desc Set Plan Loader
 */
export const setPlanLoader = createAction(Actions.SET_PLAN_LOADER);
/**
 * @desc Set Plan List
 */
export const setPlanList = createAction(Actions.SET_PLAN_LIST);
/**
 * @desc Set Question Activity Done
 */
export const setQuestionActivityDone = createAction(Actions.SET_QUESTION_ACTIVITY_DONE);
/**
 * @desc Set Activity Report Data
 */
export const setActivityReportData = createAction(Actions.SET_ACTIVITY_REPORT_DATA);

/**
 * @desc Set Backup Class Data
 */
export const setBackupClassData = createAction(Actions.SET_BACKUP_CLASS_DATA);

/**
 * @desc Set Selected Plan
 */
export const setSelectedPlan = createAction(Actions.SET_SELECTED_PLAN);

/**
 * @desc Set Selected Product
 */
export const setSelectedProduct = createAction(Actions.SET_SELECTED_PRODUCT);

/**
 * @desc Clear Plan Data
 */
export const clearPlanData = () => (dispatch) => {
  dispatch(setPlanLoader(false));
  dispatch(setPlanList(null));
  dispatch(setQuestionActivityDone(null));
  dispatch(setActivityReportData(null));
};
