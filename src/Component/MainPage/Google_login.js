
import GoogleLogin from 'react-google-login';
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { useLocation, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { useEffect, useState } from 'react';
import { MsgWarning } from '../../MainCall/dialog';
import Auth from '../../MainCall/Auth';
import auhv from "../../MainCall/auhv.json";
export default function Google_login(prop) {
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
      authen_code: UserId,
      platform_name: "googleauthen"
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
                  platform_name: "googleauthen"
                },
              });
            } else if (prop.StateInterface.uri === undefined) {
              navigate("/Authen/SignUpNotpin", {
                state: {
                  UserId: UserId,
                  displayName: response.profileObj.name,
                  email: response.profileObj.email,
                  platform_name: "googleauthen"
                },
              });
            } else {
              navigate("/Authen/SignUpNotpin", {
                state: {
                  uri: prop.StateInterface.uri,
                  UserId: UserId,
                  displayName: response.profileObj.name,
                  email: response.profileObj.email,
                  platform_name: "googleauthen"
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
                  platform_name: "googleauthen"
                },
              });
            } else {
              navigate("../Authen/SignUp", {
                state: {
                  UserId: UserId,
                  platform_name: "googleauthen"
                },
              });
            }
          } else {
            if (res.Data === "True") {
              navigate("../Authen/LineLogin", {
                state: {
                  UserId: UserId,
                  uri: prop.StateInterface.uri,
                  platform_name: "googleauthen"
                },
              });
            } else {
              navigate("../Authen/SignUp", {
                state: {
                  UserId: UserId,
                  uri: prop.StateInterface.uri,
                  platform_name: "googleauthen"
                },
              });
            }
          }
        } else {
          navigate("../LineLogin", {
            state: {
              platform_name: "googleauthen"
            },
          });
        }
      }
    });
  }
  const onFailure = (response) => {
    console.log(response);
  }

  return (
    <>
      <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
      <GoogleLogin
        className='justify-center'
        clientId={clientId}
        buttonText="Login With Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
      />
    </>
  );
}
