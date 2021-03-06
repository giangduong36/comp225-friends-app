import React, {Component} from 'react';
import ReactNative from 'react-native';
import DismissKeyboardHOC from '../components/DismissKeyboardHOC.js'
import {NavigationActions} from "react-navigation";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
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
const DView = DismissKeyboardHOC(View);
const KeyboardScroller = DismissKeyboardHOC(KeyboardAwareScrollView);

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
            phoneNumRef: null,
            name: ""
        };
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <KeyboardScroller resetScrollToCoords={{x:0,y:0}} contentContainerStyle={{height:"100%"}} scrollEnabled={false}>
                <DView style={styles.signupContainer}>
                    <Text style={styles.signupTitle}>Create a MATCHBOOK account</Text>
                    <DView style={styles.signupTextInputContainer}>
                        <TextInput
                            style={styles.signupTextInput}
                            onChangeText={(text) => this.setState({phoneNumber: text})}
                            value={this.state.phoneNumber}
                            placeholder={"Phone Number"}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.signupTextInput}
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name}
                            placeholder={"Name"}
                            underlineColorAndroid="transparent"
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.signupTextInput}
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                            placeholder={"Email Address"}
                            underlineColorAndroid="transparent"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.signupTextInput}
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            secureTextEntry={true}
                            placeholder={"Password"}
                            underlineColorAndroid="transparent"
                        />
                    </DView>
                    <DView style = {styles.signupButtons}>
                        <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                            title="Sign Up"
                            onPress={this._signup.bind(this)}
                        />
                        <ActionButton buttonStyle={styles.secondaryButton} buttonTextStyle={styles.secondaryButtonText}
                            title="Go to Log In"
                            onPress={() => this.props.navigation.dispatch(NavigationActions.back()
                            )}
                        />

                    </DView>

                </DView>
            </KeyboardScroller>
        );
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
                        firebaseApp.database().ref("Names").update({[uid] : that.state.name });
                        firebaseApp.database().ref("Availabilities").update({[uid] : false}); //User is not available by default.
                        firebaseApp.database().ref("ProfileImages").update({[uid] : null});
						firebaseApp.database().ref("Abouts").update({[uid] : "There is no description yet for this user."});
                        console.log("Initialized the data")
                        Alert.alert(
                            'Successfully created new user account!',
                            null,
                            [
                                {text: 'Okay!', onPress: () => {console.log("Navigating to Tabs"); 
                                // navigate("Tabs");
                            } }
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
