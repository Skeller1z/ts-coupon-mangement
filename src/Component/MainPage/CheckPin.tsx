import React, { useEffect, useState } from "react";
import { PinInput } from "react-input-pin-code";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import auhv from "../../MainCall/auhv.json";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { GetdataAPI } from "../../MainCall/MainCall";
import { MsgWarning } from "../../MainCall/dialog";
import { useTranslation } from "react-i18next";
export default function CheckPin(props) {
  const { t, i18n } = useTranslation();
  const { AuthenticateLine } = auhv;
  const navigate = useNavigate();
  const [Pin, setPin] = useState("");
  const [values, setValues] = React.useState(["", "", "", "", "", ""]);
  interface LocationState {
    uri: string;
  }
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  //-------------------------- onload --------------------------

  return (
    <>
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
              autoFocus={true}
              mask
              placeholder="_"
              inputStyle={{ width: "45px" }}
              onChange={(value, index, values) => {
                let valpin = [];
                return setValues(values), (valpin[index] = value);
              }}
              onComplete={(valpin) => {
                setValues(["", "", "", "", "", ""]);
                if (props.status === "login") {
                  Auth.Login(
                    AuthenticateLine,
                    props.LineID,
                    valpin.join("")
                  ).then((res) => {
                    if (res.Status === "Success") {
                      if (StateInterface === null) {
                        navigate("/");
                      } else {
                        if (StateInterface.uri === undefined) {
                          navigate("/");
                        } else {
                          window.location.href = StateInterface.uri;
                        }
                      }
                    } else {
                      MsgWarning(t("Wrong password"));
                    }
                  });
                } else {
                  setPin(valpin.join(""));
                  GetdataAPI("/api/Main/CheckPinTrueOrFalse", {
                    Pin: valpin.join(""),
                  }).then(async (res) => {
                    if (res.Status === "failure") {
                      return;
                    }
                    if (res.Status.trim() === "Success") {
                      props.fn(true);
                    } else if (res.Status.trim() === "Err") {
                      MsgWarning(t("Wrong password"));
                    }
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
