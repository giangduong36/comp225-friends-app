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
		firebaseApp.database().ref('Statuses/' + uid).on("value", function (snapshot) {
            that.setState({status: snapshot.val()})
        });
		firebaseApp.database().ref('Abouts/' + uid).on("value", function (snapshot) {
            that.setState({about: snapshot.val()})
        });
		firebaseApp.database().ref('Interests/' + uid).on("value", function (snapshot) {
            that.setState({interest: snapshot.val()})
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.text}> <Text style={{fontWeight: 'bold'}}>Name:</Text> {this.state.name}</Text>
                <Text style={styles.text}> <Text style={{fontWeight: 'bold'}}>Status:</Text> {this.state.status} </Text>
                <Text style={styles.text}> <Text style={{fontWeight: 'bold'}}>Phone:</Text> {this.state.phone} </Text>
				<Text style={styles.text}> <Text style={{fontWeight: 'bold'}}>Interest:</Text> {this.state.interest} </Text>
				<Text style={styles.text}> <Text style={{fontWeight: 'bold'}}>About:</Text> {this.state.about} </Text>
				<ActionButton offsetY={5}
                    title="Edit Profile"
                    onPress={() => navigate("EditProfile")}
                />
                <ActionButton offsetY={5}
                              title="Log out"
                              onPress={this._logout.bind(this)}
                />
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