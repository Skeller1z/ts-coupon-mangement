import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PinInput } from "react-input-pin-code";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
export default function SetPin(props) {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const { t, i18n } = useTranslation();
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {}, []);
  //------------------------------------------- funtion ------------------------------------------
  const PinComplete = (valpin) => {
    props.fn(valpin.join(""));
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <div className="mx-2">
      <div className="grid grid-cols-12 gap-3 mt-16">
        <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
          <Logo className="inline h-[auto] w-[60px] center" />
          <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
          {t("PINCODE")}
          </div>
          <div className="text-center mt-5 text-[#000000B2] text-sm font-semibold">
            {t("Please, create your pin code number*")}
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
              let valpin = [];
              return setValues(values), (valpin[index] = value);
            }}
            onComplete={PinComplete}
          />
        </div>
      </div>
    </div>
  );
}
