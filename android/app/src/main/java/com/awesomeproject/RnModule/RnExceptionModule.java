package com.awesomeproject.RnModule;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

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
    public void handleException(ReadableMap map, Promise promise) {
        try {
            String type = map.getString("type");
            String name = map.getString("name");
            String message = map.getString("message");
            Log.e(MODULE_NAME, type + " " + name + " " + message);
            saveErrorLog(type, name, message);
            promise.resolve("handle_over");
        }
        catch (Exception e) {
            promise.reject(e);
        }
    }

    /**
     * 保存rn错误日志
     * @param type 异常类型
     * @param name 异常名称
     * @param message 异常描述
     * @return 日志文件位置
     * @throws Exception
     */
    private String saveErrorLog(String type, String name ,String message) {
        File dir = new File(mContext.getExternalFilesDir("log").getPath());
        File logFile = new File(mContext.getExternalFilesDir("log").getPath() + File.separator + "rnErrorLog.txt");
        if (!dir.exists()) {
            dir.mkdir();
        }
        if (!logFile.exists()) {
            try {
                logFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        FileWriter writer = null;
        try {
            writer = new FileWriter(logFile, true);
            writer.write(System.currentTimeMillis() + ":" + type + "-" + name + "-" + message + "\r\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            if (null != writer) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return logFile.getPath();
    }
}
