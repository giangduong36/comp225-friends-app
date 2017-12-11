import React, {Component} from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
// From https://stackoverflow.com/questions/29685421/react-native-hide-keyboard
// and https://medium.com/@bosung90/use-higher-order-component-in-react-native-df44e634e860

const styles = require("../../styles.js")

export default (Comp) => {
    return ({ children, ...props }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Comp {...props}>
            {children}
          </Comp>
        </TouchableWithoutFeedback>
    );
};

