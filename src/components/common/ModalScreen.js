import React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Text, Item, Label, Right, Body } from 'native-base'
import LinearGradient from 'react-native-linear-gradient';

const ModalScreen = ({hideModal, visibleModal, children, modalClose, TitleText}) => {
  return (
    <Modal
          animationType="slide"
          transparent={true}
          style= {{ height:500 }}
          visible={visibleModal}
          onRequestClose={()=> console.log("Modal Closed")}>
          <View style={ styles.mainModal }>
            <View style={ styles.subModal }>
              <View style={{ flexDirection:'row' }}>
                  <Item inlineLabel style={{ flex:0.9, alignItems:'center', justifyContent:'center' }}>
                  <Label style={ styles.titleStyle }>{TitleText}</Label>
                  </Item>
                  { hideModal ? (
                    <Item inlineLabel style={{ flex:0.1, alignItems:'flex-end' }}>
                    <Button transparent 
                      style={{ flexDirection:'row', alignSelf:'flex-end' }}
                      onPress={ hideModal }
                    >
                      <Icon name='close' style={{ fontSize:20, color:'#387eee', paddingRight:20 }} />
                    </Button>
                  </Item>
                  ) : null }
                  
              </View>
              { children }
              { modalClose ? (
                <Button transparent 
                onPress={ modalClose }
                style={{ alignItems:'center', alignSelf:'center', paddingBottom:20 }}
                >
                <LinearGradient style={{ height:48, alignContent:'center', justifyContent:'center', width:230, borderRadius: 4 }} start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={['#387eee', '#c86dd7']} >
                        <Text style={ styles.buttonTest }>
                            Submit
                        </Text>
                    </LinearGradient>
                </Button>
              ) : null }
              
            </View>
          </View>
        </Modal>
  )
}

const styles = StyleSheet.create({
    titleStyle: {
      fontSize: 16,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#c86dd7",
      textAlign:'center',
      alignSelf:'center'
    },
    mainModal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        shadowOpacity:0.6,
        alignItems: 'center'
    },
    subModal : {
        position:'absolute',
        borderRadius:20,
        top:40,
        left: 5,
        right:5, 
        bottom:0,
        backgroundColor:'white'
    },
    buttonTest: {
      fontSize: 16,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#ffffff",
      textAlign:'center'
  }
})

export default ModalScreen
