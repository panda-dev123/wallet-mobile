import { Platform, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import normalize from '../utils/GetPixelSizeForLayoutSize';
import { TEXT_LIGHT } from '../styles/colors';

const { width } = Dimensions.get('window');

function fontSizerForTitle(screenWidth) {
  if (screenWidth > 400) {
    return 18;
  } else if (screenWidth >= 360) {
    return 16;
  } else if (screenWidth > 250) {
    return 12;
  } else {
    return 10;
  }
}

function fontSizerForSubTitle(screenWidth) {
  if (screenWidth > 400) {
    return 16;
  } else if (screenWidth >= 360) {
    return 12;
  } else if (screenWidth > 250) {
    return 10;
  } else {
    return 8;
  }
}

const text = StyleSheet.create({
  innerTitleResize: {
    ...Platform.select({
      android: {
        lineHeight: 10
      },
      ios: {
        lineHeight: 13
      }
    })

  },
  title: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    fontSize: fontSizerForTitle(width)
  },
  textTitle: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(16),
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    color: '#3fd2c2'
  },
  textTitleInLeft: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: normalize(16),
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    color: 'black',
    fontWeight: 'bold'
  },
  locationName: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: normalize(13),
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    color: 'black'
  },
  subTitle: {
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    fontSize: fontSizerForSubTitle(width)
  },
  centerText: {
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  selectPintitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pagetitle: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: normalize(22),
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    color: 'black'
  },
  pagetitle2: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: normalize(22),
    ...Platform.select({
      android: {
        fontFamily: 'Roboto'
      }
    }),
    color: 'black'
  },
  navBarTitle: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: normalize(20),
    ...Platform.select({
      android: {
        fontFamily: 'Roboto',
        
      }
    }),
    color: 'white'
  },
  formLabel: {
    paddingHorizontal: 10,
    color: TEXT_LIGHT
  },
});

export { text };
