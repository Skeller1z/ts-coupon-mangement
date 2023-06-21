import React, { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { useTranslation } from "react-i18next";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { ReactComponent as Line } from "../../image/SVG_Memorybox/Login/line-brands.svg";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import auhv from "../../MainCall/auhv.json";
import { MsgWarning } from "../../MainCall/dialog";

export default function Login(props) {
  //------------------------ตัวแปร-----------------------------
  interface LocationState {
    UserId: string;
    uri: string;
  }
  const { Authenticate } = auhv;
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;

  const Username = useRef(null);
  const Password = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [noti, setnoti] = useState<boolean>(false);
  //-------------------------- onload --------------------------
  useEffect(() => { }, []);
  //------------------------function--------------------------

  const login = () => {
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
      if (res !== undefined && !("error" in res)) {
        if (StateInterface === null) {
          navigate("/");
        } else if (StateInterface.UserId === undefined) {
          if (StateInterface.uri === undefined) {
            navigate("/");
          } else {
            window.location.href = StateInterface.uri;
          }
        } else {
          GetdataAPI_Outside("/api/Main/CheckUserLineId", {
            User_line_userid: StateInterface.UserId,
          }).then((res) => {
            if (res.Status === "Success") {
              if (res.Data === "False") {
                GetdataAPI("/api/Main/SaveAuthenCode", {
                  User_line_userid: StateInterface.UserId,
                  platform_name: "lineauthen"
                }).then(async (res) => {
                  console.log(res);

                  if (res.Status === "Success") {
                    if (StateInterface.uri === undefined) {
                      navigate("/");
                    } else {
                      window.location.href = StateInterface.uri;
                    }
                  } else {
                    MsgWarning("failure");
                  }
                });
              } else {
                if (StateInterface.uri === undefined) {
                  navigate("/");
                } else {
                  window.location.href = StateInterface.uri;
                }
              }
            }
          });
        }
      } else {
        Password.current.instance.option("value", "");
        Password.current.instance.focus();
        setnoti(true);
      }
    });
  };
  const ToSignUp = () => {
    navigate("../SignUp");
  };
  const ToForgotpass = () => {
    navigate("../Forgotpass");
  };

  //------------------------HTML------------------------------
  return (
    <div>
      <div className="container">
        <div className="grid grid-cols-12 gap-3 mt-8">
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-8">
            <UpimgIcon className="inline h-[auto] w-[70px] " />
          </div>
          <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-4">
            THE MEMORY BOX
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
            <button
              type="button"
              className="bg-lime-500 py-2 rounded text-white"
            >
              <Line className="inline h-[auto] w-[20px] mr-2 fill-white" />
              Login with Line
            </button>
          </div>
          <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start  py-3 font-bold">
            Or
          </div>
          <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 ">
            <span>
              <span>Already have an account ? </span>
              <span className="text-blue-600" onClick={ToSignUp}>
                Sign Up
              </span>
            </span>
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
            <TextBox placeholder="Email or Phone" ref={Username} />
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
            <TextBox mode="password" placeholder="Password" ref={Password} />
            {noti ? (
              <label className="block text-sm font-medium text-red-600 mb-3">
                {t("Username และ Password ไม่ถูกต้อง")}
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
            <button type="button" className="btn-save" onClick={login}>
              Login
            </button>
          </div>
          <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 px-4">
            <span>
              <span
                className="text-blue-600 cursor-pointer hover:text-blue-900"
                onClick={ToForgotpass}
              >
                Forgot your password?
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
