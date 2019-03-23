/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
  StyleSheet, 
  Text, View, 
  Button, 
  NativeModules,Alert} from 'react-native';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ErrorUtils = require('ErrorUtils');

/**
 * JS_Exceptions：你的Javascript代码产生的错误
 *
 * 第一个参数，错误发生时调用的函数
 * 第二个参数，设置true，在开发模式下调用处理程序代替 red 屏幕
 *
 * error 错误信息
 * isFatal 是否是致命的，一定发生崩溃的
 */

setJSExceptionHandler((error, isFatal)=>{
  // 您可以捕获这些未处理的异常并执行诸如显示警报或弹出窗口之类的任务，执行清理甚至点击API以在关闭应用程序之前通知开发团队。
  // Alert.alert(error.name,error.message,[{text: 'OK'}])
  NativeModules.RnException.handleException(error.message).then((msg) => {
    Alert.alert(msg)
  }).catch((err) => {
    Alert.alert(err)
  });
}, true)

type Props = {};
export default class App extends Component<Props> {

  _testButtonClick() {
    throw new Error('i crashed！！！')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title="Learn More" color="#841584" onPress={()=>this._testButtonClick()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
