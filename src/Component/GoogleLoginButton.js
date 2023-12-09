import React from 'react'
import { Typography } from "@mui/material";
import GoogleLogin from "react-google-login";

const GoogleLoginButton = React.memo(({ handleGoogleSign, handleSocialLoginFail }) => {
    // const classes = useStyles()

    const onSuccess = (data) => {
        const payload = {
            token: data?.tokenId,
            loginVia: "google",
        };
        handleGoogleSign(payload)
    }

    return (
        <Typography align="center">
            <GoogleLogin
                // className={classes.googlebutton}
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={onSuccess}
                onFailure={handleSocialLoginFail}
                buttonText="Continue with Google"
                cookiePolicy={"single_host_origin"}
            />
        </Typography>
    );
});

export default GoogleLoginButton