import { colors, fontSizes } from '@app/styles';
import { borderWidth, halfindent, indent, lessIndent } from '@app/styles/dimensions';
import Typography from '@app/styles/Typography';
import { scaleVertical } from '@app/utils/scale';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  keybordWrapper: {
    flex: 1,
  },
  inputprofile: {
    marginBottom: lessIndent,
    marginTop: 10,
  },
  unitmodal: {
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 0.6,
    paddingHorizontal: indent,
  },
  inputstyle: {
    backgroundColor: colors.white,
    height: scaleVertical(45),
    ...Typography.bodyHead,
    position: 'relative',
  },
  dropDownItem: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    paddingLeft: indent + 3,
    paddingRight: indent + 4,
  },
  searchRight: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  inputWrapper: {
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    backgroundColor: colors.white,
    borderRadius: 3,
    paddingLeft: lessIndent,
    fontSize: fontSizes.bodyHead,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    color: colors.darkGrey,
    height: scaleVertical(45),
    marginHorizontal: 0,
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),
  },
  SelectButton: {
    flex: 1,
    paddingRight: halfindent,
    alignItems: 'flex-end',
  },
  rectView: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    backgroundColor: colors.backgroundColor,
    opacity: 0.8,
    borderRadius: 25,
    marginBottom: scaleVertical(8),
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
});
