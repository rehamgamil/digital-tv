import axios from 'axios';

export const makeAxios = (options = {}) => {
    let debug = options['debug'] || false;
    if( "debug" in options )
    {
        delete options['debug'];
    }
    
    let instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': "application/json"
        },
        ...options
    });

    let {get, post, defaults} = instance;
    instance.get = (...args) => {
        debug && console.log('AXIOS:GET: ', defaults['baseURL'] || '', ...args);
        return get(...args);
    };
    instance.post = (...args) => {
        debug && console.log('AXIOS:POST: ', defaults['baseURL'] || '', ...args);
        return post(...args);
    };

    return instance;
};

export const setAxiosToken = (token, AxiosInstance) => AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const setAxiosBaseUrl = (baseURL, AxiosInstance) => AxiosInstance.defaults.baseURL = baseURL;
