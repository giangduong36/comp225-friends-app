//addfriend
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
    AlertIOS,
    Button,
    TextInput,
    Picker,
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class AddFriendScreen extends Component {
    static navigationOptions = {
        title: 'Add friend',
    };


    constructor(props) {
        super(props);
        this.state = {
            text: 'Enter phone number of a friend to add them',
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>welcome to the add friend screen</Text>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor:"white", justifyContent:"center"}}
                    onChangeText={(text) => this.state.text=text}
                    placeholder={this.state.text}
                />

                <ActionButton title="ADD FRIEND" onPress={this.addFriend.bind(this)}/>
                
                <Picker
                    selectedValue={this.state.selected}
                    onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}>
                    {/*<Picker.Item label="Java" value="java" />*/}
                    {/*<Picker.Item label="JavaScript" value="js" />*/}
                    {this.state.friendItems}
                </Picker>
            </View>

        );
    }

    addFriend() {
        const {navigate} = this.props.navigation;
        let friendPhone = this.state.text;
        let friendID = null;
        console.log(friendPhone);
        firebaseApp.database().ref("UserIDs/" + friendPhone).once("value", function(data) {
            friendID = data.val();
            console.log("The reference worked");
            console.log(friendID);

            if (friendID != null) {
                firebaseApp.database().ref("FriendLists/" + firebaseApp.auth().currentUser.uid ).push(friendID);
                firebaseApp.database().ref("FriendLists/" + friendID).push(firebaseApp.auth().currentUser.uid);
                Alert.alert(
                    "Congrats",
                    "You successfully added a friend!",
                    [
                    {text: "Okay!", onPress: () => navigate("AddFriend")}
                    ]
                );
            }
            else {
                Alert.alert(
                    "Error",
                    "That user does not exist",
                    [
                    {text: 'Okay!', onPress: () => navigate("Home")}
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

}


module.exports = AddFriendScreen;