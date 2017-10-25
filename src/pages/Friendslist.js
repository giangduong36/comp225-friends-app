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
    TextInput
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class FriendslistScreen extends Component {
	static navigationOptions = {
        title: 'Friends',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>welcome to the friends list screen</Text>
				<ActionButton
                    title="Click a friend to see their profile's details"
                    onPress={() => navigate('UserDetail')
					}
                />
				<ActionButton
                    title="Add friend"
                    onPress={() => navigate('AddFriend')
					}
                />
            </View>
        );
    }

}


module.exports = FriendslistScreen;
