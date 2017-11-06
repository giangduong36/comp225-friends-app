import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import {List, ListItem, SearchBar} from "react-native-elements";

//Import Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
// import FriendsFlatList from "./flatListDemo";
import FriendsFlatList from "./FriendFlatList";

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
    Button,
    TextInput,
    Platform,
    SectionList,
    FlatList,
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

// const Header = require('../components/Header');
const flatList = require('./FriendFlatList');



class FriendslistScreen extends Component {
	static navigationOptions = ({ navigation}) => ({
		title: "Friends",
		headerTitleStyle: {
			alignSelf: 'center'
		},
		headerLeft: <Icon.Button name="person-add" backgroundColor="#3b5998" onPress={() => navigation.navigate('AddFriend')}>Add Friend</Icon.Button>
	});

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        // const testItem = {'name':"Hello"};

        return (
            <View style={styles.container}>
                {/*TODO: Make a flatlist/sectionlist view of friends*/}

                <Text style={styles.welcome}>welcome to the friends list screen</Text>
                <FriendsFlatList/>
                <ActionButton
                    title="Click a friend to see their profile's details"
                    onPress={() => navigate('UserDetail')
					}
                />
            </View>
        );
    }
	
}
module.exports = FriendslistScreen;