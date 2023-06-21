import { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import { useTranslation } from "react-i18next";
import Auth from "../../MainCall/Auth";
import auhv from "../../MainCall/auhv.json";
import { MsgWarning } from "../../MainCall/dialog";

import liff from "@line/liff/dist/lib";
import { useRecoilState } from "recoil";

interface LocationState {
  UserId: string;
  uri: string;
  displayName: string;
  inv_id: number;
  email: string;
  authen_code: string;
  platform_name: string;
}
export default function SignUpNotpin() {
  const Username = useRef(null);
  const Password = useRef(null);
  const Phone = useRef(null);
  const btnSign = useRef(null);
  //------------------------ตัวแปร-----------------------------
  const [searchParams, setSearchParams] = useSearchParams();
  const data1 = searchParams.get("data1");
  const data2 = searchParams.get("data2");

  const [teldisabled, setteldisabled] = useState(false);
  const [namedisabled, setnamedisabled] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notiEmail, setnotiEmail] = useState(false);
  const [notiPhone, setnotiPhone] = useState(false);
  const { AuthenticateLine } = auhv;

  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;

  //-------------------------- onload --------------------------
  useEffect(() => {
    if (searchParams.get("data1") !== null) {
      CheckDataDocumentnumber();
    }
    console.log(StateInterface.UserId);
    btnSign.current.setAttribute("disabled", "");
    Username.current.instance.option("value", StateInterface.displayName);
  }, []);
  //------------------------function--------------------------
  const CheckDataDocumentnumber = () => {
    const invID = data1.replaceAll("@", "");
  };
  const chkPhone = () => {
    GetdataAPI_Outside("/api/Main/CheckPhoneNumber", {
      Phonenumber: Phone.current.instance.option("value"),
    }).then((CheckPhoneNumber) => {
      if (CheckPhoneNumber.Status === "Success") {
        if (CheckPhoneNumber.Data === "False") {
          setnotiPhone(false);
          btnSign.current.removeAttribute("disabled");
        } else {
          setnotiPhone(true);
          btnSign.current.setAttribute("disabled", "");
        }
      } else {
        MsgWarning(CheckPhoneNumber.Message);
      }
    });
  };
  const sign = async (e) => {
    if (Username.current.instance.option("value") === "") {
      MsgWarning("กรุณากรอกชื่อ");
      return;
    } else {
      if (e && e.stopPropagation) e.stopPropagation();
      register();
    }
  };
  const register = () => {
    GetdataAPI_Outside("/api/Main/Register", {
      PhoneNumber: Phone.current.instance.option("value"),
      Password: "000000",
      UserName: StateInterface.UserId,
      User_Name: Username.current.instance.option("value"),
      Firstname: Username.current.instance.option("value"),
      Lastname: "",
      Email: StateInterface.email,
      UserlineId: StateInterface.UserId,
      user_pin: "000000",
    }).then((Register) => {
      if (Register.Status === "Success") {
        GetdataAPI("/api/Main/SaveAuthenCode", {
          authen_code: StateInterface.UserId,
          platform_name: StateInterface.platform_name
        }).then(async (res) => {
        });
        login();
      } else {
        MsgWarning(Register.Message);
      }
    });
  };
  const login = () => {
    Auth.Login(AuthenticateLine, StateInterface.UserId, "000000").then(
      (res) => {
        Auth.RefreshDataUser();
        if (res.Status === "Success") {
          if (StateInterface === null) {
            navigate("/");
          } else if (StateInterface.uri === undefined) {
            navigate("/");
          } else {
            navigate("/");
          }
        } else {
          MsgWarning("failure");
        }
      }
    );
  };
  const savepartner = () => {
    GetdataAPI("/api/Main/SaveDataPartnerFromUserWeb", {
      CompId: 0,
    }).then((Partner) => {
      if (Partner.Status === "Success") {
        Addfriend();
      } else {
        MsgWarning(Partner.Message);
      }
    });
  };
  const Addfriend = () => {
    window.location.replace("https://lin.ee/7CddPAx");
  };

  const ToLogin = () => {
    if (StateInterface !== null) {
      navigate("/Authen", {
        state: {
          UserId: StateInterface.UserId,
          uri: StateInterface.uri,
        },
      });
    } else {
      navigate("/Authen");
    }
  };
  const done = () => {
    navigate("/");
  };
  //------------------------HTML------------------------------
  return (
    <>
      <div className="px-5">
        <div className="grid grid-cols-12 bg-[#F6F9FF2]">
          <div className="grid col-span-12 sm:col-span-10 sm:col-start-2  md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
            <div className="grid grid-cols-12 gap-3 mt-14">
              <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-4"></div>

              <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-8 font-bold">
                ลงทะเบียนสมาชิก
              </div>

              <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-4 ">
                <TextBox
                  defaultValue=""
                  placeholder={"ชื่อ-สกุล*"}
                  ref={Username}
                  disabled={namedisabled}
                  valueChangeEvent="keyup"
                />
                <div className={notiEmail ? "" : "hidden"}>
                  <label className="block  text-sm font-medium text-red-500  ">
                    {t("This email is already in MemoryBox Account")}
                  </label>
                </div>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4">
                <TextBox
                  defaultValue=""
                  placeholder={"เบอร์โทรศัพท์ *"}
                  ref={Phone}
                  disabled={teldisabled}
                  valueChangeEvent="keyup"
                  onValueChange={chkPhone}
                />
                <div className={notiPhone ? "" : "hidden"}>
                  <label className="block  text-sm font-medium text-red-500  ">
                    {t("This phone number is already in MemoryBox Account")}
                  </label>
                </div>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-4 mb-2">
                <button
                  type="button"
                  className="btn-save mb-2"
                  ref={btnSign}
                  onClick={sign}
                >
                  ลงทะเบียน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
