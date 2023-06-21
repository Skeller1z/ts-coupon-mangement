import TextBox from "devextreme-react/text-box";

import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { MsgWarning } from "../../MainCall/dialog";

export default function ChangePassWord() {
  const navigate = useNavigate();

  interface LocationState {
    num: number;
    email: string;
    tel: string;
    pass: string;
  }
  const tab = useRef(null);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;

  const { t } = useTranslation();
  const NewPassword = useRef(null);
  const OldPassword = useRef(null);
  const RePassword = useRef(null);

  useEffect(() => {}, [StateInterface]);

  const confirmpass = () => {
    if (
      OldPassword.current.instance.option("value") === "" ||
      NewPassword.current.instance.option("value") === "" ||
      RePassword.current.instance.option("value") === ""
    ) {
      MsgWarning(t("Please, fill in the information."));
      return;
    }

    if (OldPassword.current.instance.option("value") === "") {
      MsgWarning(t("Please enter the old password."));
      return;
    }

    if (OldPassword.current.instance.option("text") !== StateInterface.pass) {
      MsgWarning(t("Wrong password"));
      return;
    }

    if (
      NewPassword.current.instance.option("value") ===
      OldPassword.current.instance.option("value")
    ) {
      MsgWarning(t("The new password is the same as the old password."));
      return;
    }
    if (
      NewPassword.current.instance.option("value") !==
      RePassword.current.instance.option("value")
    ) {
      MsgWarning(t("Please, match the new password"));
      return;
    } else {
      navigate("../MyProfile", {
        state: {
          num: 0,
          email: StateInterface.email,
          tel: StateInterface.tel,
          pass: RePassword.current.instance.option("value"),
        },
      });
      MsgWarning(t("Success"));
    }
  };

  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-6">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900 mb-2">
            {t("Old Password")}
          </label>
          <TextBox
            mode="password"
            defaultValue=""
            placeholder=""
            ref={OldPassword}
          />
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900 mb-2">
            {t("New Password")}
          </label>
          <TextBox
            mode="password"
            defaultValue=""
            placeholder=""
            ref={NewPassword}
          />
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-sm font-medium text-gray-900 mb-2">
            {t("Re-enter Password")}
          </label>
          <TextBox
            mode="password"
            defaultValue=""
            placeholder=""
            ref={RePassword}
          />
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center ">
          <button className="btn-save" type="button" onClick={confirmpass}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
