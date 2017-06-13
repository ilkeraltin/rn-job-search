import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

//1364266590276741 

class AuthScreen extends Component {

componentDidMount() {
    console.log(this.props);
    this.props.facebookLogin();
}
render(){
    return (
        <View>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
            <Text>AuthScreen</Text>
        </View>
    );
}
}

export default connect(null,actions)(AuthScreen);