import _ from 'lodash';

export const loadingSelector = (state) => _.get(state, ['app', 'loading']);
