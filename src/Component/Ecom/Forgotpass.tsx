import { useRef, useState } from "react";
import TextBox from "devextreme-react/text-box";
import { useNavigate } from "react-router-dom";
import { MsgWarning } from "../../MainCall/dialog";
import { GetdataAPI_Outside } from "../../MainCall/MainCall";
import Loading from "../MainPage/Loading";
import { useTranslation } from "react-i18next";

export default function Forgotpass() {
  //------------------------ตัวแปร-----------------------------
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const Email = useRef(null);
  const { t } = useTranslation();
  //------------------------function--------------------------
  const ChkeMail = (T: string) => {
    let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

    if (email.test(T)) {
      return "true";
    }
  };
  const Next = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const email = await ChkeMail(Email.current.instance.option("value"));
    if (!email) {
      MsgWarning(t("Please, fill your email"));
      return;
    }
    if (Email.current.instance.option("value") === "") {
      MsgWarning(t("Please, fill your email"));
    } else {
      setIsLoading(true);
      GetdataAPI_Outside("/api/Main/CheckUserName_Email", {
        Email: Email.current.instance.option("value"),
      }).then((CheckUserEmail) => {
        if (CheckUserEmail.Status === "Success") {
          if (CheckUserEmail.Data === "False") {
            MsgWarning(t("Couldn't find your MemoryBox Account"));
          } else {
            GetdataAPI_Outside(
              "/api/MemoryBox/SendLinkResetPasswordMemoryBox",
              {
                Email: Email.current.instance.option("value"),
                RedirectUrl:
                  "https://www.memorybox-store.com/Memorybox/MobileAuth/ResetPassword",
              }
            ).then((Send) => {
              if (Send.Status === "Success") {
                navigate("../ForgotEmail");
              } else {
                MsgWarning(t("There was an error. Please, try again later"));
              }
            });
          }
        }
      });
    }
  };
  //------------------------HTML------------------------------
  return (
    <>
      <div className={isLoading ? "" : "hidden"}>
        <Loading />
      </div>
      <div className={isLoading ? "hidden" : ""}>
        <div className="px-5 py-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 text-xl font-bold mb-3">
              Reset your password
            </div>
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2">
              <label className="block text-sm font-medium text-gray-900  ">
                Enter the email address you signed up with below. An email will
                be sent containing a link to reset your password.
              </label>
            </div>
            <div className="grid col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start">
              <TextBox placeholder="Email" ref={Email} />
            </div>
            <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start">
              <button type="button" className="btn-save" onClick={Next}>
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
