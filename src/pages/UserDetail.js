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


class UserDetailScreen extends Component {
    static navigationOptions = {
        title: 'User Detail',
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
        return (
            <View style={styles.container}>

                {/*<Header text="Friends List" loaded={this.state.loaded} />*/}

                <Text style={styles.welcome}>welcome to the user detail screen</Text>
            </View>
        );
    }

}


module.exports = UserDetailScreen;