import fontSizes from './fontSizes';
import { Platform } from 'react-native';

export default {
  header: {
    fontSize: fontSizes.header,
    lineHeight: 38,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        letterSpacing: 0.55,
        lineHeight: 38,
      },
    }),
  },

  title: {
    fontSize: fontSizes.title,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        letterSpacing: 0.37,
        lineHeight: 41,
      },
    }),
  },

  headLine: {
    fontSize: fontSizes.headline,
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },
  headTitle: {
    fontSize: fontSizes.headerTitle,
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },

  body: {
    fontSize: fontSizes.body,
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
    // ...Platform.select({
    //   ios: {
    //     lineHeight: 22,
    //   },
    // }),
  },

  bodyOne: {
    fontSize: fontSizes.bodyOne,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },

  bodyTwo: {
    fontSize: fontSizes.bodyTwo,
    lineHeight: 22,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },

  bodyHeader: {
    fontSize: fontSizes.bodyHead,
    lineHeight: 22,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        lineHeight: 22,
      },
    }),
  },

  caption: {
    fontSize: fontSizes.caption,
    fontFamily: 'Roboto-Regular',
  },

  captionTwo: {
    fontSize: fontSizes.captionTwo,
    fontFamily: 'Roboto-Regular',
  },

  caps: {
    fontSize: fontSizes.caps,
    fontFamily: 'Roboto-Regular',
  },
  capsOne: {
    fontSize: fontSizes.capsOne,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {
        letterSpacing: 0.07,
        lineHeight: 16,
      },
    }),
  },
  smallCaps: {
    fontSize: fontSizes.smallCaps,
    fontFamily: 'Roboto-Regular',
    // ...Platform.select({
    //   ios: {
    //     letterSpacing: 0.07,
    //     lineHeight: 12,
    //   },
    // }),
  },

  bodyHead: {
    fontSize: fontSizes.bodyHead,
    lineHeight: 21,
    fontFamily: 'Roboto-Regular',
    ...Platform.select({
      ios: {},
    }),
  },

  subTitle: {
    fontSize: fontSizes.subTitle,
    fontFamily: 'Roboto-Regular',
  },
};
