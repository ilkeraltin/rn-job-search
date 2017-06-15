import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';
state = { token: null }
const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

async componentWillMount(){
    let token = AsyncStorage.getItem('fb_token');
    if (token) {
        this.props.navigation.navigate('map');
        this.setState({ token });
    } else  {
        this.setState({ token: false });
    }
   
}

onSlidesComplete = () => { 
    this.props.navigation.navigate('auth');
}

render(){
    if (_.isNull(state.token)) {
        return <AppLoading />;
    }
    return (
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    );
}
}

export default WelcomeScreen;