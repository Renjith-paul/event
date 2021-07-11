import React from 'react'
import { View, Text } from 'react-native'
import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage';
import RNLockTask from 'react-native-lock-task';
import { Provider } from 'react-redux'
import Router from './Router'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Root } from 'native-base'

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: "React Native Demo"
  })
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: { // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/
    },
    editor: false, // there are more options to editor
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();

  //RNLockTask.clearDeviceOwnerApp();

  

const App = () => {
    return (
      <Provider store= { createStore(reducers, {}, applyMiddleware(ReduxThunk)) }>
          <Root>
            <Router />
          </Root>
      </Provider>
    )
}

export default App
