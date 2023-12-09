import { Avatar, Box, Button, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDeleteComment, setAllComment, setEditComment } from '../Reduc/ActionCreator';

const ShowComment = ({ comments, id }) => {

    // const [data, setData] = useState([])
    const [comment, setComment] = useState()
    const [commentData, setCommentData] = useState(comments)
    const date = new Date().toLocaleDateString();
    const userid = useSelector((state) => state.Login.id);
    const username = useSelector((state) => state.Login.name);
    const userphoto = useSelector((state) => state.Login.profilephoto);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(comments);

    useEffect(() => {
        setCommentData(comments);
    }, [comments]);

    const makeComment = (postid) => {
        const commentdata = { userid, username, postid, comment, date, userphoto };
        axios.post(`/comment`, (commentdata))
            .then((response) => {
                console.log(response.data);
                dispatch(setAllComment([response.data]))
                setComment("")
            });
    }

    const DeleteComment = (id) => {
        axios.delete(`/comment/${id}`)
            .then((responce) => {
                alert("Comment Delete Sucessfully..!!");
                // console.log(responce.data.id, "---------", responce.data.postid);
                dispatch(setDeleteComment(responce.data.id, responce.data.postid));
            });
    }

    const EditComment = (idd, cmt) => {
        // console.log("idd===",idd,"cmt===",cmt);
        // const index = comments.findIndex((data) => data.id === idd);
        // let item = comments[index]
        // setComment(item.comment)
        setComment(cmt)
    }

    const UpdateComment = (id, postid) => {
        const cmtdata = { id, userid, username, postid, comment, date };

        axios.put(`/comment/${id}`, (cmtdata))
            .then((response) => {
                //   setPost(response.data);
                dispatch(setEditComment(response.data, postid))
                // dispatch(setAllComment([response.data]))
                // dispatch(setAllComment([response.data]))
                alert("comment Update Sucessfully..!!")
                setComment("")
            });
    }

    return (
        <div>
            <TextField
                sx={{ mb: 2, mt: 2 }}
                type="text"
                name="name"
                value={comment}
                placeholder='Add Comment'
                onChange={(e) => { setComment(e.target.value) }} />

            <Button variant='outlined' onClick={() => makeComment(id)} sx={{ mt: 3, ml: 1 }} >Add</Button>
            {
                commentData?.map((cd, i) => (
                    <div key={cd.id + "-" + id + '-' + i}>
                        <Box sx={{
                            display: 'flex', m: 1
                        }}>
                            <CardContent>
                                <Avatar sx={{ width: 40, height: 40, mt: -1, ml: -1.5 }} alt="User" src={cd.userphoto} />
                            </CardContent>

                            <CardContent>
                                <Typography mt={-1.5} ml={-2.5} color="primary.main" variant='body1' align='left'>{cd.username} </Typography>
                                <Typography mt={-2.5} ml={19} color="primary.main" variant='subtitle2' align='right'>{cd.date} </Typography>
                                <Typography mt={0} ml={-2.5} variant='subtitle2' align='left'>{cd.comment}</Typography>
                            </CardContent>
                        </Box>
                        <Box sx={{ mt: -4, mb: -1, ml: -13 }}>
                            {/* <Button size='small' sx={{ fontSize: 12 }}>reply</Button> */}
                            {cd.userid === userid && !comment &&
                                <Button onClick={() => EditComment(cd.id, cd.comment)} size='small' sx={{ ml: 1, fontSize: 12 }}>Edit</Button>
                            }
                            {comment &&
                                <Button onClick={() => UpdateComment(cd.id, id)} size='small' sx={{ ml: -2, fontSize: 12 }}>Update</Button>
                            }
                            {cd.userid === userid &&
                                <Button onClick={() => DeleteComment(cd.id)} size='small' sx={{ fontSize: 12 }}>Delete</Button>
                            }
                        </Box>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowComment;