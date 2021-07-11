import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet, Dimensions, Keyboard, Modal, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import YouTube from 'react-native-youtube'
import VideoPlayer from 'react-native-video-controls';
import { Container, Header, Body, Title, Right, Button, Content, Toast } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CompanyName from './CompanyName';
import TextInput1 from '../common/TextInput1';
import { inputChanged, getInvitationDetails, clearInvitationDetails } from '../../actions'
import SelectedInvitation from './SelectedInvitation';
import Icon from 'react-native-vector-icons/FontAwesome';

let height= Dimensions.get('window').height;

class Home extends Component {

    async goBack(){
        if(this.props.checkin){
            await this.props.inputChanged({ prop:'checkin', value: false })
        }
        
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }
    
      handleBackPress = () => {
        this.goBack(); // works best when the goBack is async
        return true;
      }

    renderButton(){
        return(
          <View style={{ padding: 10 }}>
            <Button full  style={ styles.buttonStyle }
            onPress={ ()=> this.props.inputChanged({ prop:'checkin', value: true }) }>
              {this.props.buttonLoading ? (<Spinner color="red" />): (<Text style={ styles.login }>Check In</Text>)}
            </Button>
          </View>
        )
    }

    getInvitationDetails(value){
        if(value.length==10){
            this.props.getInvitationDetails(value)
        }
        else if(value.length<10){
            this.props.inputChanged({ prop:'invitationCode', value })
        }
    }

    

    render() {
        return (
            <Container>
                <CompanyName companyName={this.props.eventName} companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6n8Ih4qqQ9wXc0JMus9BL6Cdk-lzYPd6YXtR45UMzRblIDQA&s" />
                { this.props.checkin ? (
                    <Content contentContainerStyle={{ flex: 1, justifyContent:'center' }}>
                        <View style={{ flexDirection:'row', paddingLeft: 20, paddingRight: 20 }}>
                            <View style={{ flex: 0.5 }}>
                                <TextInput1 
                                    textChange={(value)=> this.getInvitationDetails(value) }
                                    value={ this.props.invitationCode }
                                    length={10}
                                    labelText="Invitation Code"
                                    errorText={this.props.invitationCodeError}
                                    autoFocus={true}
                                    keyboardType="number-pad"
                                />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                
                            </View>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            style= {{ height:500 }}
                            visible={this.props.showInitationDetails}
                            onRequestClose={() => {
                                //Alert.alert('Modal has been closed.');
                            }}>
                            <View style={{flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            shadowOpacity:0.6,
                            alignItems: 'center', borderColor: 'green'}}>
                                <View style={{
                                position:'absolute',
                                borderRadius:20,
                                top:150,
                                left: 15,
                                right:15, 
                                bottom:200,
                                borderWidth: 1,
                                paddingLeft: 20,
                                backgroundColor:'white'}}>
                                <Button transparent 
                                    style={{ flexDirection:'row', alignSelf:'flex-end' }}
                                    onPress={() => {
                                    this.props.clearInvitationDetails();
                                    }}
                                >
                                    <Icon name='close' style={{ fontSize:20, color:'#387eee', paddingRight:20 }} />
                                </Button>
                                <SelectedInvitation />
                                
                                </View>
                            </View>
                        </Modal>
                    </Content>
                ) : (
                    <Content contentContainerStyle={{ flex: 1, alignItems:'center' }}>
                        <YouTube
                            apiKey="AIzaSyDUPBWlwr3AQKAuPhFiP8_AZvp-XzoHyG8"
                            videoId={'vSZxBk6mqyc'}   // The YouTube video ID
                            origin="http://www.youtube.com"
                            controls={0}
                            play={true}             // control playback of video with true/false
                            fullscreen={false}       // control whether the video should play in fullscreen or inline
                            loop={true}             // control whether the video should loop when ended
                            showinfo={false}
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}

                            style={{ alignSelf: 'center', height: '87%', width: '75%' }}
                        />
                        { this.renderButton() }
                    </Content>
                ) }

            </Container>
        )
    }
}

var styles = StyleSheet.create({
    backgroundVideo: {
      width:'90%',
      height:height/3
    },
    backgroundVideo1: {
      width:872,
      height:490
    },
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
  });

const mapStateToProps = ({auth}) => {
    const { checkin, showInitationDetails, invitationCode, eventName } = auth
    return { checkin, showInitationDetails, invitationCode, eventName }
}

const mapDispatchToProps = {
    inputChanged, getInvitationDetails, clearInvitationDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
