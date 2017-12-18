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
            matches: [{name: "", key: "", match_status: ""}],
            error: null,
            refreshing: false,
            phone: null,
            reload: true,
        };
        uid = firebaseApp.auth().currentUser.uid;
        pendingMatchRef = firebaseApp.database().ref('PendingMatches/' + uid);
        matchRef = firebaseApp.database().ref('Matches/' + uid);
        // this.loadMatches();
    }

    // componentWillMount(){
    //     console.log("ComponentWillMount");
    //     this.listenForMatch(matchRef, pendingMatchRef);
    // }
    componentDidMount() {
        console.log("ComponentDidMount");
        // this.loadMatches();
        this.listenForMatch(matchRef, pendingMatchRef);
    }

    listenForMatch(matchRef, pendingRef) {
        this.setState({reload: !this.state.reload});
        let that = this;

        console.log("Pending matches before", that.state.reload);
        pendingRef.on("value", function (snapshot) {
            console.log("Loading pending matches");
            let matchList = [{name: "", key: "", match_status: ""}];
            matchList = that.state.matches.filter(function (item) {
                return item.match_status === 'Matched!';
            });
            that.setState({
                matches: matchList,
                reload: !that.state.reload
            });
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.once('value', function (snapshot_) {
                    matchList.push({
                        'name': snapshot_.val(),
                        'match_status': 'Pending match request...',
                        'key': snapshot_.key
                    });
                    that.setState({
                        matches: matchList,
                    });
                });
                // that.setState({
                //     matches:  _.cloneDeep(matchList),
                //     reload : !that.state.reload
                // });
            });
            // that.setState(that.state);
            console.log("Pending matches", that.state.reload);
            console.log("Pending matches", that.state.matches);
        });

        matchRef.on("value", function (snapshot) {
            console.log("Loading matches");
            let pendingMatchList = [{name: "", key: "", match_status: ""}];
            pendingMatchList = that.state.matches.filter(function (item) {
                return item.match_status === 'Pending match request...';
            });
            that.setState({
                matches: pendingMatchList,
                reload: !that.state.reload
            });
            console.log("Delete all matches", that.state.matches);
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.once('value', function (snapshot_) {
                    pendingMatchList.unshift({
                        'name': snapshot_.val(),
                        'match_status': 'Matched!',
                        'key': snapshot_.key
                    });
                    that.setState({
                        matches: pendingMatchList,
                    });
                });
                // that.setState({
                //     matches:  _.cloneDeep(matchList),
                // });

            });
            console.log("Matches", that.state.reload);
            console.log("Matches", that.state.matches);
        });

        that.setState({refreshing: false});
    }

    // listenForTasks(tasksRef) {
    //     tasksRef.on('value', (dataSnapshot) => {
    //         var tasks = [];
    //         dataSnapshot.forEach((child) => {
    //             tasks.push({
    //                 name: child.val().title,
    //                 _key: child.key
    //             });
    //         });
    //
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(tasks)
    //         });
    //     });
    // }



    render() {
        StatusBar.setBarStyle("light-content", true);
        const {navigate} = this.props.navigation;
        console.log("render:", this.state.matches);
        // console.log("render:", (JSON.stringify(this.state.matches)));
        return (
            <DView style={styles.matchesContainer}>
                <FlatList
                    data={this.state.matches}
                    extraData={this.state.reload}
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
                        return <Text style={styles.loadIndicator}> Pull to update! </Text>
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

    test() {
        console.log("test", this.state.matches.length);
        if (this.state.matches.length === 1) {
            return (
                <FlatList
                    data={this.state.matches.slice(0, 1)}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.name}
                        />
                    )}
                    keyExtractor={item => item.key}
                />
            )
        }

    }
    renderMatches() {
        const {navigate} = this.props.navigation;
        console.log("renderMatches:", this.state.matches);
        let that = this;
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
                                onPress={() => {
                                    this.findPhoneNum(item.key);
                                    Communications.text(this.state.phone);
                                } /* TODO: Real phone number later */}
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
                extraData={this.state.matches}
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

    sendText(userID) {
        firebaseApp.database().ref("PhoneNumbers/" + userID).once("value").then(
            function (snapshot) {
                console.log(snapshot.val() )
                Communications.text(snapshot.val() )
            }
        )
    }

    loadMatches() {
        let that = this;
        uid = firebaseApp.auth().currentUser.uid;

        firebaseApp.database().ref('PendingMatches/' + uid).on("value", function (snapshot) {
            console.log("Loading pending matches");
            // Delete all pending matches and reload
            // let newListMatch = [];
            // that.state.matches.forEach(function (p) {
            //     if (p.match_status === 'Matched!') {
            //         newListMatch.push(p);
            //     }
            // });
            that.setState({
                matches: that.state.matches.filter(function (item) {
                    return item.match_status === 'Matched!';
                }),
            });
            console.log("Delete all pending matches", that.state.matches);
            snapshot.forEach(function (childSnapshot) {
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.once('value', function (snapshot_) {
                    that.state.matches.push({
                        'name': snapshot_.val(),
                        'match_status': 'Pending match request...',
                        'key': snapshot_.key
                    });
                });
                that.setState(that.state);
            });
            that.setState(that.state);
            console.log("Pending matches", that.state.matches);
        });

        firebaseApp.database().ref('Matches/' + uid).on("value", function (snapshot) {
            console.log("Loading matches");
            // Delete all matched and reload
            // let newList = [];
            // that.state.matches.forEach(function (p) {
            //     if (p.match_status === 'Pending match request...') {
            //         newList.push(p);
            //     }
            //     that.setState({
            //         matches: newList,
            //     });
            // });

            that.setState({
                matches: that.state.matches.filter(function (item) {
                    return item.match_status === 'Pending match request...!';
                }),
            });
            console.log("Delete all matches", that.state.matches);
            snapshot.forEach(function (childSnapshot) {
                console.log("Matches", that.state.matches);
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.once('value', function (snapshot_) {
                    that.state.matches.unshift({
                        'name': snapshot_.val(),
                        'match_status': 'Matched!',
                        'key': snapshot_.key
                    });
                });
                that.setState(that.state);
            });
            that.setState(that.state);
            console.log("Matches", that.state.matches);
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

    remove(array, element) {
        return array.filter(e => e !== element);
    }

    handleRefresh = () => {
        console.log("Refresh...");
        this.setState({refreshing: true}, () => this.listenForMatch(matchRef, pendingMatchRef));
    }
}


module.exports = MatchesScreen;