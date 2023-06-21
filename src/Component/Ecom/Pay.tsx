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
export default function Pay(props) {
  //------------------------ตัวแปร-----------------------------
  const { v4: uuidv4 } = require("uuid");
  const [numcount, setnumcount] = useRecoilState(countcart);
  const [item, setitem] = useState([]);
  const [numsum, setnumsum] = useState([]);
  const [oldnumsum, setoldnumsum] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isPopupSelectTopup, setPopupSelectTopup] = useState<boolean>(false);
  const [TopupBy, setTopupBy] = useState<string>("");
  let slist = [];
  const [cartdata, setcartdata] = useRecoilState(cart_data);
  const [isLoading, setIsLoading] = useState(true);
  let location: any = useLocation();
  let ItemSelect = location.state.Item; //รูปที่ส่งเข้ามา
  let discount = location.state.discount; //ส่วนลด
  const popup_config = {
    hide: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: {
          my: "center" as const,
          at: "center" as const,
          of: window,
        },
      },
      to: {
        position: { my: "top" as const, at: "bottom" as const, of: window },
      },
    },
    show: {
      type: "slide" as const,
      duration: 400,
      from: {
        position: { my: "top" as const, at: "bottom" as const, of: window },
      },
      to: {
        position: {
          my: "center" as const,
          at: "center" as const,
          of: window,
        },
      },
    },
  };
  const DateNow = new Date();
  const chkbox = useRef(null);
  //------------------------onload----------------------------
  useEffect(() => {
    GetdataAPI("/api/MainSale/SelectItemCart", {}).then((res) => {
      setitem(res.Data);
    });
    setIsLoading(true);
    setTimeout(stopLoad, 2000);
  }, []);
  useEffect(() => {
    setnumsum(
      ItemSelect.reduce((a, v) => (a = a + parseFloat(v.price_total)), -discount)
    );
    setoldnumsum(
      ItemSelect.reduce((a, v) => (a = a + parseFloat(v.price_total)), 0)
    );
  }, [item]);
  //------------------------function--------------------------

  const togglePopupSelectTopup = () => {
    setPopupSelectTopup(!isPopupSelectTopup);
  };
  const stopLoad = () => {
    setIsLoading(false);
  };
  const ConfirmPay = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    slist = [];
    if (TopupBy === "") {
      MsgWarning(t("Please select a payment method."));
      return;
    }
    if (!chkbox.current.checked) {
      MsgWarning(t("Please confirm that (these) it is your picture."));
      return;
    }
    ItemSelect.forEach((item) => {
      slist.push({
        ItemId: item.item_id,
        Qty: item.qty,
        Unitprice: item.unitprice,
        ItemDiscount: 0,
        Total: item.qty * item.unitprice,
        Remark: "",
      });
    });
    GetdataAPI("/api/Main/SaveDataPartnerFromUserWeb", {
      CompId: ItemSelect[0].comp_id,
    }).then((Partner) => {
      if (Partner.Status === "Success") {
        GetdataAPI("/api/MainSale/InsertOrder", {
          CompId: ItemSelect[0].comp_id,
          Doctype: "E-SO",
          OrderDate: DateNow,
          Rate: "1",
          Total: oldnumsum,
          Discount: discount,
          Deposit: 0,
          SumTotal: numsum,
          Vat: 0,
          GrandTotal: numsum,
          Remark: "",
          ItemOrder: slist,
        }).then((SOData) => {
          if (SOData.Data.length !== 0) {
            GetdataAPI("/api/MainSale/SelectOrderNotInv", {
              OrderId: SOData.Data[0].order_id,
            }).then((NotInv) => {
              GetdataAPI("/api/MainSale/SelectItemCart", {}).then((res) => {
                if (res.Status === "Success") {
                  setnumcount(res.Data.length);
                  setcartdata(res.Data);
                  if (TopupBy === "QR-Code") {
                    navigate("../TopupQrcode", {
                      state: {
                        rate_id: 1,
                        num: numsum,
                        Data: NotInv.Data,
                      },
                    });
                  }
                  if (TopupBy === "Credit Card") {
                    navigate("../TopupCreditcard", {
                      state: {
                        rate_id: 1,
                        num: numsum,
                        Data: NotInv.Data,
                      },
                    });
                  }
                }
              });
            });
          }
        });
      } else {
        MsgWarning(Partner.Message);
      }
    });
  };
  const setPopupTrue = () => {
    setPopupSelectTopup(true);
  };
  const setPopupFalse = () => {
    setPopupSelectTopup(false);
  };
  const setTopupCreditcard = () => {
    setTopupBy("Credit Card");
  };
  const setTopupQRCode = () => {
    setTopupBy("QR-Code");
  };
  const ContentSelectTopup = () => {
    return (
      <>
        <div className="grid grid-cols-12 gap-6 ">
          {TopupBy === "Credit Card" ? (
            <div
              className="grid bg-[#E6EFFE] col-span-12 content-center  border border-[color:var(--main-bg-color)] rounded-md hover:bg-[#E6EFFE]"
              onClick={setTopupCreditcard}
            >
              <div className="grid grid-cols-12 px-3 py-3">
                <div className="grid col-span-6">
                  <span className="inline-flex ">
                    <Creditcard />
                    <div className="grid content-center pl-2">
                      {t("Credit Card")}
                    </div>
                  </span>
                </div>
                <div className="grid justify-items-end content-center col-span-6 ">
                  <i className="fas fa-check  text-green-500"></i>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="grid  col-span-12 content-center border border-[color:var(--main-bg-color)] rounded-md hover:bg-[#E6EFFE]"
              onClick={setTopupCreditcard}
            >
              <div className="grid grid-cols-12 px-3 py-3">
                <div className="grid col-span-6 ">
                  <span className="inline-flex">
                    <Creditcard />
                    <div className="grid content-center pl-2">
                      {t("Credit Card")}
                    </div>
                  </span>
                </div>
                <div className="grid justify-items-end content-center col-span-6 "></div>
              </div>
            </div>
          )}
          {TopupBy === "QR-Code" ? (
            <div
              className="grid bg-[#E6EFFE] col-span-12 content-center border border-[color:var(--main-bg-color)] rounded-md hover:bg-[#E6EFFE] "
              onClick={setTopupQRCode}
            >
              <div className="grid grid-cols-12 px-3 py-3">
                <div className="grid col-span-6 ">
                  <span className="inline-flex ">
                    <Qr />
                    <div className="grid content-center text-md pl-2">
                      {t("QR-Code")}
                    </div>
                  </span>
                </div>

                <div className="grid justify-items-end content-center col-span-6 ">
                  <i className="fas fa-check text-green-500"></i>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="grid  col-span-12 content-center  border border-[color:var(--main-bg-color)] rounded-md hover:bg-slate-50 "
              onClick={setTopupQRCode}
            >
              <div className="grid grid-cols-12 px-3 py-3">
                <div className="grid  col-span-6 ">
                  <span className="inline-flex ">
                    <Qr />
                    <div className="grid content-center text-md pl-2">
                      {t("QR-Code")}
                    </div>
                  </span>
                </div>
                <div className="grid justify-items-end content-center col-span-6 "></div>
              </div>
            </div>
          )}

          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            <button type="button" className="btn-save" onClick={setPopupFalse}>
              {t("Confirm")}
            </button>
          </div>
        </div>
      </>
    );
  };

  //------------------------HTML------------------------------
  return (
    <>
      {" "}
      {isLoading ? (
        <>
          <div className="grid grid-cols-12 gap-3 border border-b-gray-300 border-t-white border-l-white border-r-white shadow-md shadow-gray-200 content-center h-20">
            <div className="grid justify-center col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-start text-blue-500">
              <div className="grid justify-center">
                <Cart className="h-[auto] w-[30px] " />
              </div>
              {t("Summary")}
            </div>

            <div className="grid justify-center col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 content-start ">
              <svg
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                {" "}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            <div className="grid justify-center col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start text-blue-500">
              <div className="grid justify-center text-blue-500">
                <InforIcon className="h-[auto] w-[30px] fill-[var(--main-bg-color)]" />
              </div>
              {t("Information")}
            </div>

            <div className="grid justify-center col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 content-start ">
              <svg
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                {" "}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            <div className="grid justify-center col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-start text-blue-500">
              <div className="grid justify-center text-blue-500">
                <PayIcon className="h-[auto] w-[30px] fill-[var(--main-bg-color)]" />
              </div>
              {t("Payment")}
            </div>
          </div>
          <div className="px-5 pb-2 mb-2">
            <div className="grid grid-cols-12 ">
              <div className="grid col-span-12 ">
                {ItemSelect.map((item) => (
                  <div
                    key={uuidv4()}
                    className="grid grid-cols-12  px-5 border border-t-white border-b-gray-300 border-l-white border-r-white py-4"
                  >
                    <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative">
                      <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                        <div className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit] bg-gray-300 animate-pulse" />
                      </div>
                    </div>
                    <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
                      <div className="grid grid-cols-12 ">
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                          <div className="text-lg bg-gray-300 animate-pulse w-20 h-5 rounded-lg mt-1"></div>
                        </div>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                          <div className="text-base bg-gray-300 animate-pulse w-16 h-5 rounded-lg mt-1"></div>
                        </div>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                          <div className="bg-gray-300 animate-pulse w-12 h-6 rounded-lg mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Ads />

          <div className="grid grid-cols-12 gap-3 border border-b-gray-300 border-t-white border-l-white border-r-white shadow-md shadow-gray-200 content-center h-20">
            <div className="grid justify-center col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-start text-blue-500">
              <div className="grid justify-center">
                <Cart className="h-[auto] w-[30px] " />
              </div>
              {t("Summary")}
            </div>

            <div className="grid justify-center col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 content-start ">
              <svg
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                {" "}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            <div className="grid justify-center col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start text-blue-500">
              <div className="grid justify-center text-blue-500">
                <InforIcon className="h-[auto] w-[30px] fill-[var(--main-bg-color)]" />
              </div>
              {t("Information")}
            </div>

            <div className="grid justify-center col-span-1  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 content-start ">
              <svg
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                {" "}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            <div className="grid justify-center col-span-3  sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3 content-start text-blue-500">
              <div className="grid justify-center">
                <PayIcon className=" h-[auto] w-[30px] fill-[var(--main-bg-color)]" />
              </div>
              {t("Payment")}
            </div>
          </div>
          <div className="px-5 pb-2 mb-2">
            <div className="grid grid-cols-12 ">
              <div className="grid col-span-12 ">
                {ItemSelect.map((item) => (
                  <div
                    key={uuidv4()}
                    className="grid grid-cols-12  px-5 border border-b-gray-300 border-t-white border-l-white border-r-white py-4"
                  >
                    <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative">
                      <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                        <img
                          className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                          src={item.img_path}
                        />
                      </div>
                    </div>

                    <div className="grid col-span-8 pl-3">
                      <div className="grid grid-cols-12 ">
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                          <div className="text-lg truncate ">
                            {item.mst_name}
                          </div>
                        </div>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                          <div className="inline-flex mt-0" role="group">
                            <div>
                              <span className="text-base rounded-full px-3 py-1 bg-[#126AFA] text-white hover:bg-blue-800 active:bg-blue-900">
                                {item.unitname}
                              </span>
                              <span className="text-base"> </span>

                              <span className="text-xs text-gray-500">
                                {item.unitname === "S"
                                  ? "1920x1080"
                                  : item.unitname === "M"
                                    ? "2560x1980"
                                    : item.unitname === "L"
                                      ? "5400x3600"
                                      : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                          <div className="text-lg ">
                            ฿{NumberFormat(item.price_total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid col-span-12">
              <Popup
                position="bottom"
                visible={isPopupSelectTopup}
                closeOnOutsideClick={true}
                onHiding={togglePopupSelectTopup}
                contentRender={ContentSelectTopup}
                title={t("Payment methods")}
                resizeEnabled={true}
                height="100%"
                width="100%"
                animation={popup_config}
                showCloseButton={true}
              />

              <div
                className="grid col-span-12 content-center shadow-md shadow-gray-300 py-3 rounded-md hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
                onClick={setPopupTrue}
              >
                <div className="grid grid-cols-12 px-3">
                  {TopupBy === "" ? (
                    <>
                      <div className="grid  col-span-8 content-center text-md ">
                        {t("Payment methods")}
                        {TopupBy}
                      </div>
                      <div className="grid justify-end  col-span-4 content-center  ">
                        <i className="far fa-angle-right text-3xl"></i>
                      </div>
                    </>
                  ) : TopupBy === "QR-Code" ? (
                    <>
                      <div className="grid  col-span-6 content-center text-md">
                        {t("Payment methods")}
                      </div>

                      <div className="grid justify-end col-span-6 content-center text-md">
                        <span className="inline-flex items-center">
                          <Qr fill="black" />
                          <div className="grid content-center text-md px-2">
                            {TopupBy}
                          </div>

                          <i className="far fa-angle-right text-3xl pl-3"></i>
                        </span>
                      </div>
                    </>
                  ) : TopupBy === "Credit Card" ? (
                    <>
                      <div className="grid  col-span-6 content-center text-md ">
                        {t("Payment methods")}
                      </div>
                      <div className="grid justify-end col-span-6 content-center text-md">
                        <span className="inline-flex items-center">
                          <Creditcard fill="black" />
                          <div className="grid content-center text-md px-2">
                            {TopupBy}
                          </div>

                          <i className="far fa-angle-right text-3xl pl-3"></i>
                        </span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 pt-5 ">
              <span className="inline-flex items-start w-full">
                <input type="checkbox" ref={chkbox} className="w-1 mr-5" />
                <div className="text-sm text-gray-500  pb-5">
                  {t("You are accept that this (these) your photo.")}
                </div>
              </span>
            </div>
          </div>

          <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
            <div className="grid grid-cols-12 border border-top-4 border-gray">
              <div className="pl-10 grid col-span-8 content-center text-start font-bold text-base">
                <div>
                  {t("Grand total")} ฿{NumberFormat(numsum)}
                </div>
              </div>
              <div className="grid col-span-4 content-center text-end">
                <button
                  type="button"
                  className="py-2 px-4 bg-[color:var(--main-bg-color)]  text-white text-base hover:bg-[color:var(--main-bg-color2)] hover:text-white active:bg-[color:var(--main-bg-color2)] active:text-white"
                  onClick={ConfirmPay}
                >
                  {t("Pay")}
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
