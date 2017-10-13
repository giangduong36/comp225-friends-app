'use strict';
import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import React, {Component} from 'react';
const styles = require('./styles.js')


class DataButton extends Component {

    render(){
        return (
            <View style={styles.action}>
                <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onpress} style={this.props.button_styles}>
                    <View>
                        <Text style={styles.actionText}>{this.props.text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

// AppRegistry.registerComponent('button', () => button);
module.exports = DataButton;