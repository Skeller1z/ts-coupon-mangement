import { TextBox } from "devextreme-react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetdataAPI } from "../../MainCall/MainCall";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { MsgWarning } from "../../MainCall/dialog";

export default function ResetPassword() {
  const { t } = useTranslation();

  const NewPassword = useRef(null);
  const RePassword = useRef(null);
  const [labelshow2, setlabelshow2] = useState(true);
  const [labelshow3, setlabelshow3] = useState(true);
  const [labelshow4, setlabelshow4] = useState(true);
  const [labeloldpass, setlabeloldpass] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const enc = searchParams.get("prm");
  const prm = enc.replaceAll(" ", "+");
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
  const Savepass = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (
      NewPassword.current.instance.option("value") === "" ||
      RePassword.current.instance.option("value") === ""
    ) {
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
        GetdataAPI("/api/Main/SaveDataNewPassword ", {
          Prm: prm,
          Password: RePassword.current.instance.option("value"),
        }).then(async (res) => {
          if (res.Status === "Success") {
            if (res.Data === "True") {
              MsgWarning(t("Success")).then((res) => {
                if (res) {
                  navigate("/Authen");
                }
              });
            } else if (res.Data === "Expire") {
              MsgWarning(t("Link expired")).then((res) => {
                if (res) {
                  navigate("/Authen");
                }
              });
            } else {
              MsgWarning(t("Failed, please try again"));
            }
          } else {
            MsgWarning(t("Failed, please try again"));
          }
        });
      }
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
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-3">
        <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start my-4">
          <UpimgIcon className="inline h-[auto] w-[70px] " />
        </div>

        <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
          {t("Reset Password")}
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900">
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
            <label className="block  text-sm font-medium text-red-500">
              {t("Please Enter New Password")}
            </label>
          ) : (
            ""
          )}
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900">
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
            <label className="block  text-sm font-medium text-red-500">
              {t("Please Enter New Password")}
            </label>
          ) : (
            ""
          )}
          {!labelshow4 ? (
            <label className="block  text-sm font-medium text-red-500">
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
