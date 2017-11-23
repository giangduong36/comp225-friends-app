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
    AlertIOS,
    Alert,
    Button,
    TextInput,
    StatusBar,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class InitScreen extends Component {
    static navigationOptions = {
        title: 'Initial Screen',
		headerStyle: {
			backgroundColor: 'black'
		},
        headerTitleStyle: {
            alignSelf: 'center',
			color: 'white'
        },
    };

    constructor(props) {
        super(props);
    }

    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                {/*<Header text="Initial Screen" loaded={this.state.loaded} />*/}
                <Text style={styles.welcome}>welcome to the init screen</Text>

                <View style={styles.body}>

                    <ActionButton
						onPress={() => navigate('Login')}
                        title="Log In"
                    />

                    <ActionButton
                        onPress={() => navigate('Signup')}
                        title="Sign Up"
                    />
                </View>
            </View>
        );
    }
}


module.exports = InitScreen;