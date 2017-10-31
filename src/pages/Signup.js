import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
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
            password: '',
            phoneNumber: ""
        };
    }

    //
    // goToLogin() {
    //     this.props.navigator.push({
    //         component: Main
    //     });
    // }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
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
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    placeholder={"Password"}
                />
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({phoneNumber: text})}
                    value={this.state.phoneNumber}
                    placeholder={"Phone Number"}
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

            </View>
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
            navigate('Home'); 
            
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

        firebaseApp.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(function (user) {

            //Initializes user data in the database
            uid = firebaseApp.auth().currentUser.uid;

            firebaseApp.database().ref("Users").update({[uid] : that.state.email});
            firebaseApp.database().ref("PhoneNumbers").update({[uid] : that.state.phoneNumber});
            firebaseApp.database().ref("Names").update({[uid] : "NO NAME DATA"});
            firebaseApp.database().ref("Statuses").update({[uid] : "Write your status here. How's it going, what do you want to do?"});
            firebaseApp.database().ref("Availabilities").update({[uid] : false}); //User is not available by default.
            firebaseApp.database().ref("ProfileImages").update({[uid] : null});
            firebaseApp.database().ref("FriendLists").update({[uid] : [] }); //A list of a user's friends
            firebaseApp.database().ref("FriendsAvailableLists").update({[uid] : [] }); //A list of the user's currently available friends.
            firebaseApp.database().ref("HangmateLists").update({[uid] : [] }); //A list of the friends the user is currently interested in hanging out with.
            firebaseApp.database().ref("MatchLists").update({[uid] : [] });
            
            
            
            
            
            

            console.log("The UID is",uid);

            Alert.alert(
                'Successfully created new user account!',
                null,
                [
                    {text: 'Okay!', onPress: () => navigate("Home")}
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

module.exports = SignupScreen;
