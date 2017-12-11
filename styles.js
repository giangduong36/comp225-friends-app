const React = require('react-native');
const {StyleSheet} = React;

const constants = {
    actionColor: 'deepskyblue'
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    containerTop: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },

    welcome: {
		fontFamily: 'CaviarDreams',
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },

    textinput : {
        textAlign: "center",
        backgroundColor: "lightgray",
        color:"black",
        borderWidth:1,
        borderColor:"black",        
        // height: 30,
    },
    actionText: {
        color: 'black',
		fontFamily: 'CaviarDreams',
        fontSize: 20,
        textAlign: 'center',
    },
    action: {
        backgroundColor: constants.actionColor,
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
        margin: 5,
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
