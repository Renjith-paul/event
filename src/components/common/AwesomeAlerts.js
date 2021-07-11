import React from 'react'
import { View, Text } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';

const AwesomeAlerts = ({showAlert, AlertTitle, AlertMessage, cancelAction, confirmAction}) => {
  return (
    <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={AlertTitle}
        message={AlertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onCancelPressed={cancelAction}
        onConfirmPressed={confirmAction}
    />
  )
}

export default AwesomeAlerts
