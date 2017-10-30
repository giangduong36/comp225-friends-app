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
            text: 'Search friend by name, email or phone number',
            friends: [],
            selected: null,
            friendItems: null,
        };
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>welcome to the add friend screen</Text>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.searchUserByName({text})}
                    placeholder={this.state.text}
                />
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