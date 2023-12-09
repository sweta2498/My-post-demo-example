import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { GoogleLoginDetail, setLogin } from '../Reduc/ActionCreator'
import { useNavigate } from 'react-router-dom'
import { validate } from 'validate.js'
import { FamilyRestroomTwoTone } from '@mui/icons-material'
import GoogleLoginButton from './GoogleLoginButton'
import { saveTokenInLocalStorage, signUpService } from './Service'
import FacebookLoginButton from './FacebookLoginButton'
import jwt_decode from "jwt-decode";

const schema = {
    email: {
        presence: { allowEmpty: false, message: "^Email is required" },
    },
    password: {
        presence: { allowEmpty: false, message: "^Password is required" },
    }
};

const Login = () => {

    // const [email, setemail] = useState("")
    // const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [socialSignInData, setSocialSignInData] = useState({});

    useEffect(() => {
        let login = localStorage.getItem('token');
        if (login) {
            navigate('/');
        }
    });

    const [formState, setFormState] = useState({
        isValid: true,
        values: {},
        touched: {},
        errors: {},
    });

    const hasError = (field) => Boolean(formState.touched[field] && formState.errors[field]);

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

    const validateForm = (e) => {
        e.preventDefault();
        const errors = validate(formState.values, schema);
        // console.log(errors);

        setFormState((formState) => ({
            ...formState,
            errors: errors || {},
            touched: {
                email: true,
                password: true
            },
        }));
        if (!errors) {
            loginbtn(e);
        }
    };

    // console.log(formState.values);

    const loginbtn = (e) => {
        setLoading(true)
        // return false
        dispatch(setLogin({ email: formState.values.email, password: formState.values.password },
            (res) => {
                if (res) setLoading(false)
                if (res.success) {
                    alert("Login success..!!!")
                    navigate("/")
                }
                else
                    alert("Login Failed....!!!")
            }
        ))
    }

    ////////////google//////////////
    const handleGoogleSign = (data) => {
        // setSocialSignInData(data);
        socialSignInUser(data);
    };

    const handleSocialLoginFail = (error) => {
        // console.log(error);
    };

    ////////google and fb/////////
    const socialSignInUser = (data) => {
        setLoading(true);

        signUpService.socialSignIn(data).then(response => {
            console.log("responace====", response);

            if (response) setLoading(false)
            switch (response.status) {
                case 200:
                    {
                        const { status, token } = response?.data
                        localStorage.setItem('token', JSON.stringify(jwt_decode(token)));
                        // dispatch(GoogleLoginDetail(jwt_decode(token)))
                        console.log("Suceess..!!!");
                        if (status) {
                            console.log("-=-=", jwt_decode(token));
                            navigate("/")
                        }
                    }
                    break;

                case 400:
                    {
                        console.log(response.status);
                        console.log("Errror..!!");
                    }
                    break;

                default:
                    break;
            }
        })
    };

    /////////////fb/////////////////////
    const handleFacebookSign = (data) => {
        // setSocialSignInData(data);
        socialSignInUser(data);
    };

    return (
        <div>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 10,
                mt: 10
            }}>
                <GoogleLoginButton
                    handleGoogleSign={handleGoogleSign}
                    handleSocialLoginFail={handleSocialLoginFail}
                />

                <FacebookLoginButton
                    handleFacebookSign={handleFacebookSign}
                    handleSocialLoginFail={handleSocialLoginFail}
                />
            </Box>
            <form onSubmit={validateForm}>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 30,
                    mt: 4

                }}>
                    <TextField
                        label='Email'
                        sx={{ m: 1 }}
                        fullWidth
                        // type='email'
                        placeholder='Email'
                        // onChange={e => setemail(e.target.value)}
                        name="email"
                        onChange={handleChange}
                        value={formState?.values?.email || ""}
                        error={hasError("email")}
                        helperText={
                            hasError("email")
                                ? Array.isArray(formState.errors.email)
                                    ? formState.errors.email[0]
                                    : formState.errors.email
                                : null
                        } />
                    <TextField
                        label='Password'
                        sx={{ m: 1 }}
                        fullWidth
                        type='password'
                        placeholder='Password'
                        // onChange={e => setpassword(e.target.value)}
                        name="password"
                        onChange={handleChange}
                        value={formState?.values?.password || ""}
                        error={hasError("password")}
                        helperText={
                            hasError("password")
                                ? Array.isArray(formState.errors.password)
                                    ? formState.errors.password[0]
                                    : formState.errors.password
                                : null
                        } />

                    <Button
                        type='submit'
                        disabled={loading ? true : false}
                        startIcon={loading && <CircularProgress size={20} />}
                    // onClick={loginbtn}
                    >Login</Button>
                </Box>
            </form>
        </div>
    )
}

export default Login