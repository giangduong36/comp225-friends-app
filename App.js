'use strict';

// Horrible polyfill hack for outdated code that uses now-defunct View.propTypes
import { View, ViewPropTypes } from 'react-native';
if(!View.propTypes) {
  View.__proto__.propTypes = ViewPropTypes;
}

//Import React
import React, {Component} from 'react';
const styles = require("./styles");

// Import firebase
const firebaseApp = require('./src/services/firebaseInit');

//Import Icon
import Icon from 'react-native-vector-icons/MaterialIcons'

// Import pages
const SignupScreen = require('./src/pages/Signup'); //this screen is the sign up page
const LoginScreen = require('./src/pages/Login'); //this screen is the log in page
const MeScreen = require('./src/pages/Me'); //this screen is the me screen.
const ProfileScreen = require('./src/pages/Profile'); //this is the user's profile (you can view your info here)
const EditProfileScreen = require('./src/pages/EditProfile'); //this is the user's profile (you can edit your info here)
const FriendslistScreen = require('./src/pages/Friendslist'); //this is the list of friends
const UserDetailScreen = require('./src/pages/UserDetail'); //this screen shows you another user's profile
const AddFriendScreen = require('./src/pages/AddFriend'); //this is the page where you can search for friends and add them
const MatchesScreen = require('./src/pages/Matches'); //this is your matches page

// Import screen navigation
import {
    StackNavigator, TabNavigator
} from 'react-navigation';
import { BottomNavigation, NavigationComponent, Tab } from 'react-native-material-bottom-navigation'

export const InitStack = StackNavigator({
	Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
});

export const FriendStack = StackNavigator({
	Friendslist: {screen: FriendslistScreen},
	UserDetail: {screen: UserDetailScreen},
	AddFriend: {screen: AddFriendScreen},
});

export const MatchesStack = StackNavigator({
	Matches: {screen: MatchesScreen},
	UserDetail: {screen: UserDetailScreen},
});

export const MeStack = StackNavigator({
	Me: {screen: MeScreen},
	Profile: {screen: ProfileScreen},
	EditProfile: {screen: EditProfileScreen}
}, {gesturesEnabled:false});

export const Tabs = TabNavigator({
  Me: { screen: MeStack },	
  Friends: { screen: FriendStack },
  Matches: { screen: MatchesStack }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: styles.constants.tabButtons,
      rippleColor: styles.constants.tabRipple,
      tabs: {
		Me: {
          label: 'Me',
          barBackgroundColor: styles.constants.tabBG,
		  showIcon: true,
		  icon: (<Icon size={24} color={styles.constants.tabButtons} name="person" />)
        },
        Friends: {
          label: 'Friends',
          barBackgroundColor: styles.constants.tabBG,
		  showIcon: true,
		  icon: (<Icon size={24} color={styles.constants.tabButtons} name="people" />) 
        },	
        Matches: {
          label: 'Matches',
          barBackgroundColor: styles.constants.tabBG,
		  showIcon: true,
		  icon: (<Icon size={24} color={styles.constants.tabButtons} name="chat-bubble" />)
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
    navigationOptions: {
      gesturesEnabled:false,
    }
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

module.exports = Root;
module.exports.firebaseApp = firebaseApp;