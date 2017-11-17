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


class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            availability: '',
            status: ''
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
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                {/*<Header text="Friends List" loaded={this.state.loaded} />*/}
                <Text style={styles.welcome}>welcome to the profile screen</Text>
                <Text style={styles.actionText}> Name: {this.state.name}</Text>
                <Text style={styles.actionText}> Status </Text>
                <Text style={styles.actionText}> Phone: {this.state.phone} </Text>
                <Text style={styles.actionText}> About </Text>
                <Text style={styles.actionText}> Interest </Text>
            </View>
        );
	}	
}


module.exports = ProfileScreen;