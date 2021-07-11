import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Item, Icon, Label } from 'native-base';

const ImageInput = ({imagePress, labelText}) => {
  return (
    <View  style={ styles.itemStyleNew } >
        <Item  regular  onPress={imagePress}>
            <Icon  name='camera' style={{ alignSelf:'center', fontSize: 50 }} />
        </Item>
        <Label style= { styles.textStyle }>{labelText}</Label>
    </View> 
  )
}

const styles = StyleSheet.create({
    textStyle: {
      color: '#2b3744',
      fontSize: 16,
      fontWeight: '400',
      paddingBottom:10,
      textAlign:'center',
      justifyContent:'center'
    },
    itemStyleNew: {
        height: 90,
        borderColor: '#979797',
        borderStyle: 'dashed',
        borderWidth: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'center', 
        alignItems: 'center', 
        width:'100%',
        paddingLeft:20,
        paddingRight:20
    },
})

export default ImageInput
