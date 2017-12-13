import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import DismissKeyboardHOC from "../components/DismissKeyboardHOC.js";

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
    TextInput,
    Platform,
    StatusBar,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DismissKeyboardView = DismissKeyboardHOC(View);


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
        firebase.auth().onAuthStateChanged((user) => {
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
            <View style={styles.loadingScreen}></View>
        )

        return (
            <DismissKeyboardView style={styles.container}>

                {/*<Header text="Login" loaded={this.state.loaded} />*/}
                <Text style={styles.welcome}>Hello, F.R.I.E.N.D.S!</Text>

                <DismissKeyboardView style={styles.body}>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        placeholder={"Email Address"}
                        underlineColorAndroid="transparent"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={"Password"}
                        underlineColorAndroid="transparent"
                    />

                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        title="Login"
                        onPress={this._login.bind(this)}
                    />

                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        onPress={() => navigate('Signup')}
                        title="New here?"
                    />

                    {/*TO DELETE LATER: Button to access Account page without log in*/}
                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        onPress={this._testBypass.bind(this)}
                        title="TEST BYPASS"
                    />

                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        onPress={this._testFriend.bind(this)}
                        title="TEST AS FRIEND"
                    />

                </DismissKeyboardView>
            </DismissKeyboardView>
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
            navigate('Me');

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
            navigate('Me');
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
            navigate('Me'); //milo!!!!!!!!!!!!!
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
