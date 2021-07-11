import { 
    AUTH_INPUT_CHANGED,
    INVITATIONS,
    INVITATION_DETAILS,
    CLEAR_INVITATION_DETAILS,
    USER_DATA 
} from '../actions/types'
import Reactotron from 'reactotron-react-native'
import { Toast } from 'native-base'

const INITIAL_STATE = { 
    username:'',
    password:'',
    checkin: false,
    selectedEvent: '',
    eventLoading: false,
    invitations: null,
    selectedInvitation: null,
    showInitationDetails: false,
    invitationCode: '',
    buttonLoading: false,
    user: null,
    events: null,
    eventName: '',
    userDatas: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type)
    {

        case AUTH_INPUT_CHANGED:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }

        case INVITATIONS:
            return{
                ...state,
                invitations: action.payload,
                eventLoading: false
            }

        case USER_DATA:
            Reactotron.log(state.userDatas);
            return{
                ...state,
                userDatas: state.userDatas ? [ ...state.userDatas, ...state.userDatas, ...action.payload ] : [ ...action.payload ]
            }

        case INVITATION_DETAILS:
            
            invitationCode=action.payload
            filter=state.invitations.filter((invitation)=>{
                return invitation.qrCode==action.payload
            })
            //Reactotron.log(filter)
            if(filter.length>0){
                return{
                    ...state,
                    selectedInvitation: filter,
                    showInitationDetails: true
                }
            }
            else{
                Toast.show({ text: 'Please check your invitation code and try again', position:'bottom', type:'warning', style: { bottom:'10%' } })
                return{
                    ...state,
                    selectedInvitation: null,
                    showInitationDetails: false,
                    invitationCode: '',
                }
                
            }

        case CLEAR_INVITATION_DETAILS:
            return {
                ...state,
                showInitationDetails: false,
                selectedInvitation: null,
                invitationCode: '',
                checkin: false,
                buttonLoading: false
            }

        default:
            return state
    }
}