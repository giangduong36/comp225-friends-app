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
    TextInput
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class UserDetailScreen extends Component {
    static navigationOptions = {
        title: 'User Detail',
		headerStyle: {
			backgroundColor: 'black'
		},
        headerTitleStyle: {
            alignSelf: 'center',
			color: 'white'
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loaded: true
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        uid = firebaseApp.auth().currentUser.uid;
        return (
            <View style={styles.container}>

                {/*<Header text="Friends List" loaded={this.state.loaded} />*/}
                <Text style={styles.welcome}>welcome to the user detail screen</Text>
                <Text style={styles.actionText}> Status </Text>
                <Text style={styles.actionText}> Phone </Text>
                <Text style={styles.actionText}> About </Text>
                <Text style={styles.actionText}> Interest </Text>

                <ActionButton title="Unfriend" onPress={this._unfriend.bind(this)}/>
            </View>
        );
    }

    _unfriend() {
        let chosenFriend = this.props.navigation.state.params.chosenFriend;
        Alert.alert(
            'Unfriend this person?',
            null,
            [
                {
                    text: 'Unfriend',
                    //Not work because item is defined in FriendList
                    onPress: (text) => firebaseApp.database().ref('FriendLists/' + uid).child(chosenFriend.key).remove()
                },
                {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
        )
    }

}



module.exports = UserDetailScreen;