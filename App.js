/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
    TextInput
} = ReactNative;

// Import components
const StatusBar = require('./src/components/StatusBar');
const ActionButton = require('./src/components/ActionButton');
const ListItem = require('./src/components/ListItem');
const styles = require('./styles.js');

// Import firebase
const firebaseApp = require('./src/services/firebaseInit');

// Import pages
const MainScreen = require('./src/pages/Main');
const SignupScreen = require('./src/pages/Signup');
const LoginScreen = require('./src/pages/Login');
const AccountScreen = require('./src/pages/Account');
const AvailabilityScreen = require('./src/pages/Availability');

// Screen navigation

import {
    StackNavigator,
} from 'react-navigation';


export const SimpleApp = StackNavigator({
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    Main: { screen: MainScreen },
    Availability: { screen: AvailabilityScreen },
    Account: {screen: AccountScreen},
});

module.exports = SimpleApp;
module.exports.firebaseApp = firebaseApp;



