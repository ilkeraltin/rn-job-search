import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';



//lecture 99 explains this thunk function with es7
export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        //dispatch an action FB Login is done!
        dispatch({ type:FACEBOOK_LOGIN_SUCCESS, payload:token });
    } else {

        doFacebookLogin(dispatch);
    
    }
};

const doFacebookLogin = async dispatch => {
    let {type, token} = await Facebook.logInWithReadPermissionsAsync('1364266590276741', {
        permissions: ['public_profile']
    });

    if (type==='cancel') {
        dispatch({ type:FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type:FACEBOOK_LOGIN_SUCCESS, payload: token});
};