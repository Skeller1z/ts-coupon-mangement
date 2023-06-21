
import GoogleLogin from 'react-google-login';
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { useLocation, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { useEffect, useState } from 'react';
import { MsgWarning } from '../../MainCall/dialog';
import Auth from '../../MainCall/Auth';
import auhv from "../../MainCall/auhv.json";
import { LineLogin } from 'reactjs-line-login';
import 'reactjs-line-login/dist/index.css';
export default function Line_login(prop) {
    const navigate = useNavigate();
    const clientId = "79338267140-tpc58v80c3or1b6qg2rc7jercfu7q24s.apps.googleusercontent.com"
    const [loginType, setloginType] = useState("");
    const { AuthenticateLine } = auhv;
    useEffect(() => {
        setloginType(prop.type)
    }, [prop.type]);
    const onSuccess = (response) => {
        console.log(response);
        const UserId = response.googleId;
        GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
            User_line_userid: UserId,
        }).then((res) => {
            if (loginType == "auto") {
                if (res.Status === "Success") {
                    if (res.Data === "True") {
                        Auth.Login(AuthenticateLine, UserId, "000000").then((res) => {
                            if (res.Status === "Success") {
                                if (prop.StateInterface === null) {
                                    navigate("/");
                                } else if (prop.StateInterface.uri === undefined) {
                                    navigate("/");
                                } else {
                                    window.location.href = prop.StateInterface.uri;
                                }
                            } else {
                                MsgWarning("Wrong password");
                            }
                        });
                    } else {
                        if (prop.StateInterface === null) {
                            navigate("/Authen/SignUpNotpin", {
                                state: {
                                    UserId: UserId,
                                    displayName: response.profileObj.name,
                                    email: response.profileObj.email,
                                },
                            });
                        } else if (prop.StateInterface.uri === undefined) {
                            navigate("/Authen/SignUpNotpin", {
                                state: {
                                    UserId: UserId,
                                    displayName: response.profileObj.name,
                                    email: response.profileObj.email,
                                },
                            });
                        } else {
                            navigate("/Authen/SignUpNotpin", {
                                state: {
                                    uri: prop.StateInterface.uri,
                                    UserId: UserId,
                                    displayName: response.profileObj.name,
                                    email: response.profileObj.email,
                                },
                            });
                        }
                    }
                } else {
                    MsgWarning(res.Message);
                }
            } else {
                if (res.Status === "Success") {
                    if (prop.StateInterface === null) {
                        if (res.Data === "True") {
                            navigate("../Authen/LineLogin", {
                                state: {
                                    UserId: UserId,
                                },
                            });
                        } else {
                            navigate("../Authen/SignUp", {
                                state: {
                                    UserId: UserId,
                                },
                            });
                        }
                    } else {
                        if (res.Data === "True") {
                            navigate("../Authen/LineLogin", {
                                state: {
                                    UserId: UserId,
                                    uri: prop.StateInterface.uri,
                                },
                            });
                        } else {
                            navigate("../Authen/SignUp", {
                                state: {
                                    UserId: UserId,
                                    uri: prop.StateInterface.uri,
                                },
                            });
                        }
                    }
                } else {
                    navigate("../LineAuthen");
                }
            }
        });
    }
    const onFailure = (response) => {
        console.log(response);
    }
    const [payload, setPayload] = useState(null);
    const [idToken, setIdToken] = useState(null);
    return (
        <>
            <LineLogin
                clientID='1660737345'
                scope='profile openid email'
                onSuccess={onSuccess}
                clientSecret='af36d9d0374e9049755ffbc5ec6b5ecb'
                state=''
                nonce=''
                redirectURI=''
                setPayload={setPayload}
                setIdToken={setIdToken}
            />
            {payload && idToken ? (
                console.log('payload', payload, 'idToken', idToken)
            ) : (
                <></>
            )}
        </>
    );
}
