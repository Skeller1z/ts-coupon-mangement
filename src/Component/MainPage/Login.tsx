import React, { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { useTranslation } from "react-i18next";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { ReactComponent as Line } from "../../image/SVG_Memorybox/Login/line-brands.svg";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import "../../css/OR.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import auhv from "../../MainCall/auhv.json";
import { MsgWarning } from "../../MainCall/dialog";
import liff from "@line/liff/dist/lib";
import Logo2 from "../../image/BTRAVEL2.png";
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import Google_login from "./Google_login";
import FacebookLogin from "react-facebook-login";
const { Authenticate } = auhv;
export default function Login(props) {
  //------------------------ตัวแปร-----------------------------
  const btnlogin = useRef(null);
  const Username = useRef(null);
  const Password = useRef(null);
  const [user, setuser] = useState("");
  const [pass, setpass] = useState("");
  interface LocationState {
    UserId: string;
    uri: string;
  }
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [noti, setnoti] = useState<boolean>(false);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  const coupon = {
    data: [
      {
        id: 2,
        img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
        text: "โรงแรม 2"
      },
      {
        id: 3,
        img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
        text: "โรงแรม 3"
      },
      {
        id: 4,
        img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
        text: "โรงแรม 4"
      }
      , {
        id: 5,
        img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
        text: "โรงแรม 5"
      }
    ],
  };
  const clientId = "79338267140-tpc58v80c3or1b6qg2rc7jercfu7q24s.apps.googleusercontent.com"
  const [searchParams, setSearchParams] = useSearchParams();
  const slist_id = searchParams.get("slist_id");
  const parentcomp_id = searchParams.get("parentcomp_id");
  //-------------------------- onload --------------------------
  useEffect(() => {
  })
  //------------------------function--------------------------
  const onSuccess = (response) => {
    console.log(response);
  }
  const onFailure = (response) => {
    console.log(response);
  }
  const login = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (Username.current.instance.option("value") === "") {
      Username.current.instance.focus();
      return;
    }
    if (Password.current.instance.option("value") === "") {
      Password.current.instance.focus();
      return;
    }
    Auth.Login(
      Authenticate,
      Username.current.instance.option("value"),
      Password.current.instance.option("value")
    ).then((res) => {
      if (res.Status === "Success") {
        if (StateInterface === null) {
          if (liff.isInClient()) {
            liff.getProfile().then((profile) => {
              AddLine_WITH_Redirect(profile.userId, undefined);
            });
          } else {
            if (slist_id !== null && parentcomp_id !== null) {
              navigate({
                pathname: "/MyCoupon",
                search: createSearchParams({
                  slist_id: slist_id,
                  parentcomp_id: parentcomp_id,
                }).toString(),
              });
            } else {
              navigate("/");
            }
          }
        } else if (StateInterface.UserId === undefined) {
          if (liff.isInClient()) {
            liff.getProfile().then((profile) => {
              AddLine_WITH_Redirect(profile.userId, StateInterface.uri);
            });
          } else {
            if (StateInterface.uri === undefined) {
              if (slist_id !== null && parentcomp_id !== null) {
                navigate({
                  pathname: "/MyCoupon",
                  search: createSearchParams({
                    slist_id: slist_id,
                    parentcomp_id: parentcomp_id,
                  }).toString(),
                });
              } else {
                navigate("/");
              }
            } else {
              window.location.href = StateInterface.uri;
            }
          }
        } else {
          AddLine_WITH_Redirect(StateInterface.UserId, StateInterface.uri);
        }
      } else {
        Password.current.instance.option("value", "");
        Password.current.instance.focus();
        setnoti(true);
      }
    });
  };
  const AddLine_WITH_Redirect = (UserLineId, uri) => {
    GetdataAPI_Outside("/api/Main/CheckUserLineId", {
      User_line_userid: UserLineId,
    }).then((res) => {
      if (res.Status === "Success") {
        if (res.Data === "False") {
          GetdataAPI("/api/Main/SaveAuthenCode", {
            User_line_userid: StateInterface.UserId,
            platform_name: "lineauthen"
          }).then(async (res) => {
            if (res.Status === "Success") {
              if (uri === undefined) {
                navigate("/");
              } else {
                window.location.href = uri;
              }
            } else {
              MsgWarning(t("failure"));
            }
          });
        } else {
          if (uri === undefined) {
            navigate("/");
          } else {
            window.location.href = uri;
          }
        }
      }
    });
  };
  const ToSignUp = () => {
    navigate("../SignUp");
  };
  const ToForgotpass = () => {
    navigate("../Forgotpass");
  };
  const LINE = () => {
    if (liff.isInClient()) {
      liff.getProfile().then((profile) => {
        const UserId = profile.userId;
        GetdataAPI_Outside("/api/Main/CheckUserLineId", {
          User_line_userid: UserId,
        }).then((res) => {
          if (res.Status === "Success") {
            if (StateInterface === null) {
              if (res.Data === "True") {
                navigate("/Authen/LineLogin", {
                  state: {
                    UserId: UserId,
                  },
                });
              } else {
                navigate("/Authen/SignUp", {
                  state: {
                    UserId: UserId,
                  },
                });
              }
            } else {
              if (res.Data === "True") {
                navigate("/Authen/LineLogin", {
                  state: {
                    UserId: UserId,
                    uri: StateInterface.uri,
                  },
                });
              } else {
                navigate("/Authen/SignUp", {
                  state: {
                    UserId: UserId,
                    uri: StateInterface.uri,
                  },
                });
              }
            }
          }
        });
      });
    } else {
      navigate("/LineAuthen");
    }
  };
  const componentClckked = () => {
    console.log("clicked");
  };
  const responseFacebook = (response) => {
    console.log(response);
    console.log(response.picture.data.url);
    const UserId = response.userId;
    GetdataAPI_Outside("/api/Main/CheckUserLineId", {
      User_line_userid: UserId,
    }).then((res) => {
      if (res.Status === "Success") {
        if (StateInterface === null) {
          if (res.Data === "True") {
            navigate("/Authen/LineLogin", {
              state: {
                UserId: UserId,
              },
            });
          } else {
            navigate("/Authen/SignUp", {
              state: {
                UserId: UserId,
              },
            });
          }
        } else {
          if (res.Data === "True") {
            navigate("/Authen/LineLogin", {
              state: {
                UserId: UserId,
                uri: StateInterface.uri,
              },
            });
          } else {
            navigate("/Authen/SignUp", {
              state: {
                UserId: UserId,
                uri: StateInterface.uri,
              },
            });
          }
        }
      } else {
        navigate("/LineAuthen");
      }
    });
  };
  //------------------------HTML------------------------------
  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-12 gap-3 md:mt-20 lg:mt-20 xl:mt-20 mb-4">
          <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 px-5 mt-5 text-center mx-2">
            <img src={Logo2} className=" h-[auto] w-32 center mb-3" />
            <div className="invisible md:visible lg:visible xl:visible h-0">
              <Carousel
                responsive={responsive}
                showDots={true}
                arrows={false}
                focusOnSelect={true}
                autoPlay={true}
                renderDotsOutside
              >
                {coupon.data.map((item, i) => (
                  <div className="mx-1 h-full bg-white rounded-md" key={i}
                    onClick={() => {
                      if (item.id) {
                        alert(item.id)
                      }
                    }}>
                    <img src={item.img} className="rounded-t-md" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 px-5 text-center bg-white rounded-md border mx-2 py-5">
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                <TextBox
                  placeholder="Email"
                  ref={Username}
                  valueChangeEvent="keyup"
                  onValueChange={(e) => {
                    setuser(e);
                  }}
                />
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                <TextBox
                  mode="password"
                  placeholder="Password"
                  ref={Password}
                  valueChangeEvent="keyup"
                  onValueChange={(e) => {
                    setpass(e);
                  }}
                />
                {noti ? (
                  <label className="block text-sm font-medium text-red-600 mb-3">
                    {t("Username และ Password ไม่ถูกต้อง")}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="grid col-span-12 content-start">
                <button
                  type="button"
                  className="btn-save"
                  onClick={login}
                  ref={btnlogin}
                  disabled={pass === "" || user === "" ? true : false}
                >
                  {t("Continue")}
                </button>
                <h5 className="mt-2">{t("OR")}</h5>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                <FacebookLogin
                  appId="1569973026819663"
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={componentClckked}
                  callback={responseFacebook}
                  isSignedIn={false}
                ></FacebookLogin>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                <Google_login StateInterface={StateInterface} />
              </div>
              <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3">
                <span className="text-[14px]">
                  <span
                    className="text-blue-600 cursor-pointer hover:text-blue-900"
                    onClick={ToForgotpass}
                  >
                    {t("Forgot your password?")}
                  </span>
                </span>
              </div>
              <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 ">
                <span className="text-[14px]">
                  <span> {t("Don’t have a Memorybox account yet?")}</span>
                </span>
              </div>
              <div className="grid col-span-12 content-start">
                <button type="button" className="btn-save" onClick={ToSignUp}>
                  {t("Sign up")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
