package com.weapplinse.dreamchild;

import android.content.Intent;

import com.facebook.react.ReactActivity;

import android.os.Bundle;

import android.content.Intent;

import android.content.res.Configuration;

// import android.view.WindowManager;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNDreamChild";
  }
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
  }

  @Override
   public void onConfigurationChanged(Configuration newConfig) {
       super.onConfigurationChanged(newConfig);
       Intent intent = new Intent("onConfigurationChanged");
       intent.putExtra("newConfig", newConfig);
       this.sendBroadcast(intent);
   }

  // @Override
  // protected void onCreate(Bundle savedInstanceState) {
  //   super.onCreate(savedInstanceState);
  //   getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
  // } 
}
