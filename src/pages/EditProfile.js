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
const DismissKeyboardView = DismissKeyboardHOC(View);


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
            phone: '',
            status: '',
			about: '',
			interest: ''
        }
    }

    loadData() {
        let uid = firebaseApp.auth().currentUser.uid;
        let that = this;
        firebaseApp.database().ref('Names/' + uid).once('value').then(function(snapshot) {
            that.setState({name: snapshot.val()})
        });
        firebaseApp.database().ref('PhoneNumbers/' + uid).once('value').then(function(snapshot) {
            that.setState({phone: snapshot.val()})
        });
		firebaseApp.database().ref('Statuses/' + uid).once('value').then(function(snapshot) {
            that.setState({status: snapshot.val()})
        });
		firebaseApp.database().ref('Abouts/' + uid).once('value').then(function(snapshot) {
            that.setState({about: snapshot.val()})
        });
		firebaseApp.database().ref('Interests/' + uid).once('value').then(function(snapshot) {
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
            <DismissKeyboardView style={styles.body}>
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                    placeholder={"Name"}
                    underlineColorAndroid="transparent"
                />
				<TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({phone: text})}
                    value={this.state.phone}
                    placeholder={"Phone Number"}
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                />
				<TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({status: text})}
                    value={this.state.status}
                    placeholder={"Status"}
                    underlineColorAndroid="transparent"
                />
				<TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({about: text})}
                    value={this.state.about}
                    placeholder={"About"}
                    underlineColorAndroid="transparent"
                />
				<TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({interest: text})}
                    value={this.state.interest}
                    placeholder={"Interest"}
                    underlineColorAndroid="transparent"
                />
				<ActionButton
                    title="Submit"
                    onPress={this.update.bind(this)}
                />
            </DismissKeyboardView>
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
					firebaseApp.database().ref("PhoneNumbers").update({[uid] : "Enter a valid phone number"}); //this feels super hacky!
					return true; //breaks out of this loop
				} else{
					if(that.state.phone !== ""){
						firebaseApp.database().ref("PhoneNumbers").update({[uid] : that.state.phone}); //iterates through this else for each thing in for loop...
					}
				}	
            });
        });
		
		if(that.state.name !== ""){
			firebaseApp.database().ref("Names").update({[uid] : that.state.name});
		}
		if(that.state.status !== ""){
			firebaseApp.database().ref("Statuses").update({[uid] : that.state.status});
		}
		that.props.navigation.goBack();
    }	
}


module.exports = EditProfileScreen;