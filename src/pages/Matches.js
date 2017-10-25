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
    Button,
    TextInput
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class MatchesScreen extends Component {
    static navigationOptions = {
        title: 'Matches',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                {/*<Header text="Matches" loaded={this.state.loaded} />*/}

                <Text style={styles.welcome}>welcome to the matches screen</Text>
				<ActionButton
                    title="Click a match to see their profile's details"
                    onPress={() => navigate('UserDetail')
					}
                />
            </View>
        );
    }

}


module.exports = MatchesScreen;