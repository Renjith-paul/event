import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Item, Input, Label } from 'native-base'

const width=Dimensions.get('window').width;

const TextInput = ({textChange, value, length, keyboardType, prefix, labelText, errorText, editableValue, secretText, itemStyle}) => {
  return (
    <View  style={ itemStyle ? itemStyle: { paddingLeft:5, paddingRight:5 , width:width }}>
        <Item regular>
            <Label>{ prefix }</Label>
            <Input 
                style={styles.labelStyle}
                onChangeText={ textChange } 
                value= { value } 
                maxLength={length} 
                secureTextEntry={secretText}
                keyboardType={ keyboardType }
                editable={editableValue}
                placeholder={labelText}
            />
        </Item>
        <Label style={ styles.errorLabel }>{errorText}</Label>
    </View>
  )
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 26,
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#2b3744",
        lineHeight: 26 * 0.85,
        paddingTop: 1, // <-- Add this
        width:'100%',
        justifyContent:'center'
    },
    errorLabel: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "red"
    }
})

export default TextInput
