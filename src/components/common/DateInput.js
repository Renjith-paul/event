import React from 'react'
import { View, StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Item, Label } from 'native-base';

const DateInput = ({ selecteddate, mode, placeHolder, formats, minimum, onDateChanged, labelText, errorText  }) => {
  return (
    <View style={{ padding:5 }}>
       <Label style={ styles.labelStyle }>
            { labelText }
        </Label> 
        <Item regular>
        <DatePicker
            date={ selecteddate }
            mode={mode}
            style={{ width:'100%' }}
            placeholder={placeHolder}
            format={ formats }
            minDate={minimum}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                alignItems:'flex-start',
                marginLeft: 5,
                borderWidth:0
            }
            }}
            onDateChange={onDateChanged}
            />
        </Item>
        <Label style={ styles.errorLabel }>{errorText}</Label>
    </View>
  )
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#2b3744"
    },
    errorLabel: {
        fontSize: 10,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "red"
    }
})

export default DateInput
