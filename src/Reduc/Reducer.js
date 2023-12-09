import { RestoreOutlined } from "@mui/icons-material";
import { ActionType } from "./ActionType";

const initiallogin = { email: "", password: "" };

export function ScrollPost(state = [], action) {
    switch (action.type) {
        case ActionType.SET_POST_SCROLL: {
            // console.log("payload======",action.payload);
            return { ...state, travelplanScroll: action.payload };
        }
        default:
            return state;
    }
}

export default function LoginReducer(state = initiallogin, action) {
    switch (action.type) {
        case ActionType.SET_LOGIN:
            return { ...action.payload }
        case ActionType.SET_LOGOUT:
            return {
                email: "",
                password: ""
            }
        default:
            return state;
    }
}

export function GoogleLoginDetailReducer(state = initiallogin, action) {
    switch (action.type) {
        case ActionType.GOOGLE_LOGIN_DETAIL:
            return { ...action.payload }

        case ActionType.SET_LOGOUT:
            return {
                email: "",
                password: ""
            }
        default:
            return state;
    }
}

const initialpost = [{ name: "", caption: "" }];

export function PostReducer(state = initialpost, action) {
    switch (action.type) {

        case ActionType.SET_POST:
            let getpost = action.payload;
            state.map((post) => {
                const index = getpost.findIndex((p) => p.id === post.id)
                if (index !== -1) {
                    getpost[index].comment = state[index]?.comment ? [...state[index].comment] : []
                }
            })
            return getpost;

        case ActionType.SET_LIKE:
            return [...state.map(post => {
                if (post.id === action.id) {
                    return {
                        ...post,
                        like: action.payload
                    }
                }
                return post;
            })]

        case ActionType.EDIT_POST:
            let Allpost = state;
            let eindex = Allpost.findIndex((post) => post.id === action.payload.id)
            Allpost[eindex] = action.payload
            return [...Allpost]

        case ActionType.EDIT_COMMENT:
            let postss = state;

            postss.map((e) => {
                if (e.id === action.id) {
                    e.comment = e.comment.map((element) => {
                        if (element.id === action.payload.id) {
                            // e.comment[c]=action.payload
                            element = action.payload
                            console.log(element);
                        }
                        return element
                    })
                }
            })
            console.log(postss);
            return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log("state",state);
        //     let postss = state;

        //     postss.map((e) => {
        //         if (e.id === action.id) {
        //             e.comment.map((element, c) => {
        //                 if (element.id === action.payload.id) {
        //                     e.comment[c]=action.payload
        //                     element = action.payload
        //                     console.log(element);
        //                 }
        //             })
        //         }
        //     })
        //     console.log(postss);
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     postss.map((e, p) => {
        //         if (e.id === action.id) {
        //             postss[p].comment.map((element, c) => {
        //                 if (element.id === action.payload.id) {
        //                     postss[p].comment[c] = action.payload
        //                 }
        //             })
        //         }
        //     })
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     postss.forEach((e, p) => {
        //         if (e.id === action.id) {
        //             postss[p].comment.forEach((element, c) => {
        //                 if (element.id === action.payload.id) {
        //                     postss[p].comment[c] = action.payload
        //                 }
        //             })
        //         }
        //     })
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     for (let p = 0; p < postss.length; p++) {
        //         if (postss[p].id === action.id) {
        //             console.log(postss[p]);
        //             if (postss[p]?.comment) {
        //                 for (let c = 0; c < postss[p].comment.length; c++) {
        //                     if (postss[p].comment[c].id === action.payload.id) {
        //                         postss[p].comment[c] = action.payload
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     if (postss[postindex]?.comment) {
        //         for (let i = 0; i < postss[postindex].comment.length; i++) {
        //             if (postss[postindex].comment[i].id === action.payload.id) {
        //                 postss[postindex].comment[i] = action.payload
        //             }
        //         }
        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     if (postss[postindex]?.comment) {
        //         const start=postss[postindex]?.comment.findIndex(a => a.id === action.payload.id)
        //         postss[postindex].comment.fill(action.payload,start ,start+1)
        //         // postss[postindex].comment.unshift(action.payload) 
        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     if (postss[postindex]?.comment) {
        //         postss[postindex].comment.splice(postss[postindex]?.comment.findIndex(a => a.id === action.payload.id),1)
        //         postss[postindex].comment.unshift(action.payload) 
        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     if (postss[postindex]?.comment) {
        //         postss[postindex].comment=postss[postindex]?.comment.filter((cmt)=>cmt.id!==action.payload.id)
        //         postss[postindex]?.comment.unshift(action.payload) 

        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     if (postss[postindex]?.comment
        //         console.log("totol post----", postss[postindex].comment);
        //         let extracomment=postss[postindex]?.comment.filter((cmt)=>cmt.id!==action.payload.id)
        //         postss[postindex].comment=postss[postindex]?.comment.filter((cmt)=>cmt.id===action.payload.id)
        //         postss[postindex].comment.pop()
        //         const aabc=extracomment.concat(action.payload);
        //         console.log("aabccc===",aabc);
        //         postss[postindex].comment=aabc;
        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     if (postss[postindex]?.comment) {
        //         postss[postindex].comment=postss[postindex]?.comment.filter((cmt)=>cmt.id!==action.payload.id)
        //         postss[postindex].comment.push(action.payload);
        //     }
        //     return [...postss];

        // case ActionType.EDIT_COMMENT:
        //     console.log(action.payload);
        //     // console.log(action.id);
        //     let postss = state;
        //     const postindex = postss.findIndex((post) => post.id === action.id);
        //     console.log(postindex);
        //     if (postss[postindex]?.comment) {
        //         const indexx = postss[postindex]?.comment.findIndex((cmt) => cmt.id === action.payload.id);
        //         console.log("indexxx====", indexx);
        //         if (indexx !== -1)
        //             postss[postindex].comment[indexx] = action.payload;
        //     }
        //     return [...postss];

        case ActionType.SET_COMMENT:
            let posts = state;
            action.payload.map((comment) => {
                const index = posts.findIndex((post) => post.id === comment.postid);
                if (index !== -1) {
                    if (posts[index]?.comment) {
                        const indexx = posts[index].comment.findIndex((cmt) => cmt.id === comment.id);
                        if (indexx !== -1)
                            posts[index].comment[indexx] = comment;
                        else
                            posts[index].comment.push(comment);
                    }
                    else {
                        posts[index].comment = posts[index]?.comment ? [...posts[index].comment, comment] : [comment]
                    }
                }
            })
            return [...posts];

        case ActionType.SET_DELETE_COMMENT:
            let post = state;
            // console.log(action.postid);
            const index = post.findIndex((p) => p.id === action.postid);
            post[index].comment = post[index]?.comment?.filter((c) => c.id !== action.id)
            return [...post];

        default:
            return [...state]
    }
}
