import React from 'react'
import { View, Text, Image } from 'react-native'
import { Card, CardItem, Left, Body } from 'native-base';


const CardListBasic = ({ companyName, companyLogo, onSelect }) => {

  return (
    <View>
      <Card>
          <CardItem button onPress={onSelect}>
            { companyLogo ? (<Image source={{ uri: companyLogo }} resizeMode='contain' style={{ width:100, height:100 }} />) : (<Image source={ require('../../images/avatar.png') } resizeMode='contain' style={{ width:100, height:100 }} />) }
          
              <Body style={{ justifyContent:'center', padding:5 }}>
                    <Text>{ companyName }</Text>
              </Body>
          </CardItem>
      </Card>
    </View>
  )
}

export default CardListBasic
