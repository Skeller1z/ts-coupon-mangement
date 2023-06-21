import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import TextBox from "devextreme-react/text-box";
import { useTranslation } from "react-i18next";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { useNavigate } from "react-router-dom";
export default function ChangePhoneNumber2() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  let navigate = useNavigate();
  const { t } = useTranslation();
  const tel = useRef(null);
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
  const Edit = () => {
    navigate("../ChangePhoneNumber3");
  };
  const Verify = () => {
    navigate("../OTP");
  };
  const InputTel = () => {
    return (
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">
          {t("Phone Number")}
        </label>
        <TextBox
          value={User_Data.tel}
          ref={tel}
          placeholder=""
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <div
          className="absolute right-2.5 bottom-[9px] text-lg text-orange-400 font-bold cursor-pointer hover:text-orange-700 active:text-orange-900"
          onClick={Edit}
        >
          {t("Edit")}
        </div>
      </div>
    );
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-3">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
          <InputTel />
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
          <button className="btn-save" type="button" onClick={Verify}>
            {t("Verify")}
          </button>
        </div>
      </div>
    </div>
  );
}
