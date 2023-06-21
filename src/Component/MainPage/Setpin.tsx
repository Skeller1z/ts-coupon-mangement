import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SetPin from "../Ecom/SetPin";

import RePin from "./RePin";

export default function Setpin() {
  //-----------ตัวแปร------------------------------
  const [repin, setrepin] = useState<String>("");
  const [notiPin, setnotiPin] = useState(false);
  const { t } = useTranslation();
  //----------------onload---------------------------
  //----------------function---------------------------

  const fnrepin = (data) => {
    setnotiPin(data);
  };
  const returnpin = (data) => {
    setrepin(data);
  };
  //------------------html----------------------------
  return (
    <>
      {repin === "" ? (
        <div className="p-3">
          <SetPin fn={returnpin} />
        </div>
      ) : (
        <div>
          <div className="text-2xl text-center">{t("Re Enter Pin")}</div>
          <div className="p-3">
            <RePin fn={fnrepin} data={repin} />
          </div>

          {notiPin ? (
            <label className="block  text-sm font-medium text-red-500   text-center mt-3">
              {t("Pin not match")}
            </label>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
