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

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DismissKeyboardView = DismissKeyboardHOC(View);

// const flatList = require('./FriendFlatList');


class MatchesScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Matches",
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            color: 'white',
            alignSelf: (Platform.OS === "android") ? "center" : null,
            // marginRight: (Platform.OS === "android") ? 72 : null,
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pendingMatches: [],
            matches: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            phone: null,
        };
    }

    componentDidMount() {
        this.loadPendingMatches();
        this.loadMatches();
    }


    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <DismissKeyboardView style={styles.containerTop}>
                {this.renderMatches()}
                {this.renderPendingMatches()}
            </DismissKeyboardView>

        );
    }

    renderMatches() {
        const {navigate} = this.props.navigation;
        return (
            <List>
                <FlatList
                    data={this.state.matches}
                    renderItem={({item}) => (
                        <ListItem
                            disabled
                            roundAvatar
                            // title={`${item.name.first} ${item.name.last}`}
                            title={item.name}
                            subtitle={"Matched!"}
                            containerStyle={{borderBottomWidth: 0}}
                            // hideChevron={true}
                            // rightTitle={"Hello"}
                            rightIcon={
                                <Button
                                    raised
                                    backgroundColor="deepskyblue"
                                    onPress={() => Communications.text('123456789') /* Real phone number later */}
                                    icon={{name: 'chat'}}
                                    title='Text'
                                />
                            }
                            // onPress={() => navigate('AddFriend')}
                            avatar={{uri: 'https://78.media.tumblr.com/avatar_66b336c742ea_128.png'}} // Will change to real avatar later
                        />
                    )}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                />
            </List>
        )
    }

    renderPendingMatches() {
        const {navigate} = this.props.navigation;
        return (
            <List>
                <FlatList
                    data={this.state.pendingMatches}
                    renderItem={({item}) => (
                        <ListItem
                            disabled
                            roundAvatar
                            // title={`${item.name.first} ${item.name.last}`}
                            title={item.name}
                            subtitle={"Pending..."}
                            containerStyle={{borderBottomWidth: 0}}
                            // hideChevron={true}
                            // rightTitle={"Hello"}
                            rightIcon={
                                <Button
                                    raised
                                    backgroundColor="deepskyblue"
                                    onPress={() => Communications.text('123456789') /* Real phone number later */}
                                    icon={{name: 'chat'}}
                                    title='Text'
                                />
                            }
                            // onPress={() => navigate('AddFriend')}
                            avatar={{uri: 'https://78.media.tumblr.com/avatar_66b336c742ea_128.png'}} // Will change to real avatar later
                        />
                    )}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderSeparator()}
                    // ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                />
            </List>
        )
    }

    findPhoneNum(userID) {
        let that = this;
        firebaseApp.database().ref('PhoneNumbers/' + userID).on("value", function (snapshot) {
            that.state.phone = snapshot.val();
        });
    }

    loadPendingMatches() {
        console.log("Loading pending matches...");
        let that = this;
        uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('PendingMatches/' + uid).on("value", function (snapshot) {
            while (that.state.pendingMatches.length > 0) {
                that.state.pendingMatches.pop();
            }
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot) {
                    that.state.pendingMatches.push({'name': snapshot.val(), 'key': snapshot.key});
                });

            });
        });

    }

    loadMatches() {
        console.log("Loading matches...");
        let that = this;
        uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('Matches/' + uid).on("value", function (snapshot) {
            while (that.state.matches.length > 0) {
                that.state.matches.pop();
            }
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot) {
                    that.state.matches.push({'name': snapshot.val(), 'key': snapshot.key});
                });

            });
        });
    }


    renderSeparator = () => {
        return (
            <View
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
        return (
            <View>
                <SearchBar placeholder="Search for a friend..." lightTheme round/>
            </View>

        )
    };


    /*Displaying loading sign*/
    renderFooter = () => {
        // if (!this.state.loading) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                {/*Render the loading sign at the end of the list*/}
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    handleLoadMore() {

    }
}


module.exports = MatchesScreen;