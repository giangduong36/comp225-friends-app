//Me
import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import { Slider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
    Button,
    TextInput,
    StatusBar,
    Switch,
    Platform,
} = ReactNative;


// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

class MeScreen extends Component {
    static navigationOptions = ({ navigation}) => ({
		title: "Me",
		headerStyle: {
			backgroundColor: styles.constants.headerColor
		},
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf : (Platform.OS === "android") ? "center" : null,
            marginRight: (Platform.OS === "android") ? 72 : null,
        },
		headerLeft: <Icon.Button name="person" backgroundColor={styles.constants.headerColor} style={{flex: 1}} onPress={() => navigation.navigate('Profile')}>Profile</Icon.Button>
	});
    
    constructor(props) {
        super(props);
        uid = firebaseApp.auth().currentUser.uid;
        this.state = {
            value: false
        }
        let screen = this;
        firebaseApp.database().ref("Availabilities/" + uid).once('value')
            .then(function(snapshot){
                screen.setState({value: snapshot.val()})
            })
        
    }
    
    componentDidUpdate(prevProps, prevState){
        firebaseApp.database().ref("Availabilities").update({[uid] : this.state.value});
    }
    
    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        
        return (
            <View style={styles.meContainer}>

                <Text style={styles.meTitle}>Are you available?</Text>
                <View style={styles.meSpacer}></View>
                <Switch //toggle switch for availability info
                    value = {this.state.value}
                    onTintColor={styles.constants.buttonBorder}
                    style={styles.meButton}
                    thumbTintColor={styles.constants.buttonBG}
                    tintColor="black"
                    onValueChange={(value) => this.setState({value})}
                />
            </View>
                // the switch is colored differently on ios and android
                
                );
    }
    
}

module.exports = MeScreen;
