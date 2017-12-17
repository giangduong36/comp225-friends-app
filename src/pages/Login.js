import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import DismissKeyboardHOC from "../components/DismissKeyboardHOC.js";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableHighlight,
    AlertIOS,
    Alert,
    Button,
    TextInput,
    Platform,
    StatusBar,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DView = DismissKeyboardHOC(View);
const KeyboardScroller = DismissKeyboardHOC(KeyboardAwareScrollView);


class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: styles.constants.headerColor,
        },
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf : (Platform.OS === "android") ? "center" : null,
            // marginRight: (Platform.OS === "android") ? 72 : null,
            
        },
        headerTintColor: styles.constants.headerButtons
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: true,
            authenticated: false,
        }
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loading: false, authenticated: true });
            this.props.navigation.navigate("Tabs");
          } else {
            this.setState({ loading: false, authenticated: false });
          }
        });
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;

        if (this.state.loading) return null;
        if (this.state.authenticated) return (
            <DView style={styles.loadingScreen}></DView>
        )

        return (
        <KeyboardScroller resetScrollToCoords={{x:0,y:0}} contentContainerStyle={{height:"100%"}} scrollEnabled={false}>
            <DView style={styles.loginContainer}>

                {/*<Header text="Login" loaded={this.state.loaded} />*/}
                <Text style={styles.loginTitle}>Welcome to MATCHBOOK</Text>

                <DView style={styles.loginTextInputContainer}>
                    <TextInput
                        style={styles.loginTextInput}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        placeholder={"Email Address"}
                        underlineColorAndroid="transparent"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.loginTextInput}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={"Password"}
                        underlineColorAndroid="transparent"
                    />
                </DView>
                <DView style={[styles.loginButtons,]}>

                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        title="Log In"
                        onPress={this._login.bind(this)}
                    />

                    <ActionButton buttonStyle={styles.secondaryButton} buttonTextStyle={styles.secondaryButtonText}
                        onPress={() => navigate('Signup')}
                        title="Go to Sign Up"
                    />

                    {/*TO DELETE LATER: Button to access Account page without log in*/}
                    {/* <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        onPress={this._testBypass.bind(this)}
                        title="TEST BYPASS"
                    />

                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        onPress={this._testFriend.bind(this)}
                        title="TEST AS FRIEND"
                    /> */}

                </DView>
            </DView>
            </KeyboardScroller>
        );
    }

    _testBypass() {
        const {navigate} = this.props.navigation;

        this.setState({
            loaded: false
        });

        firebaseApp.auth().signInWithEmailAndPassword(
            "TEST@TEST.com",
            "123456"
        ).then(function (user) {
            // navigate("Tabs");
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorMessage);
        });
    }

    _testFriend() {
        const {navigate} = this.props.navigation;

        this.setState({
            loaded: false
        });

        firebaseApp.auth().signInWithEmailAndPassword(
            "friendTest@fb.com",
            "123321"
        ).then(function (user) {
            // navigate("Tabs");
        }).catch(function (error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorMessage);
        });
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
            // navigate("Tabs"); //milo!!!!!!!!!!!!!
            // Alert.alert(
            //     'Successfully logged in!',
            //     null,
            //     [
            //         {text: 'Go to Account', onPress: () => navigate('Account')},
            //         {text: 'Sign out', onPress: (text) => console.log('Cancelled')}
            //     ]
            // );
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
