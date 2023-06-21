import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
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
import LoginFacebook from "../MainPage/LoginFacebook";
import { ReactComponent as Line } from "../../image/SVG_Memorybox/Login/line-brands.svg";
import Search from "../Ecom/Search";
import Line_login from "../MainPage/Line_login";
import Footer from "./Footer";
const { Authenticate } = auhv;
export default function Menu_notLogin(props) {
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
    const btnlogin = useRef(null);
    const Username = useRef(null);
    const Password = useRef(null);
    const [user, setuser] = useState("");
    const [pass, setpass] = useState("");
    const [noti, setnoti] = useState<boolean>(false);
    const [ShLang, setShLang] = useState(THAicon);
    const [typelogin, settypelogin] = useState("auto");
    const [dropdownSearch, setdropdownSearch] = useState(false);
    const [textsearch, settextsearch] = useState("search...");
    const [textsearchvalue, settextsearchvalue] = useState("search...");
    const [dropdownHamberger, setdropdownHamberger] = useState(true);
    const [resize, setresize] = useState(993);
    const [platform_name, setplatform_name] = useState("");
    //-----------------onload-------------------------------------------
    useEffect(() => {
        function handleResize() {
            setresize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
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
    const LINE = () => {
        if (liff.isInClient()) {
            liff.getProfile().then((profile) => {
                const UserId = profile.userId;
                GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
                    authen_code: UserId,
                    platform_name: "lineauthen"
                }).then((res) => {
                    if (typelogin !== "auto") {
                        if (res.Status === "Success") {
                            if (res.Data === "True") {
                                Auth.Login(Authenticate, UserId, "000000").then((res) => {
                                    if (res.Status === "Success") {
                                        if (StateInterface === null) {
                                            navigate("/");
                                        } else if (StateInterface.uri === undefined) {
                                            navigate("/");
                                        } else {
                                            window.location.href = StateInterface.uri;
                                        }
                                    } else {
                                        MsgWarning(t("Wrong password"));
                                    }
                                });
                            } else {
                                if (StateInterface === null) {
                                    navigate("/Authen/SignUpNotpin", {
                                        state: {
                                            UserId: UserId,
                                        },
                                    });
                                } else if (StateInterface.uri === undefined) {
                                    navigate("/Authen/SignUpNotpin", {
                                        state: {
                                            UserId: UserId,
                                        },
                                    });
                                } else {
                                    navigate("/Authen/SignUpNotpin", {
                                        state: {
                                            uri: StateInterface.uri,
                                            UserId: UserId,
                                        },
                                    });
                                }
                            }
                        } else {
                            MsgWarning(res.Message);
                        }
                    } else {
                        if (res.Status === "Success") {
                            if (StateInterface === null) {
                                if (res.Data === "True") {
                                    navigate("../Authen/LineLogin", {
                                        state: {
                                            UserId: UserId,
                                            platform_name: "lineauthen"
                                        },
                                    });
                                } else {
                                    navigate("../Authen/SignUp", {
                                        state: {
                                            UserId: UserId,
                                            platform_name: "lineauthen"
                                        },
                                    });
                                }
                            } else {
                                if (res.Data === "True") {
                                    navigate("../Authen/LineLogin", {
                                        state: {
                                            UserId: UserId,
                                            uri: StateInterface.uri,
                                            platform_name: "lineauthen"
                                        },
                                    });
                                } else {
                                    navigate("../Authen/SignUp", {
                                        state: {
                                            UserId: UserId,
                                            uri: StateInterface.uri,
                                            platform_name: "lineauthen"
                                        },
                                    });
                                }
                            }
                        } else {
                            navigate("../LineAuthen", {
                                state: {
                                    UserId: UserId,
                                    type: typelogin,
                                    uri: StateInterface.uri,
                                    platform_name: "lineauthen"
                                },
                            });
                        }
                    }
                });
            });
        } else {
            navigate("../LineAuthen", {
                state: {
                    type: typelogin,
                    platform_name: "lineauthen",
                    typelogin:typelogin
                },
            });
        }
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
    const ToPay = () => {
        return (
            <button type="button" className="w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 px-1 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300" onClick={() =>
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
            <button type="button" className="w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 px-1 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300" onClick={() =>
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
        );
    };
    const ToHistory = () => {
        return (
            <button type="button" className="w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 px-1 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300" onClick={() =>
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
    const onOutsideClick = () => {
        setopened(false);
        return false;
    };
    const Dropdown_logIn = (lang) => {
        return (
            <div className="relative inline-block text-left pr-2">
                <div>
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 px-1 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300" id="menu-button"
                        onClick={() => {
                            setdropdownLang(false)
                            setdropdownLogin(!dropdownLogin)
                        }}
                    >
                        <img className="w-6 h-[auto] rounded-fll mr-1" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                        เข้าสู่ระบบ
                        <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                    </button>
                </div>
                <div className={dropdownLogin ? "absolute w-80 z-10 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                    <div className="py-1" role="none">
                        <div className="grid grid-cols-12 ">
                            <div className="col-span-12 sm:col-span-12 px-5 text-center bg-white rounded-md mx-2 py-5">
                                <div className="grid grid-cols-12 gap-3 mt-4">
                                    <div className="grid col-span-6">
                                        <button
                                            type="button"
                                            className={typelogin === 'auto' ? "bg-gradient-to-r from-green-400 to-blue-500 rounded-md" : ""}
                                            onClick={() => {
                                                settypelogin('auto')
                                            }}
                                        >
                                            auto
                                        </button>
                                    </div>
                                    <div className="grid col-span-6">
                                        <button
                                            type="button"
                                            className={typelogin === 'auto' ? "" : "bg-gradient-to-r from-green-400 to-blue-500 rounded-md"}
                                            onClick={() => {
                                                settypelogin('')
                                            }}
                                        >
                                            pin
                                        </button>
                                    </div>
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <TextBox
                                            placeholder="Email"
                                            ref={Username}
                                            valueChangeEvent="keyup"
                                            onValueChange={(e) => {
                                                setuser(e);
                                            }}
                                        />
                                    </div>
                                    <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                        <TextBox
                                            mode="password"
                                            placeholder="Password"
                                            ref={Password}
                                            valueChangeEvent="keyup"
                                            onValueChange={(e) => {
                                                setpass(e);
                                            }}
                                        />
                                        {noti ? (
                                            <label className="block text-sm font-medium text-red-600 mb-3">
                                                {t("Username หรือ Password ไม่ถูกต้อง")}
                                            </label>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="grid col-span-12 content-start">
                                        <button
                                            type="button"
                                            className="btn-save"
                                            onClick={login}
                                            ref={btnlogin}
                                            disabled={pass === "" || user === "" ? true : false}
                                        >
                                            {t("Continue")}
                                        </button>
                                        <div className="text-xs text-blue-500 text-end mt-1 cursor-pointer" onClick={() => { navigate('/SignUp'); setdropdownLogin(false) }}>สมัครสมาชิก</div>
                                        <hr className="mb-2 mt-2"/>
                                        <h5 className="">{t("OR")}</h5>
                                        
                                    </div>
                                    <div className="grid col-span-12" onClick={() => setplatform_name("fbauthen")}>
                                        <LoginFacebook type={typelogin} />
                                    </div>
                                    <div className="grid col-span-12" onClick={() => setplatform_name("googleauthen")}>
                                        <Google_login StateInterface={StateInterface} type={typelogin} />
                                    </div>
                                    <div className="grid col-span-12" >
                                        <a
                                            className="bg-lime-500 hover:bg-lime-600 active:bg-lime-600 py-2 rounded text-white text-center cursor-pointer"
                                            onClick={LINE}
                                        >
                                            <Line className="inline h-[auto] w-[20px] mr-2 fill-white " />
                                            {t("Login with LINE")}
                                        </a>
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
            <div className="relative inline-block text-left transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300">
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
                            <div className="col-span-12 sm:col-span-12 text-center bg-white rounded-md  mx-1">
                                <div className="grid grid-cols-12 ">
                                    {langDrop.map((item, i) => (
                                        <div className="cursor-pointer hover:bg-gray-50 col-span-12 h-full bg-white rounded-md mx-1 flex" key={i}
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
    const AddLine_WITH_Redirect = (UserLineId, uri) => {
        GetdataAPI_Outside("/api/Main/CheckPlatform_Authencode", {
            User_line_userid: UserLineId,
            platform_name: platform_name
        }).then((res) => {
            if (res.Status === "Success") {
                if (res.Data === "False") {
                    MsgWarning(t("failure"));
                } else {
                    if (uri === undefined) {
                        GetdataAPI("/api/Main/SaveAuthenCode", {
                            User_line_userid: StateInterface.UserId,
                            platform_name: platform_name
                        }).then(async (res) => {
                            if (res.Status === "Success") {
                                if (uri === undefined) {
                                    navigate("/");
                                } else {
                                    window.location.href = uri;
                                }
                            } else {
                                MsgWarning(t("failure"));
                            }
                        });
                    } else {
                        window.location.href = uri;
                    }
                }
            }
        });
    };
    const login = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (Username.current.instance.option("value") === "") {
            Username.current.instance.focus();
            return;
        }
        if (Password.current.instance.option("value") === "") {
            Password.current.instance.focus();
            return;
        }
        Auth.Login(
            Authenticate,
            Username.current.instance.option("value"),
            Password.current.instance.option("value")
        ).then((res) => {
            if (res.Status === "Success") {
                if (StateInterface === null) {
                    if (liff.isInClient()) {
                        liff.getProfile().then((profile) => {
                            AddLine_WITH_Redirect(profile.userId, undefined);
                        });
                    } else {
                        navigate("/");
                    }
                } else if (StateInterface.UserId === undefined) {
                    if (liff.isInClient()) {
                        liff.getProfile().then((profile) => {
                            AddLine_WITH_Redirect(profile.userId, StateInterface.uri);
                        });
                    } else {
                        if (StateInterface.uri === undefined) {
                            navigate("/");
                        } else {
                            window.location.href = StateInterface.uri;
                        }
                    }
                } else {
                    AddLine_WITH_Redirect(StateInterface.UserId, StateInterface.uri);
                }
            } else {
                Password.current.instance.option("value", "");
                Password.current.instance.focus();
                setnoti(true);
            }
        });
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
                        type=""
                        readOnly={true}
                        value={textsearchvalue}
                        className="w-full  sm:w-[300px] md:w-[400px] lg:w-[600px]  px-4 py-2 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder={textsearch}
                        onClick={() => setdropdownSearch(!dropdownSearch)}
                    />
                </div>
                <div className={dropdownSearch ? "absolute w-[600px] z-10 mt-2 right-0 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
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
                                        <Dropdown_logIn />
                                        <Dropdown_lang />
                                        <ToHistory />
                                        <ToBasket />
                                        <ToPay />
                                    </div>
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
                <Toolbar>
                    <Item location="before" render={LogoResponsive} />
                    <Item location="before" render={SearchhBar} />
                    <Item location="after" render={MenuHamberger} />
                </Toolbar>
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
                    <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10">
                        {pageshow}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
