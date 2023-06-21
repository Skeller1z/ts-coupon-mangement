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
import { DateBox, Drawer, Gallery, Popup, ScrollView, Toast, TreeView } from "devextreme-react";
import {
  MsgOKCancel,
  MsgOKCancelWarning,
  MsgWarning,
} from "../../MainCall/dialog";
import Auth from "../../MainCall/Auth";
import { useTranslation } from "react-i18next";
import Load from "./Load";
import { setRecoil } from "recoil-nexus";
import Filter from "../../image/กรอง.png";
export default function FindIMG() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  interface LocationState {
    img: string;
    cate: number;
  }
  const date = new Date();
  const date1 = useRef(null);
  const date2 = useRef(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoadingpopup, setisLoadingpopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [numimg, setnumimg] = useState(0);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const { v4: uuidv4 } = require("uuid");
  const [Datas, setDatas] = useState([]);
  const [more, setmore] = useState(true);
  const [notiData, setnotiData] = useState(false);
  interface ToasttypeFace {
    type?: "custom" | "error" | "info" | "success" | "warning";
  }
  const [itemHotel, setitemHotel] = useState([]);
  const isRunned = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const cate = searchParams.get("cate");
  const [filteredList, setFilteredList] = useState([]);
  const [dropdownfilter, setdropdownfilter] = useState(false);
  const [openedMenu, setopenedMenu] = useState(true);
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    GetdataAPI_Outside("/api/MainSale/SelectDataSaleList", {
      PageNumber: 0,
      RowsOfPage: 0,
      Category: cate,
      Search: "",
      Fileupload: ""
    }).then(async (res) => {
      if (res.Status === "Success") {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        if (res.Data.length === 0) {
          setmore(false);
          setnotiData(false);
        }
        setDatas(res.Data)
      } else {
        MsgWarning(t("fail"));
      }
    });
  }, []);
  useEffect(() => {
    GetdataAPI_Outside("/api/Main/SelectCompany", {}).then(async (res) => {
      if (res.Data.length === 0) {
        setmore(false);
        setnotiData(true);
      }
      setitemHotel(res.Data)
      setFilteredList(res.Data)
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    });
  }, []);
  //------------------------------------------- funtion ------------------------------------------
  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...itemHotel];
    updatedList = updatedList.filter((item) => {
      if (item.a2 != null) {
        return item.a2.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
    });
    setFilteredList(updatedList);
  };
  const sortmin = () => {
    const sortedArray = [...filteredList].sort((a, b) => a.a5 - b.a6);
    setFilteredList(sortedArray);
  };
  const sortmax = () => {
    const sortedArray = [...filteredList].sort((a, b) => b.a5 - a.a6);
    setFilteredList(sortedArray);
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      {isLoading ? (
        <Load />
      ) : (
        <>
          <div className="grid grid-cols-12 gap-2 mt-[-20px]">
            <div className="grid col-span-12 sm: md:col-span-2 lg:col-span-2 xl:col-span-1 border border-l-white border-t-white border-b-white pr-3">
              <div>
                <div className="grid grid-cols-12 bg-white gap-3 md:ml-[-60px]  xl:ml-[-100px]">
                  <div className="grid col-span-12">
                    <div className="text-center text-2xl mt-10">ค้นหาข้อมูลโรงแรม</div>
                    <div className="mt-10 text-lg">ค้นหาตามช่วงวันที่</div>
                  </div>
                  <div className="grid col-span-12">
                    <span className="inline-flex">
                      <span className="txt-input">
                        จากวันที่
                      </span>
                      <span className="valid">
                      </span>
                    </span>
                    <DateBox
                      ref={date1}
                      defaultValue={date}
                      showClearButton={true}
                      useMaskBehavior={true}
                      type="date"
                      displayFormat="yyyy-MM-dd"
                      className=""
                    />
                  </div>
                  <div className="grid col-span-12">
                    <span className="inline-flex">
                      <span className="txt-input">
                        ถึงวันที่
                      </span>
                      <span className="valid">
                      </span>
                    </span>
                    <DateBox
                      ref={date2}
                      defaultValue={date}
                      showClearButton={true}
                      useMaskBehavior={true}
                      type="date"
                      displayFormat="yyyy-MM-dd"
                      className=""
                    />
                  </div>
                  <div className="grid col-span-12">
                    <hr />
                  </div>
                  <div className="grid col-span-12">
                    <div className="text-lg">ค้นหาตามระยะทาง</div>
                  </div>
                  <div className="grid col-span-12">
                    <div className="flex">
                      <input type={"checkbox"} />
                      <div className="ml-2">ระยะทางจาก มาก ไป น้อย</div>
                    </div>
                  </div>
                  <div className="grid col-span-12">
                    <div className="flex">
                      <input type={"checkbox"} />
                      <div className="ml-2">ระยะทางจาก น้อย ไป มาก</div>
                    </div>
                  </div>
                  <div className="grid col-span-12">
                    <hr />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid col-span-12 sm: md:col-span-10 lg:col-span-10 xl:col-span-11">
              <div className="bg-white min-h-screen">
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
                    <div className="grid grid-cols-12 gap-3 px-1 pb-0 pt-5">
                      <div className="grid col-span-10 my-5">
                        <div className="text-left ml-20 text-2xl">ผลการค้นหา 6 แห่ง</div>
                      </div>
                      <div className="grid col-span-2 my-5">
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
                      {filteredList.map((item, i) => (
                        <div
                          key={i}
                          className="grid col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4 bg-white cursor-pointer"
                          onClick={
                            (e) => {
                              //togglePopupimg()
                              navigate({
                                pathname: "/Hotel",
                                search: createSearchParams({
                                  comp_id: item.a1,
                                  hotel_name: item.a2,
                                  addreess: item.a6
                                }).toString(),
                              });
                            }
                          }
                        >
                          <div className="grid grid-cols-12">
                            <div className="grid col-span-12">
                              <img className="object-cover h-[220px] w-full" src={item.a19} />
                            </div>
                            <div className="grid col-span-12 text-white bg-blue-500 text-center">
                              <div className="grid grid-cols-12 h-full">
                                <div className="grid col-span-12">
                                  <div className="my-1">
                                    โรงแรม {item.a4}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
