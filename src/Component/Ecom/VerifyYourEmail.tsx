import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupFailed from "../MainPage/PopupFailed";
import PopupSuccess from "../MainPage/PopupSuccess";
export default function VerifyYourEmail() {
  //------------------------------------------- ตัวแปร ------------------------------------------

  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  interface LocationState {
    email: string;
  }
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [toggle, settoggle] = useState<boolean>(false);
  const [togglefail, settogglefail] = useState<boolean>(false);
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
  const saveVerified = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    GetdataAPI("/api/Main/EditProfile", {
      VerifyEmail: true,
    }).then(async (res) => {
      if (res.Status === "Success") {
        Auth.RefreshDataUser();
        settoggle(!toggle);
        navigate("../MyProfile");
      } else {
        settogglefail(!togglefail);
      }
    });
  };
  const togglePopup = () => {
    settoggle(!toggle);
  };
  const togglePopupfail = () => {
    settogglefail(!togglefail);
  };
  const donefail = () => {
    settogglefail(false);
  };
  const done = () => {
    navigate("../MyProfile");
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <PopupFailed data={togglefail} toggle={togglePopupfail} done={donefail} />
      <div className="grid grid-cols-12 gap-6 px-10">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <label className="block  text-xl font-bold text-gray-900   mb-2 ">
            {t("Verify Your Email")}
          </label>
          <label className="block  text-base text-gray-900   mb-2 ">
            {t("We have sent an email to")}
          </label>
          {StateInterface.email}
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-3">
          <label className="block text-base text-gray-900  ">
            {t(
              "You need to verify email to continue if you have not received the verfication email, please check your Spam or Bulk Email folder you can also click the resend button below to have another email sent to you."
            )}
          </label>
        </div>
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-3">
          <button
            className="btn-save w-56 text-base mb-3"
            onClick={saveVerified}
          >
            {t("Check again and continue")}
          </button>
          <button className="btn-save w-56 text-base mb-3">
            {t("Resend verfication Email")}
          </button>
        </div>
      </div>
    </>
  );
}
