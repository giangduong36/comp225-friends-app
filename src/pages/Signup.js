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
    TextInput
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
            email: '',
            password: ''
        };
    }

    goToLogin() {
        this.props.navigator.push({
            component: Main
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hello, F.R.I.E.N.D.S!</Text>
                <ActionButton
                    onPress={() => navigate('Availability')} //now goes to Availability rather than Main
                    title="Get Started"
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    placeholder={"Email Address"}
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Password"}
                />
                <ActionButton
                    title="Signup"
                    onPress={this._signup.bind(this)}
                />
                <ActionButton
                    title="Got an Account?"
                    onPress={this.goToLogin.bind(this)}
                />

            </View>
        );
    }


    _signup() {

        this.setState({
            loaded: false
        });

        firebaseApp.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // if (errorCode == 'auth/weak-password') {
            //     alert('The password is too weak.');
            // } else {
            //     alert(errorMessage);
            // }
            alert(errorMessage);
        });
    }
}

module.exports = SignupScreen;
