import cookie from 'js-cookie';
import axios from 'axios';

export const setCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.set(key,value,{expires:7});
    }
}

export const getCookie = (key) => {
    if(window !== 'undefined'){
        return cookie.get(key);
    }
}

export const removeCookie = (key) => {
    if(window !== 'undefined'){
        cookie.remove(key);
    }
}

export const setLocalStorage = (key,value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key);
    }
}

export const getLocalStorage = (key) => {
    if(window !== 'undefined'){
        const user = localStorage.getItem(key);
        if(user){
            return JSON.parse(user);
        }
    }
}

export const Authenticate = (response,next) => {
    setCookie('token',response.data.token);
    setLocalStorage('user',response.data.user);

    next();
}

export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            return getLocalStorage('user');
        }
        else{
            return false;
        }
    }
}

export const Logout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

export const setAuthHeader = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}
