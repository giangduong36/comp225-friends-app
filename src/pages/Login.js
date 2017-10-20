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
    TextInput
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
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

                {/*<Header text="Login" loaded={this.state.loaded} />*/}
                <Text style={styles.welcome}>Hello, F.R.I.E.N.D.S!</Text>

                <View style={styles.body}>
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
                        title="Login"
                        onPress={this._login.bind(this)}
                    />

                    <ActionButton
                        onPress={() => navigate('Signup')}
                        title="New here?"
                    />
                </View>
            </View>
        );
    }


    _login() {
        const {navigate} = this.props.navigation;

        this.setState({
            loaded: false
        });

        firebaseApp.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(function (user) {
            Alert.alert(
                'Successfully logged in!',
                null,
                [
                    {text: 'Go to Account', onPress: () => navigate('Account')},
                    {text: 'Sign out', onPress: (text) => console.log('Cancelled')}
                ]
            );
        }).catch(function (error) {
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


module.exports = LoginScreen;
