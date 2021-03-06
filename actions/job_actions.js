import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const JOB_QUERY_PARAMS = {
    publisher: '7584267190097240',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
}
const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const buildJobUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip});
    return `${JOB_ROOT_URL}${query}`;
    
}

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        let zip = await reverseGeocode(region);
        const url = buildJobUrl(zip);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();
        //console.log(data);
    } catch (error) {
        console.log(error);
    }     
};

export const likeJob = (job) => {
    return {
        payload: job,
        type: LIKE_JOB
    };
}

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    };
}