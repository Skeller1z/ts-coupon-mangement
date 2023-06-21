import TextBox from "devextreme-react/text-box";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function EditPhone() {
  //----------------ตัวแปร----------------------
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  interface LocationState {
    num: number;
    email: string;
    tel: string;
    pass: string;
  }

  const { t } = useTranslation();

  const Telhide = "********" + StateInterface.tel.slice(-2);
  //------------------function------------------------------------------
  const InputTel = () => {
    return (
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">
          {t("Phone Number")}
        </label>
        <TextBox
          placeholder=""
          defaultValue={Telhide}
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute right-2.5 bottom-[5px] text-lg text-orange-400 font-bold cursor-pointer hover:text-orange-700 active:text-orange-900">
          แก้ไข
        </div>
      </div>
    );
  };
  //--------------------html----------------------------------------------------
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-3">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
          <InputTel />
        </div>
      </div>
    </div>
  );
}
