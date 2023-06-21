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
import Arrow from "../../image/arrow.png";
import { DateBox, Popup } from "devextreme-react";
import { setRecoil } from "recoil-nexus";
import { countcart, FindIMG } from "../../Recoil/CartRecoil";
import { useRecoilState } from "recoil";
import { active } from "../../Recoil/MenuRecoil";
import liff from "@line/liff/dist/lib";
import Auth from "../../MainCall/Auth";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function Search(prop) {
    //------------------------------------------- ตัวแปร ------------------------------------------
    const [menuactive, setmenuactive] = useRecoilState(active);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string>();
    const hiddenFileInput = React.useRef(null);
    const trip = useRef(null);
    const province = useRef(null);
    const district = useRef(null);
    const subdistrict = useRef(null);
    const [Datas, setDatas] = useState([]);
    const [Datasprovince, setDatasprovince] = useState([]);
    const [Datasdistrict, setDatasdistrict] = useState([]);
    const [Datassubdistrict, setDatassubdistrict] = useState([]);
    const gridDataSource = new ArrayStore({
        data: Datas,
        key: "a1",
    });
    const gridDataSourceprovince = new ArrayStore({
        data: Datasprovince,
        key: "a1",
    });
    const gridDatasdistrict = new ArrayStore({
        data: Datasdistrict,
        key: "a1",
    });
    const gridDatassubdistrict = new ArrayStore({
        data: Datassubdistrict,
        key: "a1",
    });
    const date = useRef(null);
    const [isGridBoxOpened1, setisGridBoxOpened1] = useState<boolean>(false);
    const [isGridBoxOpened2, setisGridBoxOpened2] = useState<boolean>(false);
    const [isGridBoxOpeneddistrict, setisGridBoxOpeneddistrict] = useState<boolean>(false);
    const [isGridBoxOpenedsubdistrict, setisGridBoxOpenedsubdistrict] = useState<boolean>(false);
    const [gridBoxValueprovince, setgridBoxValueprovince] = useState(null);
    const [gridBoxValuedistrict, setgridBoxValuedistrict] = useState(null);
    const [gridBoxValuesubdistrict, setgridBoxValuesubdistrict] = useState(null);
    const [gridBoxValueboat, setgridBoxValueboat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dateStep, setdateStep] = useState(false);
    const [fleetStep, setfleetStep] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const enc = searchParams.get("province_name");
    const [numcount, setnumcount] = useRecoilState(countcart);
    const [dropdownSearch, setdropdownSearch] = useState(false);
    const [Popupsearch, setPopupsearch] = useState(false);
    const [textsearch, settextsearch] = useState("search...");
    const [dataprovince, setdataprovince] = useState("");
    const [datadistrict, setdatadistrict] = useState("");
    //------------------------------------------- onload ------------------------------------------
    useEffect(() => {
        if (liff.isInClient() === true) {
            liff.init({
                liffId: "1657564187-a6MoMPV5",
                withLoginOnExternalBrowser: true,
            });
        }

        setmenuactive(1);
        LoadData_province();
        if (enc !== null) {
            const province_name = enc.replaceAll(" ", "+");
            GetdataAPI_Outside("/api/Main/Selectprovinceany", {}).then(async (res) => {
                if (res.Status === "Success") {
                    const dataprovince = res.Data.filter((items) => {
                        return items.a2 === province_name;
                    });
                    setgridBoxValueprovince(dataprovince);
                }
            });
        }
        Auth.CurrentUser().then((res) => {
            if (res === "") {
                setnumcount(0);
            } else {
                GetdataAPI("/api/MainSale/SelectItemCart", {}).then((res) => {
                    if (res.Status === "Success") {
                        setnumcount(res.Data.length);
                    }
                });
            }
        });
        const handleTabClose = (event: any) => {
            event.preventDefault();
            return (event.returnValue = "Are you sure you want to exit?");
        };

        window.addEventListener("beforeunload", handleTabClose);
        return () => {
            window.removeEventListener("beforeunload", handleTabClose);
        };
    }, []);
    //------------------------------------------- funtion ------------------------------------------
    //จังหวัด
    const LoadData_province = async () => {
        GetdataAPI_Outside("/api/THLocation/GetdataProvince", {}).then(async (res) => {
            setDatasprovince(res.Data);
        });
    };
    const syncDataGridSelection_province = (e) => {
        setgridBoxValueprovince(e.value);
        setdataprovince(e.value[0].a1)
    };
    const dataGridOnSelectionChanged_province = (e) => {
        setgridBoxValueprovince(e.selectedRowKeys);
        setisGridBoxOpened2(false);
    };
    const gridBoxDisplayExpr_province = (item: any) => {
        return item && `${item.a3}`;
    };
    const onGridBoxOpened_province = (e) => {
        if (e.name === "opened") {
            setisGridBoxOpened2(e.value);
            LoadData_province();
        }
    };
    const dataGridRender_province = () => {
        return (
            <DataGrid
                //onCellClick={(e)=> Setaddressno(false)}
                dataSource={Datasprovince}
                rowAlternationEnabled={true}
                showColumnLines={false}
                showColumnHeaders={false}
                columns={[{ dataField: "a3", caption: "เลือกบริษัท" }]}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValueprovince}
                onSelectionChanged={dataGridOnSelectionChanged_province}
                height="100%"
            >
                <Selection mode="single" />
                <Scrolling mode="virtual" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
            </DataGrid>
        );
    };
    //อำเภอ
    const LoadData_district = async () => {
        GetdataAPI_Outside("/api/THLocation/GetdataDistrict", {
            province_id: dataprovince
        }).then(async (res) => {
            setDatasdistrict(res.Data);
        });
    };
    const syncDataGridSelection_district = (e) => {
        setgridBoxValuedistrict(e.value);
        setdatadistrict(e.value[0].a1)
    };
    const dataGridOnSelectionChanged_district = (e) => {
        setgridBoxValuedistrict(e.selectedRowKeys);
        setisGridBoxOpeneddistrict(false);
    };
    const gridBoxDisplayExpr_district = (item: any) => {
        return item && `${item.a3}`;
    };
    const onGridBoxOpened_district = (e) => {
        if (e.name === "opened") {
            setisGridBoxOpeneddistrict(e.value);
            LoadData_district();
        }
    };
    const dataGridRender_district = () => {
        return (
            <DataGrid
                //onCellClick={(e)=> Setaddressno(false)}
                dataSource={Datasdistrict}
                rowAlternationEnabled={true}
                showColumnLines={false}
                showColumnHeaders={false}
                columns={[{ dataField: "a3", caption: "เลือกบริษัท" }]}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValuedistrict}
                onSelectionChanged={dataGridOnSelectionChanged_district}
                height="100%"
            >
                <Selection mode="single" />
                <Scrolling mode="virtual" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
            </DataGrid>
        );
    };
    //ตำบล
    const LoadData_subdistrict = async () => {
        GetdataAPI_Outside("/api/THLocation/GetdataSubDistrict", {
            district_id: datadistrict,
            province_id: dataprovince
        }).then(async (res) => {
            setDatassubdistrict(res.Data);
        });
    };
    const syncDataGridSelection_subdistrict = (e) => {
        setgridBoxValuesubdistrict(e.value);
        setgridBoxValueboat(null);
    };
    const dataGridOnSelectionChanged_subdistrict = (e) => {
        setgridBoxValuesubdistrict(e.selectedRowKeys);
        setisGridBoxOpenedsubdistrict(false);
    };
    const gridBoxDisplayExpr_subdistrict = (item: any) => {
        return item && `${item.a3}`;
    };
    const onGridBoxOpened_subdistrict = (e) => {
        if (e.name === "opened") {
            setisGridBoxOpenedsubdistrict(e.value);
            LoadData_subdistrict();
        }
    };
    const dataGridRender_subdistrict = () => {
        return (
            <DataGrid
                //onCellClick={(e)=> Setaddressno(false)}
                dataSource={Datassubdistrict}
                rowAlternationEnabled={true}
                showColumnLines={false}
                showColumnHeaders={false}
                columns={[{ dataField: "a3", caption: "เลือกบริษัท" }]}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValuesubdistrict}
                onSelectionChanged={dataGridOnSelectionChanged_subdistrict}
                height="100%"
            >
                <Selection mode="single" />
                <Scrolling mode="virtual" />
                <Paging enabled={true} pageSize={10} />
                <FilterRow visible={true} />
            </DataGrid>
        );
    };
    const Find = (e) => {
        prop.value(province.current.instance.option("text") + ">" + district.current.instance.option("text") + ">" + subdistrict.current.instance.option("text"))
        //settextsearch(province.current.instance.option("text"))
        {/*const cartID = trip.current.instance
            .option("value")
            .map((e) => e.a1)
        .join("");*/}
        setRecoil(FindIMG, { cate: 3044, img: "" });
        navigate({
            pathname: "/FindIMG",
            search: createSearchParams({
                cate: "3044",
            }).toString(),
        });
        prop.sh(false)
    };
    const send = (e) => {
        const send = {
            province: province.current.instance
                .option("value")
                .map((e) => e.a1)
                .join(""),
            date: date.current.instance.option("value"),
        };
        GetdataAPI_Outside("/api/MainSale/SelectProductCategory", {
            province: province.current.instance
                .option("value")
                .map((e) => e.a1)
                .join(""),
            date: date.current.instance.option("value"),
        }).then(async (res) => { });
    };
    const upload = (e) => {
        const file = e.target.files[0];
        resizeImg(file, 1024).then((res) => {
            setPreview(res);
        });
        /* if (file && file.type.substr(0, 5) === "image") {
          setImage(file);
        } else {
          setImage(null);
        } */
    };
    //------------------------------------------- html ------------------------------------------
    return (
        <>
            <div className="grid grid-cols-12">
                <div className=" grid col-span-12 bg-white mx-2 rounded-lg">
                    <div className="grid grid-cols-12">
                        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 pt-5">
                            <div className="grid grid-cols-12">
                                <div className=" grid col-span-12">
                                    <DropDownBox
                                        className={
                                            gridBoxValueprovince !== null ? "bg-[#1572F5] text-white" : ""
                                        }
                                        ref={province}
                                        value={gridBoxValueprovince}
                                        opened={isGridBoxOpened2}
                                        valueExpr=""
                                        deferRendering={false}
                                        displayExpr={gridBoxDisplayExpr_province}
                                        placeholder={t("จังหวัด")}
                                        showClearButton={false}
                                        dataSource={gridDataSourceprovince}
                                        onValueChanged={syncDataGridSelection_province}
                                        onOptionChanged={onGridBoxOpened_province}
                                        contentRender={dataGridRender_province}
                                        showDropDownButton={false}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 pt-5">
                            <div className="grid grid-cols-12">
                                <div className=" grid col-span-12">
                                    <>
                                        <DropDownBox
                                            className={
                                                gridBoxValuedistrict !== null ? "bg-[#1572F5] text-white" : ""
                                            }
                                            disabled={dataprovince == "" ? true : false}
                                            ref={district}
                                            value={gridBoxValuedistrict}
                                            opened={isGridBoxOpeneddistrict}
                                            valueExpr=""
                                            deferRendering={false}
                                            displayExpr={gridBoxDisplayExpr_district}
                                            placeholder={t("อำเภอ")}
                                            showClearButton={false}
                                            dataSource={gridDatasdistrict}
                                            onValueChanged={syncDataGridSelection_district}
                                            onOptionChanged={onGridBoxOpened_district}
                                            contentRender={dataGridRender_district}
                                            dropDownOptions={{
                                                fullScreen: false,
                                                showCloseButton: true,
                                            }}
                                            showDropDownButton={false}
                                        />
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 pt-5">
                            <div className="grid grid-cols-12">
                                <div className=" grid col-span-12">
                                    <>
                                        <DropDownBox
                                            className={
                                                gridBoxValuesubdistrict !== null ? "bg-[#1572F5] text-white" : ""
                                            }
                                            disabled={dataprovince == "" || datadistrict == "" ? true : false}
                                            ref={subdistrict}
                                            value={gridBoxValuesubdistrict}
                                            opened={isGridBoxOpenedsubdistrict}
                                            valueExpr=""
                                            deferRendering={false}
                                            displayExpr={gridBoxDisplayExpr_subdistrict}
                                            placeholder={t("ตำบล")}
                                            showClearButton={false}
                                            dataSource={gridDatassubdistrict}
                                            onValueChanged={syncDataGridSelection_subdistrict}
                                            onOptionChanged={onGridBoxOpened_subdistrict}
                                            contentRender={dataGridRender_subdistrict}
                                            dropDownOptions={{
                                                fullScreen: false,
                                                showCloseButton: true,
                                            }}
                                            showDropDownButton={false}
                                        />
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className=" grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 pb-5 h-20">
                            <div className="grid grid-cols-12">
                                <div className=" grid col-span-12 content-end">
                                    <div className="w-full">
                                        {gridBoxValuesubdistrict !== null ? (
                                            <>
                                                <div className="relative">
                                                    <button
                                                        className="btn-save text-white text-center w-full"
                                                        ref={hiddenFileInput}
                                                        onClick={(e) => {
                                                            Find(e);
                                                        }}
                                                    >
                                                        {t("ค้นหาโรงแรม")}
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="relative">
                                                    <button
                                                        className="btn-save bg-white text-gray-400 text-center pl-3  cursor-not-allowed w-full border"
                                                        ref={hiddenFileInput}
                                                    >
                                                        {t("ค้นหาโรงแรม")}
                                                    </button>
                                                </div>
                                            </>
                                        )}
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
