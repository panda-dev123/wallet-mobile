import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { FORM_BG } from '../styles/colors';

function commonModalMarginSizer(screenWidth) {
  if (screenWidth > 400) {
    return 280;
  } else if (screenWidth > 360) {
    return 250;
  } else if (screenWidth > 250) {
    return 220;
  } else {
    return 180;
  }
}

const containers = StyleSheet.create({
  commonMargin: {
    margin: 5
  },
  commonModalCon: {
    marginTop: commonModalMarginSizer(width),
    marginBottom: commonModalMarginSizer(width),
    justifyContent: 'center',
    alignItems: 'center'
  },
  common: {
    flex: 1,
    paddingBottom: 50,
    paddingTop: 50,
    backgroundColor: '#f9f9f9',
  },
  common2: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff',
  },
  common3: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: FORM_BG,
  },
  profileCard: {
    flex: 1,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: FORM_BG,
  },
  cardsCon: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  mapCon: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commonCon: {
    flex: 1,
    flexDirection: 'column'
  },
  commonCon2: {
    flex: 1,
    marginLeft: -1
  },
  commonCon3: {
    flex: 1,
    justifyContent: 'center',
    height: 250,
    width: null
  },
  commonConColumn: {
    flexDirection: 'column'
  },
  commonConRow: {
    flexDirection: 'row'
  },
  commonFlex: {
    flex: 1
  },
  selectPinCon: {
    alignItems: 'center',
    marginTop: 30
  },
  screenHeight: {
    height: height,
    flex: 1
  },
  commonBg: {
    flex: 1, 
    backgroundColor: FORM_BG
  },
});

export { containers };
