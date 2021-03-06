//addfriend
import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import DismissKeyboardHOC from "../components/DismissKeyboardHOC.js";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    AlertIOS,
    Button,
    TextInput,
    Picker,
    Platform,
    StatusBar,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DView = DismissKeyboardHOC(View);
const KeyboardScroller = DismissKeyboardHOC(KeyboardAwareScrollView);

class AddFriendScreen extends Component {
    static navigationOptions = {
        title: 'Add friend',
        headerStyle: {
            backgroundColor: styles.constants.headerColor,
        },
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf : (Platform.OS === "android") ? "center" : null,
            marginRight: (Platform.OS === "android") ? 72 : null,
        },
        headerTintColor: styles.constants.headerButtons
    
    };


    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <KeyboardScroller resetScrollToCoords={{x:0,y:0}} contentContainerStyle={{height:"100%"}} scrollEnabled={false}>
                <DView style={styles.addFriendContainer}>
                    <Text style={styles.addFriendTitle}>Enter a phone number to add that person as a friend</Text>

                    <TextInput
                        style={styles.addFriendInput}
                        onChangeText={(text) => this.state.text=text}
                        placeholder="Phone Number"
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />

                    <ActionButton buttonStyle={styles.primaryButton} 
                    buttonTextStyle={styles.primaryButtonText} 
                    title="ADD FRIEND" 
                    onPress={this.addFriend.bind(this)}
                    />
                </DView>
            </KeyboardScroller>
        );
    }

    addFriend() {
        const {navigate} = this.props.navigation;
        let friendPhone = this.state.text;
        let friendID = null;
        console.log(friendPhone);
        firebaseApp.database().ref("UserIDs/" + friendPhone).on("value", function (data) {
            friendID = data.val();
            console.log(friendID);

            if (friendID !== null) {
                // firebaseApp.database().ref("FriendLists/" + firebaseApp.auth().currentUser.uid ).push(friendID);
                // firebaseApp.database().ref("FriendLists/" + friendID).push(firebaseApp.auth().currentUser.uid);

                // Add a new friend such that the userID is the key, value is empty for now.
                let usersRef = firebaseApp.database().ref("FriendLists/" + firebaseApp.auth().currentUser.uid);
                usersRef.child(friendID).once('value', function (snapshot) {
                    let exists = (snapshot.val() !== null); // Check if already friend with this user
                    if (exists) {
                        Alert.alert(
                            "You are already friends!",
                            "",
                            [
                                {
                                    text: "Okay!",
                                    onPress: () => () => console.log("Fail to add a friend: Already friends!")
                                }
                            ]
                        );
                    } else if (friendID === firebaseApp.auth().currentUser.uid) {
                        Alert.alert(
                            "Sorry you cannot add yourself!",
                            "",
                            [
                                {
                                    text: "Okay!",
                                    onPress: () => () => console.log("Fail to add a friend: Add self!")
                                }
                            ]
                        );
                    } else {
                        firebaseApp.database().ref("FriendLists/" + firebaseApp.auth().currentUser.uid).update({[friendID]: ""});
                        firebaseApp.database().ref("FriendLists/" + friendID).update({[firebaseApp.auth().currentUser.uid]: ""});
                        Alert.alert(
                            "Congrats",
                            "You successfully added a friend!",
                            [
                                // Don't navigate to a new AddFriend page, it creates a history of all AddFriend pages.
                                {text: "Okay!", onPress: () => console.log("Successfully added a new friend")}
                            ]
                        );
                    }
                });
            }
            else {
                Alert.alert(
                    "Error",
                    "That user does not exist",
                    [
                        {text: 'Okay!', onPress: console.log("Fail to add a friend: That user does not exist")}
                    ]
                );
            }
        });
    }

    //     if (friendID != null) {
    //         firebaseApp.database().ref("FriendLists/" + firebaseApp.auth().currentUser.uid ).push(friendID);
    //         //firebaseApp.database().ref("FriendLists/" + friendID).push(firebaseApp.auth().currentUser.uid);
    //         Alert.alert(
    //             "Congrats",
    //             "You successfully added a friend!",
    //             {text: "Okay!"}
    //         );
    //     }
    //     else {
    //         Alert.alert(
    //             "Error",
    //             "That user does not exist",
    //             {text: 'Okay!', onPress: () => navigate("Home")}
    //         );
    //     }
    // }


    searchUserByName(text) {
        let that = this;
        while (this.state.friends.length > 0) {
            this.state.friends.pop();
        }
        firebaseApp.database().ref('randomUsers').orderByChild("name").on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                that.state.friends.push(childData["name"]);
            });

        });
        console.log(this.state.friends);
        this.setState({
            friendItems: this.state.friends.map((s, i) => {
                return <Picker.Item key={i} value={s} label={s}/>
            })
        });
    }

    _addData() {
        // Create name data for current 9 users
        console.log("Create fake data");
        const name = ['Monica', 'Rachel', 'Joey', 'Chandler', 'Ross', 'Phoebe', 'u1', 'u2', 'u3'],
            friend = ['', 'b', 'c', 'd', 'e'];
        let i = 0;
        firebaseApp.database().ref('Names').once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childKey = childSnapshot.key;
                console.log(childKey);
                console.log(name[i]);
                let childData = childSnapshot.val();
                firebaseApp.database().ref("Names/" + childKey).update(name[i]);
                i++;
            });

        });

    }



}


module.exports = AddFriendScreen;