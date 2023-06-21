import React, { useEffect, useRef, useState } from "react";
import "../../css/Custom.css";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import DropDownBox from "devextreme-react/drop-down-box";
import ArrayStore from "devextreme/data/array_store";
import DataGrid, {
    Selection,
    Paging,
    FilterRow,
    Scrolling,
} from "devextreme-react/data-grid";
import { useTranslation } from "react-i18next";
import Ads from "../MainPage/Ads";
import {
    GetdataAPI,
    GetdataAPI_Outside,
    resizeImg,
    timeout,
} from "../../MainCall/MainCall";
import Logo2 from "../../image/BTRAVEL2.png";
import Load from "./Load";
import { MsgWarning } from "../../MainCall/dialog";
import { ReactComponent as Logo } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import Arrow from "../../image/arrow.png";
import { DateBox, Toast } from "devextreme-react";
import { setRecoil } from "recoil-nexus";
import { countcart, FindIMG } from "../../Recoil/CartRecoil";
import { useRecoilState } from "recoil";
import { active } from "../../Recoil/MenuRecoil";
import liff from "@line/liff/dist/lib";
import Auth from "../../MainCall/Auth";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Coupon from "./Coupon";
/* import VConsole from "vconsole";
const vConsole = new VConsole(); */
export default function HomePage() {
    //------------------------------------------- ตัวแปร ------------------------------------------
    const [menuactive, setmenuactive] = useRecoilState(active);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string>();
    const hiddenFileInput = React.useRef(null);
    const trip = useRef(null);
    const comp = useRef(null);
    const [Datas, setDatas] = useState([]);
    const [DatasComp, setDatasComp] = useState([]);
    const gridDataSource = new ArrayStore({
        data: Datas,
        key: "a1",
    });
    const gridDataSourceComp = new ArrayStore({
        data: DatasComp,
        key: "a1",
    });
    interface ToasttypeFace {
        type?: "custom" | "error" | "info" | "success" | "warning";
    }
    const [ToastVisible, setToastVisible] = useState(false);
    const [ToastType, setToastType] = useState<ToasttypeFace>({
        type: "info",
    });
    const [Toastmessage, setToastmessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const enc = searchParams.get("comp_name");
    const [numcount, setnumcount] = useRecoilState(countcart);
    const [datacoupon, setdatacoupon] = useState([]);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
    const responsivecoupon = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const coupon = {
        data: [
            {
                id: 1,
                img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
                text: "โรงแรม 1",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            },
            {
                id: 2,
                img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
                text: "โรงแรม 2",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            },
            {
                id: 3,
                img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
                text: "โรงแรม 3",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            },
            {
                id: 4,
                img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
                text: "โรงแรม 4",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            }
            , {
                id: 5,
                img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
                text: "โรงแรม 5",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            }
        ],
        data2: [
            {
                id: 1,
                img: "https://blog.lnw.co.th/wp-content/uploads/2017/08/Coupon.jpg",
                text: "คูปอง 1",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            },
            {
                id: 2,
                img: "https://www.smile-siam.com/wp-content/uploads/2020/12/coupon-cover.jpg",
                text: "คูปอง 2",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            },
            {
                id: 3,
                img: "https://media.amway.id/sys-master/images/h15/h21/9100409962526/ath-foa-privilege-img01a-may2021.jpg",
                text: "คูปอง 3",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            },
            {
                id: 4,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCywPYDZV2cqQX_-d0XwZNmNqU7i95OIh9SZyWL30LELe1UOAwoiTTli6XWol7wyxnCHY&usqp=CAU",
                text: "คูปอง 4",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            }
            , {
                id: 5,
                img: "https://media.amway.id/sys-master/images/hab/hdf/9100410224670/ath-foa-privilege-img02a-may2021.jpg",
                text: "คูปอง 5",
                a4: "Seastar®",
                a6: "112/151 หมู่บ้านอุดมสุข หมู่ 8 ต.ป่าคลอก อ.ถลาง จ.ภูเก็ต 83110"
            }
        ]
    };
    //------------------------------------------- onload ------------------------------------------
    useEffect(() => {
        GetdataAPI_Outside("/api/Coupon/SelectDataSaleList", {
            PageNumber: 1,
            RowsOfPage: 20,
        }).then(async (res) => {
            if (res.Status === "Success") {
                console.log(res.Data)
                setdatacoupon(res.Data)
            } else {
                MsgWarning(t("fail"));
            }
        });
    }, []);
    //------------------------------------------- funtion ------------------------------------------
    function onHiding(e) {
        setToastVisible(false);
    }
    const AddCart = (slist_id, parentcomp_id) => {
        Auth.CurrentUser().then((res) => {
            if (res === "") {
                navigate({
                    pathname: "/Authen",
                    search: createSearchParams({
                        slist_id: slist_id,
                        parentcomp_id: parentcomp_id,
                    }).toString(),
                });
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
                                setToastVisible(true);
                                setToastType({ type: "success" });
                                setToastmessage("Added");
                            } else if (res.Message === "item already exists.") {
                                MsgWarning(t("Added to basket"));
                                return;
                            }
                        });
                    }
                });
            }
        });
    };
    //------------------------------------------- html ------------------------------------------
    return (
        <>
            <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
            <div className="grid grid-cols-12 pb-10 mt-[-20px]">
                <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start h-[400px] bg-cover bg-sea ">
                    <div className="mb-5 mt-10 mx-5">
                        <img src={Logo2} className=" h-[auto] w-96 center" />
                        <div className="text-center mt-5 text-white text-3xl font-semibold xl:px-60 lg:px-60">
                            {t("ค้นหาคูปองโรงแรม รีสอร์ต โฮสเทล และอีกมากมายจองที่พักราคาพิเศษกว่า 2 ล้านแห่งทั่วโลกกับ B Travel")}
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 mt-2 text-center bg-white rounded-md mx-2 pt-80 ">
                    <div className="grid grid-cols-12">
                        <div className="grid col-span-12 text-center mt-5 text-[#000000B2] text-3xl font-semibold mb-3">
                            โค้ดส่วนลดแนะนำ
                        </div>
                        <div className="grid col-span-12">
                            <Carousel
                                responsive={responsivecoupon}
                                showDots={true}
                                arrows={true}
                                focusOnSelect={true}
                                autoPlay={true}
                                renderDotsOutside
                            >
                                {datacoupon.map((item, index) => (
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
                                                    <div className="grid col-span-6 text-2xl mb-2 text-start">
                                                        โค้ดส่วนลด
                                                    </div>
                                                    <div className="grid col-span-6 mt-1 justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                if (e && e.stopPropagation) e.stopPropagation();
                                                                AddCart(item.slist_id, item.parentcomp_id);
                                                            }}
                                                            className="btn-save w-20 h-8"
                                                        >
                                                            เก็บโค้ด
                                                        </button>
                                                    </div>
                                                    <div className="grid col-span-6 mb-2">
                                                        <div className="text-xs border w-28 text-center h-8 grid content-center border-red-600 text-red-600 mb-2">
                                                            ใช้ได้เฉพาะวัน จ-ศ
                                                        </div>
                                                    </div>
                                                    <div className="grid col-span-12 mb-2">
                                                        <div className="text-lg mt-1 border h-5 grid content-center mb-2">
                                                            <div className="w-[80%] h-2 bg-red-600 mx-1"></div>
                                                        </div>
                                                    </div>
                                                    <div className="grid col-span-3 mb-2">
                                                        <div className="text-red-600 text-xs">ใช้แล้ว 80%</div>
                                                    </div>
                                                    <div className="grid col-span-6 mb-2">
                                                        <div className="text-xs">ใช้ได้ถึง 30/04/2566</div>
                                                    </div>
                                                    <div className="grid col-span-3 mb-2">
                                                        <div className="text-xs text-blue-600 text-end">
                                                            เงื่อนไข
                                                        </div>
                                                    </div>
                                                </div>
                                            </strong>
                                        ]} />
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 mt-2 text-center bg-white rounded-md mx-2">
                    <div className="text-center mt-5 text-[#000000B2] text-3xl font-semibold mb-3">
                        โรงแรมแนะนำ
                    </div>
                    <div className="">
                        <Carousel
                            responsive={responsive}
                            showDots={true}
                            arrows={true}
                            focusOnSelect={true}
                            autoPlay={true}
                            renderDotsOutside
                        >
                            {coupon.data.map((item, i) => (
                                <div className="pl-1 h-full bg-white" key={i}
                                    onClick={() => {
                                        navigate("/Hotel", {
                                            state: {
                                                cate: 0,
                                                img: "",
                                                item: [item]
                                            },
                                        });
                                    }}>
                                    <div className="ribbon-wrapper">
                                        <div className="ribbon text-xs text-center px-1">ส่วนลดสูงสุด ฿300.00</div>
                                        <img src={item.img} className="rounded-t-md" />
                                    </div>
                                    <div>{item.text}</div>
                                    <div className="text-left px-1">สถานที่ : ไม่มี</div>
                                    <div className="text-left px-1">รายละเอียด : ไม่มี</div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 mt-5 text-center bg-white rounded-md mx-2">
                    <div className="text-center mt-5 text-[#000000B2] text-3xl font-semibold mb-3">
                        โรงแรมยอดนิยม
                    </div>
                    <div className="">
                        <Carousel
                            responsive={responsive}
                            showDots={true}
                            arrows={true}
                            focusOnSelect={true}
                            autoPlay={true}
                            renderDotsOutside
                        >
                            {coupon.data.map((item, i) => (
                                <div className="pl-1 h-full bg-white" key={i}
                                    onClick={() => {
                                        navigate("/Hotel", {
                                            state: {
                                                cate: 0,
                                                img: "",
                                                item: [item]
                                            },
                                        });
                                    }}>
                                    <div className="ribbon-wrapper">
                                        <div className="ribbon text-xs text-center px-1">ส่วนลดสูงสุด ฿300.00</div>
                                        <img src={item.img} className="rounded-t-md" />
                                    </div>
                                    <div>{item.text}</div>
                                    <div className="text-left px-1">สถานที่ : ไม่มี</div>
                                    <div className="text-left px-1">รายละเอียด : ไม่มี</div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <Toast
                animation={{
                    show: { type: "fade", duration: 400, from: 0, to: 1 },
                    hide: { type: "fade", duration: 1000, from: 1, to: 0 },
                }}
                position={{
                    my: { x: "center", y: "bottom" },
                    at: { x: "center", y: "bottom" },
                    of: window,
                    offset: "0 -75",
                }}
                visible={ToastVisible}
                message={Toastmessage}
                type={ToastType.type}
                onHiding={onHiding}
                displayTime={600}
            />
        </>
    );
}
