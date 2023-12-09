// case ActionType.EDIT_COMMENT:
//     console.log(action.payload);
//     let postss = state;
//     const postindex = postss.findIndex((post) => post.id === action.id);
//     if (postss[postindex]?.comment) {
//         console.log("totol post----", postss[postindex].comment);
//         // const p= postss[postindex]?.comment.find((cmt) => cmt.id === action.payload.id)
//         // let extracomment=postss[postindex]?.comment.find((cmt)=>cmt.id!==action.payload.id)
//         let extracomment=postss[postindex]?.comment.filter((cmt)=>cmt.id!==action.payload.id)
        

//         // console.log("======",extracomment);

//         // extracomment=Object.assign({}, extracomment);

//         // console.log("============",extracomment.reduce);

//         postss[postindex].comment=postss[postindex]?.comment.filter((cmt)=>cmt.id===action.payload.id)
//         console.log("match filter post----", postss[postindex].comment);
//         postss[postindex].comment.pop()
//         const aabc=extracomment.concat(action.payload);
//         console.log("aabccc===",aabc);
//         postss[postindex].comment=aabc
       
//         // // console.log(p);
//         // postss[postindex].comment=extracomment;
//         // postss[postindex].comment.push(action.payload);
//         // postss[postindex].comment.push(extracomment);
//     }
//     return [...postss];