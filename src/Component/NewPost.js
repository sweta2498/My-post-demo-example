import { Box, Button, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validate } from 'validate.js'

const schema = {
    name: {
        presence: { allowEmpty: false, message: "^Name is required" },
    },
    caption: {
        presence: { allowEmpty: false, message: "^Caption is required" },
    },
    photo: {
        presence: { allowEmpty: false, message: "^Photo is required" }
    }
};

const NewPost = () => {

    // const [name, setName] = useState("")
    // const [caption, setCaption] = useState("")
    // const [photo, setphoto] = useState("")
    const navigate = useNavigate();
    const date = new Date().toLocaleDateString();
    const userid = useSelector((state) => state.Login.id);
    const username = useSelector((state) => state.Login.name);
    const userphoto = useSelector((state) => state.Login.profilephoto);
    const [loading, setLoading] = useState(false);

    const [formState, setFormState] = useState({
        isValid: true,
        values: {},
        touched: {},
        errors: {},
    });

    const hasError = (field) =>
        Boolean(formState.touched[field] && formState.errors[field]);

    // const uploadImage = async (e) => {
    //     const file = e.target.files[0];
    //     const base64 = await convertBase64(file);
    //     // setphoto(base64);
    // };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
            fileReader.readAsDataURL(file);
        });
    };

    const handleChange = (event) => {
        event.persist();
        let errors = {};
        errors = validate({ [event.target.name]: event.target.value }, schema) || {};

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
            errors: {
                ...formState.errors,
                [event.target.name]: errors[event.target.name] || false,
            },
        }));
    };

    const handleImageUpload = async (event) => {

        event.persist();
        const file = event.target.files[0];
        console.log(file);
        const base64 = await convertBase64(file);
        // setphoto((prev)=>base64);

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values, photo: base64,
            },
            errors: {
                ...formState.errors,
                photo: false,
            }, 
            touched: {
                ...formState.touched,
                photo: false,
            },
        }));
    };

    const validateForm = (e) => {
        e.preventDefault();
        const errors = validate(formState.values, schema);
        // console.log(errors);

        // if (!photo?.length)
        //     errors.photo = "Photo is required";

        setFormState((formState) => ({
            ...formState,
            errors: errors || {},
            touched: {
                name: true,
                caption: true,
                photo: true
            },
        }));
        if (!errors) {
            addpost(e);
        }
    };

    console.log(formState.values);

    const addpost = async (event) => {
        
        event.preventDefault();
        // setLoading(true);
        let data = {
            userid, username, userphoto,
            name: formState.values.name,
            caption: formState.values.caption,
            photo: formState.values.photo,
            date
        };
        
        console.log("data-------", data);

        axios.post(`/post`, (data))
            .then((response) => {
                if (response) setLoading(false)
                console.log("response========", response?.status);
                if (response.request.status === 201) {
                    // setLoading(false);
                    setFormState({
                        isValid: true,
                        values: {
                            name: "",
                            caption: "",
                            // photo: "",
                        },
                        touched: {},
                        errors: {},
                    });
                    // setphoto("")
                    alert("Post Added..!!!")
                    navigate("/")
                } else if (response.request.status === 400 || response.request.status === 404) {
                    setLoading(false);
                    alert("Post Failed..!!!")
                }
            }).catch((response) => {
                console.log("response========", response?.message);
                if (response) setLoading(false)
                if (response?.response.status === 404) {
                    alert("Error: Request failed.!! Retry Request..!!")
                    setFormState({
                        isValid: true,
                        values: {
                            name: "",
                            caption: "",
                            // photo: "",
                        },
                        touched: {},
                        errors: {},
                    });
                    // setphoto("")
                }
                else {
                    console.log("Server Error..!!");
                }
            }
            )
    };

    // function addpostbtn() {
    //     const data = { userid, username, userphoto, name, caption, photo, date }
    //     console.log("data-", data);
    //     const response = axios.post('/post',
    //         JSON.stringify(data),
    //         {
    //             headers: { "Content-Type": "application/json" }
    //         })
    //     console.log("responce===", response.data)
    //     alert("New Post added..!!")
    //     navigate("/")
    // }

    return (
        <div>
            <form onSubmit={validateForm}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '70vh',
                    m: 10
                }}>

                    <TextField
                        label="Name"
                        // value={name}
                        // onChange={e => setName(e.target.value)}
                        fullWidth
                        onChange={handleChange}
                        name="name"
                        value={formState?.values?.name || ""}
                        error={hasError("name")}
                        sx={{ m: 1 }}
                        helperText={
                            hasError("name")
                                ? Array.isArray(formState.errors.name)
                                    ? formState.errors.name[0]
                                    : formState.errors.name
                                : null
                        }
                    />

                    <TextField
                        label="Caption"
                        // value={caption}
                        // onChange={e => setCaption(e.target.value)}
                        fullWidth
                        name="caption"
                        onChange={handleChange}
                        value={formState?.values?.caption || ""}
                        error={hasError("caption")}
                        helperText={
                            hasError("caption")
                                ? Array.isArray(formState.errors.caption)
                                    ? formState.errors.caption[0]
                                    : formState.errors.caption
                                : null
                        }
                        sx={{ m: 1 }} />

                    <TextField
                        name='photo'
                        fullWidth
                        type='file'
                        label='Choose Photo'
                        InputLabelProps={{ shrink: true }}
                        error={hasError("photo")}
                        onChange={handleImageUpload}
                        // onChange={(e) => {
                        //     uploadImage(e);
                        // }}
                        helperText={
                            hasError("photo")
                                ? Array.isArray(formState.errors.photo)
                                    ? formState.errors.photo[0]
                                    : formState.errors.photo
                                : null
                        }
                        sx={{ m: 1 }} />
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '70vh',
                    m: 5

                }}>
                    <Button
                        sx={{ mt: -6 }}
                        variant='outlined'
                        type='submit'
                        disabled={loading ? true : false}
                        startIcon={loading && <CircularProgress size={20} />}
                    // onClick={addpost}
                    >Add Post</Button>
                </Box>
            </form>
        </div>
    )
}

export default NewPost;