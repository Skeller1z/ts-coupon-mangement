import React, { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { Pincode } from "./Pincode";
import PopupClock from "../MainPage/PopupClock";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupFailed from "../MainPage/PopupFailed";
import { ReactComponent as S } from "../../image/svg/SECURE.svg";
import { ReactComponent as V } from "../../image/svg/VISA.svg";
import { ReactComponent as M } from "../../image/svg/mastercard.svg";
import { ReactComponent as A } from "../../image/svg/AMEX.svg";
import liff from "@line/liff/dist/lib";

interface LocationState {
  rate_id: number;
  num: number;
  Data: any;
}

function TopupCreditcard() {
  //------------------------ตัวแปร-----------------------------
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
  const StateInterface: LocationState = stateany;
  const [num, setnum] = React.useState(0);
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
  const [number, setnumber] = useState("");
  const slist = [];
  const slistData = StateInterface.Data;
  //------------------------function--------------------------
  const creditCardType = (T: string) => {
    let visa = /^4\d{0,15}/;
    let mastercard = /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/;
    let jbc = /^(?:35\d{0,2})\d{0,12}/;
    let american = /^3[47][0-9]/;

    if (visa.test(T)) {
      return "visa";
    }
    if (mastercard.test(T)) {
      return "mastercard";
    }
    if (jbc.test(T)) {
      return "jbc";
    }
    if (american.test(T)) {
      return "american";
    }
    return undefined;
  };

  const onInputchange = async (e) => {
    setnumber(cardnumber.current.instance.option("value"));
    const enteredvalue = e.value;
    setcardnumberVal(e.value);
    if (cardnumber.current.instance.option("value") !== "") {
      cardnumber.current.instance.focus();
      setlabelshow(true);
    }

    let CardType = await creditCardType(enteredvalue);
    if (CardType === "mastercard") {
      setmark("0000 0000 0000 0000");
      return;
    }
    if (CardType === "visa") {
      setmark("0000 0000 0000 0000");
      return;
    }
    if (CardType === "jbc") {
      setmark("0000 0000 0000 0000");
      return;
    }
    if (CardType === "american") {
      setmark("0000 000000 00000");
      return;
    }
    if (CardType === undefined) {
      setmark("0000 0000 0000 0000");
      return;
    }
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
  const togglePopupClock = () => {
    settoggleclock(!toggleclock);
  };
  const togglePopupFailed = () => {
    settoggleFailed(!toggleFailed);
  };
  const TogglePopupPin = () => {
    setPopupVisibilityPin(!isPopupVisiblePin);
  };
  const SaveCreditcard = () => {
    if (StateInterface) {
      setnum(StateInterface.num);
      StateInterface.Data.forEach((item) => {
        slist.push({
          order_item_id: item.order_item_id,
          item_ms_id: item.ms_id,
          item_unitid: item.unitid,
          item_qty: item.qty,
          item_unitprice: item.unit_price,
          item_discount: 0,
          item_cost_id: 1,
          item_remark: "",
        });
      });
      const DateNow = new Date();
      const json = {
        fn: "addrowdoc",
        data: [
          {
            inv_name: "",
            partner_id: slistData[0].partner_id,
            comp_id: slistData[0].comp_id,
            btype: "1",
            vat_using_id: "2",
            inv_date: DateNow,
            inv_duedate: DateNow,
            credit_term: "0",
            credit_term_num: "",
            doctype_id: "R-TV",
            doc_gp_id: "R-TV",
            deposit: 0,
            discount: 0,
            reference_no: slistData[0].order_no,
            dtDetail: slist,
            pay_payment_id: "1004",
            pay_pf_number: "",
            pay_pf_bank_id: "",
            pay_pf_duedate: "",
            pay_pf_bankaccount_no: "",
            pay_pf_bankaccount_branch: "",
          },
        ],
      };
      let redirectUrl;
      if (liff.isInClient) {
        redirectUrl = "https://liff.line.me/1657564187-a6MoMPV5?";
      } else {
        redirectUrl = "https://bsv-th-authorities.com/memorybox/history?";
      }
      GetdataAPI("/api/GbCreditDebitCard/CreditDebitCard", {
        Amount1: StateInterface.num,
        Amount2: StateInterface.num,
        RateId1: "1",
        RateId2: StateInterface.rate_id,
        Detail: "จ่ายเงินผ่านบัตรเครเครดิต",
        PaymentId: 1004,
        Condition: "0",
        /* UrlRedirect: "https://www.bsv-th.com/?", */
        /*  UrlRedirect: "https://bsv-th-authorities.com/Gateway/index.html", */
        /* UrlRedirect: "https://bsv-th-authorities.com/MainWallet/TopupComplete", */
        UrlRedirect:
          "https://bsv-th-authorities.com/webapi2/api/GbResponseCtrl/ResponseCtrl?redirectUrl=" +
          redirectUrl,
        JsonString: JSON.stringify(json),
        rememberCard: false,
        card: {
          number: cardnumberVal,
          expirationMonth: expVal.substring(0, 2),
          expirationYear: expVal.substring(2, 4),
          securityCode: cvvVal,
          name: cardnameVal,
        },
      }).then(async (res) => {
        if (res.Status === "Success") {
          if (res.Data.resultCode === "90") {
            togglePopupFailed();
          } else if (res.Data.resultCode != "90") {
            RedirectFn(res.Data);
          }
        } else {
          togglePopupFailed();
        }
      });
      window.history.replaceState({}, document.title);
    } else {
      navigate("../History");
    }
  };
  const RedirectFn = (data) => {
    document.body.innerHTML = data;
    const forms = document.getElementsByTagName("form");
    forms[0].submit();
  };
  const returnfn = (data) => {
    if (data === "OK") {
      togglePopupClock();
      SaveCreditcard();
    } else {
      setPopupVisibilityPin(false);
    }
  };
  const Confirm = () => {
    //setPopupVisibilityPin(true);
    togglePopupClock();
    SaveCreditcard();
  };
  const done = () => {
    navigate("../History");
  };
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
  //------------------------HTML------------------------------
  return (
    <>
      <PopupClock data={toggleclock} toggle={togglePopupClock} />
      <PopupFailed
        data={toggleFailed}
        toggle={togglePopupFailed}
        done={done}
        txt="กรุณาลองใหม่อีกครั้งภายหลัง"
      />
      <Pincode
        data={isPopupVisiblePin}
        fnToggle={TogglePopupPin}
        fnReturn={returnfn}
      />

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
                  ฿ {NumberFormat(StateInterface.num)}
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
    </>
  );
}

export default TopupCreditcard;
