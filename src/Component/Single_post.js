import { Avatar, Box, Button, Card, CardContent, CardMedia, Checkbox, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import ShowComment from './ShowComment';
import { setEditPost, setLikePost, setScrollPost } from '../Reduc/ActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Single_post = ({ item }) => {
    const planRef = useRef(null);
    const dispatch = useDispatch()
    const post = useSelector((state) => state?.Post);
    const userid = useSelector((state) => state?.Login?.id);
    const username = useSelector((state) => state.Login.name);
    const [name, setName] = useState("")
    const [caption, setCaption] = useState("")
    const [photo, setphoto] = useState("")
    const [editid, seteditid] = useState("")
    const date = new Date().toLocaleDateString();
    const [updateform, setupdateform] = useState(false)
    const [loader, setloader] = useState(false)

    const likePost = (id) => {
        const likePostdata = post.filter((post) => post.id === id);
        let likedata = likePostdata[0].like;
        let index = likedata.indexOf(userid);
        let likepost = []
        if (index === -1)
            likepost = [...likedata, userid];
        else
            likepost = likedata.filter((data) => data !== userid);
        dispatch(setLikePost(id, likepost))
    }

    function cancelbtn() {
        setupdateform(false)
    }

    function editbtn(id) {
        // const scrollToMe = document.getElementById("scroll");
        // if (scrollToMe) {
        //     scrollToMe.scrollIntoView({ behavior: "smooth" });
        // }
        setupdateform(true)
        const editdata = post.filter((p) => p.id === id)
        seteditid(id)
        setName(editdata[0]?.name)
        setCaption(editdata[0]?.caption)
        setphoto(editdata[0]?.photo)
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setphoto(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function updatepost() {
        setloader(true)
        const data = { id: editid, name, caption, photo, userid, username, date };
        if (name === '' || caption === '' || photo === '') {
            console.log("Enter Value");
        }
        else {
            axios.put(`/post/${editid}`, (data))
                .then((response) => {
                    if (response) setloader(false)
                    setupdateform(false)
                    dispatch(setScrollPost(response?.data.id))
                    dispatch(setEditPost(response?.data))
                    alert("Update Succesfull..!!")
                });
        }
    }

    return (
        <div>
            {
                updateform && <div><Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '70vh',
                    m: 5
                }}>

                    <TextField
                        label="Name"
                        value={name}
                        fullWidth
                        onChange={e => setName(e.target.value)}
                        sx={{ m: 1 }} />

                    <TextField
                        label="Caption"
                        value={caption}
                        fullWidth
                        onChange={e => setCaption(e.target.value)}
                        sx={{ m: 1 }} />

                    <TextField
                        fullWidth
                        type='file'
                        label='Choose Photo'
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            uploadImage(e);
                        }}
                        sx={{ m: 1 }} />

                </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        width: '70vh',
                        m: 6
                    }}>

                        <Button
                            sx={{ mt: -6, mr: 5 }}
                            disabled={loader ? true : false}
                            startIcon={loader && <CircularProgress size={20} />}
                            variant='outlined'
                            onClick={updatepost}>Update Post</Button>
                        <Button
                            sx={{ mt: -6, mr: 5 }}
                            variant='outlined'
                            onClick={cancelbtn}>Cancel</Button>
                    </Box>
                </div>
            }
            <Grid item xs={2} sm={2} md={4} id={item.id} key={item.id} ref={planRef} >
                <div id="scroll">
                    <Card sx={{ width: "320px", my: 2, mx: 10 }} >

                        <CardContent>
                            <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.userphoto} />
                            <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>
                            {
                                item.userid === userid &&
                                <Button onClick={() => editbtn(item.id)} size='small' sx={{ mt: -7, ml: 30, fontSize: 12 }}>Edit</Button>
                            }
                        </CardContent>

                        <CardMedia component="img"
                            height="250"
                            image={item.photo}
                            alt='green iguana' />

                        <CardContent>
                            <Typography mt={-1} variant='subtitle1' align='left'>{item.caption}</Typography>
                        </CardContent>

                        <Checkbox sx={{ mr: 34, mt: -2 }}
                            onClick={() => { likePost(item.id) }}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />} />
                        <Typography ml={2} mt={-4.5} variant='h6' align='right'>{item.like?.length} likes</Typography>
                        {
                            <ShowComment comments={item?.comment} id={item.id} />
                        }

                    </Card>
                </div>
            </Grid>
        </div>
    )
}

export default Single_post