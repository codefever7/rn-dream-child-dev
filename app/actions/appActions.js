import { createAction } from '@reduxjs/toolkit';
import { APP__SET_LOADING } from './types';

export const setLoading = createAction(APP__SET_LOADING);
