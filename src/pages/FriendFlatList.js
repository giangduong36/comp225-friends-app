//Sample code: https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

import React, {Component} from "react";
import {View, Text, FlatList, ActivityIndicator, Alert} from "react-native";
import {List, ListItem, SearchBar} from "react-native-elements";

const firebaseApp = require('../services/firebaseInit');


class FlatListDemo extends Component {
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
        return <SearchBar placeholder="Search for a friend..." lightTheme round/>;
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

    render() {

        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
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
                                    "Congrats",
                                    `You clicked on ${item.name}`,
                                    {text: "Okay!"}
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
        );
    }
}

export default FlatListDemo;