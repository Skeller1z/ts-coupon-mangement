import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useRecoilValue } from "recoil";
import { userdata, UserState, userWebdata } from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import MenuBottom from "./MenuBottom";
import { ReactComponent as Icon_grey } from "../../image/SVG_Memorybox/Navbar Top/Nav icon_grey.svg";
import TextBox from "devextreme-react/text-box";
import { useTranslation } from "react-i18next";
import PopupLang from "../MainPage/PopupLang";
import THAicon from "../../image/lang/THA icon.png";
import ENGicon from "../../image/lang/ENG icon.png";
import CNAicon from "../../image/lang/CNA icon.png";
import RUSicon from "../../image/lang/RUS icon.png";
import FacebookLogin from "react-facebook-login";
import Google_login from "../MainPage/Google_login";
import liff from "@line/liff/dist/lib";
import Logo2 from "../../image/BTRAVEL2.png";
import auhv from "../../MainCall/auhv.json";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
import { MsgOK, MsgWarning } from "../../MainCall/dialog";
import Search from "../Ecom/Search";
import Footer from "./Footer";
import Menu_Chat from "./Menu_Chat";
export default function Menu_Login(props) {
    //-----------------ตัวแปร-------------------------------------------
    const UserStateData = useRecoilValue<userdata>(UserState);
    const User = useRecoilValue<userdata>(UserState);
    const User_Data: userWebdata = User.ud;
    const { Authenticate } = auhv;
    const { pageshow } = props;
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const navigation = [
        { id: 1, text: "Home", icon: "far fa-home" },
        { id: 2, text: "Pricing", icon: "far fa-dollar-sign" },
        { id: 6, text: "LogOut", icon: "far fa-sign-out " },
    ];
    const langDrop = [
        { id: 1, text: "TH", icon: THAicon },
        { id: 2, text: "EN", icon: ENGicon },
    ];
    const [opened, setopened] = useState<boolean>(false);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [dropdownLogin, setdropdownLogin] = useState(false);
    const [dropdownLang, setdropdownLang] = useState(false);
    interface LocationState {
        UserId: string;
        uri: string;
    }
    const location = useLocation();
    const stateany: any = location.state;
    const StateInterface: LocationState = stateany;
    const [ShLang, setShLang] = useState(THAicon);
    const [Popupsearch, setPopupsearch] = useState(false);
    const [dropdownSearch, setdropdownSearch] = useState(false);
    const [textsearch, settextsearch] = useState("search...");
    const [textsearchvalue, settextsearchvalue] = useState("search...");
    const [openedMenu, setopenedMenu] = useState(true);
    const [dropdownHamberger, setdropdownHamberger] = useState(true);
    const [resize, setresize] = useState(993);
    const [user_name, setuser_name] = useState("");
    const [cartAmount, setCartAmount] = useState(3);
    //-----------------onload-------------------------------------------
    useEffect(() => {
        function handleResize() {
            setresize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    }, []);
    useEffect(() => {
        setuser_name(User_Data[0]?.user_name)
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
    const done = () => {
        setPopupVisibility(false);
    };
    const btnBack = () => {
        return (
            <button type="button" className="hover:bg-slate-100 p-2">
                <i
                    className="fal fa-angle-left text-4xl"
                    onClick={() => navigate(-1)}
                ></i>
            </button>
        );
    };
    const onOutsideClick = () => {
        setopened(false);
        return false;
    };
    const Dropdown_logIn = (lang) => {
        return (
            <div className="relative inline-block text-left transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300">
                <div>
                    <button type="button" className="mr-3 inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" id="menu-button"
                        onClick={() => {
                            setdropdownLang(false)
                            setdropdownLogin(!dropdownLogin)
                        }}
                    >
                        <img className="w-6 h-[auto] rounded-fll mr-1" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                        <span className="absolute top-2 left-6 bg-green-500 text-white text-xs font-bold rounded-full h-2 w-2 flex items-center justify-center">

                        </span>
                        {User_Data[0]?.user_name}
                        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                    </button>
                </div>
                <div className={dropdownLogin ? "absolute w-60 z-10 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                    <div className="py-1" role="none">
                        <div className="grid grid-cols-12 ">
                            <div className="col-span-12 sm:col-span-12 px-5 text-center bg-white rounded-md mx-2 py-5">
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <button className="cursor-pointer inline-flex w-full justify-start rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() => {
                                            navigate("/Profile", {
                                                state: {
                                                    num: 0,
                                                },
                                            });
                                        }}>
                                            <i className="far fa-user-edit mr-3"></i> แก้ไขข้อมูลส่วนตัว
                                        </button>
                                    </div>
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <button className="inline-flex w-full justify-start rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() => {
                                            Auth.LogOut();
                                            onOutsideClick();
                                        }}>
                                            <i className="fas fa-sign-out mr-3"></i>Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const Dropdown_logInResponsive = (lang) => {
        return (
            <div className="relative inline-block text-left transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300">
                <div>
                    <button type="button" className="mr-3 inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" id="menu-button"
                        onClick={() => {
                            setdropdownLang(false)
                            setdropdownLogin(!dropdownLogin)
                        }}
                    >
                        <img className="w-6 h-[auto] rounded-fll mr-1" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                        <span className="absolute top-2 left-14 bg-green-500 text-white text-xs font-bold rounded-full h-2 w-2 flex items-center justify-center">

                        </span>
                        {User_Data[0]?.user_name}
                        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                    </button>
                </div>
                <div className={dropdownLogin ? "absolute w-60 z-10 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                    <div className="py-1" role="none">
                        <div className="grid grid-cols-12 ">
                            <div className="col-span-12 sm:col-span-12 px-5 text-center bg-white rounded-md mx-2 py-5">
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <button className="cursor-pointer inline-flex w-full justify-start rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() => {
                                            navigate("/Profile", {
                                                state: {
                                                    num: 0,
                                                },
                                            });
                                        }}>
                                            <i className="far fa-user-edit mr-3"></i> แก้ไขข้อมูลส่วนตัว
                                        </button>
                                    </div>
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <button className="inline-flex w-full justify-start rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() => {
                                            Auth.LogOut();
                                            onOutsideClick();
                                        }}>
                                            <i className="fas fa-sign-out mr-3"></i>Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const Dropdown_lang = (lang) => {
        return (
            <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300 relative inline-block text-left">
                <div>
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" id="menu-button"
                        onClick={() => {
                            setdropdownLogin(false)
                            setdropdownLang(!dropdownLang)
                        }}
                    >
                        <img className="w-6 h-[auto] rounded-fll mr-1" src={ShLang} />
                        THB
                        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                    </button>
                </div>
                <div className={dropdownLang ? "absolute w-28 z-10 left-0 mt-2 origin-top-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                    <div className="py-1" role="none">
                        <div className="grid grid-cols-12 ">
                            <div className="col-span-12 sm:col-span-12 text-center bg-white rounded-md mx-1">
                                <div className="grid grid-cols-12">
                                    {langDrop.map((item, i) => (
                                        <div className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300 cursor-pointer col-span-12 h-full bg-white rounded-md mx-1 flex" key={i}
                                            onClick={() => {
                                                if (item.id) {
                                                    setShLang(item.icon)
                                                    setdropdownLang(false)
                                                }
                                            }}>
                                            <img src={item.icon} className="rounded-t-md w-10 h-[auto]" />
                                            <div className="text-left px-1 mt-2">{item.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    const ToPay = () => {
        return (
            <button type="button" className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300 w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() =>
                Auth.CurrentUser().then((res) => {
                    if (res !== "") {
                        navigate("../Payment");
                    } else {
                        MsgOK('', 'กรุณาเข้าสู่ระบบ')
                    }
                })
            }>
                <i className="fad fa-money-check-alt mr-1 text-[#1572F5]"></i>Payment
            </button>
        );
    };
    const ToBasket = () => {
        return (
            <div className="relative transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300">
                <button type="button" className="w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() =>
                    Auth.CurrentUser().then((res) => {
                        if (res !== "") {
                            navigate("../MyCoupon");
                        } else {
                            MsgOK('', 'กรุณาเข้าสู่ระบบ')
                        }
                    })
                }>
                    <i className="fal fa-shopping-cart mr-1 text-[#1572F5]"></i>Basket
                </button>
                {cartAmount > 0 && (
                    <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartAmount}
                    </span>
                )}
            </div>
        );
    };

    const ToBasketResponsive = () => {
        return (
            <div className="relative transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300">
                <button type="button" className="w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() =>
                    Auth.CurrentUser().then((res) => {
                        if (res !== "") {
                            navigate("../MyCoupon");
                        } else {
                            MsgOK('', 'กรุณาเข้าสู่ระบบ')
                        }
                    })
                }>
                    <i className="fal fa-shopping-cart mr-1 text-[#1572F5]"></i>Basket
                </button>
                {cartAmount > 0 && (
                    <span className="absolute top-0 left-12 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartAmount}
                    </span>
                )}
            </div>
        );
    };

    const ToHistory = () => {
        return (
            <button type="button" className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300 w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() =>
                Auth.CurrentUser().then((res) => {
                    if (res !== "") {
                        navigate("../History");
                    } else {
                        MsgOK('', 'กรุณาเข้าสู่ระบบ')
                    }
                })
            }>
                <i className="fad fa-history mr-1 text-[#1572F5]"></i>History
            </button>
        );
    };
    const Logo = () => {
        return (
            <img src={Logo2} className="w-36 h-[auto] ml-5 cursor-pointer" onClick={() => navigate("../HomePage")} />
        );
    };

    const LogoResponsive = ()=> {
        return (
            <img src={Logo2} className="w-16 h-[20px] ml-5 cursor-pointer mr-2" onClick={() => navigate("../HomePage")} />
        )
    }
    const SearchhBar = () => {
        return (
<div className="relative inline-block text-left sm:ml-4 md:ml-4 lg:ml-0">
  <div>
    <input
      type="text"
      readOnly={true}
      value={textsearchvalue}
      className="w-full  sm:w-[300px] md:w-[400px] lg:w-[600px] px-4 py-2 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      placeholder={textsearch}
      onClick={() => setdropdownSearch(!dropdownSearch)}
    />
  </div>
  <div
    className={
      dropdownSearch
        ? "absolute w-full sm:w-[300px] md:w-[400px] lg:w-[600px] z-10 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        : "hidden"
    }
  >
    <div className="py-1" role="none">
      <Search value={settextsearchvalue} sh={setdropdownSearch} />
    </div>
  </div>
</div>

        );
    };
    const MenuHamberger = () => {
        return (
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="mr-3 inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" id="menu-button"
                        onClick={() => {
                            setdropdownHamberger(!dropdownHamberger)
                        }}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className={dropdownHamberger ? "absolute w-60 z-10 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                    <div className="py-1" role="none">
                        <div className="grid grid-cols-12 ">
                            <div className="col-span-12 sm:col-span-12 px-5 text-center bg-white rounded-md mx-2 py-5">
                                <div className="grid grid-cols-12 gap-3">
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
                                        <Dropdown_logInResponsive />
                                        <Dropdown_lang />
                                        <ToHistory />
                                        <ToBasketResponsive />
                                        <ToPay />
                                    </div>
                                    {/* <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <button className="inline-flex w-full justify-start rounded-md bg-white py-2 text-sm font-medium text-gray-700   hover:bg-gray-50 px-1" onClick={() => {
                                            Auth.LogOut();
                                            onOutsideClick();
                                        }}>
                                            <i className="fas fa-sign-out mr-3"></i>Logout
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    //-----------------html-------------------------------------------
    return (
        <>
            <PopupLang data={isPopupVisible} toggle={togglePopup} done={done} />
            <section
                id="bottom-navigation"
                className=" fixed inset-x-0 top-0 z-20 bg-white shadow"
            >{resize < 992 ?
                <>
                <div className="flex justify-center items-center">

                    <Toolbar>
                    <Item location="before" render={LogoResponsive} />
                    <Item location="before" render={SearchhBar} />
                    <Item location="after" render={MenuHamberger} />
                </Toolbar>
                </div>
               
                </>

                :
                <Toolbar>
                    
                    <Item location="before" render={Logo} />
                    <Item location="center" render={SearchhBar} />
                    <Item location="after" render={ToHistory} />
                    <Item location="after" render={ToBasket} />
                    <Item location="after" render={ToPay} />
                    <Item location="after" render={Dropdown_lang} />
                    <Item location="after" render={Dropdown_logIn} />
                </Toolbar>}
            </section>
            <div id="content" className="" onClick={() => {
                setdropdownLang(false); setdropdownLogin(false); setdropdownSearch(false); setdropdownHamberger(false)
            }}>
                <div className="grid grid-cols-12 pt-[70px] pb-[62px] bg-white min-h-screen">
                    <div className="grid col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10">
                        {pageshow}
                    </div>
                </div>
                <Menu_Chat />
                <Footer />
            </div>
        </>
    );
}
