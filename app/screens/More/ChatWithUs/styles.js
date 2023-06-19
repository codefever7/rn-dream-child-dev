import { colors, fontWeights } from '@app/styles';
import { halfindent, indent, lessIndent } from '@app/styles/dimensions';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainbg: {
    backgroundColor: colors.white,
    flex: 1,
  },
  mainroot: {
    paddingHorizontal: indent,
    paddingBottom: halfindent,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: colors.black,
    fontWeight: fontWeights.extraBold,
  },
  padview: {
    padding: indent,
    justifyContent: 'center',
    flex: 1,
  },
  headerIcons: {
    marginRight: lessIndent,
  },
  leftImg: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginBottom: indent,
  },
  chatBox: {
    marginLeft: halfindent + 2,
    width: 'auto',
    alignItems: 'flex-start',
  },
  messageText: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    maxWidth: 180,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: lessIndent,
    borderRadius: 12,
  },
  messageRightText: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    maxWidth: 180,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: lessIndent,
    borderRadius: 12,
  },
  timeText: {
    color: colors.grey,
  },
  timeTextRight: {
    color: colors.grey,
  },
  leftWrap: {
    marginTop: indent,
  },
  rightWrap: {
    alignSelf: 'flex-end',
    marginTop: indent,
  },
  chatBoxRight: {
    alignItems: 'flex-end',
    marginRight: halfindent + 2,
    width: 'auto',
  },
  btmView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrap: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: indent,
  },
  btnicon: {
    padding: halfindent + 2,
  },
  clipicon: {
    padding: halfindent + 2,
  },
  inputstyle: {
    borderWidth: 1,
    flex: 1,
    marginRight: indent,
    borderColor: colors.borderColor,
    // backgroundColor: colors.white,
    borderRadius: 25,
    flexGrow: 1,
    // maxWidth: '95%',
    paddingLeft: 12,
    fontSize: 15,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
      },
    }),
  },
  send: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 45,
    height: 45,
    backgroundColor: colors.primary,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshIcon: {
    paddingHorizontal: halfindent,
  },
});
