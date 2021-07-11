import { 
    AUTH_INPUT_CHANGED,
    INVITATIONS,
    INVITATION_DETAILS,
    CLEAR_INVITATION_DETAILS,
    API_URL,
    USER_DATA 
} from './types'

import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import Reactotron from 'reactotron-react-native'
import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { Platform } from 'react-native'
import { RNUSBPrinter } from 'react-native-usb-printer';
import moment from 'moment';


const userData=[{id: 1, name: 'Renjith', email: 'renjithcse041@gmail.com','password': '222renjith*'},{id: 1, name: 'Renjith', email: 'renjithcse041@gmail.com','password': '222renjith*'},{id: 1, name: 'Renjith', email: 'renjithcse041@gmail.com','password': '222renjith*'},{id: 1, name: 'Renjith', email: 'renjithcse041@gmail.com','password': '222renjith*'}];




export const saveDatas = () => {
    return{
        type: USER_DATA,
        payload: userData
    }
}


if(Platform.OS=='android'){
    //EscPos.setConfig({ type: "network" });
    //RNUSBPrinter.connectPrinter(26728, 512);
    RNUSBPrinter.connectPrinter(4070, 33054);
}

const printPass = async (data) => {
    console.log({data})
        const { firstName, lastName, qrCode, companyName, designation} = data
        const design = ` 
{C} {H2} {B} ${firstName} ${lastName}    
{C}${designation}           
------------------------------------------
{C} {H2}${companyName}
------------------------------------------
{QR} ${qrCode}
------------------------------------------
`;
await RNUSBPrinter.printDesign(design);
}


export const inputChanged = ({prop,value}) => {
    return {
        type: AUTH_INPUT_CHANGED,
        payload: { prop, value }
    }
}

export const loginUser = ({username, password}) => {
    return(dispatch)=>{
        if(username && password){
            dispatch({
                type: AUTH_INPUT_CHANGED,
                payload: { prop: 'buttonLoading', value: true }
            })
            NetInfo.isConnected.fetch().then(isConnected => {
                if(isConnected){
                    OneSignal.getPermissionSubscriptionState((status) => {
                        Reactotron.log(status);
                        var formData = new FormData();
                        formData.append('username', username);
                        formData.append('password', password);
                        formData.append('registrationId',status.pushToken);
                        formData.append('playerId',status.userId);
                        axios({
                            method: 'post',
                            url: API_URL.api+'devLogin',
                            data: formData,
                            config: { headers: {'Content-Type': 'multipart/form-data' }}
                        }).then(res => {
                            const { primaryId, userId, loginToken, serverTime } = res.data
                            currentTime=moment().unix()
                            difference=serverTime-currentTime
                            user=res.data
                            user['timeDiff']=difference
                            //Reactotron.log("user",currentTime,user)
                            dispatch({
                                type: AUTH_INPUT_CHANGED,
                                payload: { prop: 'user', value: user }
                            })
                            dispatch(getEvents({ primaryId, userId, loginToken }))
                            /*dispatch({
                                type: AUTH_INPUT_CHANGED,
                                payload: { prop: 'buttonLoading', value: false }
                            })*/
                            //Actions.replace('home')
                        })
                        .catch((err) => {
                            Reactotron.log("get Invitation Error", err)
                        })
                    })
                }
                else{
                    Toast.show({ text: 'No internet Connection. Please check your internet connection and continue', position:'bottom', type: 'danger', duration: 5000, style: { bottom: "25%" } })
                }
            })
        }
        else{
            if(!username){
                dispatch({
                    type: AUTH_INPUT_CHANGED,
                    payload: { prop: 'usernameError', value: 'Username required' }
                })
            }
            if(!password){
                dispatch({
                    type: AUTH_INPUT_CHANGED,
                    payload: { prop: 'passwordError', value: 'Password required' }
                })
            }
        }
    }
}

export const getEvents = ({ primaryId, userId, loginToken }) => {
    return(dispatch)=>{
        var formData = new FormData();
        formData.append('primaryId', primaryId);
        formData.append('userId', userId);
        formData.append('loginToken',loginToken);
        axios({
            method: 'post',
            url: API_URL.api+'eventSync',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(res => {
            dispatch({
                type: AUTH_INPUT_CHANGED,
                payload: { prop: 'buttonLoading', value: false }
            })
            dispatch({
                type: AUTH_INPUT_CHANGED,
                payload: { prop: 'events', value: res.data }
            })
            Actions.replace('home')
        })
        .catch((err) => {
            Reactotron.log("get Invitation Error", err)
        })
    }
}

export const getAllInvitations = ({eventId, userId, primaryId, loginToken, eventName}) => {
    return(dispatch)=>{
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected){
                dispatch({
                    type: AUTH_INPUT_CHANGED,
                    payload: { prop: 'selectedEvent', value: eventId }
                })
                dispatch({
                    type: AUTH_INPUT_CHANGED,
                    payload: { prop: 'eventName', value: eventName }
                })
                dispatch({
                    type: AUTH_INPUT_CHANGED,
                    payload: { prop: 'eventLoading', value: true }
                })
                var formData = new FormData();
                formData.append('primaryId', primaryId);
                formData.append('userId', userId);
                formData.append('loginToken',loginToken);
                formData.append('eventId',eventId);
                axios({
                    method: 'post',
                    url: API_URL.api+'guestSync',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(res => {
                    dispatch({
                        type: INVITATIONS,
                        payload: res.data
                    })
                    Actions.replace('dash')
                })
                .catch((err) => {
                    Reactotron.log("get Invitation Error", err)
                })
            }
            else{
                Toast.show({ text: 'No internet Connection. Please check your internet connection and continue', position:'bottom', type: 'danger', duration: 5000, style: { bottom: "25%" } })
            }
        })
    }
}

export const getInvitationDetails = (invitationCode) => {
    return(dispatch)=>{
        Reactotron.log(invitationCode)
        dispatch({
            type: INVITATION_DETAILS,
            payload: invitationCode
        })
        
    }
}

export const clearInvitationDetails = () =>{
    return{
        type: CLEAR_INVITATION_DETAILS
    }
}

export const confirmGuest = ({ primaryId, userId, loginToken, invitation, selectedEvent, timeDiff}) => {
    return(dispatch)=>{
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected){
                dispatch({
                    type: AUTH_INPUT_CHANGED,
                    payload: { prop: 'buttonLoading', value: true }
                })
                var formData = new FormData();
                formData.append('primaryId', primaryId);
                formData.append('userId', userId);
                formData.append('loginToken',loginToken);
                formData.append('eventId',selectedEvent);
                formData.append('registrationId',invitation.uid);
                formData.append('inTime',parseInt(moment().unix())+parseInt(timeDiff))
                axios({
                    method: 'post',
                    url: API_URL.api+'checkIn',
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(res => {
                    dispatch({
                        type: AUTH_INPUT_CHANGED,
                        payload: { prop: 'buttonLoading', value: false }
                    })
                    printPass(invitation)
                    dispatch(clearInvitationDetails())
                })
                .catch((err) => {
                    Reactotron.log("get Invitation Error", err)
                })
            }
            else{
                Toast.show({ text: 'No internet Connection. Please check your internet connection and continue', position:'bottom', type: 'danger', duration: 5000, style: { bottom: "25%" } })
            }
        })
    }
}