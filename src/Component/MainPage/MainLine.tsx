import liff from "@line/liff/dist/lib";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { MsgWarning } from "../../MainCall/dialog";
import { GetdataAPI_Outside } from "../../MainCall/MainCall";
import Loading from "./Loading";
import auhv from "../../MainCall/auhv.json";

export default function MainLine() {
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  interface LocationState {
    UserId: string;
    uri: string;
    displayName: string;
    inv_id: number;
    email: string;
    platform_name: string;
    typelogin: string;
  }
  const { AuthenticateLine } = auhv;
  const [loginType, setloginType] = useState("");
  const navigate = useNavigate();
  const [islogin, setislogin] = useState(false);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    Auth.LogOut().then(() => {
      lineAuth();
    });
  }, []);
  useEffect(() => {
    setloginType("auto")
  }, []);
  const lineAuth = () => {
    liff
      .init({
        liffId: "1660737345-EOZWWllz", // Use own liffId
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setislogin(true);
          liff.getProfile().then((profile) => {
            const UserId = profile.userId;
            GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
              User_line_userid: UserId,
              platform_name: StateInterface.platform_name
            }).then((res) => {
              setisloading(false);
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
                        MsgWarning("Wrong password");
                      }
                    });
                  } else {
                    if (StateInterface === null) {
                      navigate("/Authen/SignUpNotpin", {
                        state: {
                          UserId: UserId,
                        },
                      });
                    } else if (StateInterface.uri === undefined) {
                      navigate("/Authen/SignUpNotpin", {
                        state: {
                          UserId: UserId,
                        },
                      });
                    } else {
                      navigate("/Authen/SignUpNotpin", {
                        state: {
                          uri: StateInterface.uri,
                          UserId: UserId,

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
                          uri: StateInterface.uri,
                        },
                      });
                    } else {
                      navigate("../Authen/SignUp", {
                        state: {
                          UserId: UserId,
                          uri: StateInterface.uri,
                        },
                      });
                    }
                  }
                }
              }
            });
          });
        }
      });
  };
  if (!islogin) return;
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="max-h-screen">
          <Outlet />
        </div>
      )}
    </>
  );
}
