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
    TouchableOpacity
} = ReactNative;

const {Linking, Platform} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');


class UserDetailScreen extends Component {
    static navigationOptions = {
        title: 'User Detail',
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

        this.state = {
            name: '',
            phone: '',
            availability: '',
            status: ''
        }
    }

    loadData() {
        let friend_uid = this.props.navigation.state.params.chosenFriend;
        let that = this;
        firebaseApp.database().ref('Names/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({name: snapshot.val()})
        });
        firebaseApp.database().ref('PhoneNumbers/' + friend_uid.key).on("value", function (snapshot) {
            that.setState({phone: snapshot.val()})
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        const {navigate} = this.props.navigation;
        uid = firebaseApp.auth().currentUser.uid;
        return (
            <View style={styles.container}>
                {/*<Header text="Friends List" loaded={this.state.loaded} />*/}
                <Text style={styles.welcome}>welcome to the user detail screen</Text>
                <Text style={styles.actionText}> Name: {this.state.name}</Text>
                <Text style={styles.actionText}> Status </Text>
                <Text style={styles.actionText}> Phone: {this.state.phone} </Text>
                <Text style={styles.actionText}> About </Text>
                <Text style={styles.actionText}> Interest </Text>

                <ActionButton title="Unfriend" onPress={this._unfriend.bind(this)}/>

                {/*<TouchableOpacity onPress={() => {this.someFunction()}}>*/}
                {/*<View style={styles.holder}>*/}
                {/*<Text style={styles.text}>Test</Text>*/}
                {/*</View>*/}
                {/*</TouchableOpacity>*/}

            </View>
        );
    }

    // someFunction() {
    //     console.log("test");
    // }

    _unfriend() {
        let friend_uid = this.props.navigation.state.params.chosenFriend;
        Alert.alert(
            'Unfriend this person?',
            null,
            [
                {
                    text: 'Unfriend',
                    //Not work because item is defined in FriendList
                    onPress: (text) => firebaseApp.database().ref('FriendLists/' + uid).child(friend_uid.key).remove()
                },
                {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
            ]
        );
        // const url = (Platform.OS === 'ios')
        //     ? 'sms:1-408-555-1212?body=yourMessage'
        //     : 'sms:1-408-555-1212';
        //
        // Linking.canOpenURL(url).then(supported => {
        //     if (!supported) {
        //         console.log('Unsupported url: ' + url)
        //     } else {
        //         return Linking.openURL(url)
        //     }
        // }).catch(err => console.error('An error occurred', err))
    }

}



module.exports = UserDetailScreen;