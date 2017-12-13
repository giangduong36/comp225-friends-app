'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';

const styles = require('../../styles.js')
const constants = styles.constants;

import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

class ActionButton extends Component {
    render() {
        return (
            <View style={styles.action}>
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={this.props.onPress}>
                    <View>
                        <Text style={styles.actionText}>{this.props.title}</Text>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}

module.exports = ActionButton;