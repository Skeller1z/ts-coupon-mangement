import React, { useState } from "react";
import { PinInput } from "react-input-pin-code";
import { useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupSuccess from "../MainPage/PopupSuccess";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useTranslation } from "react-i18next";
export default function RePin(props) {
  const navigate = useNavigate();
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  const [toggle, settoggle] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const togglePopup = () => {
    settoggle(!toggle);
  };
  const done = () => {
    if (props.nav === undefined) {
      navigate("/");
    } else {
      navigate(props.nav);
      Auth.RefreshDataUser();
    }
  };
  return (
    <>
      <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
      <div className="mx-2">
        <div className="grid grid-cols-12 gap-3 mt-16">
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
            <Logo className="inline h-[auto] w-[60px] center" />
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              {t("PINCODE")}
            </div>
            <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
              {t("Please, enter your pin code number*")}
            </div>
          </div>
          <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <PinInput
              values={values}
              mask
              autoFocus={true}
              placeholder=""
              inputStyle={{ width: "45px" }}
              onChange={(value, index, values) => {
                return setValues(values);
              }}
              onComplete={(valpin) => {
                const pin = valpin.join("");
                if (props.data !== pin) {
                  props.fn(true);
                  setValues(["", "", "", "", "", ""]);
                } else {
                  GetdataAPI("/api/Main/EditProfile", {
                    Pin: pin,
                  }).then(async (res) => {
                    if (res.Status === "failure") {
                    }
                    if (res.Status === "Success") {
                      done();
                    } else if (res.Status === "Err") {
                    }
                    //settoggle(!toggle);
                  });
                  //props.fn(true)
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
