import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { StyleSheet } from 'react-native'
import { Header, Left, Button, Body, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';


const GradientHeader = ({headerTitle, headerColor1, headerColor2, backAction, headerRight}) => {
  headerColor2= headerColor2 ? headerColor2: headerColor1
  return (
    <View>
      <StatusBar hidden />
       <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={[headerColor1, headerColor2]} > 
            <Header style={{
                backgroundColor: 'transparent', 
                elevation: 0,             // Remove shadow on Android
                shadowOpacity: 0,         // Remove shadow on iOS
                paddingLeft: 30,
                paddingRight:30
            }}>
              { backAction ? (<Left>
                <Button transparent onPress={backAction}>
                <FontAwesome5 name={'chevron-left'} style={{ fontSize:30, color: 'white'}}  />
                </Button>
            </Left>) : null }
            
            <Body>
                <Title style= { styles.headerTextStyle }>{headerTitle}</Title>
            </Body>
            <Right>
                { headerRight ? (<Button transparent onPress={headerRight}>
                <FontAwesome5 name={'sign-out-alt'} style={{ fontSize:20, color: 'white'}}  />
                </Button>) : null }
            </Right>
            </Header>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    headerTextStyle: {
      color: '#ffffff',
      fontSize: 26,
      fontWeight: '700',
    }
})


export default GradientHeader
