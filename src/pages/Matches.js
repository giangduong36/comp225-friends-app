import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import {List, ListItem, SearchBar} from "react-native-elements";
import DismissKeyboardHOC from "../components/DismissKeyboardHOC";

//Import Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Button} from 'react-native-elements'
// import FriendsFlatList from "./flatListDemo";
// import FriendsFlatList from "./FriendFlatList";

const {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
    TextInput,
    Platform,
    SectionList,
    FlatList,
    Alert,
    ActivityIndicator,
    StatusBar,
} = ReactNative;

import Communications from 'react-native-communications';

const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DView = DismissKeyboardHOC(View);


class MatchesScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Matches",
        headerStyle: {
            backgroundColor: styles.constants.headerColor
        },
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf: (Platform.OS === "android") ? "center" : null,
            // marginRight: (Platform.OS === "android") ? 72 : null,
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            matches: [],
            error: null,
            refreshing: false,
            phone: null,
        };
    }

    componentDidMount() {
        this.loadMatches();
    }


    render() {
        StatusBar.setBarStyle("light-content", true);
        const {navigate} = this.props.navigation;
        return (
            <DView style={styles.matchesContainer}>
                {this.renderMatches()}
            </DView>
        );
    }

    renderMatches() {
        const {navigate} = this.props.navigation;
        return (
            <FlatList
                data={this.state.matches}
                renderItem={({item}) => (
                    <ListItem
                        roundAvatar
                        title={item.name}
                        subtitle={item.match_status}
                        containerStyle={{borderBottomWidth: 0}}
                        // hideChevron={true}
                        // rightTitle={"Hello"}
                        rightIcon={
                            <Button
                                raised
                                backgroundColor={styles.constants.matchMessage}
                                onPress={() => Communications.text('123456789') /* TODO: Real phone number later */}
                                icon={{name: 'chat'}}
                                title='Text'
                            />
                        }
                        avatar={{uri: 'https://78.media.tumblr.com/avatar_66b336c742ea_128.png'}} // Will change to real avatar later
                        onPress={
                            () => {
                                this.props.navigation.navigate('UserDetail', {
                                    chosenFriend: item   //your user details
                                })
                            }
                        }
                    />
                )}
                keyExtractor={item => item.key}
                ItemSeparatorComponent={this.renderSeparator}
                // ListHeaderComponent={this.renderHeader}
                ListEmptyComponent={() => {
                    return <Text style={styles.profilePhone}> Pull to update! </Text>
                }}
                ListFooterComponent={() => {
                    return <View style={{backgroundColor: 'transparent', height: 1}}/>
                }}
                // onRefresh={this.handleRefresh}
                // refreshing={this.state.refreshing}
            />
        )
    }

    findPhoneNum(userID) {
        let that = this;
        firebaseApp.database().ref('PhoneNumbers/' + userID).on("value", function (snapshot) {
            that.state.phone = snapshot.val();
        });
    }

    loadMatches() {
        let that = this;
        uid = firebaseApp.auth().currentUser.uid;

        firebaseApp.database().ref('PendingMatches/' + uid).on("value", function (snapshot) {
            console.log("Loading pending matches");
            let newListMatch = [];
            that.state.matches.forEach(function (p) {
                if (p.match_status === 'Matched!') {
                    newListMatch.push(p);
                }
            });
            that.setState({
                matches: newListMatch,
            });
            snapshot.forEach(function (childSnapshot) {
                console.log(that.state.matches);
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot_) {
                    that.state.matches.push({
                        'name': snapshot_.val(),
                        'match_status': 'Pending match request...',
                        'key': snapshot_.key
                    });
                });
            });
        });

        firebaseApp.database().ref('Matches/' + uid).on("value", function (snapshot) {
            console.log("Loading matches");
            // Delete all matched and reload
            let newList = [];
            that.state.matches.forEach(function (p) {
                if (p.match_status === 'Pending match request...') {
                    newList.push(p);
                }
                that.setState({
                    matches: newList,
                });
            });
            snapshot.forEach(function (childSnapshot) {
                console.log("Matches", that.state.matches);
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot_) {
                    that.state.matches.unshift({
                        'name': snapshot_.val(),
                        'match_status': 'Matched!',
                        'key': snapshot_.key
                    });
                });
            });


        });
    }


    renderSeparator = () => {
        return (
            <DView
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "0%"
                }}
            />
        );
    };

    renderHeader = () => {
        // return null
        return (
            <View>
                <SearchBar placeholder="Search for a friend..." lightTheme icon={{color: styles.constants.searchIcon}}
                           round/>
            </View>

        )
    };

    handleRefresh = () => {
        // console.log("Refresh...");
        // this.setState({refreshing: true}, () => this.loadMatches());
    }
}


module.exports = MatchesScreen;