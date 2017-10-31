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
                
                <Text style={styles.welcome}>welcome to the home screen</Text>
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
                
                <Slider
                //value={this.state.value}
                minimumValue={0}
                maximumValue={1}
                step={1}
                minimumTrackTintColor='#1073ff'
                maximumTrackTintColor='#b7b7b7'
                style={sliderStyle.container}
                trackStyle={sliderStyle.track}
                thumbStyle={sliderStyle.thumb}
                onValueChange={(value) => this.setState({value})} />
                
                <Switch //toggle switch for availability
                value = {this.state.value}
                style={{marginBottom: 10}}
                onValueChange={(value) => this.setState({value})}
                />
                //TODO: get rid of slider, improve switch style, pass data to firebase
                
                // <Text>Value: {this.state.value}</Text>
                </View>
                );
    }
    
}


//https://snack.expo.io/H1cnedhBW
var sliderStyle = StyleSheet.create({
                                    track: {
                                    height: 4,
                                    borderRadius: 2,
                                    },
                                    thumb: {
                                    width: 30,
                                    height: 30,
                                    borderRadius: 30 / 2,
                                    backgroundColor: 'white',
                                    borderColor: '#b7b7b7',
                                    borderWidth: 2,
                                    }
                                    });

module.exports = HomeScreen;

