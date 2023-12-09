import { Typography } from '@mui/material';
import React from 'react'
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const FacebookLoginButton = React.memo(({handleFacebookSign, handleSocialLoginFail}) => {
    // const classes = useStyles()

    const onSuccess = (data) => {
        const payload = {
            token: data?.accessToken,
            loginVia: "facebook",
        };
        handleFacebookSign(payload);
    }
    return (
        <Typography align="center">
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={onSuccess}
                onFailure={handleSocialLoginFail}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        // className={classes.loginIconHolder}
                        >
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png'
                                width='20px' height='20px' alt='google logo' style={{marginLeft: '14px'}}/>
                            <span
                                style={{
                                    padding: '10px 10px 10px 0px',
                                    fontWeight: '500',
                                    marginLeft: '14px',
                                    color: '#878787'
                                }}> Continue with Facebook </span>
                        </div>
                    </button>
                )}
            />
        </Typography>
    );
});

export default FacebookLoginButton