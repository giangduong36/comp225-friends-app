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
    AlertIOS,
    Alert,
    Button,
    TextInput,
    Switch,
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

let currentID = null;

class AccountScreen extends Component {
    static navigationOptions = {
        title: 'Manage your profile',
    };
    constructor(props) {

        super(props);
        this.state = {
            loaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('users');
        this._displayInfo();
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    // listenForItems(itemsRef) {
    //     itemsRef.on('value', (snap) => {
    //
    //         // get children as an array
    //         var items = [];
    //         snap.forEach((child) => {
    //             items.push({
    //                 username: child.val().name,
    //                 friend: child.val().friend,
    //                 status: child.val().status,
    //                 _key: child.key
    //             });
    //             currentID = child.key;
    //         });
    //
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(items)
    //         });
    //
    //     });
    // }
    //
    // componentDidMount() {
    //     this.listenForItems(this.itemsRef);
    // }


    render() {
        return (
            <View style={styles.container}>
                <Text text="Manage your account"/>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._exit.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>

                <ActionButton
                    title="Update Info"
                    onPress={this._updateName.bind(this)}
                />
                <ActionButton
                    title="Add Friend"
                    onPress={this._addFriend.bind(this)}
                />
                <ActionButton
                    title="Change Status"
                    onPress={this._updateStatus.bind(this)}
                />
                <ActionButton
                    title="Logout"
                    onPress={this._logout.bind(this)}
                />
            </View>
        );
    }

    _displayInfo() {
        let user = firebaseApp.auth().currentUser;
        if (user != null) {
            let uid = user.uid;
            user.providerData.forEach(function (profile) {
                let path = firebaseApp.database().ref('/users/' + uid + '/profile/');
                path.update({"Username": profile.displayName});
                path.update({"Email": profile.email});
                path.update({"Photo": profile.photoURL});
            });

        }

    }

    _exit(item) {
        const onPress = () => {
            Alert.alert(
                'Delete',
                null,
                [
                    {text: 'Delete', onPress: (text) => this.itemsRef.child(item._key).remove()},
                    {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
                ]
            );
        };

        return (
            <ListItem item={item} onPress={onPress}/>
        );
    }

    _addFriend() {
        let user = firebaseApp.auth().currentUser;
        if (user != null) {
            Alert.prompt(
                'Add friend',
                null,
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'Add friend',
                        onPress: (text) => {
                            user.updateProfile({
                                displayName: text,
                            }).then(function () {
                                // Update successful.
                                alert("Successfully add a friend!");
                                uid = user.uid;
                                firebaseApp.database().ref('/users/' + uid + '/friends/').push({"name": text});
                            }).catch(function (error) {
                                // An error happened.
                                alert(error.message);
                            });
                        }
                    },
                ],
                'plain-text'
            );
        }
    }

    _updateStatus() {
        let user = firebaseApp.auth().currentUser;
        if (user != null) {
            Alert.prompt(
                'Change status',
                null,
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'Change status',
                        onPress: (text) => {
                            user.updateProfile({
                                displayName: text,
                            }).then(function () {
                                // Update successful.
                                alert("Successfully update status!");
                                uid = user.uid;
                                firebaseApp.database().ref('/users/' + uid).update({"status": text});
                            }).catch(function (error) {
                                // An error happened.
                                alert(error.message);
                            });
                        }
                    },
                ],
                'plain-text'
            );
        }

    }


    _updateName() {
        let user = firebaseApp.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;
        if (user != null) {

            Alert.prompt(
                'Change username',
                null,
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {
                        text: 'Change username',
                        onPress: (text) => {
                            user.updateProfile({
                                displayName: text,
                            }).then(function () {
                                // Update successful.
                                alert("Successfully update username!");
                                uid = user.uid;
                                firebaseApp.database().ref('/users/' + uid + '/profile/').update({"Username": text});

                            }).catch(function (error) {
                                // An error happened.
                                alert(error.message);
                            });
                            // firebaseApp.database().ref('/users/'+uid).push({
                            //     username: user.displayName,
                            //     friend: 'abc',
                            //     status: 'pqr'
                            // });
                        }
                    },
                ],
                'plain-text'
            );
        }
    }

    _logout() {
        const {navigate} = this.props.navigation;

        firebaseApp.auth().signOut().then(function () {
            // Sign-out successful.
            Alert.alert(
                'Successfully signed out!',
                null,
                [
                    {text: 'Go to Log in', onPress: () => navigate('Login')},
                ]
            );
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorMessage);
        });

    }

}


module.exports = AccountScreen;