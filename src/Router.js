import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import Login from './Login'
import Home from './components/home/Home'
import Events from './components/home/Events'

class RouterComponent extends Component {
    render() {
      return (
        <View style={{ flex:1 }}>
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="auth" initial  type="reset">
                        <Scene key='login'   component={ Login }  title="Login" hideNavBar />
                    </Scene>
                    <Scene key="home" type="reset" >    
                        <Scene key="Events" initial component={ Events } hideNavBar /> 
                        <Scene key="dash" component={ Home } hideNavBar />
                    </Scene>
                </Scene>
            </Router>
        </View>)
    }
}
export default RouterComponent
        