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
            backgroundColor: "black",
        },
        headerTitleStyle: {
            color: "white",
            alignSelf : (Platform.OS === "android") ? "center" : null,
            // marginRight: (Platform.OS === "android") ? 72 : null,
            
        },
        headerTintColor: "white"
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
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
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
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        secureTextEntry={true}
                        placeholder={"Password"}
                        underlineColorAndroid="transparent"
                    />

                    <ActionButton
                        title="Login"
                        onPress={this._login.bind(this)}
                    />

                    <ActionButton
                        onPress={() => navigate('Signup')}
                        title="New here?"
                    />

                    {/*TO DELETE LATER: Button to access Account page without log in*/}
                    <ActionButton
                        onPress={this._testBypass.bind(this)}
                        title="TEST BYPASS"
                    />

                    <ActionButton
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


    /* TO DELETE LATER: Function to create fake users in Firebase */
    // createFakeData() {
    //     console.log("Create fake data");
    //     const name = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
    //         friend = ['', 'b', 'c', 'd', 'e'];
    //
    //     // var res = arr1.map(function(v, i) {
    //     //     return {
    //     //         index: v,
    //     //         value: arr2[i]
    //     //     };
    //     // })
    //     for (let i = 0; i < name.length; i++) {
    //         let uid = Math.floor(Math.random() * 100000);
    //         firebaseApp.database().ref('/randomUsers/' + uid).set({
    //             "status": Math.random() < 0.5 ? "free" : "busy",
    //             "name": name[i],
    //             "email": name[i] + "@gmail.com",
    //             "phone": Math.floor(Math.random() * 100),
    //         });
    //         for (let j = 0; j < name.length; j++) {
    //             if (i !== j) {
    //                 firebaseApp.database().ref('/randomUsers/' + uid + '/friends/').push({"name": name[i]});
    //             }
    //         }
    //     }
    // }
}


module.exports = LoginScreen;
