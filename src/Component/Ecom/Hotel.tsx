import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
    GetdataAPI,
    GetdataAPI_Outside,
    timeout,
} from "../../MainCall/MainCall";
import { cart_data, countcart, } from "../../Recoil/CartRecoil";
import Ads from "../MainPage/Ads";
import { ReactComponent as Basket_Blue } from "../../image/SVG_Memorybox/Find Photo/Add_Basket_White.svg";
import { Gallery, Popup, ScrollView, Toast } from "devextreme-react";
import {
    MsgOKCancel,
    MsgOKCancelWarning,
    MsgWarning,
} from "../../MainCall/dialog";
import Auth from "../../MainCall/Auth";
import { useTranslation } from "react-i18next";
import Face_Memorybox from "../../image/SVG_Memorybox/Face_Memorybox.gif";
import Loading_Memorybox from "../../image/SVG_Memorybox/Loading_Memorybox.gif";
import Load from "./Load";
import { setRecoil } from "recoil-nexus";
import Geocode from "react-geocode";
import { GoogleMap, LoadScript, Marker, Circle, } from '@react-google-maps/api';
import Carousel from "react-multi-carousel";
import Coupon from "./Coupon";
export default function Hotel() {
    //------------------------------------------- ตัวแปร ------------------------------------------
    interface LocationState {
        img: string;
        cate: number;
        item: [0];
    }
    const [cartdata, setcartdata] = useRecoilState(cart_data);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isLoadingpopup, setisLoadingpopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [numimg, setnumimg] = useState(0);
    let location: any = useLocation();
    const stateany: any = location.state;
    const StateInterface: LocationState = stateany;
    const { v4: uuidv4 } = require("uuid");
    const [Datas, setDatas] = useState([]);
    const [salelist, setsalelist] = useState(0);
    const [pagecount, setpagecount] = useState(1);
    const [more, setmore] = useState(true);
    const [notiData, setnotiData] = useState(false);
    const [toggle, settoggle] = useState(false);
    const Gallery_Ref = useRef(null);
    const [dataimg, setdataimg] = useState([]);
    const [dataimg2, setdataimg2] = useState([]);
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    interface ToasttypeFace {
        type?: "custom" | "error" | "info" | "success" | "warning";
    }
    const [ToastVisible, setToastVisible] = useState(false);
    const [ToastType, setToastType] = useState<ToasttypeFace>({
        type: "info",
    });
    const [Toastmessage, setToastmessage] = useState("");
    const [itemRP, setitemRP] = useState([]);
    const [numcount, setnumcount] = useRecoilState(countcart);
    const skeleton = [];
    const COUNTER = 8;
    const scope_image = 10;
    const RowsOfPage = scope_image * 2;
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [isPopupUpIMG, setPopupUpIMG] = useState(false);
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>();
    const [countImg, setcountImg] = useState(0);
    const [PopupLoad, setPopupLoad] = useState(false);
    const [Popupimg, setPopupimg] = useState(false);
    const [cate, setcate] = useState("");
    const [img, setimg] = useState("");
    const StateInterface_cate = window.localStorage.getItem('StateInterface_cate')
    const isRunned = useRef(false);
    const api_key = "AIzaSyBXhuwvX8dJjBrOsEkbslrv4LBgaqmeOYg"
    const [locationGoogleMap, setlocationGoogleMap] = useState("");
    const [datacoupon, setdatacoupon] = useState([]);
    const hotel = {
        data: [
            {
                id: 1,
                img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
                text: "โรงแรม 1"
            },
            {
                id: 2,
                img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
                text: "โรงแรม 2"
            },
            {
                id: 3,
                img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
                text: "โรงแรม 3"
            },
            {
                id: 4,
                img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
                text: "โรงแรม 4"
            }
            , {
                id: 5,
                img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
                text: "โรงแรม 5"
            },
            {
                id: 1,
                img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
                text: "โรงแรม 1"
            },
            {
                id: 2,
                img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
                text: "โรงแรม 2"
            },
            {
                id: 3,
                img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
                text: "โรงแรม 3"
            },
            {
                id: 4,
                img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
                text: "โรงแรม 4"
            }
            , {
                id: 5,
                img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
                text: "โรงแรม 5"
            },
            {
                id: 1,
                img: "https://images.trvl-media.com/lodging/16000000/15620000/15617200/15617176/248f37ce.jpg?impolicy=resizecrop&rw=500&ra=fit",
                text: "โรงแรม 1"
            },
            {
                id: 2,
                img: "https://sls-prod.api-onscene.com/partner_files/trueidintrend/17332/Outdoor-Pool-REsize-1200x800.jpg",
                text: "โรงแรม 2"
            },
            {
                id: 3,
                img: "https://www.prachachat.net/wp-content/uploads/2020/03/01-4%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B9%81%E0%B8%A3%E0%B8%A1%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4-728x485.jpg",
                text: "โรงแรม 3"
            },
            {
                id: 4,
                img: "https://dimg04.c-ctrip.com/images/0M75112000993mw5430D3_Q60.jpg_.webp",
                text: "โรงแรม 4"
            }
            , {
                id: 5,
                img: "https://www.prachachat.net/wp-content/uploads/2020/09/17-2%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%A3%E0%B8%B2-%E0%B8%8A%E0%B8%B0%E0%B8%AD%E0%B8%B31-728x486.jpg",
                text: "โรงแรม 5"
            }
        ],
    };

    const [img1, setimg1] = useState(hotel.data[0].img);
    const [img2, setimg2] = useState(hotel.data[1].img);
    const [img3, setimg3] = useState(hotel.data[2].img);
    const [searchParams, setSearchParams] = useSearchParams();
    const hotel_name = searchParams.get("hotel_name");
    const comp_id = searchParams.get("comp_id");
    const addreess = searchParams.get("addreess");
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 4
        }
    };
    //------------------------------------------- onload ------------------------------------------
    useEffect(() => {
        if (isRunned.current) return;
        isRunned.current = true;
        GetdataAPI_Outside("/api/Coupon/SelectDataSaleList", {
            PageNumber: 1,
            RowsOfPage: 20,
            comp_id: comp_id,
        }).then(async (res) => {
            if (res.Status === "Success") {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);
                if (res.Data.length === 0) {
                    setmore(false);
                    setnotiData(false);
                }
                setdatacoupon(res.Data)
            } else {
                MsgWarning(t("fail"));
            }
        });
        console.log(addreess)
        SearchLocation(addreess)
    }, []);
    //------------------------------------------- funtion ------------------------------------------
    for (let i = 0; i < COUNTER; i++) {
        skeleton.push(
            <div
                key={uuidv4()}
                className="grid col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 content-center after:pt-[75%] after:block after:content-[''] relative postSk"
            >
                <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                    <div className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit] bg-gray-300 animate-pulse"></div>
                    <div className="absolute  top-0 right-0 left-0 bottom-0 flex justify-end  items-end pb-1">
                        <div className="rounded-full mr-1 p-0">
                            <div className="w-5 h-5 animate-pulse rounded-full"> </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const togglePopup = () => {
        settoggle(!toggle);
    };
    const togglePopupimg = () => {
        setPopupimg(!Popupimg);
    };
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
                                setnumcount(res.Data.length);
                                setcartdata(res.Data);
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
    const togglePopupReport = () => {
        setPopupVisibility(!isPopupVisible);
    };
    function onHiding(e) {
        setToastVisible(false);
    }
    const SearchLocation = (location) => {
        Geocode.setApiKey(api_key);
        Geocode.setLanguage("th");
        Geocode.setRegion("th");
        Geocode.enableDebug();
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromAddress(location).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const address = response.results[0].formatted_address;
                setlatitude(lat)
                setlongitude(lng)
                setlocationGoogleMap(address)

            },
            (error) => {
                console.error(error);
            }
        );
    }
    //------------------------------------------- html ------------------------------------------
    return (
        <>
            {isLoading ? (
                <Load />
            ) : (
                <>
                    <div className={isLoadingpopup ? "" : "hidden"}>
                        <div className="overlay">
                            <div className="overlay__inner">
                                <div className="overlay__content">
                                    <div className="bounce">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={isLoadingpopup ? "" : ""}>
                        <div className="">
                            <div className={notiData ? "text-center" : "hidden"}>
                                <label className="text-2xl">{t("No Data")}</label>
                            </div>
                            <div className="grid grid-cols-12 gap-3 px-2 pb-0 pt-2">
                                <div className="grid col-span-12">
                                    <div className="text-2xl font-semibold pl-1">{hotel_name}</div>
                                </div>
                                <div className="grid col-span-8 pl-2">
                                    <img className="w-full h-[auto] rounded-md" src={img1} />
                                </div>
                                <div className="grid col-span-4 pr-2">
                                    <img className="w-full h-[auto] rounded-md" src={img2} />
                                    <img className="w-full h-full rounded-md" src={img3} />
                                </div>
                                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-1 text-center bg-white rounded-md">
                                    <div className="">
                                        <Carousel
                                            responsive={responsive}
                                            showDots={true}
                                            arrows={true}
                                            focusOnSelect={true}
                                            autoPlay={true}
                                            renderDotsOutside
                                        >
                                            {hotel.data.map((item, i) => (
                                                <div className="grid mx-1 h-full" key={i} onClick={() => {
                                                    if (item.id) {
                                                        //alert(item.id)
                                                    }
                                                }}>
                                                    <img src={item.img} className="rounded-md" onClick={() => {
                                                        //togglePopupimg()
                                                        setimg1(item.img)
                                                        setimg2(item.img)
                                                        setimg3(item.img)
                                                    }} />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  w-full">
                                    <div className="text-center text-2xl font-semibold">แผนที่</div>
                                    <LoadScript
                                        googleMapsApiKey={api_key}
                                    >
                                        <GoogleMap
                                            zoom={15}
                                            mapContainerStyle={
                                                {
                                                    height: '350px'
                                                }
                                            }
                                            center={{
                                                lat: latitude,
                                                lng: longitude
                                            }}
                                        >
                                            <Marker
                                                position={{
                                                    lat: latitude,
                                                    lng: longitude
                                                }}
                                                label={"Center"}
                                            />
                                        </GoogleMap>
                                    </LoadScript>

                                </div>
                                <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 text-center w-full">
                                    <div className="text-2xl font-semibold">รายละเอียด</div>
                                    <div className="text-lg">{locationGoogleMap}  </div>
                                </div>
                                {datacoupon.map((item, index) => (
                                    <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 bg-white" key={index}>
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
                                    </div>
                                ))}
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
                    <Popup
                        position="center"
                        visible={isPopupVisible}
                        closeOnOutsideClick={true}
                        onHiding={togglePopupReport}
                        width="80%"
                        height={"auto"}
                        showTitle={false}
                    >
                        <div className="grid grid-cols-12 gap-3">
                            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center pb-2 border border-t-white border-r-white border-l-white">
                                <div className="grid grid-cols-12">
                                    <div className="grid col-span-8">
                                        <div className="text-xs font-semibold">
                                            {t("SERVICE PROVIDER")}
                                        </div>
                                        <div className="text-xl font-semibold">{t("PHOTONISTA®")}</div>
                                    </div>
                                    <div className="grid col-span-4 justify-end">
                                        <i
                                            className="fal fa-times text-xl text-center hover:bg-gray-200 rounded-sm w-8 h-8"
                                            onClick={togglePopupReport}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mx-6">
                                <div className="inline-flex grid grid-cols-12 gap-2">
                                    <div className="grid col-span-3 justify-end content-center">
                                        <div className="text-[#4C4C4C] text-xs">{t("NAME")}:</div>
                                    </div>
                                    <div className="grid col-span-9">
                                        <div className="text-[#1F1F1F] text-sm font-semibold">
                                            {itemRP.map((e) => e.slist_name)}
                                        </div>
                                    </div>
                                    <div className="grid col-span-3 justify-end content-center">
                                        <div className="text-[#4C4C4C] text-xs">{t("FLEET")}:</div>
                                    </div>
                                    <div className="grid col-span-9">
                                        <div className="text-[#1F1F1F] text-sm font-semibold">
                                            {itemRP.map((e) => e.mst_name)}
                                        </div>
                                    </div>
                                    <div className="grid col-span-3 justify-end content-center">
                                        <div className="text-[#4C4C4C] text-xs">{t("EMAIL")}:</div>
                                    </div>
                                    <div className="grid col-span-9">
                                        <div className="text-[#1F1F1F] text-sm font-semibold">
                                            INFO@PHOTONISTA.CO.TH
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center justify-center pt-2 border border-b-white border-r-white border-l-white">
                                <div className="text-left text-xs text-[#4C4C4C]">
                                    *หากท่านไม่ประสงค์ให้ภาพของท่านอยู่ในระบบ
                                    ท่านสามารถดำเนินการยื่นคำร้องที่ “ผู้ให้บริการถ่ายภาพ” ผ่านช่องทาง
                                    EMAIL โดยแจ้งชื่อภาพพร้อมเอกสารยืนยันตัวตนของท่าน
                                    “ผู้ให้บริการถ่ายภาพ”
                                    จะดำเนินการตามความประสงค์ของท่านโดยเร็วที่สุด
                                </div>
                                <div className="text-left text-xs text-[#4C4C4C] mt-3">
                                    You can request that your image be removed from the system by
                                    emailing the “Service Provider” along with a document confirming
                                    your identity.
                                </div>
                            </div>
                        </div>
                    </Popup>
                    <Popup
                        position="center"
                        visible={Popupimg}
                        onHiding={togglePopupimg}
                        width="100%"
                        height={"100%"}
                        showTitle={true}
                        showCloseButton={true}
                    >
                        <ScrollView
                            id="scrollview"
                            scrollByContent={true}
                            bounceEnabled={false}
                            showScrollbar="onScroll"
                            scrollByThumb={true}
                        >
                            <div>
                                <div className={"grid justify-end col-cols-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-end after:block after:content-[''] relative"}
                                >
                                    <img
                                        id="Gallery1"
                                        className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 h-[80vh]"
                                        src={img}
                                        ref={Gallery_Ref}
                                    />
                                </div>
                            </div>
                        </ScrollView>
                    </Popup>
                </>
            )}

        </>
    );
}
