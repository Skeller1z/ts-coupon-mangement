import { useRef, useState, useEffect } from "react";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { useTranslation } from "react-i18next";
import { Popup } from "devextreme-react/popup";
import { ReactComponent as Qr } from "../../image/SVG_Memorybox/Payment/QR_black.svg";
import { ReactComponent as Creditcard } from "../../image/SVG_Memorybox/Payment/Credit_black.svg";
import Ads from "../MainPage/Ads";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Payment/Basket_Blue.svg";
import { ReactComponent as InforIcon } from "../../image/SVG_Memorybox/Payment/information_Blue25.svg";
import { ReactComponent as PayIcon } from "../../image/SVG_Memorybox/Payment/Payment_Blue25.svg";
import { GetdataAPI } from "../../MainCall/MainCall";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MsgWarning } from "../../MainCall/dialog";
import { cart_data, countcart } from "../../Recoil/CartRecoil";
import { useRecoilState } from "recoil";
import { TextBox } from "devextreme-react";
import Cards from "react-credit-cards";
import { ReactComponent as S } from "../../image/svg/SECURE.svg";
import { ReactComponent as V } from "../../image/svg/VISA.svg";
import { ReactComponent as M } from "../../image/svg/mastercard.svg";
import { ReactComponent as A } from "../../image/svg/AMEX.svg";
import "react-credit-cards/es/styles-compiled.css";
import QRCode from "qrcode.react";
import icon from "../../image/BTRAVEL2.png";
import Stripe from "./Stripe";
export default function Payment(props) {
    //------------------------ตัวแปร-----------------------------
    const js = {
        data: [
            {
                img: "https://flxt.tmsimg.com/assets/p170620_p_v8_az.jpg",
                name: "Iron Man",
                text: "87% ชอบภาพยนตร์เรื่องนี้",
                unit: "3",
                price: "200.00"
            }, {
                img: "https://play-lh.googleusercontent.com/EJEgiTGk1fuYz8Rx0LpSYRpEZLj0HHBLhagV4mAXHFiK_vqabZsxCtIGSjZHygDELkaU=w240-h480-rw",
                name: "Thor: Ragnarok",
                text: "84% ชอบภาพยนตร์เรื่องนี้",
                unit: "1",
                price: "399.99"
            }, {
                img: "https://lumiere-a.akamaihd.net/v1/images/ant-man-andthewasp-poster-th_64899835.jpeg",
                name: "Ant-Man",
                text: "82% ชอบภาพยนตร์เรื่องนี้",
                unit: "2",
                price: "99.99"
            },
        ]
    }
    let navigate = useNavigate();
    const [step1, setstep1] = useState<boolean>(false);
    const [mark, setmark] = useState<string>("0000 0000 0000 0000");
    const cardnumber = useRef(null);
    const [cardnumberVal, setcardnumberVal] = useState<string>("");
    const expiration = useRef(null);
    const [expVal, setexpVal] = useState<string>("");
    const securityCode = useRef(null);
    const [cvvVal, setcvvVal] = useState<string>("");
    const holdername = useRef(null);
    const [cardnameVal, setcardnameVal] = useState<string>("");
    const location = useLocation();
    const stateany: any = location.state;
    const [isPopupVisiblePin, setPopupVisibilityPin] = useState<boolean>(false);
    const { t } = useTranslation();
    const [labelshow, setlabelshow] = useState(true);
    const [labelshow2, setlabelshow2] = useState(true);
    const [labelshow3, setlabelshow3] = useState(true);
    const [labelshow4, setlabelshow4] = useState(true);
    const [toggleclock, settoggleclock] = useState<boolean>(false);
    const [toggleFailed, settoggleFailed] = useState<boolean>(false);
    const [cvc, setcvc] = useState("");
    const [expiry, setexpiry] = useState("");
    const [focus, setfocus] = useState("");
    const [name, setname] = useState("");
    const [btnType, setbtnType] = useState(localStorage.getItem('btnType') || 'Credit-Card');
    const [number, setnumber] = useState("");
    const slist = [];
    const qrRef = useRef();
    const [refNO, setrefNO] = useState("");
    //------------------------onload----------------------------
    useEffect(() => {
        localStorage.setItem('btnType', btnType);
      }, [btnType]);
    //------------------------function--------------------------
    const onInputchange = async (e) => {
        setnumber(cardnumber.current.instance.option("value"));
        const enteredvalue = e.value;
        setcardnumberVal(e.value);
        if (cardnumber.current.instance.option("value") !== "") {
            cardnumber.current.instance.focus();
            setlabelshow(true);
        }
    }
    const expChange = (e) => {
        setexpiry(expiration.current.instance.option("value"));
        setexpVal(e.value);
        if (expiration.current.instance.option("value") !== "") {
            setlabelshow2(true);
        } else {
            setlabelshow2(false);
        }
    };
    const cvcChange = (e) => {
        setcvc(securityCode.current.instance.option("value"));
        setcvvVal(e.value);
        if (securityCode.current.instance.option("value") !== "") {
            setlabelshow3(true);
        } else {
            setlabelshow3(false);
        }
    };
    const nameChange = (e) => {
        setname(holdername.current.instance.option("value"));
        setcardnameVal(e.value);
        if (holdername.current.instance.option("value") !== "") {
            setlabelshow4(true);
        } else {
            setlabelshow4(false);
        }
    };
    const Confirm = () => {
        //setPopupVisibilityPin(true);
        //togglePopupClock();
        //SaveCreditcard();
    };
    const Next = () => {
        if (cardnumber.current.instance.option("value") === "") {
            cardnumber.current.instance.focus();
            setlabelshow(false);
        }
        if (expiration.current.instance.option("value") === "") {
            expiration.current.instance.focus();
            setlabelshow2(false);
        }
        if (securityCode.current.instance.option("value") === "") {
            securityCode.current.instance.focus();
            setlabelshow3(false);
        }
        if (holdername.current.instance.option("value") === "") {
            holdername.current.instance.focus();
            setlabelshow4(false);
        }
        if (
            cardnumber.current.instance.option("value") !== "" &&
            expiration.current.instance.option("value") !== "" &&
            securityCode.current.instance.option("value") !== "" &&
            holdername.current.instance.option("value") !== "" &&
            cardnumber.current.instance.option("value") !== ""
        ) {
            setstep1(!step1);
        }
    };
    const qrCode = (
        <QRCode
            id="qrCodeElToRender"
            size={280}
            value={"1000"}
            bgColor="white"
            fgColor="Black"
            level="H"
            imageSettings={{
                src: icon,
                excavate: true,
                width: 1000 * 0.1,
                height: 500 * 0.1,
            }}
        />
    );

    const totalPrice = js.data.reduce((accumulator, item) => {
        const price = parseFloat(item.price);
        const unit = parseInt(item.unit);
        return accumulator + price * unit;
      }, 0);

// let totalPriceByID = 0;
// let totalUnitsByID = 0;

// js.data.forEach((item) => {
//   const price = parseFloat(item.price);
//   const unit = parseInt(item.unit);
//   totalPriceByID += price;
//   totalUnitsByID += unit;
// });

// console.log("Total Price:", totalPriceByID);
// console.log("Total Units:", totalUnitsByID);

    //------------------------HTML------------------------------
    return (
        <>
            <div className="grid grid-cols-12 bg-white">
                <div className="grid col-span-9">

                    {/* Payment Button */}
                    <div className="grid grid-cols-12">
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                            <div className="text-3xl font-semibold text-blue-900">Payment</div>
                            <div className="text-sm mt-10 ml-5 mb-2">card type</div>
                        </div>
                        
                        {/* Credit-Card Button*/}
                        <div className="grid content-center col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4 mx-5" onClick={() => { setbtnType("Credit-Card") }}>
                            <div className={btnType == "Credit-Card" ? "h-24 w-full border border-blue-900 pt-3" : "h-24 w-full border border-gray-400 pt-3"}>
                                <div className="text-md text-center">
                                    {btnType === "Credit-Card"
                                        ? (<i className="far fa-dot-circle text-blue-900 text-2xl"></i>)
                                        : (<i className="far fa-circle text-2xl text-gray-400"></i>)
                                    }
                                </div>
                                <div className="text-md text-center">Credit-Card</div>
    
                            </div>
                        </div>

                        {/* QR-Code Button*/}
                        <div className="grid content-center col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4 mx-5" onClick={() => { setbtnType("QR-Code") }}>
                            <div className={btnType == "QR-Code" ? "h-24 w-full border border-blue-900 pt-3" : "h-24 w-full border border-gray-400 pt-3"}>
                                <div className="text-md text-center">
                                    {btnType === "QR-Code"
                                        ? (<i className="far fa-dot-circle text-blue-900 text-2xl"></i>)
                                        : (<i className="far fa-circle text-2xl text-gray-400"></i>)
                                    }
                                </div>
                                <div className="text-md text-center">QR-Code</div>
                            </div>
                        </div>

                        {/* stripe Button*/}
                        <div className="grid content-center col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4 mx-5" onClick={() => { setbtnType("Stripe") }}>
                            <div className={btnType == "Stripe" ? "h-24 w-full border border-blue-900 pt-3" : "h-24 w-full border border-gray-400 pt-3"}>
                                <div className="text-md text-center">
                                    {btnType === "Stripe"
                                        ? (<i className="far fa-dot-circle text-blue-900 text-2xl"></i>)
                                        : (<i className="far fa-circle text-2xl text-gray-400"></i>)
                                    }
                                </div>
                                <div className="text-md text-center">Stripe</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Content      */}

                    <div className={btnType === "Credit-Card" ? "grid grid-cols-12" : "hidden"}>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                            <div className="mx-3 py-4 pb-[70px]">
                                {!step1 ? (
                                    <>
                                        <Cards
                                            cvc={cvc}
                                            expiry={expiry}
                                            focused={focus}
                                            name={name}
                                            number={number}
                                        />
                                        <form>
                                            <div className="grid grid-cols-12 gap-6 pt-4">
                                                <div className=" grid col-span-12 content-start">
                                                    <label className="block  text-sm font-medium text-gray-900   ">
                                                        {t("Card number")}
                                                    </label>
                                                    <TextBox
                                                        mask={mark}
                                                        placeholder=""
                                                        ref={cardnumber}
                                                        onValueChanged={onInputchange}
                                                        onFocusIn={(e) => {
                                                            setfocus("number");
                                                        }}
                                                    />
                                                    {!labelshow ? (
                                                        <label className="block  text-sm font-medium text-red-500  ">
                                                            {t("Please Enter Card number")}
                                                        </label>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div className=" grid col-span-6 content-start">
                                                    <label className="block  text-sm font-medium text-gray-900  ">
                                                        {t("Expiration date (MM/YY)")}
                                                    </label>
                                                    <TextBox
                                                        mask="00/00"
                                                        defaultValue=""
                                                        placeholder=""
                                                        ref={expiration}
                                                        onFocusIn={(e) => {
                                                            setfocus("expiry");
                                                        }}
                                                        onValueChanged={(e) => {
                                                            expChange(e);
                                                        }}
                                                    />
                                                    {!labelshow2 ? (
                                                        <label className="block  text-sm font-medium text-red-500  ">
                                                            {t("Please Enter Expiration date (MM/YY)")}
                                                        </label>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div className=" grid col-span-6 content-start">
                                                    <label className="block  text-sm font-medium text-gray-900  ">
                                                        CVV
                                                    </label>
                                                    <TextBox
                                                        mode="password"
                                                        maxLength={3}
                                                        defaultValue=""
                                                        placeholder=""
                                                        ref={securityCode}
                                                        valueChangeEvent="keyup"
                                                        onFocusIn={(e) => {
                                                            setfocus("cvc");
                                                        }}
                                                        onValueChanged={(e) => {
                                                            cvcChange(e);
                                                        }}
                                                    />
                                                    {!labelshow3 ? (
                                                        <label className="block  text-sm font-medium text-red-500  ">
                                                            {t("Please Enter CVV")}
                                                        </label>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>

                                                <div className=" grid col-span-12 content-start">
                                                    <label className="block  text-sm font-medium text-gray-900  ">
                                                        {t("Card holder name")}
                                                    </label>
                                                    <TextBox
                                                        defaultValue=""
                                                        placeholder=""
                                                        ref={holdername}
                                                        valueChangeEvent="keyup"
                                                        onFocusIn={(e) => {
                                                            setfocus("name");
                                                        }}
                                                        onValueChanged={(e) => {
                                                            nameChange(e);
                                                        }}
                                                    />
                                                    {!labelshow4 ? (
                                                        <label className="block  text-sm font-medium text-red-500  ">
                                                            {t("Please Enter Card holder name")}
                                                        </label>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className="grid col-span-12 content-start">
                                                    <button type="button" className="btn-save" onClick={Next}>
                                                        {t("Next")}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="flex justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5 mt-5">
                                            <S className="h-[auto] w-[35px] px-2" />
                                            <div className="flex items-center text-[#000000B2] text-md font-semibold">
                                                {t("SSL Secured Checkout")}
                                            </div>
                                        </div>
                                        <div className="flex justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5 mt-5">
                                            <V className="h-[auto] w-[42px] px-2" />
                                            <M className="h-[auto] w-[42px] px-2" />
                                            <A className="h-[auto] w-[42px] px-2" />
                                        </div>
                                    </>
                                ) : (
                                    <form>
                                        <div className="grid grid-cols-12 gap-6">
                                            <div className=" grid col-span-6 content-start">
                                                <label className="block  text-xl font-medium text-gray-900  ">
                                                    {t("Method")}
                                                </label>
                                            </div>
                                            <div className=" grid col-span-6 content-start">
                                                <label className="block  text- font-medium text-gray-900   text-end">
                                                    <div className="inline-flex">
                                                        <div className="mr-1">{cardnumberVal.slice(0, 4)}</div>
                                                        <div className="mr-1">
                                                            {cardnumberVal.slice(4, 6)}
                                                            **
                                                        </div>
                                                        <div className="mr-1">****</div>
                                                        <div className="">{cardnumberVal.slice(12, 17)}</div>
                                                    </div>
                                                    <div> {t("Credit Card")} </div>
                                                </label>
                                            </div>

                                            <div className=" grid col-span-8 content-start">
                                                <label className="block  text-xl font-medium text-gray-900  ">
                                                    {t("SSL Secured Checkout")}
                                                </label>
                                            </div>
                                            <div className=" grid col-span-4 content-start">
                                                <label className="block  text-xl font-medium text-gray-900   text-end">
                                                    ฿ 500
                                                </label>
                                            </div>

                                            <div className="grid grid-cols-12 gap-6 absolute inset-x-0 bottom-[70px] mx-5">
                                                <div className="grid col-span-6 content-start">
                                                    <button
                                                        type="button"
                                                        className="btn-save"
                                                        onClick={(e) => setstep1(!step1)}
                                                    >
                                                        {t("Back")}
                                                    </button>
                                                </div>
                                                <div className="grid col-span-6 content-start">
                                                    <button type="button" className="btn-save" onClick={Confirm}>
                                                        {t("Confirm")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={btnType === "QR-Code" ? "grid grid-cols-12" : "hidden"}>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                            <div className="mx-3 mt-28">
                                <div className="grid grid-cols-12">
                                    <div className=" grid col-span-12 items-center justify-center content-center mb-2">
                                        <div className="text-xs text-[#000000] opacity-70 font-semibold">
                                            {t("REF NO.")}
                                            {refNO}
                                        </div>
                                    </div>
                                    <div className=" grid col-span-12 items-center justify-center content-center mb-2">
                                        <div className="qr-container__qr-code" ref={qrRef}>
                                            {qrCode}
                                        </div>
                                    </div>
                                    <div className=" grid col-span-12 items-center justify-center content-center">
                                        <div className="text-md font-semibold text-[#000000] opacity-70">
                                            {" "}
                                            {t("Amount")}
                                        </div>
                                    </div>
                                    <div className=" grid col-span-12 items-center justify-center content-center mb-5">
                                        <div className="text-2xl font-semibold text-[#000000B2]">
                                            ฿{NumberFormat(100)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={btnType === "Stripe" ? "grid grid-cols-12 h-[500px]" : "hidden"}>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5 justify-center">                             
                            <Stripe/>                                                             
                        </div>
                    </div>

                </div>

                <div className="grid col-span-3">
                    <div className="grid grid-cols-12  h-[500px]">
                        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mt-5">
                            <div className="text-3xl font-semibold text-blue-900 pl-3">Order</div>
                            <hr />
                        </div>
                        <div className="grid col-span-12">
                            {js.data.map((item, i) => (
                                <div className="grid grid-cols-12 my-1" key={i}>
                                    <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-center pl-1">
                                        <img
                                            className="rounded-lg object-cover h-[100px] w-[150px]"
                                            src={item.img}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="grid col-span-5 pl-3">
                                        <div className="grid grid-cols-12 ">
                                            <div className="grid content-center col-span-12">
                                                <div className="    ">
                                                    {item.name}
                                                </div>
                                            </div>

                                            <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                                                <div className="text-[12px] opacity-50">
                                                    {item.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid col-span-3 pr-2">
                                        <div className="grid grid-cols-12">
                                            <div className="grid content-center justify-end col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                                                <div className="border px-2 py-1">
                                                    {item.unit}
                                                </div>
                                            </div>
                                            <div className="grid justify-end content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                                                <div className="grid grid-cols-12 ">
                                                    <div className="grid content-center justify-center col-span-12  ">
                                                        {item.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid col-span-12 px-2 mt-1">
                                        <hr />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid content-center col-span-12">
                            <div className="grid grid-cols-12 px-2">
                                <div className="grid col-span-12 text-blue-900 underline">
                                    Have a discount code?
                                </div>
                                <div className="grid col-span-6 text-gray-500">
                                    SubTotal
                                </div>
                                <div className="grid col-span-6 text-end text-gray-500">
                                    500 $
                                </div>
                                <div className="grid col-span-6 text-gray-500">
                                    Shipping
                                </div>
                                <div className="grid col-span-6 text-end text-gray-500">
                                    0 $
                                </div>
                                <div className="grid col-span-6">
                                    Total
                                </div>
                                <div className="grid col-span-6 text-end">
                                    {totalPrice}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
