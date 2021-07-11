import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import TextInput1 from './components/common/TextInput1'
import { Container, Content, Button, Spinner } from 'native-base'
import { loginUser, inputChanged, saveDatas } from './actions'
import OneSignal from 'react-native-onesignal';
import Reactotron from 'reactotron-react-native'
import BackgroundTimer from 'react-native-background-timer';

class Login extends Component {

    constructor(properties) {
        super(properties);
        OneSignal.init("7d9f9f5a-93a0-44ff-a2fb-2f5b5beff3df");
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        BackgroundTimer.runBackgroundTimer(() => { 
            this.props.saveDatas()
          }, 
          1000);
      }

      componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
      }

      onReceived(notification) {
        Reactotron.log("Notification received: ", notification);
      }

      
    
      onOpened(openResult) {
        Reactotron.log('Message: ', openResult.notification.payload.body);
        Reactotron.log('Data: ', openResult.notification.payload.additionalData);
        Reactotron.log('isActive: ', openResult.notification.isAppInFocus);
        Reactotron.log('openResult: ', openResult);
      }
    
      onIds(device) {
        Reactotron.log('Device info: ', device);
      }

    loginUser(){
        this.props.loginUser({ username: this.props.username, password: this.props.password })
    }


    renderButton(){
        return(
          <View style={{ padding: 10 }}>
              {
                this.props.buttonLoading ? (
                    <Button rounded  style={ styles.buttonStyle }>
                        <Spinner color="red" />
                    </Button>
                ) : (
                    <Button rounded  style={ styles.buttonStyle }
                        onPress={ ()=> this.loginUser() }>
                        <Text style={ styles.login }>Login</Text>
                    </Button>
                )
            }
          </View>
        )
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#fff" barStyle="light-content" />
                <Content contentContainerStyle={{flex:1, justifyContent:'center', padding: 20}} keyboardShouldPersistTaps="always">
                    <View style={{ flexDirection:'row' }}>
                    <View style={{ flex: 0.5 }}>
                        <TextInput1 
                            textChange={(value)=>this.props.inputChanged({ prop: 'username', value, error:"usernameError" })}
                            value={ this.props.username }
                            length={50}
                            labelText="Username"
                            errorText={this.props.usernameError}
                        />
                    </View>
                    <View style={{ flex: 0.5 }}>
                    <TextInput1
                        textChange={(value)=>this.props.inputChanged({ prop: 'password', value, error: "passwordError" })}
                        value={ this.props.password }
                        length={50}
                        labelText="Password"
                        secretText
                        errorText={this.props.passwordError}
                    />
                    </View>
                    </View>
                    { this.renderButton() }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        width: 315,
        height :58,
        backgroundColor: '#29AAE3',
        alignItems:'center',
        justifyContent:'center'
    },
    login : {
        fontSize: 26,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#fff",
    },
})

const mapStateToProps = ({auth}) => {
    const { username, password, usernameError, passwordError, buttonLoading } = auth
    return { username, password, usernameError, passwordError, buttonLoading }
}

const mapDispatchToProps = {
    loginUser, inputChanged, saveDatas
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
