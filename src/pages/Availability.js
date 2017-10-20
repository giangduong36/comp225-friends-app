import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Alert,
    AlertIOS,
    TextInput
} = ReactNative;
const firebase = require('firebase');


const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

let currentID = null;

class Availability extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Availability',
    });

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('items');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    name: child.val().name,
                    friend: child.val().friend,
                    status: child.val().status,
                    _key: child.key
                });
                currentID = child.key;
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Are you free right now? </Text> /*slider button will eventually go here*/

                <StatusBar title="See Friends"/>
                <ActionButton onPress={() => navigate('Main')} // Clicking this button redirects to Main
                              title="Friends"
                />
            </View>

        )
    }
}

module.exports = Availability;
