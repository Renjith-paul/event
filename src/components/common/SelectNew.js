import React from 'react'
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native'
import { Label, Picker, Item } from 'native-base';
import I18n from 'react-native-i18n';

const width= Dimensions.get('window').width

renderList = (datas, selected, defaultText) => {
    if(datas){
        if(Platform.OS=='android')
        {
            sortList = datas.sort(function(a, b) {
                
                return a.id == selected ? -1 : b.id == selected ? 1 : 0;
            });
            return(
                sortList.map(list => (
                    <Picker.Item style={ styles.labelStyle } key={ list.id } label={ I18n.locale=='en' ? list.names : list.arabic } value= { list.id } />
                ))
            )
        }
        else{
            return(
                datas.map(list => (
                    <Picker.Item style={ styles.labelStyle } key={ list.id } label={ list.names } value= { list.id } />
                ))
            )
        }
        
    }
}

const SelectNew = ({ labelText, datas, selected, valueChanged, errorText, defaultText }) => {
  return (
      <View style={{ padding:5, width: width }}>
        <Label style={ styles.labelStyle }>
            { labelText }
        </Label>
        <Item regular>
        <Picker
            note
            mode="dropdown"
            style={{ width: width, transform: [
                { scaleY: 1.5 },
             ] }}
            selectedValue={selected}
            defaultLabel={defaultText}
            onValueChange={valueChanged}
            placeholder={defaultText}
        >
            { this.renderList(datas, selected,defaultText ) }
        </Picker>
        </Item>
        <Label style={ styles.errorLabel }>{errorText}</Label>
    </View>
  )
}

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 26,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#2b3744"
    },
    errorLabel: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "red"
    }
})

export default SelectNew
