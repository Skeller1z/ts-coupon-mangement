import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import FacebookLogin from "react-facebook-login";
import Cookies from "universal-cookie";
import { FacebookLogout } from "react-facebook-login";
import { GetdataAPI_Outside } from "../../MainCall/MainCall";
import Auth from "../../MainCall/Auth";
import auhv from "../../MainCall/auhv.json";
import { MsgWarning } from "../../MainCall/dialog";
import { useTranslation } from "react-i18next";
interface LocationState {
  UserId: string;
  uri: string;
  displayName: string;
  inv_id: number;
  email: string;
}
export default function LoginFacebook(prop) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setuserId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [picture, setpicture] = useState("");
  const { AuthenticateLine } = auhv;
  const [loginType, setloginType] = useState("");
  const componentClckked = () => {
    console.log("clicked");
  };
  useEffect(() => {
    setloginType(prop.type)
  }, [prop.type]);
  const responseFacebook = (response) => {
    if (response.id === undefined) {
      //MsgWarning(t("Plese Login"));
      return;
    } else {
      setIsLoggedIn(true);
      setuserId(response.id);
      setname(response.name);
      setemail(response.email);
      setpicture(response.picture);
      console.log(response);
      console.log(response.id);
      CheckUserLineId(response.id, response.name, response.email);
    }
  };
  const CheckUserLineId = (UserId, displayName, email) => {
    GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
      authen_code: UserId,
      platform_name: "fbauthen"
    }).then((res) => {
      if (loginType == "auto") {
        if (res.Status === "Success") {
          if (res.Data === "True") {
            Auth.Login(AuthenticateLine, UserId, "000000").then((res) => {
              if (res.Status === "Success") {
                if (StateInterface === null) {
                  navigate("/");
                } else if (StateInterface.uri === undefined) {
                  navigate("/");
                } else {
                  window.location.href = StateInterface.uri;
                }
              } else {
                MsgWarning(t("Wrong password"));
              }
            });
          } else {
            if (StateInterface === null) {
              navigate("/Authen/SignUpNotpin", {
                state: {
                  UserId: UserId,
                  displayName: displayName,
                  email: email,
                  platform_name: "fbauthen"
                },
              });
            } else if (StateInterface.uri === undefined) {
              navigate("/Authen/SignUpNotpin", {
                state: {
                  UserId: UserId,
                  displayName: displayName,
                  email: email,
                  platform_name: "fbauthen"
                },
              });
            } else {
              navigate("/Authen/SignUpNotpin", {
                state: {
                  uri: StateInterface.uri,
                  UserId: UserId,
                  displayName: displayName,
                  email: email,
                  platform_name: "fbauthen"
                },
              });
            }
          }
        } else {
          MsgWarning(res.Message);
        }
      } else {
        if (res.Status === "Success") {
          if (StateInterface === null) {
            if (res.Data === "True") {
              navigate("../Authen/LineLogin", {
                state: {
                  UserId: UserId,
                  platform_name: "fbauthen"
                },
              });
            } else {
              navigate("../Authen/SignUp", {
                state: {
                  UserId: UserId,
                  platform_name: "fbauthen"
                },
              });
            }
          } else {
            if (res.Data === "True") {
              navigate("../Authen/LineLogin", {
                state: {
                  UserId: UserId,
                  uri: StateInterface.uri,
                  platform_name: "fbauthen"
                },
              });
            } else {
              navigate("../Authen/SignUp", {
                state: {
                  UserId: UserId,
                  uri: StateInterface.uri,
                  platform_name: "fbauthen"
                },
              });
            }
          }
        } else {
          navigate("../LineAuthen", {
            state: {
              platform_name: "fbauthen"
            },
          });
        }
      }
    });
  };
  return (
    <div className="grid grid-cols-12 ">
      <div className="grid col-span-12 content-start mt-2 w-full">
        <FacebookLogin
          appId="1569973026819663"
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClckked}
          callback={responseFacebook}
          isSignedIn={false}
          textButton={"Login with Facebook"}
          size="medium"
          icon="fa-facebook"
        ></FacebookLogin>
      </div>
    </div>
  );
}
