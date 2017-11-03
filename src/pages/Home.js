//home
import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import { Slider } from 'react-native-elements'

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
    static navigationOptions = {
    title: 'Home',
    };
    
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
                
             
                
                <View style = {styles.buttonContainer}>
                <ActionButton
                title="Profile"
                onPress={() => navigate('Profile')
                }
                />
                </View>
                <View style = {styles.buttonContainer}>
                <ActionButton
                title="Settings"
                onPress={() => navigate('Settings')
                }
                />
                </View>
                
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

