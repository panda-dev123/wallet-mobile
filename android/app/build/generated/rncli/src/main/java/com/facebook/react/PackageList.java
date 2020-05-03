
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

import com.simsec.wallet.BuildConfig;
import com.simsec.wallet.R;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// react-native-awesome-card-io
import com.cardio.RNCardIOPackage;
// react-native-biometrics
import com.rnbiometrics.ReactNativeBiometricsPackage;
// react-native-ble-manager
import it.innove.BleManagerPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-contacts
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
// react-native-firebase
import io.invertase.firebase.RNFirebasePackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-permissions
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
// react-native-rsa-native
import com.RNRSA.RNRSAPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-spinkit
import com.react.rnspinkit.RNSpinkitPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-sweet-alert-best
import com.clipsub.RNSweetAlert.RNSweetAlertPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  public PackageList(ReactNativeHost reactNativeHost) {
    this.reactNativeHost = reactNativeHost;
  }

  public PackageList(Application application) {
    this.reactNativeHost = null;
    this.application = application;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new AsyncStoragePackage(),
      new RNCardIOPackage(),
      new ReactNativeBiometricsPackage(),
      new BleManagerPackage(),
      new RNCameraPackage(),
      new ReactNativeContacts(),
      new RNFirebasePackage(),
      new RNGestureHandlerPackage(),
      new RNPermissionsPackage(),
      new RNRSAPackage(),
      new RNScreensPackage(),
      new RNSpinkitPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new RNSweetAlertPackage(),
      new VectorIconsPackage(),
      new ReactVideoPackage()
    ));
  }
}
