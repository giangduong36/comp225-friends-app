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
// const signupScreen = require('./SignupPage');
const styles = require('./styles.js');
const DataButton= require('./Button');
// import  from './login';

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

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNI73KjeLQ6Vv8TWGL8F_6-AV7orI8WYE",
    authDomain: "friend-225.firebaseapp.com",
    databaseURL: "https://friend-225.firebaseio.com",
    storageBucket: "friend-225.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// import Firebase from 'firebase';
// let app = new Firebase("friend-225.firebaseapp.com");


let  currentID = null;

// Screen navigation

import {
    StackNavigator,
} from 'react-navigation';

// export default class App extends Component {
class MainScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Main`,
    });

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
        // const { navigation } = this.props.navigation.state;
        return (
            <View style={styles.container}>

                <StatusBar title="Friend List"/>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>

                <ActionButton onPress={this._addItem.bind(this)} title="Add User"/>
                <ActionButton onPress={this._addFriend.bind(this)} title="Add Friend" friend="ID"/>
                <ActionButton onPress={this._addStatus.bind(this)} title="Change Status"/>

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
                        this.itemsRef.push({name: text, friend: "", status: ""})
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
                        this.itemsRef.child(currentID).update({"friend": text});
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
                        this.itemsRef.child(currentID).update({"status": text});
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
            <ListItem item={item} onPress={onPress}/>
        );
    }
}

class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props){
        super(props);

        this.state = {
            loaded: true,
            email: '',
            password: ''
        };
    }

    goToLogin(){
        this.props.navigator.push({
            component: Main
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hello, F.R.I.E.N.D.S!</Text>
                <ActionButton
                    onPress={() => navigate('Main')}
                    title="Get Started"
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    placeholder={"Email Address"}
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Password"}
                />
                <DataButton
                    text="Signup"
                    onpress={this.signup.bind(this)}
                    button_text_styles={styles.primary_button_text}
                />
                <DataButton
                    text="Got an Account?"
                    onpress={this.goToLogin.bind(this)}
                    button_text_styles={styles.transparent_button_text}
                />

            </View>
        );
    }

    // getRef() {
    //     return firebaseApp.database().ref();
    // }

    signup() {

        this.setState({
            loaded: false
        });

        firebaseApp.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            alert(errorMessage);
        });

        // firebaseApp.createUser({
        //     'email': this.state.email,
        //     'password': this.state.password
        // }, (error, userData) => {
        //
        //     if (error) {
        //         switch (error.code) {
        //
        //             case "EMAIL_TAKEN":
        //                 alert("The new user account cannot be created because the email is already in use.");
        //                 break;
        //
        //             case "INVALID_EMAIL":
        //                 alert("The specified email is not a valid email.");
        //                 break;
        //
        //             default:
        //                 alert("Error creating user:");
        //         }
        //
        //     } else {
        //         alert('Your account was created!');
        //     }
        //
        //     this.setState({
        //         email: '',
        //         password: '',
        //         loaded: true
        //     });
        //
        // });
    }

}


export const SimpleApp = StackNavigator({
    Login: { screen: SignupScreen },
    Main: { screen: MainScreen },
});

module.exports = SimpleApp;



