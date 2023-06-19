import Typography from '@app/styles/Typography';
import { Platform, StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights } from '../../styles';
import { borderWidth, indent } from '../../styles/dimensions';

export default StyleSheet.create({
  marginBottom: {
    marginBottom: 0,
  },

  listMargin: {
    marginTop: 0,
  },

  root: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  rootStyle: {
    paddingTop: 0,
    backgroundColor: colors.white,
  },

  mainbg: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },

  greetingsText: {
    fontSize: fontSizes.headerTitle,
    fontWeight: fontWeights.bold,
    color: colors.darkGrey,
    marginBottom: 6,
    marginTop: 20,
  },

  infoText: {
    lineHeight: 18,
    color: colors.grey,
  },
  activityList: {},
  loadingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loading: {
    color: colors.primary,
  },
  inboxWrapper: {
    paddingTop: indent * 2 - 4,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: indent * 2 - 4,
  },

  activityTypeIcon: {
    width: 35,
    height: 35,
  },

  contentDirection: {
    flexDirection: 'row',
    paddingLeft: indent,
    flexGrow: 1,
    flex: 1,
  },

  activityInfoSlot: {
    flexGrow: 0.95,
    flex: 1,
    marginRight: 'auto',
  },

  recordName: {
    color: colors.grey,
    lineHeight: 18,
    marginBottom: 4,
  },

  activityContent: {
    color: colors.midBlack,
    lineHeight: 21,
  },

  moreHorizontalBtn: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 32,
  },

  mailReply: {
    padding: 12,
    marginTop: indent - 4,
    color: colors.darkGrey,
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 4,
    shadowColor: colors.mailShadow,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 0,
    shadowOpacity: 1,
    letterSpacing: 0.4,
    flexBasis: '109%',
  },

  groupHeader: {
    color: colors.midBlack,
    marginVertical: 24,
  },

  modalContain: {
    padding: indent + indent - 2,
    paddingBottom: 0,
  },

  unitModal: {
    height: null,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 15,
  },

  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: indent,
    marginBottom: indent - 4,
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.borderColor,
  },

  clinentName: {
    flexDirection: 'column',
    marginLeft: indent,
    flex: 1,
  },

  textName: {
    color: colors.grey,
  },

  textCaption: {
    color: colors.darkGrey,
  },

  callEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: indent - 4,
    marginBottom: indent - 4,
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.borderColor,
  },

  call: {},

  callList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },

  emailList: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activityTypeIconTwo: {
    marginRight: indent + 2,
  },

  title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },

  titleActivities: {
    flexGrow: 0.94,
    marginRight: 'auto',
    flexWrap: 'wrap',
    flex: 1,
  },
  RescheduleModal: {
    padding: 30,
    height: null,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  btn: {
    width: '100%',
    maxWidth: '48%',
    borderRadius: 6,
    ...Platform.select({
      ios: {
        maxWidth: '100%',
        width: 150,
        paddingHorizontal: indent,
      },
    }),
  },
  btnTwo: {
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 6,
    width: '100%',
    maxWidth: '48%',
    ...Platform.select({
      ios: {
        maxWidth: '100%',
        width: 150,
        paddingHorizontal: indent,
      },
    }),
  },
  btnText: {
    color: colors.grey,
  },
  rescheduleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  reschedule: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: fontWeights.bold,
  },
  inputBlock: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: '100%',
    marginTop: 20,
    borderRadius: 3,
  },
  timePicker: {
    borderWidth: 1,
    ...Typography.bodyHead,
    lineHeight: 15,
    borderColor: colors.borderColor,
    width: '100%',
    marginTop: 20,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'relative',
  },
  iconPosition: {
    position: 'absolute',
    right: 12,
    top: '50%',
  },
  dateWrapper: {
    position: 'relative',
  },
  DateTitle: {
    position: 'absolute',
    top: 10,
    left: 7,
    backgroundColor: colors.white,
    zIndex: 2,
    paddingHorizontal: 5,
    color: colors.grey,
    ...Typography.bodyOne,
  },
  loadingInbox: {
    marginHorizontal: -indent,
    flex: 1,
  },
});
