import TextBox from "devextreme-react/text-box";
import { useRecoilValue } from "recoil";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupSuccess from "../MainPage/PopupSuccess";
import PopupFailed from "../MainPage/PopupFailed";
export default function ChangePassWord2() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const { t } = useTranslation();
  const NewPassword = useRef(null);
  const OldPassword = useRef(null);
  const RePassword = useRef(null);
  const [labelshow, setlabelshow] = useState(true);
  const [labelshow2, setlabelshow2] = useState(true);
  const [labelshow3, setlabelshow3] = useState(true);
  const [labelshow4, setlabelshow4] = useState(true);
  const [labeloldpass, setlabeloldpass] = useState(true);
  let navigate = useNavigate();
  const [toggle, settoggle] = useState<boolean>(false);
  const [togglefail, settogglefail] = useState<boolean>(false);
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
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
            settoggle(!toggle);
          } else {
            settogglefail(!togglefail);
          }
        });
      }
    }
  };
  const togglePopup = () => {
    settoggle(!toggle);
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
  const done = () => {
    navigate("../MyProfile");
  };
  const togglePopupfail = () => {
    settogglefail(!togglefail);
  };
  const donefail = () => {
    settogglefail(false);
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div className="px-5 py-2">
      <PopupFailed data={togglefail} toggle={togglePopupfail} done={donefail} />
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <div className="grid grid-cols-12 gap-6">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900 mb-2">
            {t("Old Password")}
          </label>
          <TextBox
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
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900 mb-2">
            {t("New Password")}
          </label>
          <TextBox
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
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900   mb-2">
            {t("Re-enter Password")}
          </label>
          <TextBox
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
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center ">
          <button className="btn-save" type="button" onClick={Savepass}>
            {t("Confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}
