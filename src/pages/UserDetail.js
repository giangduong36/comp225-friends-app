import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';


const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    Button,
    TextInput,
    TouchableOpacity,
    StatusBar,
} = ReactNative;

const {Linking, Platform} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class UserDetailScreen extends Component {
    static navigationOptions = {
        title: "User Detail",
		headerStyle: {
			backgroundColor: styles.constants.headerColor
		},
        headerTitleStyle: {
            alignSelf: 'center',
			color: styles.constants.headerText
        },
        headerTintColor: styles.constants.headerButtons
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            availability: '',
            status: ''
        }
    }

    loadData() {
        let friend_uid = this.props.navigation.state.params.chosenFriend;
        let that = this;
        firebaseApp.database().ref('Names/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({name: snapshot.val()})
        });
        firebaseApp.database().ref('PhoneNumbers/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({phone: snapshot.val()})
        });
    }

    componentDidMount() {
        this.loadData();
        // let friend = this.props.navigation.state.params.chosenFriend;
        // let uid = firebaseApp.auth().currentUser.uid;
        // this.getMatch(uid,friend.key); // Is it better to call this here?
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        uid = firebaseApp.auth().currentUser.uid;
        return (
            <View style={styles.body}>
                {/*<Header text="Friends List" loaded={this.state.loaded} />*/}
                <Text style={styles.loginTitle}>loginTitle to the user detail screen</Text>
                <Text style={styles.text}> Name: {this.state.name}</Text>
                <Text style={styles.text}> Status </Text>
                <Text style={styles.text}> Phone: {this.state.phone} </Text>
                <Text style={styles.text}> About </Text>
                <Text style={styles.text}> Interest </Text>

                <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText} title="Match!" onPress={this.matchRequest.bind(this)}/>

                <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText} title="Unfriend" onPress={this.unfriend.bind(this)}/>

                {/*TO DELETE: For debug purpose only, will toggle match button to be unmatch later*/}
                <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText} title="Unmatch!" onPress={this.delRequest.bind(this)}/>


                {/*<TouchableOpacity onPress={() => {this.someFunction()}}>*/}
                {/*<View style={styles.holder}>*/}
                {/*<Text style={styles.text}>Test</Text>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}

            </View>
        );
    }

    // TO DELETE LATER
    // Delete a match request
    delRequest() {
        let friend_id = this.props.navigation.state.params.chosenFriend.key;
        let uid = firebaseApp.auth().currentUser.uid;
        Alert.alert(
            'Unmatch with this person?',
            null,
            [
                {
                    text: 'Unmatch',
                    onPress: (text) => {
                        firebaseApp.database().ref('PendingMatches/' + uid).child(friend_id).remove();
                        firebaseApp.database().ref('Matches/' + uid).child(friend_id).remove();
                        firebaseApp.database().ref('Matches/' + friend_id).child(uid).remove()
                    }
                },

                {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
        );


    }

    matchRequest() {
        Alert.alert(
            'Match with this person?',
            null,
            [
                {
                    text: 'Match',
                    onPress: (text) => this.addMatchRequest()
                },

                {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
        );

    }

    addMatchRequest() {
        console.log("Match");
        let friend = this.props.navigation.state.params.chosenFriend;
        let uid = firebaseApp.auth().currentUser.uid;
        let userMatches = firebaseApp.database().ref("PendingMatches/" + uid);
        let friendMatches = firebaseApp.database().ref("PendingMatches/" + friend.key);

        userMatches.child(friend.key).once('value', function (snapshot) {
            let matched = (snapshot.val() !== null); // Check if already sent a match request to this user
            if (matched) {
                Alert.alert(
                    "You already sent a match request to this person!",
                    "",
                    [
                        {
                            text: "Okay!",
                            onPress: () => () => console.log("Fail to match: Already sent request!")
                        }
                    ]
                );
            } else {
                userMatches.update({[friend.key]: ""});
                // friendMatches.update({[uid]: ""});
                Alert.alert(
                    "Congrats",
                    "You successfully sent a match request to this person!",
                    [
                        {text: "Cool!", onPress: () => console.log("Successfully sent a match request")}
                    ]
                );
            }
        });
        this.getMatch(uid, friend.key);
    }

    getMatch(uid, friend_id) {
        console.log("check match");
        let userPendingMatches = firebaseApp.database().ref("PendingMatches/" + uid);
        let friendPendingMatches = firebaseApp.database().ref("PendingMatches/" + friend_id);

        let userMatches = firebaseApp.database().ref("Matches/" + uid);
        let friendMatches = firebaseApp.database().ref("Matches/" + friend_id);

        userPendingMatches.child(friend_id).once('value', function (snapshot) {
            let matched = (snapshot.val() !== null); // Check if already sent a match request to this user
            if (matched) {
                friendPendingMatches.child(uid).once('value', function (snapshot2) {
                    let matched2 = (snapshot2.val() !== null); // Check if already sent a match request to this user
                    if (matched2) {
                        console.log("Both want to match!");
                        userPendingMatches.child(friend_id).remove();
                        friendPendingMatches.child(uid).remove();
                        userMatches.update({[friend_id]: ""});
                        friendMatches.update({[uid]: ""});
                    }
                });
            }
        });
    }

    unfriend() {
        let friend_id = this.props.navigation.state.params.chosenFriend.key;
        Alert.alert(
            'Unfriend this person?',
            null,
            [
                {
                    text: 'Unfriend',
                    onPress: (text) => {
                        firebaseApp.database().ref('FriendLists/' + uid).child(friend_id).remove();
                        firebaseApp.database().ref('FriendLists/' + friend_id).child(uid).remove()
                    }
                },
                {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
        );
    }

}



module.exports = UserDetailScreen;