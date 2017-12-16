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
    textInputColor: "black",
    searchIcon: "black",
    arrowColor: "black",
    tabButtons: "white",
    tabRipple: "white",
    tabBG: "indigo",
    tabBars: "white",
    matchMessage: "indigo",
};

let styles = StyleSheet.create({
// LOADING SCREEN STYLE
    loadingScreen: {
        flex:1,
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",

    },

// LOGIN SCREEN STYLES
    loginContainer: {
        flex:1,
        justifyContent: "space-around", 
        backgroundColor: constants.backgroundColor,
        alignItems: "stretch",
        flexDirection: "column"
    },
    loginTitle: {
		fontFamily: 'CaviarDreams',
        fontSize: 45,
        textAlign: 'center',
        marginTop: "5%",
        flex:10,
        width: "100%",
        backgroundColor: "transparent"
    },
    loginTextInputContainer: {
        flex:11,
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        // margin: "2%"
    },

    loginTextInput:{
        textAlign: "center",
        backgroundColor: constants.textInputBG,
        color: constants.textInputColor,
        borderWidth:2,
        borderColor: constants.textInputBorder,      
        borderRadius: 0,  
        includeFontPadding: false,
        // margin: 5,
        fontSize: 25,
        width: "85%",
    },

    loginButtons: {
        flex:23,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: "5%",
    },

// SIGNUP SCREEN STYLES
    signupContainer: {
        flex:1,
        justifyContent: "space-around", 
        backgroundColor: constants.backgroundColor,
        alignItems: "stretch",
        flexDirection: "column"
    },
    signupTitle: {
        fontFamily: 'CaviarDreams',
        fontSize: 40,
        textAlign: 'center',
        flex:2,
        marginTop: "5%",
    },
    signupTextInputContainer: {
        flex:3,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    signupTextInput: {
        textAlign: "center",
        backgroundColor: constants.textInputBG,
        color: constants.textInputColor,
        borderWidth:2,
        borderColor: constants.textInputBorder,      
        borderRadius: 0,  
        includeFontPadding: false,
        // margin: 5,
        fontSize: 25,
        width: "85%",
    },
    signupButtons: {
        flex: 2,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
    },
// ME SCREEN STYLES
    meContainer: {
        flex:1,
        justifyContent: "flex-start", 
        backgroundColor: constants.backgroundColor,
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%"
    },
    meTitle: {
        fontFamily: 'CaviarDreams',
        fontSize: 60,
        textAlign: 'center',
        marginTop: "10%",
    },
    meSpacer: {
        height: "15%"
    },
    meButton: {
        transform: [{ scaleX: 3}, { scaleY: 3}]
    },

// PROFILE SCREEN STYLES
    profileContainer: {
        flex:1,
        justifyContent: "space-around", 
        backgroundColor: constants.backgroundColor,
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    profileName: {
        flex:1,
        fontFamily: 'CaviarDreams',
        fontSize: 40,
        textAlign: 'center',
        marginTop: "5%",
        width: "100%",
        backgroundColor: "transparent"
    },
    profilePhone: {
        flex:1,
        fontFamily: 'CaviarDreams',
        fontSize: 35,
        textAlign: 'center',
        width: "100%",
        backgroundColor: "transparent",
        color: constants.buttonBorder,
    },
    profileAbout: {
        flex:1,
        fontFamily: 'CaviarDreams',
        fontSize: 20,
        textAlign: 'center',
        width: "100%",
        backgroundColor: "transparent"
    },
    profileButtons: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        flex: 2
    },

// EDITPROFILE SCREEN STYLES
    editProfileContainer: {
        flex:1,
        justifyContent: "center", 
        backgroundColor: constants.backgroundColor,
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    editProfileInputs: {
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
        width: "100%",
        height: "35%",
        marginBottom: "10%",
    },
    editProfileTextInput: {
        textAlign: "center",
        backgroundColor: constants.textInputBG,
        color: constants.textInputColor,
        borderWidth:2,
        borderColor: constants.textInputBorder,      
        borderRadius: 0,  
        includeFontPadding: false,
        // margin: 5,
        fontSize: 20,
        width: "85%",
    },
    editProfileButtons: {
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "transparent",
        width: "100%",
        height: "15%"
    },

// FRIENDSLIST SCREEN STYLES

// ADDFRIEND SCREEN STYLES

// USERDETAIL SCREEN STYLES

// MATCHES SCREEN STYLES


    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: constants.backgroundColor,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: constants.backgroundColor,
        alignItems: "center"
    },
    inputContainer: {
        flex: 2,
        justifyContent: 'space-around',
        backgroundColor: constants.backgroundColor,
        alignItems: "center"
    },
    containerTop: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: constants.backgroundColor,
    },

    textinput : {
        textAlign: "center",
        backgroundColor: constants.textInputBG,
        color: "black",
        borderWidth:2,
        borderColor: constants.textInputBorder,      
        borderRadius: 0,  
        // margin: 5,
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
        // margin: 5,
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
        backgroundColor: constants.buttonText,
        borderColor: constants.buttonBorder,
        borderWidth: 4,
        paddingTop: 10,
        paddingBottom: 10,
        // margin: 5,
        borderRadius: 45,
        width: "75%",
    },
    secondaryButtonText: {
        color: constants.buttonBG,
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
        flex: 1,
        justifyContent: "space-around"
    // margin: 10
	},
});

module.exports = styles;
module.exports.constants = constants;
