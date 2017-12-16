import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import DismissKeyboardHOC from "../components/DismissKeyboardHOC.js";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    Button,
    TextInput,
    StatusBar,
    Platform,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DView = DismissKeyboardHOC(View);
const KeyboardScroller = DismissKeyboardHOC(KeyboardAwareScrollView)


class EditProfileScreen extends Component {
    static navigationOptions = {
        title: 'Edit Profile',
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
            prevPhone: "",
            phone: '',
			about: '',
        }
    }

    loadData() {
        let uid = firebaseApp.auth().currentUser.uid;
        let that = this;
        firebaseApp.database().ref('Names/' + uid).once('value').then(function(snapshot) {
            that.setState({name: snapshot.val()})
        });
        firebaseApp.database().ref('PhoneNumbers/' + uid).once('value').then(function(snapshot) {
            that.setState({phone: snapshot.val(), prevPhone: snapshot.val()})
        });
		firebaseApp.database().ref('Abouts/' + uid).once('value').then(function(snapshot) {
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
            <KeyboardScroller resetScrollToCoords={{x:0,y:0}} contentContainerStyle={{height:"100%"}} scrollEnabled={false}>            
                <DView style={styles.editProfileContainer}>
                    <DView style={styles.editProfileInputs}>
                        <TextInput
                            style={styles.editProfileTextInput}
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name}
                            placeholder={"Name"}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.editProfileTextInput}
                            onChangeText={(text) => this.setState({phone: text})}
                            value={this.state.phone}
                            placeholder={"Phone Number"}
                            underlineColorAndroid="transparent"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.editProfileTextInput}
                            onChangeText={(text) => this.setState({about: text})}
                            value={this.state.about}
                            placeholder={"About"}
                            underlineColorAndroid="transparent"
                        />
                    </DView>
                    <DView style={styles.editProfileButtons}>
                        <ActionButton buttonStyle={styles.primaryButton} buttonTextStyle={styles.primaryButtonText}
                            title="Submit"
                            onPress={this.update.bind(this)}
                        />
                    </DView>
                </DView>
            </KeyboardScroller>
        );
	}

	update() {
        let that = this;
		firebaseApp.database().ref('PhoneNumbers').once('value').then(function(snapshot) {
            snapshot.forEach(function (childSnapshot) {
				let registeredUserId = childSnapshot.key;
                let registeredNumber = childSnapshot.val();
				if(that.state.phone == registeredNumber && registeredUserId !== uid){
					Alert.alert(
						"Phone Number Already Registered",
						"Sorry, but the phone number you entered appears to already be in our database. Please double check you entered the correct number.",
						[
						{text: 'OK', onPress: () => console.log('OK Pressed!')},
						]
					);
					firebaseApp.database().ref("PhoneNumbers").update({[uid] : that.state.prevPhone}); //this feels super hacky!
					return true; //breaks out of this loop
				} else{
					if(that.state.phone !== ""){
						firebaseApp.database().ref("PhoneNumbers").update({[uid] : that.state.phone}); //iterates through this else for each thing in for loop...
                        // Update UserIDs because this uses phone numbers as keys
                        firebaseApp.database().ref("UserIDs").child(parseInt(that.state.prevPhone)).remove();
                        firebaseApp.database().ref("UserIDs").update({[that.state.phone]: uid});
                    }
				}	
            });
        });
		
		if(that.state.name !== ""){
			firebaseApp.database().ref("Names").update({[uid] : that.state.name});
		}
		if(that.state.status !== ""){
			firebaseApp.database().ref("Abouts").update({[uid] : that.state.about});
		}
		that.props.navigation.goBack();
    }	
}


module.exports = EditProfileScreen;