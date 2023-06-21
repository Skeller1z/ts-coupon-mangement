import React, { useEffect, useRef, useState } from "react";
import "../../css/Custom.css";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { DateBox } from "devextreme-react";
import { setRecoil } from "recoil-nexus";
import { countcart, FindIMG } from "../../Recoil/CartRecoil";
import { useRecoilState } from "recoil";
import { active } from "../../Recoil/MenuRecoil";
import liff from "@line/liff/dist/lib";
import Auth from "../../MainCall/Auth";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
/* import VConsole from "vconsole";
const vConsole = new VConsole(); */
export default function UploadIMG() {
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
  const date = useRef(null);
  const [isGridBoxOpened1, setisGridBoxOpened1] = useState<boolean>(false);
  const [isGridBoxOpened2, setisGridBoxOpened2] = useState<boolean>(false);
  const [gridBoxValuecomp, setgridBoxValuecomp] = useState(null);
  const [gridBoxValueboat, setgridBoxValueboat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateStep, setdateStep] = useState(false);
  const [fleetStep, setfleetStep] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const enc = searchParams.get("comp_name");
  const [numcount, setnumcount] = useRecoilState(countcart);
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
  const coupon = {
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
      }
    ],
    data2: [
      {
        id: 1,
        img: "https://blog.lnw.co.th/wp-content/uploads/2017/08/Coupon.jpg",
        text: "คูปอง 1"
      },
      {
        id: 2,
        img: "https://www.smile-siam.com/wp-content/uploads/2020/12/coupon-cover.jpg",
        text: "คูปอง 2"
      },
      {
        id: 3,
        img: "https://media.amway.id/sys-master/images/h15/h21/9100409962526/ath-foa-privilege-img01a-may2021.jpg",
        text: "คูปอง 3"
      },
      {
        id: 4,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCywPYDZV2cqQX_-d0XwZNmNqU7i95OIh9SZyWL30LELe1UOAwoiTTli6XWol7wyxnCHY&usqp=CAU",
        text: "คูปอง 4"
      }
      , {
        id: 5,
        img: "https://media.amway.id/sys-master/images/hab/hdf/9100410224670/ath-foa-privilege-img02a-may2021.jpg",
        text: "คูปอง 5"
      }
    ]
  };
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    if (liff.isInClient() === true) {
      liff.init({
        liffId: "1657564187-a6MoMPV5",
        withLoginOnExternalBrowser: true,
      });
    }
    setmenuactive(1);
    if (enc !== null) {
      const comp_name = enc.replaceAll(" ", "+");
      GetdataAPI_Outside("/api/Main/SelectCompany", {}).then(async (res) => {
        if (res.Status === "Success") {
          const datacomp = res.Data.filter((items) => {
            return items.a2 === comp_name;
          });
          setgridBoxValuecomp(datacomp);
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

  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
      <div className="grid grid-cols-12 pb-10 ">
        <div className="grid justify-center col-span-12 sm: md:col-span-12 lg:col-span-12 xl:col-span-12 content-start h-80 bg-cover bg-sea">
          <div className="mb-5 mt-10 mx-5">
            <img src={Logo2} className=" h-[auto] w-96 center" />
            <div className="text-center mt-5 text-white text-3xl font-semibold px-60">
              {t("ค้นหาคูปองโรงแรม รีสอร์ต โฮสเทล และอีกมากมายจองที่พักราคาพิเศษกว่า 2 ล้านแห่งทั่วโลกกับ B Travel")}
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 mt-2 text-center bg-white rounded-md border mx-2">
          <div className="text-center mt-5 text-[#000000B2] text-md font-semibold mb-3">
            คูปองยอดนิยม
          </div>
          <div className="">
            <Carousel
              responsive={responsive}
              showDots={true}
              arrows={false}
              focusOnSelect={true}
              autoPlay={true}
              renderDotsOutside
            >
              {coupon.data2.map((item, i) => (
                <div className="grid mx-1 h-full" key={i} onClick={() => {
                  if (item.id) {
                    alert(item.id)
                  }
                }}>
                  <img src={item.img} className="rounded-md" />
                  <div>{item.text}</div>
                  <div className="text-left px-1">ใช้คูปองแล้ว : 99 ครั้ง</div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 px-5 mt-5 text-center bg-white rounded-md border mx-2  ">
          <div className="text-center mt-5 text-[#000000B2] text-md font-semibold mb-3">
            โปรโมชั่นสำหรับที่พัก
          </div>
          <div className="">
            <Carousel
              responsive={responsive}
              showDots={true}
              arrows={false}
              focusOnSelect={true}
              autoPlay={true}
              renderDotsOutside
            >
              {coupon.data.map((item, i) => (
                <div className="mx-1 h-full bg-white border rounded-md" key={i}
                  onClick={() => {
                    if (item.id) {
                      alert(item.id)
                    }
                  }}>
                  <img src={item.img} className="rounded-t-md" />
                  <div>{item.text}</div>
                  <div className="text-left px-1">สถานที่ : ไม่มี</div>
                  <div className="text-left px-1">รายละเอียด : ไม่มี</div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
