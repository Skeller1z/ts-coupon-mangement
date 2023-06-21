import DataGrid, {
  Column,
  Grouping,
  Paging,
  Selection,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import {
  GetdataAPI,
  GetdataAPI_Outside,
  timeout,
} from "../../MainCall/MainCall";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Ads from "../MainPage/Ads";
import { NumberFormat } from "../../MainCall/NumberFormat";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Payment/Basket_Blue.svg";
import { ReactComponent as InforIcon } from "../../image/SVG_Memorybox/Payment/information_grey25.svg";
import { ReactComponent as PayIcon } from "../../image/SVG_Memorybox/Payment/Credit card.svg";
import { ReactComponent as Bin } from "../../image/SVG_Memorybox/Payment/Delete.svg";
import { useRecoilState } from "recoil";
import { cart_data, countcart, FindIMG } from "../../Recoil/CartRecoil";
import { Popup, Toast } from "devextreme-react";
import PopupShowImg from "../MainPage/PopupShowImg";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { MsgOKCancel, MsgWarning } from "../../MainCall/dialog";
import { useTranslation } from "react-i18next";
import { active } from "../../Recoil/MenuRecoil";
import Auth from "../../MainCall/Auth";
import { getRecoilPromise } from "recoil-nexus";
import QRCode from "qrcode.react";
import Logo from "../../image/BTRAVEL2.png";
const Carts = [];
const CartsStore = new ArrayStore({
  key: "cart_id",
  data: Carts,
});
const dataSource = new DataSource({
  store: CartsStore,
  reshapeOnPush: true,
});
export default function GridOrder() {
  //------------------------ตัวแปร-----------------------------s
  const [menuactive, setmenuactive] = useRecoilState(active);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingpopup, setisLoadingpopup] = useState(false);
  const navigate = useNavigate();
  const [skeleton_ar, setskeleton_ar] = useState([]);
  const GridRef = useRef(null);
  const [totalnum, settotalnum] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [noti, setnoti] = useState(false);
  const [numcount, setnumcount] = useRecoilState(countcart);
  interface ToasttypeFace {
    type?: "custom" | "error" | "info" | "success" | "warning";
  }
  const [ToastVisible, setToastVisible] = React.useState(false);
  const [ToastType, setToastType] = React.useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = React.useState("");
  const [path, setpath] = useState("");
  const [toggle, settoggle] = useState(false);
  const [toggleQR, settoggleQR] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [url, setUrl] = useState("");
  const [data2, setdata2] = useState([]);
  const slist_id = searchParams.get("slist_id");
  const parentcomp_id = searchParams.get("parentcomp_id");
  //------------------------onload----------------------------
  useEffect(() => {
    setmenuactive(2);
    setIsLoading(true);
    CeateSkeleton(1, 1);
    if (slist_id !== null && parentcomp_id !== null) {
      AddCart(slist_id, parentcomp_id);
    } else {
      getRecoilPromise(cart_data).then((cartdata) => {
        if (cartdata.length === 0) {
          setIsLoading(false);
        } else {
          cartdata.forEach((items) => {
            CartsStore.push([{ type: "insert", data: items }]);
          });
        }
      });
    }
    return () => {
      CartsStore.clear();
    };
  }, []);
  useEffect(() => {
    GetdataAPI_Outside("/api/Coupon/SelectDataSaleList", {
      PageNumber:20,
      comp_id: 1, 
      im_expired_date: "2022-12-27T08:04:40.251Z"
    }).then(async (res) => {
      if (res.Status === "Success") {
        console.log(res)
      } else if (res.Message === "item already exists.") {
        MsgWarning(t("Added to basket"));
        return;
      }
    });
    GetdataAPI("/api/MainSale/AddItemToCart", {
      CompId: "1",
      ItemId: "3002",
      Qty: "1"
    }).then(async (res) => {
      if (res.Status === "Success") {
        console.log(res)
      } else if (res.Message === "item already exists.") {
        MsgWarning(t("Added to basket"));
        return;
      }
    });
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
            GetdataAPI("/api/MemoryBox/AddItemToCart", {
              CompId: parentcomp_id,
              slist_id: slist_id,
              ItemId: res.Data.item[0].item_id,
              Qty: "1",
            }).then(async (res) => {
              if (res.Status === "Success") {
                if (res.Data.length === 0) {
                  setIsLoading(false);
                } else {
                  res.Data.forEach((items) => {
                    CartsStore.push([{ type: "insert", data: items }]);
                  });
                  setnumcount(res.Data.length);
                }
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
  const CeateSkeleton = (hnum, inum) => {
    let ar = [];
    for (let i = 0; i < hnum; i++) {
      let newdata = { details: [] };
      for (let j = 0; j < inum; j++) {
        let details = { j: j };
        newdata.details.push(details);
      }
      ar.push(newdata);
    }
    setskeleton_ar(ar);
  };
  function onHiding(e) {
    setToastVisible(false);
  }
  const onunitChanged = (cart_id, ItemId, qty, datas) => {
    setisLoadingpopup(true);
    timeout(1).then(() => {
      GetdataAPI("/api/MemoryBox/UpdateItemToCart", {
        cart_id: cart_id,
        ItemId: ItemId,
        qty: qty,
      }).then((res) => {
        if (res.Status === "Success") {
          const dataupdated = res.Data.filter((items) => {
            return items.cart_id === cart_id;
          });

          CartsStore.push([
            {
              type: "update",
              key: cart_id,
              data: dataupdated[0],
            },
          ]);

          setnumcount(res.Data.length);
          sumamount();
          setisLoadingpopup(false);
        }
      });
    });
    /* GridRef.current.instance.beginCustomLoading("Loading..."); */
  };
  const DeleteImg = (cart_id) => {
    MsgOKCancel("ยืนยันการลบ", "Delete?").then((res) => {
      if (res === "OK") {
        GetdataAPI("/api/MemoryBox/DeleteItemCart", {
          cart_id: cart_id,
        }).then((res) => {
          if (res.Status === "Success") {
            setnumcount(res.Data.length);
            CartsStore.push([
              {
                type: "remove",
                key: cart_id,
              },
            ]);
          }
          sumamount();
          timeout(100).then(() => {
            CeateSkeleton(res.Data.length, 1);
          });
        });
      }
    });
  };
  const Checkout = () => {
    if (totalnum < 0) {
      MsgWarning(t("Net balance must not be lower than"));
    } else {
      const SelectData = GridRef.current.instance.getSelectedRowsData();

      if (SelectData.length === 0) {
        MsgWarning(t("Please, select your photo"));
      } else {
        navigate("../Pay", {
          state: {
            Item: SelectData,
            discount: discount
          },
        });
      }
    }
  };
  const Findphoto = () => {
    navigate("/HomePage");
  };
  const showimg = (img_path) => {
    setpath(img_path);
    fntoggle();
  };
  const fntoggle = () => {
    settoggle(!toggle);
  };
  const Grid_onCellPrepared = React.useCallback((e) => {
    const totalcount = dataSource.items().length;

    /*   if (totalcount === 0) {
      setIsLoading(false);
    } */
    if (e.rowIndex === totalcount - 1 && e.columnIndex === 1) {
      setIsLoading(false);
    }
  }, []);
  const Grid_ColumsRender = React.useCallback((datas) => {
    return (
      <Grid_unitselect
        datas={datas}
        onunitChanged={onunitChanged}
        DeleteImg={DeleteImg}
        showimg={showimg}
        GetQR={GetQR}
        togglePopupQR={togglePopupQR}
      />
    );
  }, []);
  const Grid_onSelectionChanged = React.useCallback((e) => {
    setisLoadingpopup(true);
    sumamount();
    const DisableRowsData = e.selectedRowsData.filter(
      (i) => i.item_id === null
    );

    const currentKeys = e.currentSelectedRowKeys;

    const disabledKeys = currentKeys.filter((i) => {
      const chk_i = DisableRowsData.filter((item) => {
        return item.cart_id === i;
      });
      return chk_i.length > 0;
    });

    if (disabledKeys.length > 0) {
      e.component.deselectRows(disabledKeys);
      /* แจ้งแตือนตัวเลือก */
      MsgWarning(t("Please, select size"));
    }
  }, []);
  const sumamount = () => {
    const SelectData = GridRef.current.instance.getSelectedRowsData();
    const OKRowsData = SelectData.filter((i) => i.item_id !== null);
    const numsum = OKRowsData.reduce(
      (a, v) => (a = a + parseFloat(v.price_total)),
      0
    );
    if (OKRowsData.length !== 0) {
      GetdataAPI("/api/Salelist/DiscountPromotion", {
        listOfitem: OKRowsData,
      }).then((res) => {
        if (res.Status === "Success") {
          setdiscount(res.Data);
          setIsLoading(false);
          setisLoadingpopup(false);
        }
      });
    } else {
      setdiscount(0);
      setIsLoading(false);
      setisLoadingpopup(false);
    }
    settotalnum(numsum);
  };
  const SkeletonGrid_ColumnsRender = React.useCallback((datas) => {
    return (
      <div className="grid grid-cols-12 py-2">
        <div className="grid col-span-12 ">
          <div className="grid grid-cols-12 ">
            <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4  content-center after:pt-[75%] after:block after:content-[''] relative  bg-gray-300 animate-pulse">
              <div className="rounded-lg absolute top-0 right-0 left-0 bottom-0 flex w-full h-full"></div>
            </div>

            <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
              <div className="grid grid-cols-12 ">
                <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 ">
                  <div className=" bg-gray-300 animate-pulse">
                    <div className="text-[16px] invisible">XXXX</div>
                  </div>
                </div>

                <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                  <div className=" bg-gray-300 animate-pulse">
                    <div className="invisible my-2">
                      <SelectBox
                        placeholder={""}
                        className="border border-white rounded-full px-1 shadow-inner-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12   ">
                  <div className=" bg-gray-300 animate-pulse">
                    <span className="text-xs invisible"> xxx</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
              <div className="grid grid-cols-12 ">
                <div className="grid content-center justify-end col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                  <div className=" bg-gray-300 animate-pulse">
                    <div className="text-[16px] font-semibold text-gray-700 invisible">
                      xxxxxxxxx
                    </div>
                  </div>
                </div>
                <div className="grid justify-end content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                  <div className="grid grid-cols-12 ">
                    <div className="grid content-center justify-center col-span-12  ">
                      <Bin className="fill-[black] h-[auto] w-[20px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);
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
  //------------------------HTML------------------------------
  return (
    <>
      <div className="bg-[#F6F9FF]">
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
        <div className="mb-12 bg-white">
          <div className="mb-20 bg-[#F6F9FF]">
            <div className="grid grid-cols-12 ">
              <div className="grid col-span-12 ">
                <div className="grid grid-cols-12 ">
                  <div className="justify-center pb-[95px] col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center mt-3">
                    <div className={isLoading ? "" : "hidden"}>
                      <DataGrid
                        id="Skeleton_Grid"
                        dataSource={skeleton_ar}
                        columnAutoWidth={true}
                        showBorders={false}
                        rowAlternationEnabled={false}
                        hoverStateEnabled={true}
                        showColumnLines={false}
                      >
                        <Selection
                          mode="multiple"
                          showCheckBoxesMode={"always"}
                        />

                        <Column
                          width="100%"
                          caption={t("Order Summary")}
                          cellRender={SkeletonGrid_ColumnsRender}
                        />
                      </DataGrid>
                      <div className="grid grid-cols-12  px-5  py-4 ">
                        <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
                          <div className="text-xl text-white  animate-pulse rounded">
                            {t("Total")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={isLoading ? "hidden" : ""}>
                      <DataGrid
                        noDataText={t("No Data")}
                        id="Grid1"
                        dataSource={dataSource}
                        keyExpr="cart_id"
                        /* columnAutoWidth={false} */
                        showBorders={false}
                        rowAlternationEnabled={false}
                        hoverStateEnabled={true}
                        showColumnLines={false}
                        onSelectionChanged={Grid_onSelectionChanged}
                        showRowLines={true}
                        ref={GridRef}
                        onCellPrepared={Grid_onCellPrepared}
                        repaintChangesOnly={true}
                        remoteOperations={true}
                      >
                        {/* <Grouping allowCollapsing={false} /> */}
                        <Paging enabled={false} />
                        <Selection
                          mode="multiple"
                          showCheckBoxesMode="always"
                        />
                        <Column
                          width="100%"
                          caption={t("Order Summary")}
                          cellRender={Grid_ColumsRender}
                        />
                        {/* <Column
                          dataField="comp_name_th"
                          groupIndex={0}
                          caption="Service Provider"
                          width="0px"
                        /> */}
                        {/* <Grouping allowCollapsing={false} /> */}
                      </DataGrid>
                      {/* <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow  mb-[120px] border ">
                        <div className="grid grid-cols-12 px-3 pt-3 gap-6 ">
                          <div className="grid justify-end col-span-12 content-start ">
                            <span className="text-[13px] py-2 px-4 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#FF4A4A] text-white rounded-full">
                              {t("Discount ") + NumberFormat(discount)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-12 p-3  gap-6 ">
                          <div className="grid col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start text-xl">
                            {t("Total")}
                          </div>

                          <div className="grid justify-end col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start ">
                            <span className="text-end">
                              <span className="text-lg text-[#000000] opacity-40 mr-2">
                                THB
                              </span>
                              <span className="font-bold text-lg">
                                ฿{NumberFormat(totalnum - discount)}
                              </span>
                            </span>
                            <div className="text-gray-500 mt-1 text-[12px]">
                              {t("Prices are inclusive of 7% government tax.")}
                            </div>
                          </div>
                        </div>
                      </section>*/}
                      {/* <div className="grid grid-cols-12  px-5  py-4 bg-[#F6F9FF]">
                        <div className="grid col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start text-xl">
                          Total
                        </div>

                        <div className="grid justify-end col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start ">
                          <span className="text-end">
                            <span className="text-lg text-[#000000] opacity-40 mr-2">
                              THB
                            </span>
                            <span className="font-bold text-lg">
                              ฿{NumberFormat(totalnum)}
                            </span>
                          </span>
                          <div className="text-gray-500 mt-1 text-[12px]">
                            Prices are inclusive of 7% government tax.
                          </div>
                        </div>
                      </div> */}
                    </div>
                    {noti ? (
                      <label className="text-sm font-medium text-red-600  mb-3">
                        {t("Please, select your photo")}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow  mb-[57px] border ">
            <div className="grid grid-cols-12 p-3  gap-6 ">
              <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
                <button type="button" className="btn-save" onClick={Findphoto}>
                  {t("Find more photo")}
                </button>
              </div>
              <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
                <button type="button" className="btn-save" onClick={Checkout}>
                  {t("Checkout")}
                </button>
              </div>
            </div>
          </section>*/}
        </div>
      </div>
      <Toast
        animation={{
          show: { type: "fade", duration: 400, from: 0, to: 1 },
          hide: { type: "fade", duration: 1000, from: 1, to: 0 },
        }}
        position={{
          my: { x: "center", y: "top" },
          at: { x: "center", y: "top" },
          of: window,
          offset: "0 10",
        }}
        visible={ToastVisible}
        message={Toastmessage}
        type={ToastType.type}
        onHiding={onHiding}
        displayTime={600}
      />
      <PopupShowImg toggle={fntoggle} data={toggle} img_path={path} />
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
function Grid_unitselect(props) {
  const [SListItem, setSListItem] = useState([]);
  /* const SelectRef = useRef(null); */
  const navigate = useNavigate();
  //------------------------onload----------------------------
  useEffect(() => {
    const de = [];
    de.push(props.datas.data);
    setSListItem(de);
    /* SelectRef.current.instance.repaint(); */
  }, []);
  const onunitopen = (slist_id) => {
    GetdataAPI("/api/MainSale/SelectDataSaleListDetailsItem", {
      slist_id: slist_id,
    }).then((res) => {
      setSListItem(res.Data.item);
    });
  };
  const Select_onValueChanged = React.useCallback((e) => {
    props.onunitChanged(
      props.datas.data.cart_id,
      e.value,
      props.datas.data.qty,
      props.datas
    );
  }, []);
  const Select_onunitopen = React.useCallback((e) => {
    onunitopen(props.datas.data.slist_id);
  }, []);
  const del = (e) => {
    props.DeleteImg(props.datas.data.cart_id);
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="grid grid-cols-12 py-2 pr-2 bg-[#F6F9FF]">
        <div className="grid col-span-12">
          <div className="grid grid-cols-12">
            <div className="grid col-span-5 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-center ticket">
              <div className="text-2xl text-center text-white p-8">
                <div className="text-2xl">ส่วนลด</div>
                <div className="text-sm">{props.datas.data.slist_name}</div>
              </div>
            </div>
            <div className="grid col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
              <div className="grid grid-cols-12 ">
                <div className="grid content-center col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6  ">
                  <div className="text-[16px]">
                    {props.datas.data.slist_name}
                  </div>
                </div>

                <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                  <div className="text-[12px] opacity-50">
                    {props.datas.data.comp_name_th}
                  </div>
                  {/*  <SelectBox
                    dataSource={SListItem}
                    placeholder={"select"}
                    displayExpr="unitname"
                    valueExpr="item_id"
                    defaultValue={props.datas.data.item_id}
                    onValueChanged={Select_onValueChanged}
                    onOpened={Select_onunitopen}
                    className="border border-white rounded-md shadow-inner-lg shadow-md"
                    ref={SelectRef}
                  /> */}
                </div>
                <div className="grid content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                  <span className="text-xs mt-2">
                    <span className="text-[#000000] opacity-30">
                      {t("Size")} :{" "}
                    </span>
                    <span className="text-[#000000] opacity-30">
                      {props.datas.data.package_width}x
                      {props.datas.data.package_height}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid col-span-3 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 pl-3">
              <div className="grid grid-cols-12 ">
                <div className="grid content-center justify-end col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 mb-8 ">
                  <div className="text-[16px]  text-[#000000B2]">
                    ฿{NumberFormat(props.datas.data.price_total)}
                  </div>
                </div>
                <div className="grid justify-end content-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  ">
                  <div className="grid grid-cols-12 gap-1">
                    <div className="grid content-center justify-center col-span-6">
                      <i className="fas fa-qrcode" onClick={() => {
                        props.GetQR(props.datas.data.slist_name)
                      }} />
                    </div>
                    <div className="grid content-center justify-center col-span-6">
                      <Bin
                        className="fill-[black] h-[auto] w-[20px]"
                        onClick={del}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}