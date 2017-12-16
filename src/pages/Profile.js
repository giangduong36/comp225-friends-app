import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import {NavigationActions} from "react-navigation";

const {
    Text,
    View,
    TextInput,
    Platform,
    StatusBar,
    Alert
} = ReactNative;

const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile',
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
            name: '',
            phone: '',
            status: '',
			about: '',
			interest: ''
        }
		
    }

    loadData() {
        let uid = firebaseApp.auth().currentUser.uid;
        let that = this;
        firebaseApp.database().ref('Names/' + uid).on("value", function (snapshot) {
            that.setState({name: snapshot.val()})
        });
        firebaseApp.database().ref('PhoneNumbers/' + uid).on("value", function (snapshot) {
            that.setState({phone: snapshot.val()})
        });
		firebaseApp.database().ref('Abouts/' + uid).on("value", function (snapshot) {
            that.setState({about: snapshot.val()})
        });
    }

    componentWillMount() {
        this.loadData();
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.profileContainer}>
                <Text style={styles.profileName}> {this.state.name}</Text>
                <Text style={styles.profilePhone}>{this.state.phone} </Text>
				<Text style={styles.profileAbout}>{this.state.about} </Text>
                <View style={styles.profileButtons}>
                    <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                        title="Edit Profile"
                        onPress={() => navigate("EditProfile")}
                    />
                    <ActionButton buttonStyle={styles.secondaryButton} buttonTextStyle={styles.secondaryButtonText}
                                title="Log out"
                                onPress={this._logout.bind(this)}
                    />
                </View>
            </View>
        );
    }

    _logout() {
        const {navigate} = this.props.navigation;
        const {dispatch} = this.props.navigation;

        firebaseApp.auth().signOut().then(function () {
            // Sign-out successful.
            Alert.alert(
                'Successfully signed out!',
                null,
                [
                    {text: 'Go to Log in', onPress: () => dispatch( 
                        NavigationActions.reset({
                            index:0,
                            actions:[
                                    NavigationActions.navigate({routeName:"InitStack"})
                                ],
                            key: null,
                                })) 
                    },
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


module.exports = ProfileScreen;