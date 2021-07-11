import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Label, Picker, Item } from 'native-base';

const width= Dimensions.get('window').width

const Select = ({ labelText, children, selected, valueChanged, errorText }) => {
  return (
    <View style={{ padding:5 }}>
        <Label style={ styles.labelStyle }>
            { labelText }
        </Label>
        <Item regular>
        <Picker
            note
            mode="dropdown"
            style={{ width: width }}
            selectedValue={selected}
            onValueChange={valueChanged}
        >
            { children }
        </Picker>
        </Item>
        <Label style={ styles.errorLabel }>{errorText}</Label>
    </View>
  )
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#2b3744"
    },
    errorLabel: {
        fontSize: 12,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "red"
    }
})



export default Select
