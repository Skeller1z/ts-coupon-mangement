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
import Filter from "../../image/กรอง.png";
export default function Coupon(prop) {
    //------------------------ตัวแปร-----------------------------s
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [toggleQR, settoggleQR] = useState(false);
    const [dropdownfilter, setdropdownfilter] = useState(false);
    const [mycoupon, setmycoupon] = useState([]);
    const [url, setUrl] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    //------------------------onload----------------------------
    useEffect(() => {
    }, []);
    //------------------------function--------------------------
    //------------------------HTML------------------------------
    return (
        <>
            <div className="ml-4">
                <div className="grid grid-cols-12 border-t-2 border-b-2 border-r-2 border-[#dd3f3e]">
                    <div className="grid col-span-4 content-center ticket">
                        {prop.head}
                    </div>
                    <div className="grid col-span-8 pl-5 py-1 text-black">
                        {prop.content}
                    </div>
                </div>
            </div>
        </>
    );
}

