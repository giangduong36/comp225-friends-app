import React, {Component} from 'react';
import ReactNative from 'react-native';
import DismissKeyboardHOC from '../components/DismissKeyboardHOC.js'

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    AlertIOS,
    TextInput,
    Platform,
    StatusBar,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DismissKeyboardView = DismissKeyboardHOC(View);

class SignupScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
        headerStyle: {
            backgroundColor: styles.constants.headerColor,
        },
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf : (Platform.OS === "android") ? "center" : null,
            marginRight: (Platform.OS === "android") ? 72 : null,
        },
        headerTintColor: styles.constants.headerButtons
    };

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            email: '',
            password: '',
            phoneNumber: "",
            phoneNumRef: null
        };
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <DismissKeyboardView style={styles.container}>
                <Text style={styles.welcome}>Let's create an account!</Text>
                <ActionButton
                    onPress={this._testLogin.bind(this)} //now goes to Availability rather than Main //milo!!!!!!!!!!!
                    title="TEST BYPASS"
                />
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
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({phoneNumber: text})}
                    value={this.state.phoneNumber}
                    placeholder={"Phone Number"}
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                />
                <ActionButton
                    title="Sign Up"
                    onPress={this._signup.bind(this)}
                />
                <ActionButton
                    title="Log In"
                    onPress={() => navigate('Login')
                    }
                />

            </DismissKeyboardView>
        );
    }

    _testLogin() {
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

    _signup() {
        const {navigate} = this.props.navigation;

        this.setState({
            loaded: false
        });

        let that = this;

        firebaseApp.database().ref("UserIDs/" + that.state.phoneNumber).once(
            "value", function(snapshot) {
                that.setState({phoneNumRef : snapshot.val() , loaded: true})
          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }).then(() => {
            if (that.state.loaded) {
                if (that.state.phoneNumRef != null) {
                    Alert.alert("Phone Number Already Registered",
                    "Sorry, but that phone number appears to already be in our database. Please double check you entered the correct number.",
                [
                    "Okay"
                ]);
                } else {

                    firebaseApp.auth().createUserWithEmailAndPassword(
                        that.state.email,
                        that.state.password
                    ).then(function (user) {

                        //Initializes user data in the database
                        uid = firebaseApp.auth().currentUser.uid;

                        firebaseApp.database().ref("Users").update({[uid] : that.state.email});
                        firebaseApp.database().ref("UserIDs").update( {[that.state.phoneNumber] : uid})
                        firebaseApp.database().ref("PhoneNumbers").update({[uid] : that.state.phoneNumber});
                        firebaseApp.database().ref("Names").update({[uid] : "NO NAME DATA"});
                        firebaseApp.database().ref("Statuses").update({[uid] : "Write your status here. How's it going, what do you want to do?"});
                        firebaseApp.database().ref("Availabilities").update({[uid] : false}); //User is not available by default.
                        firebaseApp.database().ref("ProfileImages").update({[uid] : null});
						firebaseApp.database().ref("Abouts").update({[uid] : "this is my about"});
						firebaseApp.database().ref("Interests").update({[uid] : "these are my interests"});
                        
                        Alert.alert(
                            'Successfully created new user account!',
                            null,
                            [
                                {text: 'Okay!', onPress: () => navigate("Me")}
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
        })
    }
}

module.exports = SignupScreen;
