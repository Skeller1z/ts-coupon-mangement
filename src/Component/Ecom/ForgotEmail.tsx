import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ForgotEmail() {
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const Next = async () => {
    navigate("/Authen");
  };
  //------------------------HTML------------------------------
  return (
    <div className="px-5 py-10">
      <div className="grid text-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2 text-2xl font-bold mb-5">
         {t("The link to reset your password has been sent to your email.")}
      </div>

      <div className="grid text-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start pb-4">
        {t("If you do not receive the reset password within a few minutes, please check your Junk E-mail folder just in case.")}
      </div>
      <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
        <button type="button" className="btn-save px-4" onClick={Next}>
          {t("Return")}
        </button>
      </div>
    </div>
  );
}
