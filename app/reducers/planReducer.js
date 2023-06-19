import { createReducer } from '@app/helpers/reduxHelpers';
import { combineReducers } from 'redux';
import * as Actions from '@app/actions/types';

const loadingReducer = createReducer({
  initialState: false,
  actionType: Actions.SET_PLAN_LOADER,
});
const planListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_PLAN_LIST,
});
const questionActivityDoneReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_QUESTION_ACTIVITY_DONE,
});

const setActivityReportReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ACTIVITY_REPORT_DATA,
});

const setBackupClassReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_BACKUP_CLASS_DATA,
});

const setSelectedPlanReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SELECTED_PLAN,
});

const setSelectedProductReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SELECTED_PRODUCT,
});

const planReducers = combineReducers({
  loading: loadingReducer,
  plan: planListReducer,
  questionActivity: questionActivityDoneReducer,
  activityReportData: setActivityReportReducer,
  backupClass: setBackupClassReducer,
  selectedProduct:setSelectedProductReducer,
  selectedPlan:setSelectedPlanReducer
});
export default planReducers;
