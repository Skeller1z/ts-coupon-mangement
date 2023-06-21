import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { MsgWarning } from "../../MainCall/dialog";
import CheckPin from "./CheckPin";

export default function PinLogin() {
  //--------ตัวแปร----------------------------
  const { t, i18n } = useTranslation();
  interface LocationState {
    UserId: string;
    uri: string;
  }
  const navigate = useNavigate();
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //-------------onload-------------------------------------
  useEffect(() => {}, []);
  //------------------------------------------- funtion ------------------------------------------
  const returnpin = (data) => {
    if (data) {
      navigate("/");
    } else {
      MsgWarning(t("Wrong password"));
    }
  };
  const login = () => {
    navigate("/Authen", {
      state: {
        UserId: StateInterface.UserId,
      },
    });
  };
  return (
    <>
      <div className="p-3">
        <CheckPin
          status={"login"}
          LineID={StateInterface.UserId}
          fn={returnpin}
        />
      </div>
      <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 px-4">
        <span
          className="text-blue-600 cursor-pointer hover:text-blue-900"
          onClick={login}
        >
          {t("or use your email to login")}
        </span>
      </div>
    </>
  );
}
