
import "../../App.css";
import "../../css/Custom.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MBluecoin } from "../../image/SVG_Memorybox/Account/Review/MCoin.svg";
import { useRecoilValue } from "recoil";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import { useTranslation } from "react-i18next";
export default function MyProfile() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const User = useRecoilValue<userdata>(UserState);
  const User_Data: userWebdata = User.ud;
  //------------------------------------------- onload ------------------------------------------
  //------------------------------------------- funtion ------------------------------------------
  const ChangeEmail = () => {
    navigate("../ChangeEmailpath2", {
      state: {
        num: 0,
        tel: User_Data.tel,
        email: User_Data.user_email,
      },
    });
  };
  const ChangePhoneNumber = () => {
    navigate("../ChangePhoneNumber2", {
      state: {
        num: 0,
        tel: User_Data.tel,
        email: User_Data.user_email,
      },
    });
  };
  const ChangePin = () => {
    navigate("../Pin", {
      state: {
        num: 0,
        tel: User_Data.tel,
        email: User_Data.user_email,
      },
    });
  };
  const ChangePass = () => {
    navigate("../Changepassword2", {
      state: {
        num: 0,
        tel: User_Data.tel,
        email: User_Data.user_email,
      },
    });
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <div className="grid grid-cols-12 gap-5 border-b-gray-300 border-b-2 pb-10 mt-10 flex mx-5">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4 ">
          <div className="grid grid-cols-12 gap-7">
            <div className="pt-0 grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-12 ">
              <div className="text-lg mb-2">{t("Full Name")}</div>
              <div className="text-lg w-20">{User_Data.user_username}</div>
            </div>
            <div className="pt-0 grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-12 ">
              <div className="text-lg mb-2">{t("Birthday")}</div>
              <div className="text-lg">20/05/1999</div>
            </div>
          </div>
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4 ">
          <div className="grid grid-cols-12 gap-7">
            <div className="pt-0 grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-12 ">
              <span className="mb-2">
                <span>{t("Email")}</span>
                <span> | </span>
                <span
                  className="text-[#1572F5] cursor-pointer hover:text-blue-800"
                  onClick={ChangeEmail}
                >
                  {t("Change")}
                </span>
              </span>
              <div className="text-blue mb-2">{User_Data.user_email}</div>
              <div className="text-black text-[12px]">
                {t("Receive Marketing Email")}
              </div>
            </div>
            <div className="pt-0 grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-12 ">
              <span className="mb-2">
                <span>{t("Mobile")}</span>
                <span> | </span>
                <span
                  className="text-[#1572F5] cursor-pointer hover:text-blue-800"
                  onClick={ChangePhoneNumber}
                >
                  {t("Change")}
                </span>
              </span>
              <div className="text-blue mb-2">{User_Data.tel}</div>
              <div className="text-black text-[12px]">
                {t("Receive Marketing SMS")}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4 mt-3">
          <div className="grid grid-cols-12 gap-5">
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-8">
              <button className="btn-save" onClick={ChangePin}>
                <div className="text-lg">{t("Pin setting")}</div>
              </button>
            </div>
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-8">
              <button className="btn-save" onClick={ChangePass}>
                <div className="text-lg">{t("Change Password")}</div>
              </button>
            </div>
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-12  "></div>
            <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-12  "></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mx-10 mt-20 mb-20">
        <div className="pt-0 justify-center grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-5 content-center ">
          <div className="grid grid-cols-12 gap-3 ">
            <div className="pt-0 justify-center grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center ">
              <MBluecoin className="inline h-[auto] w-[50px]" />
            </div>
            <div className="pt-0 justify-center grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center ">
              <div className="text-lg"> {t("My Memory Coin")}</div>
            </div>
          </div>
        </div>
        <div className="pt-0 grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-7 content-center mt-3">
          <div className="">
            <div className="grid grid-cols-12  bg-[#F6F9FF] text-md mt-5 text-center">
              <div className=" grid col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 justify-start">
                <div className="w-full h-full">
                  <div className="border border-t-black border-l-black w-[4px] h-[4px]"></div>
                  <div className="h-[60px]"></div>
                  <div className="border border-b-black border-l-black w-[4px] h-[4px]"></div>
                </div>
              </div>
              <div className=" grid col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-10 xl:col-span-10 content-center">
                <div className="text-[#126AFA]">
                  {t("Get more coin review and share yours awesome photho")}
                </div>
              </div>
              <div className=" grid col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 justify-end">
                <div className="w-full h-full">
                  <div className="border border-t-black border-r-black w-[4px] h-[4px]"></div>
                  <div className="h-[60px]"></div>
                  <div className="border border-b-black border-r-black w-[4px] h-[4px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
