import TextBox from "devextreme-react/text-box";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function EditEmail() {
  //-----------------------------ตัวแปร----------------------
  const navigate = useNavigate();

  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  interface LocationState {
    num: number;
    email: string;
    tel: string;
    pass: string;
  }

  const valEmail = useRef(null);
  //-----------------function-------------------------------
  const Toconfirm = () => {
    navigate("../ConfirmEmail", {
      state: {
        num: 0,
        email: StateInterface.email,
        tel: StateInterface.tel,
        pass: StateInterface.pass,
      },
    });
  };

  const InputEmail = () => {
    return (
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900  ">
          Email
        </label>
        <TextBox
          placeholder=""
          defaultValue={StateInterface.email}
          ref={valEmail}
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <div
          className="absolute right-2.5 bottom-[5px] text-lg text-orange-400 font-bold cursor-pointer hover:text-orange-700 active:text-orange-900"
          onClick={Toconfirm}
        >
          แก้ไข
        </div>
      </div>
    );
  };
  //-----------------------------html------------------------------------------------
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-3">
        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
          <InputEmail />
        </div>
      </div>
    </div>
  );
}
