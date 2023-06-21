import React, { useEffect, useRef, useState } from "react";
import "../../css/Custom.css";
import { DateBox, TextArea } from "devextreme-react";
import { useRecoilState, useRecoilValue } from "recoil";
import "react-multi-carousel/lib/styles.css";
import HomImgProfile from "./HomImgProfile";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import TextBox from "devextreme-react/text-box";
import { GetdataAPI } from "../../MainCall/MainCall";
import { MsgWarning } from "../../MainCall/dialog";
import { useTranslation } from "react-i18next";
import Auth from "../../MainCall/Auth";
/* import VConsole from "vconsole";
const vConsole = new VConsole(); */
export default function Profile() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const [profile, setprofile] = useState("Profile");
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  const Name = useRef(null);
  const Email = useRef(null);
  const PhoneNumber = useRef(null);
  const AddressText1 = useRef(null);
  const { t } = useTranslation();
  const NewPassword = useRef(null);
  const OldPassword = useRef(null);
  const RePassword = useRef(null);
  const [labelshow, setlabelshow] = useState(true);
  const [labelshow2, setlabelshow2] = useState(true);
  const [labelshow3, setlabelshow3] = useState(true);
  const [labelshow4, setlabelshow4] = useState(true);
  const [labeloldpass, setlabeloldpass] = useState(true);
  const [labelEmail, setlabelEmail] = useState(true);
  const [labelTel, setlabelTel] = useState(true);
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    console.log(User_Data);
  }, []);
  //------------------------------------------- funtion ------------------------------------------
  const EditProfile = () => {
    GetdataAPI("/api/Main/EditProfile", {
      Firstname: Name.current.instance.option("value"),
      Email: Email.current.instance.option("value"),
      PhoneNumber: PhoneNumber.current.instance.option("value"),
      AddressText1: AddressText1.current.instance.option("value"),
    }).then(async (res) => {
      if (res.Status === "Success") {
        MsgWarning("Success");
        setprofile("Profile");
      } else {
        MsgWarning("Fail");
        return;
      }
    });
  };
  const ChkEmail = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (Email.current.instance.option("value") !== "") {
      GetdataAPI("/api/Main/CheckEmail", {
        Email: Email.current.instance.option("value"),
      }).then(async (res) => {
        if (res.Status === "Success") {
          Auth.RefreshDataUser();
          if (res.Data === "False") {
            setlabelEmail(false);
          } else {
            setlabelEmail(true);
          }
        }
      });
    } else {
      setlabelEmail(true);
    }
  };
  const ChkTel = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (Email.current.instance.option("value") !== "") {
      GetdataAPI("/api/Main/CheckPhoneNumber", {
        Phonenumber: PhoneNumber.current.instance.option("value"),
      }).then(async (res) => {
        if (res.Status === "Success") {
          Auth.RefreshDataUser();
          if (res.Data === "False") {
            setlabelTel(false);
          } else {
            setlabelTel(true);
          }
        }
      });
    } else {
      setlabelTel(true);
    }
  };
  const ChkOldPass = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (OldPassword.current.instance.option("value") !== "") {
      setlabelshow(true);
      GetdataAPI("/api/Main/CheckUserPassword", {
        Password: OldPassword.current.instance.option("value"),
      }).then(async (res) => {
        if (res.Status === "Success") {
          Auth.RefreshDataUser();
          if (res.Data === "False") {
            setlabeloldpass(false);
          } else {
            setlabeloldpass(true);
          }
        }
      });
    } else {
      setlabelshow(false);
      setlabeloldpass(true);
    }
  };
  const ChkNewPass = () => {
    if (NewPassword.current.instance.option("value") !== "") {
      setlabelshow2(true);
    } else {
      setlabelshow2(false);
    }
  };
  const ChkRePass = () => {
    if (RePassword.current.instance.option("value") !== "") {
      setlabelshow3(true);
    }
    if (
      RePassword.current.instance.option("value") !==
      NewPassword.current.instance.option("value")
    ) {
      setlabelshow4(false);
    } else {
      setlabelshow4(true);
    }
  };
  const Savepass = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (
      OldPassword.current.instance.option("value") === "" ||
      NewPassword.current.instance.option("value") === "" ||
      RePassword.current.instance.option("value") === ""
    ) {
      if (OldPassword.current.instance.option("value") === "") {
        setlabelshow(false);
        setlabeloldpass(true);
      }
      if (NewPassword.current.instance.option("value") === "") {
        setlabelshow2(false);
      }
      if (RePassword.current.instance.option("value") === "") {
        setlabelshow3(false);
        setlabelshow4(true);
      }
    } else {
      if (
        RePassword.current.instance.option("value") !==
        NewPassword.current.instance.option("value")
      ) {
        setlabelshow4(false);
      }
      if (labeloldpass === false) {
        setlabeloldpass(false);
      } else {
        GetdataAPI("/api/Main/EditProfile", {
          Password: RePassword.current.instance.option("value"),
        }).then(async (res) => {
          if (res.Status === "Success") {
            Auth.RefreshDataUser();
            MsgWarning("Success");
            setprofile("Profile");
          } else {
            MsgWarning("Fail");
          }
        });
      }
    }
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <div className="">
        <div className="grid grid-cols-12 ">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center justify-center justify-self-center bg-white rounded">
            <div className="grid  grid-cols-12  ">
              <div className="grid col-span-12  sm:col-span-12 sm:px-1 md:col-span-12 md:px-10 lg:col-span-12 lg:px-10 xl:col-span-12 xl:px-12 content-start bg-white rounded">
                <div className="grid grid-cols-12 px-10 py-5">
                  <div className="grid col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 ">
                    <div className="">
                      <div className={profile === "Profile" ? "" : "hidden"}>
                        <div className="grid grid-cols-12 ">
                          <div className="grid col-span-12 pl-12 sm:col-span-12 sm:pl-0 md:col-span-12 md:px-0 lg:col-span-12 lg:pl-0 xl:col-span-12 xl:pl-0 content-start mb-5">
                            <span className="inline-flex ">
                              <span>
                                <div className="mt-[10px] border-2 border-indigo-500 w-4 h-2 grid content-center text-center rounded-lg cursor-pointer bg-indigo-500 text-indigo-500 text-sm"></div>
                              </span>
                              <span className="pl-4 text-lg">Profile</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={profile === "Edit Profile" ? "" : "hidden"}
                      >
                        <div className="grid grid-cols-12 ">
                          <div className="grid col-span-12 pl-12 sm:col-span-12 sm:pl-0 md:col-span-12 md:px-0 lg:col-span-12 lg:pl-0 xl:col-span-12 xl:pl-0 content-start mb-5">
                            <span className="inline-flex ">
                              <span>
                                <div className="mt-[10px] border-2 border-indigo-500 w-4 h-2 grid content-center text-center rounded-lg cursor-pointer bg-indigo-500 text-indigo-500 text-sm"></div>
                              </span>
                              <span className="pl-4 text-lg">Edit Profile</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          profile === "CHANGE PASSWORD" ? "" : "hidden"
                        }
                      >
                        <div className="grid grid-cols-12 ">
                          <div className="grid col-span-12 pl-12 sm:col-span-12 sm:pl-0 md:col-span-12 md:px-0 lg:col-span-12 lg:pl-0 xl:col-span-12 xl:pl-0 content-start mb-5">
                            <span className="inline-flex ">
                              <span>
                                <div className="mt-[10px] border-2 border-indigo-500 w-4 h-2 grid content-center text-center rounded-lg cursor-pointer bg-indigo-500 text-indigo-500 text-sm"></div>
                              </span>
                              <span className="pl-4 text-lg">
                                Change Password
                              </span>
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

                        <div className="grid px-5 mt-2 col-span-12 sm:col-span-12 sm:px-0  md:col-span-8 md:px-0 md:mt-0 lg:col-span-8 lg:px-0 lg:mt-0 xl:col-span-8 xl:px-0 xl:mt-0  content-start ">
                          <div
                            className={
                              profile === "Profile" ? "pl-10" : "hidden"
                            }
                          >
                            <div className="grid  grid-cols-12  ">
                              <div className="grid col-span-12  h-64">
                                <span className="">
                                  Name:
                                  <div className="text-gray-500 mb-5">
                                    {User_Data.user_username}
                                  </div>
                                  <div className="">Email:</div>
                                  <div className="text-gray-500 mb-5">
                                    {User_Data.user_email}
                                  </div>
                                  <div className="">Phone Number:</div>
                                  <div className="text-gray-500 mb-5">
                                    {User_Data.tel}
                                  </div>
                                  <div className="">Address:</div>
                                  <div className="text-gray-500 ">
                                    222/555 ต.บ้านเกาะ อ.เมือง จ.นครราชสีมา
                                  </div>
                                </span>
                              </div>

                              <div className="grid justify-center col-span-12 pl-0 md:mt-0 sm:col-span-12 md:mt-0 md:col-span-8 md:justify-start md:mt-3  lg:col-span-8 lg:justify-start lg:mt-3 xl:col-span-8 xl:justify-start xl:mt-3 content-start ">
                                <div className="flex">
                                  <button className="pt-6 ">
                                    <div
                                      className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-indigo-500 rounded-lg cursor-pointer font-semibold"
                                      onClick={() => {
                                        setprofile("Edit Profile");
                                      }}
                                    >
                                      <span className="">
                                        <span className="inline-flex ">
                                          <span className="">
                                            <i className="fas fa-pen text-sm"></i>
                                          </span>
                                          <span className=" text-sm mt-[2px] pl-2">
                                            EDIT PROFILE
                                          </span>
                                        </span>
                                      </span>
                                    </div>
                                  </button>
                                  <button className="pt-6 ml-3">
                                    <div
                                      className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-indigo-500 rounded-lg cursor-pointer font-semibold"
                                      onClick={() => {
                                        setprofile("CHANGE PASSWORD");
                                      }}
                                    >
                                      <span className="">
                                        <span className="inline-flex ">
                                          <span className="">
                                            <i className="fas fa-pen text-sm"></i>
                                          </span>
                                          <span className=" text-sm mt-[2px] pl-2">
                                            CHANGE PASSWORD
                                          </span>
                                        </span>
                                      </span>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              profile === "Edit Profile" ? "pl-10" : "hidden"
                            }
                          >
                            <div className="grid  grid-cols-12  ">
                              <div className="grid col-span-12  h-64">
                                <span className="inline-flex mb-8 ">
                                  <span className="w-20 h-full grid content-center ">
                                    Name:
                                  </span>
                                  <span>
                                    <TextBox
                                      placeholder={User_Data.user_username}
                                      className="w-56"
                                      ref={Name}
                                    />
                                  </span>
                                </span>
                                <span className="inline-flex mb-7">
                                  <span className="w-20 h-full grid content-center">
                                    Email:
                                  </span>
                                  <span>
                                    <TextBox
                                      placeholder={User_Data.user_email}
                                      className="w-56"
                                      ref={Email}
                                      valueChangeEvent="keyup"
                                      onValueChanged={ChkEmail}
                                    />
                                    {!labelEmail ? (
                                      <label className="block  text-sm font-medium text-red-500  ">
                                        {t("มีอีเมลล์ในระบบแล้ว ")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </span>
                                <span className="inline-flex mb-7">
                                  <span className="w-20 h-full grid content-center">
                                    Phone
                                    <div>Number:</div>
                                  </span>
                                  <span className="h-full grid content-center ">
                                    <TextBox
                                      placeholder={User_Data.tel}
                                      className="w-56"
                                      ref={PhoneNumber}
                                      valueChangeEvent="keyup"
                                      onValueChanged={ChkTel}
                                    />
                                    {!labelTel ? (
                                      <label className="block  text-sm font-medium text-red-500  ">
                                        {t("มีเบอร์โทรในระบบแล้ว")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </span>
                                <span className="inline-flex ">
                                  <span className="w-20 h-full grid content-center ">
                                    Address:
                                  </span>
                                  <span className="">
                                    <TextArea
                                      placeholder=""
                                      className="w-56"
                                      ref={AddressText1}
                                    />
                                  </span>
                                </span>
                              </div>

                              <div className="grid justify-center col-span-12 pl-0 md:mt-0 sm:col-span-12 md:mt-0 md:col-span-8 md:justify-start md:mt-3  lg:col-span-8 lg:justify-start lg:mt-3 xl:col-span-8 xl:justify-start xl:mt-3 content-start ">
                                <div className="flex">
                                  <button className="pt-6 ">
                                    <div
                                      className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-white rounded-lg cursor-pointer font-semibold bg-indigo-500"
                                      onClick={() => {
                                        setprofile("Profile");
                                      }}
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
                                    <div
                                      className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-indigo-500 rounded-lg cursor-pointer font-semibold"
                                      onClick={() => {
                                        setprofile("Profile");
                                      }}
                                    >
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

                          <div
                            className={
                              profile === "CHANGE PASSWORD" ? "pl-10" : "hidden"
                            }
                          >
                            <div className="grid  grid-cols-12  ">
                              <div className="grid col-span-12  h-64">
                                <span className="inline-flex mb-8 ">
                                  <span className="w-28 h-10 h-full grid content-center ">
                                    {t("Old Password")}
                                  </span>
                                  <span>
                                    <TextBox
                                      className="w-56"
                                      defaultValue=""
                                      placeholder=""
                                      ref={OldPassword}
                                      mode="password"
                                      valueChangeEvent="keyup"
                                      onValueChanged={ChkOldPass}
                                    />
                                    {!labelshow ? (
                                      <label className="block  text-sm font-medium text-red-500">
                                        {t("Please Enter Old Password")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                    {!labeloldpass ? (
                                      <label className="block  text-sm font-medium text-red-500">
                                        {t("Please enter the old code exactly")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </span>
                                <span className="inline-flex mb-8 ">
                                  <span className="w-28 h-10 h-full grid content-center ">
                                    {t("New Password")}
                                  </span>
                                  <span>
                                    <TextBox
                                      className="w-56"
                                      defaultValue=""
                                      placeholder=""
                                      ref={NewPassword}
                                      mode="password"
                                      valueChangeEvent="keyup"
                                      onValueChanged={ChkNewPass}
                                    />
                                    {!labelshow2 ? (
                                      <label className="block  text-sm font-medium text-red-500  ">
                                        {t("Please Enter New Password")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </span>
                                <span className="inline-flex mb-8 ">
                                  <span className="w-28 h-10 h-full grid content-center ">
                                    {t("Re Password")}
                                  </span>
                                  <span>
                                    <TextBox
                                      className="w-56"
                                      defaultValue=""
                                      placeholder=""
                                      ref={RePassword}
                                      mode="password"
                                      valueChangeEvent="keyup"
                                      onValueChanged={ChkRePass}
                                    />
                                    {!labelshow3 ? (
                                      <label className="block  text-sm font-medium text-red-500  ">
                                        {t("Please Enter New Password")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                    {!labelshow4 ? (
                                      <label className="block  text-sm font-medium text-red-500  ">
                                        {t("Enter the code to match")}
                                      </label>
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </span>
                              </div>

                              <div className="grid justify-center col-span-12 pl-0 md:mt-0 sm:col-span-12 md:mt-0 md:col-span-8 md:justify-start md:mt-3  lg:col-span-8 lg:justify-start lg:mt-3 xl:col-span-8 xl:justify-start xl:mt-3 content-start ">
                                <div className="flex">
                                  <button className="pt-6 ">
                                    <div
                                      className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-white rounded-lg cursor-pointer font-semibold bg-indigo-500"
                                      onClick={() => {
                                        setprofile("Profile");
                                      }}
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
                                    <div
                                      className=" border-2 border-indigo-500 w-44 h-12 grid content-center text-center text-indigo-500 rounded-lg cursor-pointer font-semibold"
                                      onClick={() => {
                                        setprofile("Profile");
                                      }}
                                    >
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
  );
}
