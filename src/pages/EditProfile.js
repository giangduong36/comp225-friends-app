import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';

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


class EditProfileScreen extends Component {
    static navigationOptions = {
        title: 'Edit Profile',
        headerStyle: {
            backgroundColor: "black",
        },
        headerTitleStyle: {
            color: "white",
            alignSelf : (Platform.OS === "android") ? "center" : null,
            marginRight: (Platform.OS === "android") ? 72 : null,
        },
        headerTintColor: "white"
    };

constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            status: '',
			phoneRef: null
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
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                    placeholder={"Name"}
                />
				<TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({phone: text})}
                    value={this.state.phone}
                    placeholder={"Phone Number"}
                />
				<TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({status: text})}
                    value={this.state.status}
                    placeholder={"Status"}
                />
				<ActionButton
                    title="Submit"
                    onPress={this.update.bind(this)}
                />
            </View>
        );
	}

	update() {
        let that = this;
		firebaseApp.database().ref('PhoneNumbers').on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
				let registeredUserId = childSnapshot.key;
                let registeredNumber = childSnapshot.val();
				if(that.state.phone == registeredNumber && registeredUserId !== uid){
					console.log(that.state.phone);
					that.state.phoneRef = 1;
					Alert.alert(
						"Phone Number Already Registered",
						"Sorry, but the phone number you entered appears to already be in our database. Please double check you entered the correct number.",
						[
						{text: 'OK', onPress: () => console.log('OK Pressed!')},
						]
					);
				}	
            });
        });
		if(that.state.phone !== "" && that.state.phoneRef !== 1){
			firebaseApp.database().ref("PhoneNumbers").update({[uid] : that.state.phone});
		}
		if(that.state.name !== ""){
			firebaseApp.database().ref("Names").update({[uid] : that.state.name});
		}
		if(that.state.status !== ""){
			firebaseApp.database().ref("Statuses").update({[uid] : that.state.status});
		}
		that.state.phoneRef = null;
		that.props.navigation.goBack();
    }	
}


module.exports = EditProfileScreen;