import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import MenuBottom from "./MenuBottom";
import { ReactComponent as Icon_grey } from "../../image/SVG_Memorybox/Navbar Top/Nav icon_grey.svg";
import { useTranslation } from "react-i18next";
import PopupLang from "../MainPage/PopupLang";
import THAicon from "../../image/lang/THA icon.png";
import ENGicon from "../../image/lang/ENG icon.png";
import CNAicon from "../../image/lang/CNA icon.png";
import RUSicon from "../../image/lang/RUS icon.png";
export default function Menu_index(props) {
  //-----------------ตัวแปร-------------------------------------------
  const UserStateData = useRecoilValue<userdata>(UserState);
  const { pageshow } = props;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const navigation = [
    { id: 1, text: "Home", icon: "far fa-home" },
    { id: 2, text: "Pricing", icon: "far fa-dollar-sign" },
    { id: 6, text: "LogOut", icon: "far fa-sign-out " },
  ];
  const [opened, setopened] = useState<boolean>(false);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  //-----------------onload-------------------------------------------
  useEffect(() => {
    if (UserStateData.username === "") {
      navigate("/Authen");
    }
  }, []);
  //-----------------function-------------------------------------------
  const menucilck = (e) => {
    if (e.itemData.id === 1) {
      navigate("../");
      onOutsideClick();
    } else if (e.itemData.id === 2) {
      navigate("../Price");
      onOutsideClick();
    } else if (e.itemData.id === 6) {
      Auth.LogOut();
      onOutsideClick();
    }
  };
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  const iconMenu = () => {
    return <UpimgIcon className="inline h-[auto] w-[40px] ml-2" />;
  };
  const done = () => {
    setPopupVisibility(false);
  };
  const btnMenu = () => {
    return (
      <button type="button" className="hover:bg-slate-100 p-2">
        <Icon_grey
          className="inline h-[auto] w-[30px] "
          onClick={() => setopened(!opened)}
        />
        {/*  <i
          className="fas fa-grip-vertical"
          onClick={() => setopened(!opened)}
        ></i> */}
      </button>
    );
  };

  const onOutsideClick = () => {
    setopened(false);
    return false;
  };
  const setLang = (lang) => {
    localStorage.setItem("Lang", lang);
  };
  const lang = () => {
    return (
      <span>
        <span
          className={
            localStorage.getItem("Lang") === "th"
              ? "text-[#0D6AFA] cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => {
            i18n.changeLanguage("th");
            setLang("th");
          }}
        >
          ไทย
        </span>
        <span> | </span>
        <span
          className={
            localStorage.getItem("Lang") === "en"
              ? "text-[#0D6AFA] cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => {
            i18n.changeLanguage("en");
            setLang("en");
          }}
        >
          EN
        </span>
      </span>
    );
  };
  const btnlang = () => {
    return (
      <button type="button" className="hover:bg-slate-100 p-2">
        <img
          className="h-8"
          src={
            localStorage.getItem("Lang") === "th"
              ? THAicon
              : localStorage.getItem("Lang") === "en"
              ? ENGicon
              : localStorage.getItem("Lang") === "cna"
              ? CNAicon
              : localStorage.getItem("Lang") === "rus"
              ? RUSicon
              : ENGicon
          }
          onClick={togglePopup}
        />
      </button>
    );
  };
  //-----------------html-------------------------------------------

  function drawerComponentList() {
    return (
      <div className="list relative">
        <div
          className="list absolute top-[60px] shadow"
          style={{ width: "100vw" }}
        >
          <List
            dataSource={navigation}
            className=""
            onItemClick={(e) => {
              menucilck(e);
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <PopupLang data={isPopupVisible} toggle={togglePopup} done={done} />
      <section
        id="bottom-navigation"
        className=" fixed inset-x-0 top-0 z-20 bg-white shadow"
      >
        <Toolbar>
          <Item location="center" render={iconMenu} />
          <Item location="after" render={btnlang} />
          <Item location="after" render={btnMenu} />
        </Toolbar>
      </section>
      <Drawer
        className="fixed inset-x-0 top-0 z-10"
        opened={opened}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode="shrink"
        position="top"
        component={drawerComponentList}
        revealMode="expand"
        height={"auto"}
        maxSize={300}
      ></Drawer>
      <div id="content" className="">
        <div className="grid grid-cols-12 bg-[#F6F9FF] pt-[60px] pb-[62px]">
          <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white">
            {pageshow}
          </div>
        </div>
      </div>
      <MenuBottom />
    </>
  );
}
