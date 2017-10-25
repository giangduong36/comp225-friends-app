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
    TextInput
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

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                {/*<Header text="add friend" loaded={this.state.loaded} />*/}

                <Text style={styles.welcome}>welcome to the add friend screen</Text>
            </View>
        );
    }

}


module.exports = AddFriendScreen;