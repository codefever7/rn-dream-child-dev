import { Dimensions, Platform, StatusBar } from 'react-native';

export const DateFormat = 'YYYY-MM-DD';

export const WIN_WIDTH = Dimensions.get('window').width,
  WIN_HEIGHT = Dimensions.get('window').height;

export const isIOS = Platform.OS === 'ios' ? true : false;
export const isAndroid = Platform.OS === 'android' ? true : false;
export const isSmallDevice = WIN_HEIGHT <= 568 ? true : false;

export const IS_IPHONE_X = WIN_HEIGHT >= 812;
export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBar.currentHeight;

export const GCM_SENDER_ID = '1066777085698';
export const appName = Platform.OS === 'android' ? 'AndroidApp' : 'iOSApp';
export const REQUEST_CANCEL_MESSAGE = 'CANCEL';
export const AMPLITUDE_ANALYTICS_KEY = 'bb04dbe6c4c0131298670507b7b129ba';

export const LANGUAGE = {
  HINDI: 'hi',
  GUJARATI: 'gu',
};

export const USER_STATUS = {
  PREGNANT: '5',
  PLANNING: '6',
  EXPLORE_APP: '3',
};

export const USER_STATUS_TYPE = {
  5: 'Pregnant',
  6: 'Planning',
  3: 'Explore',
};

export const RESPONSE_STATUS = {
  FAIL: '0',
  SUCCESS: '1',
};
export const PALN_TYPE = {
  BASIC: 'Basic',
  DAILY: 'Daily',
  MONTHLY: 'Monthly',
  WEEKLY: 'Weekly',
};

export const CONTENT_TYPE = {
  IMAGE: 1,
  VIDEO: 2,
  WEB: 3,
  TEXT: 4,
  TEXT_WITH_IMAGE: 5,
  PDF: 6,
};

export const CONTENT_TYPE_TITLE = {
  1: 'image',
  2: 'video',
  3: 'web',
  4: 'text',
  5: 'text with image',
  6: 'pdf',
};

export const NOTIFICATION_TYPE = {
  TEXT: 1,
  IMAGE: 2,
  LINK: 3,
};
export const REPORT_DURATION_TYPE = {
  WEEK: 0,
  MONTH: 1,
  YEAR: 2,
  TODAY: 3,
};

export const SLIDER_TYPE = {
  LINK: 0,
  DESCRIPTION: 1,
};

export const FILE_VIEW_TYPE = {
  FILE_VIEW: 1,
  ACTIVITY_FILE_VIEW: 2,
};

export const BACKUP_CLASS_STATUS = {
  OPENABLE: 0, //Jova na baki che. But Folder view ma Navigationa nai kari shake.
  BACKUP_SEEN: 1, //backup ma Jovay gaya hase.
  ACTIVE: 2, //Jova na baki che. folder ma Navigation kari shakse.
  SEEN: 9, //Reguler Jovay gaya hase.
};

export const BACKUP_CLASS_COLOR = {
  0: '#EDD1FF',
  1: '#E9E9E9',
  2: '#D8F5E0',
  9: '#E9E9E9',
};

export const CONTACT_TYPE = {
  FRANCHISE_ASK: '1',
  COUNSELING_ASK: '2',
  TRAINER_ASK: '4',
};

export const ORDER_TYPE = {
  PLAN_AND_PRODUCT: 0,
  PLAN: 1,
  PRODUCT: 2,
  PLAN_AND_KIT: 3,
};

export const ORDER_STATUS = {
  PAYMENT_AWATING: 1,
  PROCESSING: 2,
  SUCCESS: 3,
  FAILED: 4,
  PARTIAL_PAYMENT: 5,
  REFUNDED: 6,
  CANCELLED: 7,
  REFUND_TO_BANK: 8,
  PAYMENT_CONFIRMATION_AWAITED: 9,
  QUEUED: 10,
  REFUND_INITIATED: 11,
  REFUND_IN_PROCESS: 12,
  ON_HOLD: 13,
  REVERSED: 14,
};

export const PLAN = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
};

export const UPSELL_IDENTIFIER = {
  TRIAL_EXPIRE: 'trial_expire',
  SPECIAL_OFFER: 'special_offer',
  START_DEMO_DAILY: 'start_demo_daily',
  START_DEMO_WORKSHOP: 'start_demo_workshop',
  START_DEMO_CLASS: 'start_demo_class',
};

export const DEMO_PLAN_STATUS = {
  DEFAULT: 0,
  ACTIVE: 1,
  EXPIRE: 2,
};
