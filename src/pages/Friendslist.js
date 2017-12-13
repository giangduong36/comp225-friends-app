import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import {List, ListItem, SearchBar} from "react-native-elements";
import DismissKeyboardHOC from "../components/DismissKeyboardHOC.js";

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
    Platform,
    SectionList,
    FlatList,
    Alert,
    ActivityIndicator,
    StatusBar,
} = ReactNative;

// const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');
const DismissKeyboardView = DismissKeyboardHOC(View);


class FriendslistScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Friends",
        headerStyle: {
			backgroundColor: styles.constants.headerColor
        },
        headerTitleStyle: {
            color: styles.constants.headerText,
            alignSelf : (Platform.OS === "android") ? "center" : null,
            marginRight: (Platform.OS === "android") ? 72 : null,
        },
        headerLeft: <Icon.Button name="person-add" backgroundColor={styles.constants.headerColor} style={{flex: 1}} onPress={() => navigation.navigate('AddFriend')}>Add Friend</Icon.Button>
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.loadFriends();
    }


    render() {
        StatusBar.setBarStyle("light-content", true)
        const {navigate} = this.props.navigation;
        return (
            <DismissKeyboardView style={styles.containerTop}>
                {/*TODO: Make a flatlist/sectionlist view of friends*/}

                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ListItem
                                roundAvatar
                                // title={`${item.name.first} ${item.name.last}`}
                                chevronColor={styles.constants.arrowColor}
                                title={item.name}
                                subtitle={""}
                                containerStyle={{borderBottomWidth: 0}}
                                // onPress={() => navigate('AddFriend')}
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
                        ListHeaderComponent={this.renderHeader}
                        // ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={50}
                    />
                </List>
            </DismissKeyboardView>
        );
    }

    loadFriends() {
        console.log("Loading friends...");
        let that = this;
        uid = firebaseApp.auth().currentUser.uid;
        firebaseApp.database().ref('FriendLists/' + uid).on("value", function (snapshot) {
            while (that.state.data.length > 0) {
                that.state.data.pop();
            }
            snapshot.forEach(function (childSnapshot) {
                // let childKey = childSnapshot.key;
                let nameLoc = firebaseApp.database().ref('Names/' + childSnapshot.key);
                nameLoc.on('value', function (snapshot) {
                    that.state.data.push({'name': snapshot.val(), 'key': snapshot.key});
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
                <SearchBar placeholder="Search for a friend..." lightTheme icon={{color: styles.constants.searchIcon}} round/>
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



module.exports = FriendslistScreen;