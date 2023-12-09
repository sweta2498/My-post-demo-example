import axios from "axios";
import { runLogoutTimer, saveTokenInLocalStorage } from "../Component/Service";
import { ActionType } from "./ActionType"

export const setLogin = (payload, next) =>
    async (dispatch) => {
        const responce = await axios.get('/UserData');
        // console.log(responce.data);
        let data = responce.data.find(user => user.email === payload.email && user.password === payload.password);
        if (data) {
            data = {
                ...data,
                expiresIn: Date.now() + (60 * 60 * 1000)
            }
            // console.log("aaaaaa",typeof(next));////check next is function or not
            if (typeof next === "function")
                next({ success: true })

            dispatch({
                type: ActionType.SET_LOGIN,
                payload: data
            })
            saveTokenInLocalStorage(data);
            runLogoutTimer(
                60 * 60 * 1000
            )
        } else {
            if (typeof next === "function")
                next({ success: false })
        }
    }

export const setLogout = () =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_LOGOUT,

        });
    }
export const setPost = (payload) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_POST,
            payload
        });
    }

export const setLikePost = (id, payload) =>
    (dispatch) => {
        // console.log("id", id, payload)
        axios.put(`/post/${id}`, ({ like: payload }))
            .then((response) => {
                dispatch({
                    type: ActionType.SET_LIKE,
                    payload,
                    id
                });
            });
    }

export const setAllComment = (payload) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_COMMENT,
            payload
        });
    }
export const setEditComment = (payload, id) =>
    (dispatch) => {
        dispatch({
            type: ActionType.EDIT_COMMENT,
            payload, id
        });
    }

export const setDeleteComment = (id, postid) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_DELETE_COMMENT,
            id, postid
        });
    }

export const setEditPost = (payload) =>
    (dispatch) => {
        dispatch({
            type: ActionType.EDIT_POST,
            payload
        });
    }

export const setScrollPost = (payload) =>
    (dispatch) => {
        // console.log("payload==",payload);
        dispatch({
            type: ActionType.SET_POST_SCROLL,
            payload
        });
    }

export const GoogleLoginDetail = (payload) =>
    (dispatch) => {
        // console.log("payload==",payload);
        dispatch({
            type: ActionType.GOOGLE_LOGIN_DETAIL,
            payload
        });
    }