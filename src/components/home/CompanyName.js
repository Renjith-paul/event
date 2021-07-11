import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

const width=Dimensions.get('window').width

const CompanyName = ({ companyLogo, companyName }) => {
  return (
    <View style={{ alignSelf:'center', flexDirection:'row', height:110, paddingLeft:20, paddingRight:20 }}>
        <View style={{ flex: 0.2 }}>
          <Image source={{ uri: companyLogo  }} 
            resizeMode="contain" style={{ width: 150, height: 100 }} />
        </View>
        <View style={{ flex: 0.8, alignItems:'center', justifyContent:'center' }}>
          <Text style={{ fontSize: 24, fontWeight:'bold', color: 'black', textAlign:'center' }}>{ companyName }</Text>
        </View>
      </View>
  )
}

export default CompanyName
