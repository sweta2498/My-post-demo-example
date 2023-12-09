import axios from "axios";
import { setLogout } from "../Reduc/ActionCreator";

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = tokenDetails.expiresIn
    localStorage.setItem('token', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(timer) {
    setTimeout(() => {
        setLogout()
    }, timer);
}

const api = axios.create();

const statusCheck = {
    validateStatus: (status) => {
        if (status === 401) {
            // localStorage.jwtToken = ''
            window.location.reload(true)
        } else if (status === 500) {
            alert('Could not connect to server')
        } else {
            return true;
        }
    }
}
function onError(response) {
    return response;
}

function onSuccess(response) {
    // console.log(response.config.url, 'Response ============', response.data)
    return response;
}

export const signUpService = {
    socialSignIn: (data) => api.post('http://192.168.29.148:5000/api/v1/auth/socialSignup', data, statusCheck).then(onSuccess, onError),
}


