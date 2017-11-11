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


class MatchesScreen extends Component {
    static navigationOptions = {
        title: 'Matches',
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
                <Text style={styles.welcome}>welcome to the matches list screen</Text>
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


module.exports = MatchesScreen;