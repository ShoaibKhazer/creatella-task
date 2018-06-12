
import React, { Component } from 'react';
import { Text, View } from 'react-native';


const Header = (props) => {
    const { container, textStyle } = styles;

    return (
        <View style={container}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};


const styles = {
    container: {
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },

    textStyle: {
        fontSize: 20,
        color: '#fff'
    }

}


export default Header;
