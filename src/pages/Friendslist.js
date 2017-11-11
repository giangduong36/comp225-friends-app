import React, {Component} from 'react';
import ReactNative from 'react-native';
import Firebase from 'firebase';
import {List, ListItem, SearchBar} from "react-native-elements";

//Import Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
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
    Button,
    TextInput,
    Platform,
    SectionList,
    FlatList,
    Alert,
    ActivityIndicator,
} = ReactNative;

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const styles = require('../../styles.js');
const firebaseApp = require('../services/firebaseInit');

// const Header = require('../components/Header');
// const flatList = require('./FriendFlatList');



class FriendslistScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Friends",
		headerStyle: {
			backgroundColor: 'black'
		},
        headerTitleStyle: {
            alignSelf: 'center',
			color: 'white'
        },
        headerLeft: <Icon.Button name="person-add" backgroundColor="black" style={{flex: 1}} onPress={() => navigation.navigate('AddFriend')}>Add Friend</Icon.Button>
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [{'name': "abc", "email": "gg.com"}],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
        this.loadFriends();

    }

    render() {
        const {navigate} = this.props.navigation;
        // const testItem = {'name':"Hello"};

        return (
            <View style={styles.container}>
                {/*TODO: Make a flatlist/sectionlist view of friends*/}


                {/*<FlatListDemo2/>*/}
                <List>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <ListItem
                                roundAvatar
                                // title={`${item.name.first} ${item.name.last}`}
                                title={item.name}
                                subtitle={""}
                                containerStyle={{borderBottomWidth: 0}}
                                // onPress={() => navigate('AddFriend')}
                                onPress={() =>
                                    Alert.alert(
                                        `You clicked on ${item.name} !`,
                                        null
                                    )
                                }
                            />
                        )}
                        keyExtractor={item => item.email}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={50}
                    />
                </List>
            </View>
        );
    }

    loadFriends() {
        console.log("Loading friends...");
        let that = this;
        firebaseApp.database().ref('Names').once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // let childKey = childSnapshot.key;
                // console.log(childKey);
                // console.log(name[i]);
                let friendName = childSnapshot.val();
                console.log(friendName);

                that.state.data.push({'name': friendName});
                // firebaseApp.database().ref("Names/" + childKey).update(name[i]);
            });
        });
        console.log(this.state.data);
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderHeader = () => {
        return (
            <View>
                <Text style={styles.welcome}>welcome to the friends list screen</Text>
                <ActionButton
                    title="Click a friend to see their profile's details"
                    onPress={() => navigate('UserDetail')
                    }
                />
                <SearchBar placeholder="Search for a friend..." lightTheme round/>

            </View>

        )
    };

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
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };
}



module.exports = FriendslistScreen;