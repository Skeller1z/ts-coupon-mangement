import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Navbar Bottom sticky/Basket.svg";
import { ReactComponent as UserIcon } from "../../image/SVG_Memorybox/Navbar Bottom sticky/Account_Grey.svg";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol2.svg";
import { ReactComponent as Pay } from "../../image/SVG_Memorybox/Payment/Payment_Blue25.svg";
import { useRecoilState } from "recoil";
import { countcart } from "../../Recoil/CartRecoil";
import { useTranslation } from "react-i18next";
import Auth from "../../MainCall/Auth";
import { active } from "../../Recoil/MenuRecoil";
import { MsgOK, MsgOKCancel } from "../../MainCall/dialog";
export default function MenuBottom(props) {
  //------------ตัวแปร---------------------------
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [numcount, setnumcount] = useRecoilState(countcart);
  const [menuactive, setmenuactive] = useRecoilState(active);
  //-------------fn--------------------------------
  const FaceScan = () => {
    Auth.CurrentUser().then((res) => {
      navigate("../HomePage");
    });
  };
  const Basket = () => {
    Auth.CurrentUser().then((res) => {
      if (res !== "") {
        navigate("../OrderSummery");
        setmenuactive(2);
      } else {
        MsgOK('', 'กรุณาเข้าสู่ระบบ')
      }
    });
  };
  const Payment = () => {
    Auth.CurrentUser().then((res) => {
      if (res !== "") {
        navigate("../History");
        setmenuactive(3);
      } else {
        MsgOK('', 'กรุณาเข้าสู่ระบบ')
      }
    });
  };
  const Account = () => {
    Auth.CurrentUser().then((res) => {
      if (res !== "") {
        navigate("/Account", {
          state: {
            num: 0,
          },
        });
        setmenuactive(4);
      } else {
        MsgOK('', 'กรุณาเข้าสู่ระบบ')
      }
    });
  };
  return (
    <section
      id="bottom-navigation"
      className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
    >
      <div id="tabs" className="flex justify-between p-2">
        <a
          onClick={FaceScan}
          className={
            menuactive === 1
              ? "text-[#0D6AFA] w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
              : "w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <UpimgIcon
            className={
              menuactive === 1
                ? "fill-[#0D6AFA] inline h-[20px] w-[auto]"
                : "inline h-[20px] w-[auto]"
            }
          />
          {/* <Home className="inline h-[auto] w-[20px] " /> */}
          {/* <img src={home} className="inline h-[auto] w-[30px] menunav" /> */}
          {/* <i className="fal fa-2x fa-home"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            {t("Home")}
          </span>
        </a>
        <a
          onClick={Basket}
          className={
            menuactive === 2
              ? " text-[#0D6AFA] relative w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
              : "relative w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <Cart
            className={
              menuactive === 2
                ? "fill-[#0D6AFA] relative inline h-[20px] w-[auto]"
                : "relative inline h-[20px] w-[auto]"
            }
          />
          <span
            className={
              numcount != 0
                ? "absolute top-1 right-5 text-[13px] inline-block py-1 px-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#FF4A4A] text-white rounded-full w-[22px]"
                : "absolute invisible"
            }
          >
            {numcount}
          </span>
          {/* <i className="fal fa-2x fa-shopping-cart"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            {t("Basket")}
          </span>
        </a>
        <a
          onClick={Payment}
          className={
            menuactive === 3
              ? " text-[#0D6AFA] w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
              : "w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <Pay
            className={
              menuactive === 3
                ? "fill-[#0D6AFA] inline h-[20px] w-[auto]"
                : "inline h-[20px] w-[auto]"
            }
          />
          {/* <i className="fal fa-2x fa-history"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            {t("Payment")}
          </span>
        </a>
        <a
          onClick={Account}
          className={
            menuactive === 4
              ? " text-[#0D6AFA] w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
              : "w-full menunav focus:text-[#0D6AFA] hover:text-[#0D6AFA] justify-center inline-block text-center pt-2 pb-1"
          }
        >
          <UserIcon
            className={
              menuactive === 4
                ? "fill-[#0D6AFA] inline h-[20px] w-[auto]"
                : "inline h-[20px] w-[auto]"
            }
          />

          {/* <i className="fal fa-2x fa-user"></i> */}
          <span className="tab tab-account block text-xs opacity-[85%]">
            {t("Account")}
          </span>
        </a>
      </div>
    </section>
  );
}
