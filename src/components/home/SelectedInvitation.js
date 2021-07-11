import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import Reactotron from 'reactotron-react-native'
import { confirmGuest } from '../../actions'

class SelectedInvitation extends Component {

    printPass(){
        const { primaryId, userId, loginToken, timeDiff } = this.props.user
        const { selectedEvent } = this.props;
        this.props.confirmGuest({ primaryId, userId, loginToken, invitation: this.props.selectedInvitation[0], selectedEvent, timeDiff})
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
                        onPress={ ()=> this.printPass() }>
                        <Text style={ styles.login }>Print</Text>
                    </Button>
                )
            }
          </View>
        )
    }

    render() {
        const { firstName, lastName, companyName, designation } = this.props.selectedInvitation[0]
        Reactotron.log({ firstName, lastName, companyName, designation, selected: this.props.selectedInvitation })
        return (
            <View style={{ flexDirection:'column' }}>
                <View style={{ flexDirection: 'row', minHeight: 60 }}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={ styles.labelStyle }>Guest Name</Text>
                    </View>
                    <View style={{ flex: 0.05 }}>
                        <Text style={ styles.labelStyle }>:</Text>
                    </View>
                    <View style={{ flex: 0.55 }}>
                        <Text style={ styles.labelStyle }>{firstName} {lastName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', minHeight: 60 }}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={ styles.labelStyle }>Company Name</Text>
                    </View>
                    <View style={{ flex: 0.05 }}>
                        <Text style={ styles.labelStyle }>:</Text>
                    </View>
                    <View style={{ flex: 0.55 }}>
                        <Text style={ styles.labelStyle }>{companyName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', minHeight: 60 }}>
                    <View style={{ flex: 0.4 }}>
                        <Text style={ styles.labelStyle }>Designation</Text>
                    </View>
                    <View style={{ flex: 0.05 }}>
                        <Text style={ styles.labelStyle }>:</Text>
                    </View>
                    <View style={{ flex: 0.55 }}>
                        <Text style={ styles.labelStyle }>{designation}</Text>
                    </View>
                </View>
                { this.renderButton() }
            </View>
        )
    }
}

var styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        width: 315,
        height :58,
        backgroundColor: '#29AAE3',
        alignItems:'center',
        justifyContent:'center',
        color:'#fff'
    },
    labelStyle: {
        fontSize: 26,
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#2b3744",
        lineHeight: 26 * 0.95,
        paddingTop: 1, // <-- Add this
        width:'100%',
        justifyContent:'center', 
    },
    login : {
        fontSize: 26,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: "#fff",
        
    },
  });

const mapStateToProps = ({auth}) => {
    const { selectedInvitation, user, selectedEvent } = auth
    Reactotron.log("selectedEvent", selectedEvent)
    return { selectedInvitation, user, selectedEvent }
}

const mapDispatchToProps = {
    confirmGuest
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedInvitation)
