import { Box, Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [name, setname] = useState("")
    const [contact, setcontact] = useState("")
    const [email, setemail] = useState("")
    const [dob, setdob] = useState("")
    const [photo, setphoto] = useState("")
    const [password, setpassword] = useState("")
    const date = new Date().toLocaleDateString();
    const navigate = useNavigate()

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

    function registerbtn() {
        const userdata = { name, contact, dob, email, password, photo, date }
        console.log(name, contact, email, dob, password, photo);

        const response = axios.post('/UserData',
            JSON.stringify(userdata),
            {
                headers: { "Content-Type": "application/json" }
            })
        console.log("responce===", response)
        alert("Register successful..!!")
        navigate("/")
    }

    return (
        <div>
            <Grid>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 10,
                    mt: 12
                }}>
                    <TextField
                        label='Name'
                        sx={{ m: 1 }}
                        fullWidth
                        onChange={e => setname(e.target.value)}
                        placeholder='Name' />
                    <TextField
                        label='Contact'
                        sx={{ m: 1 }}
                        fullWidth
                        type='tel'
                        onChange={e => setcontact(e.target.value)}
                        placeholder='Contact' />
                    <TextField
                        label='DOB'
                        sx={{ m: 1 }}
                        fullWidth
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        onChange={e => setdob(e.target.value)}
                        placeholder='Date of Birth' />
                    <TextField
                        label='Email'
                        sx={{ m: 1 }}
                        fullWidth
                        type='email'
                        onChange={e => setemail(e.target.value)}
                        placeholder='Email' />
                    <TextField
                        label='Password'
                        sx={{ m: 1 }}
                        fullWidth
                        type='password'
                        onChange={e => setpassword(e.target.value)}
                        placeholder='Password' />
                    <TextField
                        label='Confirm Password'
                        sx={{ m: 1 }}
                        fullWidth
                        type='password'
                        onChange={e => setpassword(e.target.value)}
                        placeholder='Confirm Password' />
                    <TextField
                        label='Choose Photo'
                        type='file'
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                        fullWidth
                        onChange={(e) => {
                            uploadImage(e);
                        }}
                        placeholder='Confirm Password' />

                    <Button variant='outlined' sx={{ m: 2, fontSize: 20 }} onClick={registerbtn}>Register</Button>

                </Box>
            </Grid>
        </div>
    )
}

export default Register