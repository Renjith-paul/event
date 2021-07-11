import React from 'react'
import { View, Text } from 'react-native'

import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';



const PhoneInput = () => {
  return (
    <View>
      <PhoneInput
          textStyle={{ fontSize: 18 }}
          style={{ fontSize: 18 }}
          ref={(ref) => {
            this.phone = ref;
          }}
          onPressFlag={ () => this.onPressFlag}
        />

        <CountryPicker
          ref={(ref) => {
            this.countryPicker = ref;
          }}
          onChange={value => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}
        >
          <View />
        </CountryPicker>
    </View>
  )
}

export default PhoneInput
