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
        title: "Friend's Profile",
        headerStyle: {
            backgroundColor: styles.constants.headerColor
        },
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf: (Platform.OS === "android") ? "center" : null,
            marginRight: (Platform.OS === "android") ? 72 : null,
        },
        headerTintColor: styles.constants.headerButtons
    };

    constructor(props) {
        super(props);
        uid = firebaseApp.auth().currentUser.uid;
        friend_uid = this.props.navigation.state.params.chosenFriend;
        this.state = {
            name: '',
            phone: '',
            availability: '',
            about: '',
            matchStatus: false,
            isFriend: null,
        }
    }

    loadData() {
        // let friend_uid = this.props.navigation.state.params.chosenFriend;
        let that = this;
        firebaseApp.database().ref('Names/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({name: snapshot.val()})
        });
        firebaseApp.database().ref('PhoneNumbers/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({phone: snapshot.val()})
        });
        firebaseApp.database().ref('Abouts/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({about: snapshot.val()})
        });

        // Check if the user and this friend have some match
        let userMatches = firebaseApp.database().ref("PendingMatches/" + uid);
        userMatches.child(friend_uid.key).on('value', function (snapshot) {
            let matched = (snapshot.val() !== null); // Check if already sent a match request to this user
            let userPendingMatches = firebaseApp.database().ref("Matches/" + uid);
            userPendingMatches.child(friend_uid.key).on('value', function (snapshot) {
                matched = matched || (snapshot.val() !== null); // Check if already sent a match request to this user
            });
            that.setState({matchStatus: matched});
        });

        // Check if the user and this friend are friends (for toggling Unfriend button - Enhancement)
        firebaseApp.database().ref("FriendLists/" + uid).child(friend_uid.key).on("value", function (snapshot) {
            if (snapshot.val() !== null) {
                that.setState({isFriend: true});
            } else {
                that.setState({isFriend: false});
            }
        });
        // let userPendingMatches = firebaseApp.database().ref("Matches/" + uid);
        // userPendingMatches.child(friend_uid.key).on('value', function (snapshot) {
        //     matched = (snapshot.val() !== null); // Check if already sent a match request to this user
        // });
    }

    componentDidMount() {
        this.loadData();
        // this.getMatch(uid,friend.key); // Is it better to call this here?
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        // uid = firebaseApp.auth().currentUser.uid;
        console.log("isFriend", this.state.isFriend);
        return (
            <View style={styles.userDetailContainer}>
                <Text style={styles.userDetailName}>{this.state.name}</Text>
                <Text style={styles.userDetailPhone}>{this.state.phone}</Text>
                <Text style={styles.userDetailAbout}>{this.state.about}</Text>
                <View style={styles.userDetailButtons}>
                    <ActionButton buttonStyle={styles.primaryButton}
                                  buttonTextStyle={styles.primaryButtonText}
                                  title={this.matchButton()[0]}
                                  onPress={this.matchButton()[1]}/>
                    {/*onPress={this.matchRequest.bind(this)}/>*/}

                    <ActionButton buttonStyle={styles.secondaryButton}
                                  buttonTextStyle={styles.secondaryButtonText}
                                  title="Unfriend" onPress={this.unfriend.bind(this)}/>

                </View>
            </View>
        );
    }

    matchButton() {
        let title = this.state.matchStatus ? "Unmatch" : "Match";
        let func = this.state.matchStatus ? this.delRequest.bind(this) : this.matchRequest.bind(this);
        return [title, func];
    }


    delRequest() {
        Alert.alert(
            'Unmatch with this person?',
            null,
            [
                {
                    text: 'Unmatch',
                    onPress: (text) => {
                        this.setState({matchStatus: false});
                        firebaseApp.database().ref('PendingMatches/' + uid).child(friend_uid.key).remove();
                        firebaseApp.database().ref('Matches/' + uid).child(friend_uid.key).remove();
                        firebaseApp.database().ref('Matches/' + friend_uid.key).child(uid).remove()
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
        let userMatches = firebaseApp.database().ref("PendingMatches/" + uid);
        let friendMatches = firebaseApp.database().ref("PendingMatches/" + friend_uid.key);
        let that = this;
        userMatches.child(friend_uid.key).once('value', function (snapshot) {
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
                userMatches.update({[friend_uid.key]: ""});
                that.setState({matchStatus: true});
            }
        });
        this.getMatch(uid, friend_uid.key);
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
        Alert.alert(
            'Unfriend this person?',
            null,
            [
                {
                    text: 'Unfriend',
                    onPress: (text) => {
                        firebaseApp.database().ref('FriendLists/' + uid).child(friend_uid.key).remove();
                        firebaseApp.database().ref('FriendLists/' + friend_uid.key).child(uid).remove();
                        this.emptyMatches();
                        this.props.navigation.navigate('Friendslist');
                    }
                },
                {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
        );
    }

    /*When the user is not available, delete all matches and pending match requests*/
    emptyMatches() {
        firebaseApp.database().ref('Matches').once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (grandChildSnapshot) {
                    if (childSnapshot.key = friend_uid.key && grandChildSnapshot.key === uid) {
                        firebaseApp.database().ref('Matches/' + childSnapshot.key).child(grandChildSnapshot.key).remove();
                    }
                    if (childSnapshot.key = uid && grandChildSnapshot.key === friend_uid.key) {
                        firebaseApp.database().ref('Matches/' + childSnapshot.key).child(grandChildSnapshot.key).remove();
                    }
                });
            });
        });
        firebaseApp.database().ref("PendingMatches/" + uid).child(friend_uid.key).remove();
    }
}


module.exports = UserDetailScreen;