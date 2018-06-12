import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, ActionSheetIOS, Platform } from 'react-native';

var BUTTONS = [
    'Price',
    'Size',
    'ID',
    'Cancel',
];
var CANCEL_INDEX = 4;
class SortMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            clicked: ''
        };
        this.setPickerValue = this.setPickerValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setPickerValue(itemvalue) {
        this.setState({ value: itemvalue });

    }

    onSubmit() {
        let { value } = this.state
        if (value == 'Cancel') {
            alert("Please select Value")
        } else {
            value = value.toLowerCase();
            this.props.onSubmit(value)
        }

    }
    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
        },
            (buttonIndex) => {
                this.setState({ value: BUTTONS[buttonIndex] });
            });
    }
    renderPicker() {
        let { value } = this.state;
        return (
            <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={(val) => this.setPickerValue(val)}>
                <Picker.Item label="Sort By" value="Cancel" />
                <Picker.Item label="Price" value="price" />
                <Picker.Item label="Size" value="size" />
                <Picker.Item label="ID" value="id" />
            </Picker>
        )
    }
    renderActionList() {
        let { value } = this.state;
        return (
            <TouchableOpacity style={styles.picker} onPress={() => this.showActionSheet()}>
                <Text style={styles.textStyle}>
                    {value && value != 'Cancel' ? value : "Sort by"}
                </Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {Platform.OS == 'ios' ? this.renderActionList() : this.renderPicker()}
                <TouchableOpacity onPress={this.onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Sort</Text>
                </TouchableOpacity>
            </View>

        );

    }
}

const styles = {
    container: {
        height: 60,
        width: '95%',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        margin: 10,
        backgroundColor: '#FFF'
    },
    picker: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#00BFFF',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        height: 50,
        flex: 1
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    textStyle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    }
};

export default SortMenu;