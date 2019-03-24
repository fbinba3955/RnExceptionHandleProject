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
import RNRestart from 'react-native-restart';
import {setJSExceptionHandler} from 'react-native-exception-handler'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ErrorUtils = require('ErrorUtils');

const errorHandler = (e, isFatal) => {
  var errorMsg = {type: ((isFatal) ? "Fatal:":"Normal"), name : e.name, message: e.message};
  NativeModules.RnException.handleException(errorMsg).then((msg) => {
    Console.log(msg)
  }).catch((err) => {
    console(err)
  });
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        '123',
      [{
        text: 'Restart',
        onPress: () => {
          RNRestart.Restart();
        }
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

/**
 * JS_Exceptions：你的Javascript代码产生的错误
 *
 * 第一个参数，错误发生时调用的函数
 * 第二个参数，设置true，在开发模式下调用处理程序代替 red 屏幕
 *
 * error 错误信息
 * isFatal 是否是致命的，一定发生崩溃的
 */

setJSExceptionHandler(errorHandler,false)

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
        <Button title="来一发" color="#841584" onPress={()=>this._testButtonClick()}></Button>
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
