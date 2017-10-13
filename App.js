/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const firebase = require('firebase');
const StatusBar = require('./StatusBar');
const ActionButton = require('./ActionButton');
const ListItem = require('./ListItem');
const styles = require('./styles.js');

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
} = ReactNative;

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNI73KjeLQ6Vv8TWGL8F_6-AV7orI8WYE",
    authDomain: "friend-225.firebaseapp.com",
    databaseURL: "https://friend-225.firebaseio.com",
    storageBucket: "friend-225.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

var  currentID = null;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('items');
    }

    getRef() {
        return firebaseApp.database().ref();
    }


    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    name: child.val().name,
                    friend: child.val().friend,
                    status: child.val().status,
                    _key: child.key
                });
                currentID = child.key;
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar title="Grocery List" />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>

                <ActionButton onPress={this._addItem.bind(this)} title="Add User" />
                <ActionButton onPress={this._addFriend.bind(this)} title="Add Friend" friend = "ID" />
                <ActionButton onPress={this._addStatus.bind(this)} title="Change Status" />

            </View>
        )
    }

    _addItem() {
        AlertIOS.prompt(
            'Add New User',
            null,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Add',
                    onPress: (text) => {
                        this.itemsRef.push({ name: text, friend: "", status: ""})
                    }
                },
            ],
            'plain-text'
        );
    }

    _addFriend() {
        AlertIOS.prompt(
            'Add New Friend',
            null,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Add Friend',
                    onPress: (text, userId) => {
                        this.itemsRef.child(currentID).update({"friend" : text});
                    }
                },
            ],
            'plain-text'
        );
    }

    _addStatus() {
        AlertIOS.prompt(
            'Add New Status',
            null,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'Change Status',
                    onPress: (text) => {
                        this.itemsRef.child(currentID).update({"status" : text});
                    }
                },
            ],
            'plain-text'
        );
    }

    _renderItem(item) {

        const onPress = () => {
            AlertIOS.alert(
                'Complete',
                null,
                [
                    {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
                    {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
                ]
            );
        };

        return (
            <ListItem item={item} onPress={onPress} />
        );
    }

}

