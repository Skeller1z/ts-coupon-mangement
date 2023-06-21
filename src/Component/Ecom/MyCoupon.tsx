import {
    GetdataAPI,
    GetdataAPI_Outside,
    timeout,
} from "../../MainCall/MainCall";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Ads from "../MainPage/Ads";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { useRecoilState } from "recoil";
import { cart_data, countcart, FindIMG } from "../../Recoil/CartRecoil";
import { Popup, Toast } from "devextreme-react";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { MsgOKCancel, MsgWarning } from "../../MainCall/dialog";
import { useTranslation } from "react-i18next";
import { active } from "../../Recoil/MenuRecoil";
import Auth from "../../MainCall/Auth";
import { getRecoilPromise } from "recoil-nexus";
import QRCode from "qrcode.react";
import Logo from "../../image/BTRAVEL2.png";
import Filter from "../../image/กรอง.png";
import Coupon from "./Coupon";
import Load from "./Load";
import Loading from "../MainPage/Loading";
export default function MyCoupon() {
    //------------------------ตัวแปร-----------------------------s
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [toggleQR, settoggleQR] = useState(false);
    const [dropdownfilter, setdropdownfilter] = useState(false);
    const [mycoupon, setmycoupon] = useState([]);
    const [url, setUrl] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const slist_id = searchParams.get("slist_id");
    const parentcomp_id = searchParams.get("parentcomp_id");
    //------------------------onload----------------------------
    useEffect(() => {
        if (slist_id !== null && parentcomp_id !== null) {
            AddCart(slist_id, parentcomp_id);
            GetdataAPI("/api/MainSale/SelectItemCart", {
            }).then(async (res) => {
                if (res.Status === "Success") {
                    setmycoupon(res.Data)
                    setFilteredList(res.Data)
                } else {
                    MsgWarning(t("fail"));
                }
            });
        } else {
            GetdataAPI("/api/MainSale/SelectItemCart", {
            }).then(async (res) => {
                if (res.Status === "Success") {
                    setmycoupon(res.Data)
                    setFilteredList(res.Data)
                } else {
                    MsgWarning(t("fail"));
                }
            });
        }
    }, []);
    //------------------------function--------------------------
    const AddCart = (slist_id, parentcomp_id) => {
        Auth.CurrentUser().then((res) => {
            if (res === "") {
                navigate("/Authen");
            } else {
                GetdataAPI_Outside("/api/MainSale/SelectDataSaleListDetailsItem", {
                    slist_id: slist_id,
                }).then(async (res) => {
                    if (res.Status === "Success") {
                        GetdataAPI("/api/MainSale/AddItemToCart", {
                            CompId: parentcomp_id,
                            slist_id: slist_id,
                            ItemId: res.Data.item[0].item_id,
                            Qty: "1",
                        }).then(async (res) => {
                            if (res.Status === "Success") {
                                MsgWarning(t("Added to basket"));
                            } else if (res.Message === "item already exists.") {
                                MsgWarning(t("Fail"));
                                return;
                            }
                        });
                    }
                });
            }
        });
    };
    const togglePopupQR = () => {
        settoggleQR(!toggleQR);
    };
    const GetQR = (e) => {
        togglePopupQR()
        setUrl(e)
    };
    const qrCode = (
        <QRCode
            id="qrCodeElToRender"
            size={280}
            value={url}
            bgColor="white"
            fgColor="Black"
            level="H"
            imageSettings={{
                src: Logo,
                excavate: true,
                width: 1000 * 0.1,
                height: 500 * 0.1,
            }}
        />
    );
    const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        var updatedList = [...mycoupon];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
            if (item.slist_name != null) {
                return item.slist_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            }
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };
    const sortmin = () => {
        const sortedArray = [...filteredList].sort((a, b) => a.price_total - b.price_total);
        // Trigger render with updated values
        setFilteredList(sortedArray);
    };
    const sortmax = () => {
        const sortedArray = [...filteredList].sort((a, b) => b.price_total - a.price_total);
        // Trigger render with updated values
        setFilteredList(sortedArray);
    };
    //------------------------HTML------------------------------
    return (
        <>
            <div className="">
                <div className="grid grid-cols-12">
                    <div className="grid col-span-12 mb-10">
                        <div className="text-center text-3xl font-semibold mt-10">คูปองของฉัน</div>
                    </div>
                    <div className="grid col-span-10 mb-10">
                        <input
                            className="px-4 h-10 py-2 text-blue-700 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={filterBySearch}
                            placeholder="🔍 ค้นหา"
                        />
                    </div>
                    <div className="grid col-span-2 mb-10">
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button" className="border bg-white h-10 p-1 w-36 ml-5 flex border-blue-500 rounded-md" id="menu-button"
                                    onClick={() => {
                                        setdropdownfilter(!dropdownfilter)
                                    }}
                                ><img src={Filter} className="mx-2 mt-1 w-6 h-[auto]" />
                                    <div className="text-blue-500">กรองราคา</div>
                                </button>
                            </div>
                            <div className={dropdownfilter ? "absolute w-36 z-10 left-[20px] mt-2 origin-top-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}>
                                <div className="py-1" role="none">
                                    <div className="grid grid-cols-12 ">
                                        <div className="col-span-12 sm:col-span-12 text-center bg-white rounded-md border mx-1">
                                            <div className="grid grid-cols-12">
                                                <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                                    <button className="inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 px-1" onClick={() => {
                                                        sortmin();
                                                        setdropdownfilter(!dropdownfilter)
                                                    }}>
                                                        น้อย {'>'} มาก
                                                    </button>
                                                </div>
                                                <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                                                    <button className="inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 px-1" onClick={() => {
                                                        sortmax();
                                                        setdropdownfilter(!dropdownfilter)
                                                    }}>
                                                        มาก {'>'} น้อย
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {filteredList.map((item, index) => (
                        <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 bg-white m-2" key={index}>
                            <Coupon
                                head={[
                                    <strong key={index}>
                                        <div className="text-2xl text-center text-white">
                                            <div className="text-3xl">ส่วนลด</div>
                                            <div className="text-xl">{item.slist_name}</div>
                                        </div>
                                    </strong>
                                ]}
                                content={[
                                    <strong key={index}>
                                        <div className="grid grid-cols-12 pr-2">
                                            <div className="grid col-span-6 text-2xl mb-2">
                                                โค้ดส่วนลด
                                            </div>
                                            <div className="grid col-span-6 mt-1 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        togglePopupQR()
                                                    }}
                                                    className="btn-save w-20 h-8"
                                                >
                                                    ใช้โค้ด
                                                </button>
                                            </div>
                                            <div className="grid col-span-12 mb-2">
                                                <div className="text-xs border w-28 text-center h-8 grid content-center border-red-600 text-red-600 mb-2">
                                                    ใช้ได้เฉพาะวัน จ-ศ
                                                </div>
                                            </div>
                                            <div className="grid col-span-6 mb-2">
                                                <div className="text-xs">ใช้ได้ถึง 30/04/2566</div>
                                            </div>
                                            <div className="grid col-span-6 mb-2">
                                                <div className="text-xs text-blue-600 text-end">
                                                    เงื่อนไข
                                                </div>
                                            </div>
                                        </div>
                                    </strong>
                                ]} />
                        </div>
                    ))}
                </div>
            </div>
            <Popup
                position="center"
                showCloseButton={true}
                visible={toggleQR}
                fullScreen={true}
                closeOnOutsideClick={true}
                onHiding={togglePopupQR}
                /* contentRender={renderContent} */
                resizeEnabled={true}
                width={460}
                height="100%"
            >
                <div className="grid grid-cols-12">
                    <div className=" grid col-span-12 items-center justify-center content-center mb-2">
                        <div className="qr-container__qr-code">
                            {qrCode}
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
}

