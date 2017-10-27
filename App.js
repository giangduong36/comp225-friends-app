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
//const MainScreen = require('./src/pages/Main');
//const SignupScreen = require('./src/pages/Signup');
//const LoginScreen = require('./src/pages/Login');
//const AccountScreen = require('./src/pages/Account');
//const AvailabilityScreen = require('./src/pages/Availability');
//const FriendslistScreen = require('./src/pages/Friendslist');
//const SearchFriendScreen = require('./src/pages/SearchFriend');
//const MatchesScreen = require('./src/pages/Matches');

const InitScreen = require('./src/pages/Init'); //this screen has our app's logo (when a person opens the app for the first time, this is the page they see (look at Trevor's design))
const SignupScreen = require('./src/pages/Signup'); //this screen is the sign up page
const LoginScreen = require('./src/pages/Login'); //this screen is the log in page
const HomeScreen = require('./src/pages/Home'); //this screen is the home screen. on this screen, you can change availabilty, go to choose hangmates, make a status (see trevor's design)
const ProfileScreen = require('./src/pages/Profile'); //this is the user's profile (you can edit your info here)
const SettingsScreen = require('./src/pages/Settings'); //this is the settings page
const FriendslistScreen = require('./src/pages/Friendslist'); //this is the list of friends
const UserDetailScreen = require('./src/pages/UserDetail'); //this screen shows you another user's profile
const AddFriendScreen = require('./src/pages/AddFriend'); //this is the page where you can search for friends and add them
const MatchesScreen = require('./src/pages/Matches'); //this is your matches page

//Import Icon

import Icon from 'react-native-vector-icons/MaterialIcons'

// Screen navigation

import {
    StackNavigator, TabNavigator
} from 'react-navigation';

import { BottomNavigation, NavigationComponent, Tab } from 'react-native-material-bottom-navigation'

//export const SimpleApp = StackNavigator({
//    Login: {screen: LoginScreen},
//    Signup: {screen: SignupScreen},
//    Main: { screen: MainScreen },
//    Availability: { screen: AvailabilityScreen },
//    Account: {screen: AccountScreen},
//    SearchFriend: {screen: SearchFriendScreen},
//});

export const InitStack = StackNavigator({
	Init: {screen: InitScreen},
	Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
});

export const FriendStack = StackNavigator({
	Friendslist: {screen: FriendslistScreen},
	UserDetail: {screen: UserDetailScreen},
	//also to add a friend?
	AddFriend: {screen: AddFriendScreen},
});

export const MatchesStack = StackNavigator({
	Matches: {screen: MatchesScreen},
	UserDetail: {screen: UserDetailScreen},
});

export const HomeStack = StackNavigator({
	Home: {screen: HomeScreen},
	Profile: {screen: ProfileScreen},
	//also to settings?
	Settings: {screen: SettingsScreen},
});

export const Tabs = TabNavigator({
  Friends: { screen: FriendStack },
  Home: { screen: HomeStack },
  Matches: { screen: MatchesStack }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'black',
      rippleColor: 'white',
      tabs: {
        Friends: {
          label: 'Friends',
          barBackgroundColor: '#4B5CD7',
		  showIcon: true,
		  icon: (<Icon size={24} color="#4F8EF7" name="people" />) 
        },	
        Home: {
          label: 'Home',
          barBackgroundColor: '#1729B0',
		  showIcon: true,
		  icon: (<Icon size={24} color="#4F8EF7" name="home" />)
        },
        Matches: {
          label: 'Matches',
          barBackgroundColor: '#717DD7',
		  showIcon: true,
		  icon: (<Icon size={24} color="#4F8EF7" name="chat-bubble" />) //{<Icon name="chat-bubble-outline" size={35} color="#4F8EF7" />
          //labelColor: '#434343', // like in the standalone version, this will override the already specified `labelColor` for this tab
          //activeLabelColor: '#212121',
          //activeIcon: <Icon size={24} color="#212121" name="newsstand" />
        }
      }
    }
  }
})



export const Root = StackNavigator({
  InitStack: {
    screen: InitStack,
  },
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

module.exports = Root;
module.exports.firebaseApp = firebaseApp;