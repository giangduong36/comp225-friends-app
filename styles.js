const React = require('react-native');
const {StyleSheet} = React;

const constants = {
    buttonBorder: 'indigo',
    buttonBG: "black",
    buttonText: "white",
    headerColor: "indigo",
    headerText: "white",
    headerButtons: "white",
    backgroundColor: "white",
    textInputBG: "white",
    textInputBorder: "black",
    searchIcon: "black",
    arrowColor: "black",
    tabButtons: "white",
    tabRipple: "white",
    tabBG: "indigo",
    tabBars: "white",
    matchMessage: "indigo",
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: constants.backgroundColor,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: constants.backgroundColor,
        alignItems: "center"
    },
    containerTop: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: constants.backgroundColor,
    },

    welcome: {
		fontFamily: 'CaviarDreams',
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },

    loginTextInput:{
        textAlign: "center",
        backgroundColor: constants.textInputBG,
        color: "black",
        borderWidth:2,
        borderColor: constants.textInputBorder,      
        borderRadius: 0,  
        margin: 5,
        fontSize: 25,
        width: "85%",
    },

    textinput : {
        textAlign: "center",
        backgroundColor: constants.textInputBG,
        color: "black",
        borderWidth:2,
        borderColor: constants.textInputBorder,      
        borderRadius: 0,  
        margin: 5,
        fontSize: 25,
        width: "85%",
    },
    text: {
        color: "black",
        fontFamily: "CaviarDreams",
        fontSize: 20,
        textAlign: "center",
    },
    primaryButton: {
        backgroundColor: constants.buttonBG,
        borderColor: constants.buttonBorder,
        borderWidth: 4,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5,
        borderRadius: 45,
        width: "75%",
    },
    primaryButtonText: {
        color: constants.buttonText,
		fontFamily: 'CaviarDreams',
        fontSize: 30,
        textAlign: 'center',
    },
    secondaryButton: {
        backgroundColor: constants.buttonBG,
        borderColor: constants.buttonBorder,
        borderWidth: 4,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 5,
        borderRadius: 45,
        width: "75%",
    },
    secondaryButtonText: {
        color: constants.buttonText,
		fontFamily: 'CaviarDreams',
        fontSize: 30,
        textAlign: 'center',
    },

    listview: {
        flex: 1,
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: '#333',
        fontSize: 16,
    },
    navbar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 44,
        flexDirection: 'row'
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500"
    },
    statusbar: {
        backgroundColor: '#fff',
        height: 22,
    },
    center: {
        textAlign: 'center',
    },
	//https://facebook.github.io/react-native/docs/handling-touches.html#content
	buttonContainer: {
    margin: 10
	},
});

module.exports = styles;
module.exports.constants = constants;
