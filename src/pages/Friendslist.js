import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
//Import Icon
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
	Platform
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

class FriendslistScreen extends Component {
	static navigationOptions = ({ navigation}) => ({
		title: "Friends",
		headerTitleStyle: {
			alignSelf: 'center'
		},
		headerLeft: <Icon.Button name="person-add" backgroundColor="#3b5998" onPress={() => navigation.navigate('AddFriend')}>Add Friend</Icon.Button>
	});

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>welcome to the friends list screen</Text>
				<ActionButton
                    title="Click a friend to see their profile's details"
                    onPress={() => navigate('UserDetail')
					}
                />
            </View>
        );
    }
	
}


module.exports = FriendslistScreen;