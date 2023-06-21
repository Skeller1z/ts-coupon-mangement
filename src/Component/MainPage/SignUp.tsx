import React, { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useTranslation } from "react-i18next";
import Auth from "../../MainCall/Auth";
import auhv from "../../MainCall/auhv.json";
import { MsgOK, MsgWarning } from "../../MainCall/dialog";
import PopupWelcome from "./PopupWelcome";
import HomImgProfile from "../Ecom/HomImgProfile";
import { TextArea } from "devextreme-react";
export default function SignUp() {
  //------------------------ตัวแปร-----------------------------
  const { Authenticate } = auhv;
  const navigate = useNavigate();
  const Username = useRef(null);
  const User_Name = useRef(null);
  const Password = useRef(null);
  const REPassword = useRef(null);
  const Phone = useRef(null);
  const btnSign = useRef(null);
  const { t } = useTranslation();
  const [notiEmail, setnotiEmail] = useState(false);
  const [notiPhone, setnotiPhone] = useState(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  interface LocationState {
    UserId: string;
    uri: string;
  }
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //-------------------------- onload --------------------------
  useEffect(() => { }, []);
  //------------------------function--------------------------
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  const chkPhone = () => {
    GetdataAPI_Outside("/api/Main/CheckPhoneNumber", {
      Phonenumber: Phone.current.instance.option("value"),
    }).then((CheckPhoneNumber) => {
      if (CheckPhoneNumber.Status === "Success") {
        if (CheckPhoneNumber.Data === "False") {
          setnotiPhone(false);
        } else {
          setnotiPhone(true);
          btnSign.current.setAttribute("disabled", "");
        }
      } else {
      }
    });
  };
  const chkEmail = () => {
    GetdataAPI_Outside("/api/Main/CheckUserName_Email", {
      Email: Username.current.instance.option("value"),
    }).then((CheckUserEmail) => {
      if (CheckUserEmail.Status === "Success") {
        if (CheckUserEmail.Data === "False") {
          setnotiEmail(false);
          chkPhone();
          btnSign.current.removeAttribute("disabled");
        } else {
          setnotiEmail(true);
          btnSign.current.setAttribute("disabled", "");
        }
      } else {
      }
    });
  };
  const ChkeMail = (T: string) => {
    let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

    if (email.test(T)) {
      return "true";
    }
  };
  const register = () => {
    GetdataAPI_Outside("/api/Main/Register", {
      PhoneNumber: Phone.current.instance.option("value"),
      UserName: Username.current.instance.option("value"),
      User_Name: User_Name.current.instance.option("value"),
      Password: Password.current.instance.option("value"),
      Email: Username.current.instance.option("value"),
    }).then((Register) => {
      if (Register.Status === "Success") {
        Auth.Login(
          Authenticate,
          Username.current.instance.option("value"),
          Password.current.instance.option("value")
        ).then((res) => {
          if (res.Status === "Success") {
            if (StateInterface !== null) {
              if (StateInterface.UserId === undefined) {
                if (StateInterface.uri === undefined) {
                  if (window.innerWidth < 992) {
                    togglePopup();
                  } else {
                    navigate("/");
                  }
                } else {
                  window.location.href = StateInterface.uri;
                }
              } else {
                GetdataAPI("/api/Main/SaveAuthenCode", {
                  User_line_userid: StateInterface.UserId,
                  platform_name: "lineauthen"
                }).then(async (res) => {
                  if (res.Status === "Success") {
                    if (StateInterface.uri === undefined) {
                      if (window.innerWidth < 992) {
                        togglePopup();
                      } else {
                        navigate("/");
                      }
                    } else {
                      window.location.href = StateInterface.uri;
                    }
                  } else {
                    MsgWarning(t("failure"));
                  }
                });
              }
            } else {
              if (window.innerWidth < 992) {
                togglePopup();
              } else {
                navigate("/");
              }
            }
          }
        });
      } else {
        MsgWarning(Register.Message);
      }
    });
  };
  const sign = async (e) => {
    const email = await ChkeMail(Username.current.instance.option("value"));
    chkEmail();
    if (Username.current.instance.option("value") === "") {
      MsgWarning(t("Please, re-enter your email"));
      return;
    }
    if (!email) {
      MsgWarning(t("Please, fill your MemoryBox Account correctly"));
      return;
    }
    if (
      Password.current.instance.option("value") === "" ||
      REPassword.current.instance.option("value") === ""
    ) {
      MsgWarning(t("Please, fill your password"));
      return;
    }

    if (
      Password.current.instance.option("value") !==
      REPassword.current.instance.option("value")
    ) {
      MsgWarning(t("Enter the code to match"));
      return;
    }
    if (
      Password.current.instance.option("value") ===
      REPassword.current.instance.option("value") &&
      email
    ) {
      if (e && e.stopPropagation) e.stopPropagation();
      register();
      /* liff.getProfile().then((profile) => {
        const UserId = profile.userId;
        GetdataAPI("/api/Main/Register", {
          PhoneNumber: Phone.current.instance.option("value"),
          UserName: Username.current.instance.option("value"),
          Password: Password.current.instance.option("value"),
          Email: Email.current.instance.option("value"),
          UserlineId: UserId,
        }).then((Register) => {
        });
      }); */
    }
  };
  const ToLogin = () => {
    if (StateInterface !== null) {
      navigate("/Authen", {
        state: {
          UserId: StateInterface.UserId,
          uri: StateInterface.uri,
        },
      });
    } else {
      navigate("/Authen");
    }
  };
  const done = () => {
    navigate("/");
  };
  const privacy = () => {
    navigate("/Authen/PDPA");
  };
  //------------------------HTML------------------------------
  return (
    <>
      <PopupWelcome data={isPopupVisible} toggle={togglePopup} done={done} />

      <>
        <div className="">
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center justify-center justify-self-center bg-white rounded">
              <div className="grid  grid-cols-12  ">
                <div className="grid col-span-12  sm:col-span-12 sm:px-1 md:col-span-12 md:px-10 lg:col-span-12 lg:px-10 xl:col-span-12 xl:px-12 content-start bg-white rounded">
                  <div className="grid grid-cols-12 px-10 py-5">
                    <div className="grid col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 ">
                      <div className="">
                        <div className="">
                          <div className="grid grid-cols-12 ">
                            <div className="grid col-span-12 pl-12 sm:col-span-12 sm:pl-0 md:col-span-12 md:px-0 lg:col-span-12 lg:pl-0 xl:col-span-12 xl:pl-0 content-start mb-5">
                              <span className="inline-flex ">
                                <span>
                                  <div className="mt-[10px] border-2 border-indigo-500 w-4 h-2 grid content-center text-center rounded-lg cursor-pointer bg-indigo-500 text-indigo-500 text-sm"></div>
                                </span>
                                <span className="pl-4 text-lg">SignUp</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-12 justify-center sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
                      <div className="">
                        <div className="grid  grid-cols-12  ">
                          <div className="grid justify-center col-span-12 sm:col-span-12   md:col-span-4 md:justify-start lg:col-span-4 lg:justify-start xl:col-span-4 xl:justify-start content-start ">
                            <HomImgProfile />

                            <span className="inline-flex mt-4">
                              <span>
                                <div className="border-dashed border-2 border-indigo-300 w-20 h-16 grid content-center text-center text-indigo-300 rounded-lg text-sm ">
                                  LOGO
                                </div>
                              </span>
                              <span className="pl-3">
                                <div className="border-dashed border-2 border-indigo-300 w-40 h-16 grid content-center text-center text-indigo-300 rounded-lg ">
                                  <span className="inline-flex ">
                                    <span className="pl-6">
                                      <i className="far fa-arrow-to-top text-3xl "></i>
                                    </span>
                                    <span className="pl-2 text-sm ">
                                      VENDER
                                      <div>DOCUMENT</div>
                                    </span>
                                  </span>
                                </div>
                              </span>
                            </span>
                          </div>

                          <div className="grid px-5 mt-2 col-span-12 sm:col-span-12 sm:mt-2  md:col-span-8  md:mt-0 lg:col-span-8  lg:mt-0 xl:col-span-8  xl:mt-0  content-start ">
                            <div>
                              <div className="grid  grid-cols-12  ">
                                <div className="grid col-span-12  h-64">
                                  <span className="inline-flex mb-7">
                                    <span className="w-20 h-full grid content-center">
                                      User Name:
                                    </span>
                                    <span>
                                      <TextBox
                                        defaultValue=""
                                        placeholder=""
                                        ref={User_Name}
                                        className="w-56"
                                      />
                                    </span>
                                  </span>
                                  <span className="inline-flex mb-8 ">
                                    <span className="w-20 h-full grid content-center ">
                                      Email:
                                    </span>
                                    <span>
                                      <TextBox
                                        defaultValue=""
                                        placeholder=""
                                        ref={Username}
                                        valueChangeEvent="keyup"
                                        onValueChange={chkEmail}
                                        className="w-56"
                                      />
                                      <div
                                        className={notiEmail ? "" : "hidden"}
                                      >
                                        <label className="block  text-sm font-medium text-red-500  ">
                                          {t(
                                            "This email is already in B TRAVEL Account"
                                          )}
                                        </label>
                                      </div>
                                    </span>
                                  </span>

                                  <span className="inline-flex mb-7">
                                    <span className="w-20 h-full grid content-center">
                                      Password:
                                    </span>
                                    <span>
                                      <TextBox
                                        mode="password"
                                        defaultValue=""
                                        placeholder=""
                                        ref={Password}
                                        className="w-56"
                                      />
                                    </span>
                                  </span>

                                  <span className="inline-flex mb-6">
                                    <span className="w-20 h-full grid content-center">
                                      Confirm
                                      <div>Password:</div>
                                    </span>
                                    <span className="h-full grid content-center ">
                                      <TextBox
                                        mode="password"
                                        defaultValue=""
                                        placeholder=""
                                        ref={REPassword}
                                        className="w-56"
                                      />
                                    </span>
                                  </span>

                                  <span className="inline-flex ">
                                    <span className="w-20 h-full grid content-center">
                                      Phone
                                      <div>Number:</div>
                                    </span>
                                    <span className="h-full grid content-center ">
                                      <TextBox
                                        defaultValue=""
                                        placeholder=""
                                        ref={Phone}
                                        valueChangeEvent="keyup"
                                        onValueChange={chkEmail}
                                        className="w-56"
                                      />
                                      <div
                                        className={notiPhone ? "" : "hidden"}
                                      >
                                        <label className="block  text-sm font-medium text-red-500  ">
                                          {t(
                                            "This phone number is already in MemoryBox Account"
                                          )}
                                        </label>
                                      </div>
                                    </span>
                                  </span>
                                </div>

                                <div className="grid justify-center col-span-12 pl-0 pt-14 md:mt-0 sm:col-span-12 md:mt-0 md:col-span-8 md:justify-start md:mt-3  lg:col-span-8 lg:justify-start lg:mt-3 xl:col-span-8 xl:justify-start xl:mt-3 content-start ">
                                  <div className="flex">
                                    <button className="pt-6 ">
                                      <div
                                        className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-white rounded-lg cursor-pointer font-semibold bg-indigo-500"
                                        onClick={sign}
                                      >
                                        <span className="">
                                          <span className="inline-flex ">
                                            <span className=" text-sm ">
                                              SAVE
                                            </span>
                                          </span>
                                        </span>
                                      </div>
                                    </button>
                                    <button className="pt-6 ml-3">
                                      <div className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-indigo-500 rounded-lg cursor-pointer font-semibold">
                                        <span className="">
                                          <span className="inline-flex ">
                                            <span className=" text-sm  ">
                                              CANCEL
                                            </span>
                                          </span>
                                        </span>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
