import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';


class SortMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.setPickerValue = this.setPickerValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setPickerValue(itemvalue) {
        this.setState({ value: itemvalue });

    }

    onSubmit() {
        let { value } = this.state
        if (value == 0) {
            alert("Please select Value")
        } else {
            this.props.onSubmit(value)
        }
    }

    render() {
        let { value } = this.state;
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={value}
                    style={styles.picker}
                    onValueChange={(val) => this.setPickerValue(val)}>
                    <Picker.Item label="Sort By" value="0" />
                    <Picker.Item label="Price" value="price" />
                    <Picker.Item label="Size" value="size" />
                    <Picker.Item label="ID" value="id" />
                </Picker>
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
        flex: 1
    },
    button: {
        backgroundColor: '#00BFFF',
        paddingVertical: 10,
        margin: 10,
        flex: 1
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    }
};

export default SortMenu;