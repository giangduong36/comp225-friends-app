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
    Switch
} = ReactNative;




const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

class MeScreen extends Component {
    static navigationOptions = ({ navigation}) => ({
		title: "Me",
		headerStyle: {
			backgroundColor: 'black'
		},
        headerTitleStyle: {
            alignSelf: 'center',
			color: 'white'
        },
		headerLeft: <Icon.Button name="person" backgroundColor="black" style={{flex: 1}} onPress={() => navigation.navigate('Profile')}>Profile</Icon.Button>,
		headerRight: <Icon.Button name="settings" backgroundColor="black" style={{flex: 1}}onPress={() => navigation.navigate('Settings')}>Settings</Icon.Button>
	});
    
    constructor(props) {
        super(props);
        this.state = {
            value: false
        }
        
    }
    
    render() {
        const {navigate} = this.props.navigation;
        uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref("Availabilities").update({[uid] : this.state.value});
        return (
            <View style={[styles.containerTop, {alignItems: 'center'}]}>

                <Text style={styles.welcome}>Are you available?</Text>
                
                
                <Switch //toggle switch for availability info
                    value = {this.state.value}
                    onTintColor="#999999"
                    style={{marginBottom: 10}}
                    thumbTintColor="#0000ff"
                    tintColor="#000000"
                    onValueChange={(value) => this.setState({value})}
                />
                </View>
                // the switch is colored differently on ios and android
                
                );
    }
    
}

module.exports = MeScreen;
