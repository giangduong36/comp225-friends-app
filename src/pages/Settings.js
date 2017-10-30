import React, {Component} from 'react';
import ReactNative from 'react-native';
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
    TextInput
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                {/*<Header text="Settings" loaded={this.state.loaded} />*/}

                <Text style={styles.welcome}>welcome to the Settings screen</Text>
                <ActionButton
                    title="Sign Out"
                    onPress={this._logout.bind(this)
                    }
                />
            </View>
        );
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


module.exports = SettingsScreen;