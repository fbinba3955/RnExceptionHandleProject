package com.awesomeproject.RnModule;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class RnExceptionModule extends ReactContextBaseJavaModule {

    private final String MODULE_NAME = "RnException";

    private final Context mContext;

    public RnExceptionModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void handleException(String msg, Promise promise) {
        try {
            Log.e(MODULE_NAME, msg);
            promise.resolve(msg);
        }
        catch (Exception e) {
            promise.reject(e);
        }
    }
}
