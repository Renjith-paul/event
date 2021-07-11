import React from 'react'
import { View, Text,  StyleSheet } from 'react-native'
import { Label, Textarea, Item } from 'native-base'

const LargeText = ({textChange, value, length, labelText, errorText}) => {
  return (
    <View style={{ padding: 20 }}>
        <Item regular>
            <Textarea 
                rowSpan={3}
                onChangeText={ textChange } 
                value= { value } 
                style={ styles.labelStyle }
                maxLength={length} 
                placeholder={labelText}
            />
         </Item>
         <Label style={ styles.errorLabel }>{errorText}</Label>
    </View>
  )
}

const styles = StyleSheet.create({
      labelStyle: {
        fontSize: 16,
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#2b3744",
        width:'100%'
    },
    errorLabel: {
      fontSize: 12,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "red"
  }
})

export default LargeText
