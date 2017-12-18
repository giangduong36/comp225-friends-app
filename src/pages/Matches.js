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
const _ = require('lodash');

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
            reload: true,
            name: null,
        };
        uid = firebaseApp.auth().currentUser.uid;
        pendingMatchRef = firebaseApp.database().ref('PendingMatches/' + uid);
        matchRef = firebaseApp.database().ref('Matches/' + uid);
        // this.loadMatches();
    }

    componentDidMount() {
        console.log("ComponentDidMount");
        this.listenForMatch(matchRef, pendingMatchRef);
    }

    listenForMatch(matchRef, pendingRef) {
        this.setState({reload: !this.state.reload});
        let that = this;

        matchRef.on("value", function (snapshot) {
            console.log("Loading matches");
            let matchList = [];
            that.setState({
                matches: matchList
            });
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.once('value', function (snapshot_) {
                    matchList.unshift({
                        'name': snapshot_.val(),
                        'match_status': 'Matched!',
                        'key': snapshot_.key
                    });
                    console.log("Name", snapshot_.val(), matchList);
                    that.setState({
                        matches: matchList
                    });
                });
            });
        });
        that.setState({refreshing: false});
    }


    render() {
        StatusBar.setBarStyle("light-content", true);
        const {navigate} = this.props.navigation;
        console.log("render:", this.state.matches);
        // console.log("render:", (JSON.stringify(this.state.matches)));
        return (
            <DView style={styles.matchesContainer}>
                {/*<Text style={styles.meTitle}> Hello </Text>*/}
                <FlatList
                    data={this.state.matches}
                    // extraData={this.state.reload}
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
                                    onPress={() => this.sendText(item.key)}
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
                        return <Text style={styles.loadIndicator}> Nothing here. Pull to update! </Text>
                    }}
                    ListFooterComponent={() => {
                        return <View style={{backgroundColor: 'transparent', height: 1}}/>
                    }}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                />
            </DView>
        );
    }

    sendText(userID) {
        firebaseApp.database().ref("PhoneNumbers/" + userID).once("value").then(
            function (snapshot) {
                console.log(snapshot.val());
                Communications.text(snapshot.val() )
            }
        )
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

    remove(array, element) {
        return array.filter(e => e !== element);
    }

    handleRefresh = () => {
        console.log("Refresh...");
        this.setState({refreshing: true}, () => this.listenForMatch(matchRef, pendingMatchRef));
    }
}


module.exports = MatchesScreen;