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
const DismissKeyboardView = DismissKeyboardHOC(View);


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
        this.loadMatches();
        console.log("Here", this.state.pendingMatches[0], this.state.pendingMatches);
        console.log(this.state.pendingMatches.length);
    }


    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <DismissKeyboardView style={styles.containerTop}>
                {this.renderMatches()}
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
                            title={item.name}
                            subtitle={item.match_status}
                            containerStyle={{borderBottomWidth: 0}}
                            // hideChevron={true}
                            // rightTitle={"Hello"}
                            rightIcon={
                                <Button
                                    raised
                                    backgroundColor={styles.constants.matchMessage}
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
                    // ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
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

    loadMatches() {
        let that = this;
        uid = firebaseApp.auth().currentUser.uid;

        firebaseApp.database().ref('Matches/' + uid).on("value", function (snapshot) {
            console.log("Loading matches");
            // Delete all matched and reload
            let newList = [];
            that.state.matches.forEach(function (p) {
                if (p.match_status === 'Pending match request...') {
                    newList.push(p);
                }
            });
            that.setState({
                matches: newList,
            });

            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot_) {
                    that.state.matches.push({
                        'name': snapshot_.val(),
                        'match_status': 'Matched!',
                        'key': snapshot_.key
                    });
                });

            });
        });

        // When the list is empty, won't add listener.
        firebaseApp.database().ref('PendingMatches/' + uid).on("value", function (snapshot) {
            console.log("Loading pending matches");
            let newList = [];
            that.state.matches.forEach(function (p) {
                if (p.match_status === 'Matched!') {
                    newList.push(p);
                }
            });
            that.setState({
                matches: newList,
            });
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot_) {
                    that.state.matches.push({
                        'name': snapshot_.val(),
                        'match_status': 'Pending match request...',
                        'key': snapshot_.key
                    });
                });
            });
            console.log("Here:", that.state.matches);
        });

        // let y = [];
        // for (let i = 0; i < this.state.pendingMatches.length; i++) {
        //     console.log("here");
        //     y.push(this.state.pendingMatches[i]);
        //     console.log(y);
        //     //Do something
        // }
        //
        // this.setState({
        //     matchData: this.state.pendingMatches.concat(this.state.matches),
        // });
        // this.state.matches.forEach(function (p) {
        //     console.log(p);
        // });
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