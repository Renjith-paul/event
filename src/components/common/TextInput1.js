import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Item, Input, Label } from 'native-base'

const TextInput1 = ({textChange, value, length, keyboardType, prefix, labelText, errorText, editableValue, secretText, autoFocus}) => {
  return (
    <View style={{ paddingLeft:5, paddingRight:5 , paddingTop:1 }}>
        <Item floatingLabel>
        <Label style={styles.labelStyle}>{ labelText }</Label>
            <Input 
                style={styles.labelStyle}
                onChangeText={ textChange } 
                value= { value } 
                maxLength={length} 
                //placeholderTextColor='white'
                secureTextEntry={secretText}
                keyboardType={ keyboardType }
                editable={editableValue}
                placeholder={labelText}
                autoFocus={autoFocus}
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
        lineHeight: 26,
        paddingTop: 5, // <-- Add this
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

export default TextInput1
