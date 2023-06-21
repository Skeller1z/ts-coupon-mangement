import React, { useRef, useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "react-credit-cards/es/styles-compiled.css";
import { GetdataAPI } from "../../MainCall/MainCall";
import PopupFailed from "../MainPage/PopupFailed";

import liff from "@line/liff/dist/lib";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import PopupSuccess from "../MainPage/PopupSuccess";
import Payment from "./Payment";

interface LocationState {
  rate_id: number;
  num: number;
  Data: any;
}

function Stripe() {
  //------------------------ตัวแปร-----------------------------
  let navigate = useNavigate();

  const [cardnumberVal, setcardnumberVal] = useState<string>("");

  const [expVal, setexpVal] = useState<string>("");

  const [cvvVal, setcvvVal] = useState<string>("");

  const [stripePromise, setStripePromise] = useState(() => loadStripe("pk_test_51MYUslKtV9M5vIOd39FqRBQQbPw4580jhpOI3KdrS93nykvduZq2xovW2DKqQucZL8d1IEhZiGNW1HjnP2Pex63t00NznS32SL"))

  const [cardnameVal, setcardnameVal] = useState<string>("");
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const [num, setnum] = React.useState(0);

  const { t } = useTranslation();

  const [toggleFailed, settoggleFailed] = useState<boolean>(false);

  const [clientSecret, setClientSecret] = useState("");
  const slist = [];
  const slistData = StateInterface?.Data;
  // const stripePromise = loadStripe(
  //   "pk_test_51MYUslKtV9M5vIOd39FqRBQQbPw4580jhpOI3KdrS93nykvduZq2xovW2DKqQucZL8d1IEhZiGNW1HjnP2Pex63t00NznS32SL"
  // );
  const appearance = {
    theme: "stripe",
    
  };
  const options: any = {
    clientSecret,
    appearance,
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("payment_intent");
  const isRunned = useRef(false);
  const [toggle, settoggle] = useState<boolean>(false);

  const test = [
    {
      comp_id: 12,
      deposit: 0,
      discount: 0,
      grand_total: 1,
      item_discount: 0,
      item_id: 74345,
      ms_id: 62835,
      order_date: "2023-06-13T00:00:00",
      order_id: 6264,
      order_item_id: 6497,
      order_no: "SO6606-0105",
      partner_id: 7110,
      qty: 1,
      remark: null,
      total: 1,
      unit_price: 1,
      unitid: 3,
    },
  ];
  //------------------------function--------------------------

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    if (params != null) {
      GetdataAPI("/api/SrtipePaymentGateway/SelectDataTrackPaymentStripe", {
        refno_payment_gateway: params,
      }).then(async (res) => {
        if (res.Status === "Success") {
          togglePopup();
        }
        console.log(res)
      });
    } else {
      SaveCreditcard();
    }
  }, []);

  // useEffect(() => {
  //   togglePopup();
  // }, []);
  

  const togglePopupFailed = () => {
    settoggleFailed(!toggleFailed);
  };

  const CheckOut = (data) => {
    GetdataAPI("/api/SrtipePaymentGateway/Create", {
      Amount1: 10,
      Amount2: 10,
      RateId1: "1",
      RateId2: 1,
      Detail: "จ่ายเงินผ่านบัตรเครเครดิต",
      PaymentId: 2002,
      Condition: "0",
      JsonString: JSON.stringify(data),
    }).then(async (res) => {
      setClientSecret(res.Data);
      /*  if (res.Status === "Success") {
        console.log("Success");
      } else {
        console.log(res.Status);
      } */
    });
  };
  
  const SaveCreditcard = () => {

    test.forEach((item) => {
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
          partner_id: test[0].partner_id,
          comp_id: test[0].comp_id,
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
          reference_no: test[0].order_no,
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
    CheckOut(json);
  } 


  const togglePopup = () => {
    settoggle(!toggle);
  };

  const done = () => {
    navigate("/OrderSummery");
    localStorage.removeItem("btnType")
  };
  //------------------------HTML------------------------------
  return (
    <>
    <div className="p-3">
      {clientSecret === "" ? (
        ""
      ) : (
        <div className={clientSecret === "" ? "hidden" : ""}>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
    <PopupSuccess data={toggle} toggle={togglePopup} done={done} />
    </>
  );
}

export default Stripe;
