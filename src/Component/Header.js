import { AppBar, Button, IconButton, Input, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import SearchIcon from '@mui/icons-material/Search';
import { black } from '@mui/material/colors';
import Single_post from './Single_post';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setData] = useState("")

    function loginbtn() {
        navigate("/login")
    }
    function registerbtn() {
        navigate("/register")
    }
    // function searchbtn() {
    //     navigate("/search")
    // }
    function homebtn() {
        navigate("/")
    }
    function newpost() {
        navigate("/newpost")
    }
    function logoutbtn() {
        // localStorage.removeItem("login")
        localStorage.removeItem('token');
        // dispatch(setLogout());
        navigate("/login")
    }

    async function searchdata(key) {
        console.log(key);
        let result = await fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post?search=` + key);
        result = await result.json();
        console.log("search===", result);
        setData(result);
    }
    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar>

                    <Typography variant='h6' flexGrow={1}></Typography>
                    {/* <Button variant='text' color="inherit" onClick={loginbtn}>Login</Button>
                    <Button variant='text' color="inherit" onClick={registerbtn}>Register</Button> */}
                    {
                        localStorage.getItem('token') ?
                            <><TextField sx={{ height: 35, background: 'white', justifyContent: 'center', alignItems: 'center' }}
                                label="Search Detail"
                                onChange={(e) => searchdata(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment sx={{ height: 35 }}>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            </>
                            :
                            null
                    }

                    <Button variant='text' color="inherit" onClick={homebtn}>Home</Button>
                    <Button variant='text' color="inherit" onClick={newpost}>New Post</Button>
                    {
                        !localStorage.getItem('token') ?
                            <Button variant='text' color="inherit" onClick={loginbtn}>Login</Button>
                            :
                            <Button variant='text' color="inherit" onClick={logoutbtn}>Logout</Button>
                    }
                    {
                        localStorage.getItem('token') ?
                            null
                            :
                            <Button variant='text' color="inherit" onClick={registerbtn}>Register</Button>
                    }

                </Toolbar>
            </AppBar>
            {
                data.length > 0 ? <>
                    {
                        data?.map((item) => (
                            <>
                                <Single_post item={item} />
                            </>
                        ))
                    }
                </> : <></>
            }
        </div>
    )
}

export default Header