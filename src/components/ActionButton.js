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
    static propTypes = {
        buttonStyle: View.propTypes.style,
        buttonTextStyle: Text.propTypes.style,
    }

    render() {
        const {buttonStyle, buttonTextStyle} = this.props
        return (
            <View style={buttonStyle}>
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={this.props.onPress}>
                    <View>
                        <Text style={buttonTextStyle}>{this.props.title}</Text>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}

module.exports = ActionButton;