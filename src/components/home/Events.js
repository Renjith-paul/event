import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Card, CardItem, Spinner } from 'native-base'
import CompanyName from './CompanyName'
import { getAllInvitations } from '../../actions'



class Events extends Component {

    getInvitations(eventId, eventName){
        const { userId, primaryId, loginToken } = this.props.user
        this.props.getAllInvitations({eventId, userId, primaryId, loginToken, eventName})
    }


    renderItems({item}){
        return(
            <Card style={{ padding: 10}}>
                <CardItem style={{ width: '100%' }} button onPress={ () => this.getInvitations(item.eventId, item.eventName) }>
                    <View style={{ flexDirection:'column', alignSelf:'center', width: '100%' }}>
                    <   Text style={{ textAlign: 'center' }}>{item.eventName}</Text>
                        { (this.props.eventLoading && this.props.selectedEvent==item.uid) ? (<Spinner color="red" />) : null }
                    </View>
                    
                </CardItem>
            </Card>
        )
    }

    render() {
        return (
            <Container>
                <CompanyName companyName="Zamil Group" companyLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD6n8Ih4qqQ9wXc0JMus9BL6Cdk-lzYPd6YXtR45UMzRblIDQA&s" />
                <FlatList 
                    data= { this.props.events }
                    renderItem = { (data) => this.renderItems(data) }
                    keyExtractor = {(data,index) => index.toString() }
                    style={{ padding: 20 }}
                />
            </Container>
        )
    }
}

const mapStateToProps = ({auth}) => {
    const { selectedEvent, eventLoading, events, user } = auth
    return { selectedEvent, eventLoading, events, user }
}

const mapDispatchToProps = {
    getAllInvitations
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
