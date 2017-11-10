//home
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

class HomeScreen extends Component {
    static navigationOptions = ({ navigation}) => ({
		title: "Home",
		headerTitleStyle: {
			alignSelf: 'center'
		},
		headerLeft: <Icon.Button name="person" backgroundColor="black" style={{flex: 1}} onPress={() => navigation.navigate('Profile')}>Profile</Icon.Button>,
		headerRight: <Icon.Button name="settings" backgroundColor="black" style={{flex: 1}} onPress={() => navigation.navigate('Settings')}>Settings</Icon.Button>
	});
    
    constructor(props) {
        super(props);
        this.state = {
        value: false,
        }
        
    }
    
    render() {
        const {navigate} = this.props.navigation;
        return (
                <View style={styles.container}>
                
                {/*<Header text="home" loaded={this.state.loaded} />*/}
                
                <Text style={styles.welcome}>Are you available?</Text>
                
                
                <Switch //toggle switch for availability
                value = {this.state.value}
                style={{marginBottom: 10}}
                onValueChange={(value) => this.setState({value})}
                />
                </View>
                
//
               //TODO: get rid of slider, improve switch style, pass data to firebase
//
//                <Text>Value: {this.state.value}</Text>
//                </View>
                );
    }
    
}

module.exports = HomeScreen;