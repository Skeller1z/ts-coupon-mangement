import React, { useState, useEffect } from "react";
import { PinInput } from "react-input-pin-code";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupFailed from "../MainPage/PopupFailed";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useTranslation } from "react-i18next";
export default function CheckPin(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [togglefail, settogglefail] = useState(false);
  const { t, i18n } = useTranslation();
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {}, []);
  //------------------------------------------- funtion ------------------------------------------
  const PinComplete = (valpin) => {
    setValues(["", "", "", "", "", ""]);
    GetdataAPI("/api/Main/CheckPinTrueOrFalse", {
      Pin: valpin.join(""),
    }).then(async (res) => {
      if (res.Status === "Success") {
        if (res.Data === "True") {
          props.fn(true);
        } else {
          props.fn(false);
        }
      } else if (res.Status === "Err") {
        settogglefail(true);
      } else if (res.Status === "failure") {
        settogglefail(true);
      }
    });
  };
  const togglePopupfail = () => {
    settogglefail(!togglefail);
  };
  const donefail = () => {
    settogglefail(false);
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <PopupFailed data={togglefail} toggle={togglePopupfail} done={donefail} />
      <div className="mx-2">
        <div className="grid grid-cols-12 gap-3 mt-16">
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
            <Logo className="inline h-[auto] w-[60px] center" />
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              {t("PINCODE")}
            </div>
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              {t("Reconfirm code")}
            </div>
          </div>
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <PinInput
              autoFocus={true}
              values={values}
              mask
              placeholder=""
              inputStyle={{ width: "45px" }}
              onChange={(value, index, values) => {
                let valpin = [];
                return setValues(values), (valpin[index] = value);
              }}
              onComplete={PinComplete}
            />
          </div>
        </div>
      </div>
    </>
  );
}
