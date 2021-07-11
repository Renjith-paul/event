import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ buttonAction, buttonText, buttonColor1, buttonColor2, width }) => {
  buttonColor2= buttonColor2 ? buttonColor2 : buttonColor1
  return (
    <View style={{ padding:5 }}>
        <Button transparent 
            onPress={ buttonAction }
            style={{ alignItems:'center', alignSelf:'center', paddingBottom:20, paddingTop:20 }}
            >
            <LinearGradient style={{ height:48, alignContent:'center', justifyContent:'center',  borderRadius: 4, width: width }} start={{x: 1, y: 0}} end={{x: 0, y: 0}} 
            colors={[buttonColor1, buttonColor2]} >
                <Text style={ styles.buttonTest }>
                    {buttonText ? buttonText : "Submit" }
                </Text>
            </LinearGradient>
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonTest: {
      fontSize: 26,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#ffffff",
      textAlign:'center'
  }
})

export default GradientButton
