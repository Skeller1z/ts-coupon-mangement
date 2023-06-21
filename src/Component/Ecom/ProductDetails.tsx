import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Cart } from "../../image/SVG_Memorybox/Payment/Basket.svg";
import { GetdataAPI, GetdataAPI_Outside } from "../../MainCall/MainCall";
export default function ProductDetails() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const json = {
    id: "1",
    img: "https://sgp1.digitaloceanspaces.com/adaybulletin/2020/05/body_theguest_ploy_01.jpg",
    name: "พลอยไพรินทร์ ตั้งประภาพร",
    size: [
      {
        id: "1",
        text: "L",
      },
      {
        id: "2",
        text: "M",
      },
      {
        id: "3",
        text: "S",
      },
    ],
    detials:
      " พลอยไพลิน ตั้งประภาพร ชื่อเล่น พลอย เป็นนักแสดงหญิงอิสระชาวไทย เคยเป็นนักแสดงในสังกัด ช่อง 7 เอชดี วิกิพีเดียเกิด: 4 มีนาคม 2540 (อายุ 25 ปี), กรุงเทพมหานครชื่อเกิด: พลอยไพลิน ตั้งประภาพรปีที่แสดง: พ.ศ. 2546 – ปัจจุบัน",
  };
  let location: any = useLocation();
  let params = useParams();
  let img = location.state.imgid;
  const [btn, btnOption] = useState<string>("1");
  const navigate = useNavigate();
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    GetdataAPI_Outside("/api/MainSale/SelectDataSaleList", {
      SlistId: "2",
    }).then(async (res) => {
      console.log(res);
    });
    GetdataAPI("/api/MainSale/SelectDataSaleListDetailsItem", {
      SlistId: "2",
    }).then(async (res) => {
      console.log(res);
    });
  }, []);
  //------------------------------------------- funtion ------------------------------------------
  const AddCart = () => {
    navigate("../OrderSummery");
    GetdataAPI("/api/MainSale/AddItemToCart", {
      CompId: "1",
      ItemId: params.imgId,
      Qty: "1",
    }).then(async (res) => {
      console.log(res);
    });
  };
  const Pay = () => {
    navigate("../Pay");
  };
  //------------------------------------------- html ------------------------------------------
  return (
    <>
      <div className="grid grid-cols-12 bg-blue-100">
        <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
          <div className="grid grid-cols-12 gap-0 mb-2 rounded-sm">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center after:pt-[75%] after:block after:content-[''] relative">
              <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                <img
                  className=" object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                  src={img}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 mb-2 p-3 bg-white rounded-sm">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center bg-white">
              <div className="text-xl">{json.name}</div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 mb-2 p-3 bg-white rounded-sm">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center  bg-white mb-2">
              <div className="text-xl mb-2">ตัวเลือก</div>
              <div className="inline-flex mb-2" role="group">
                {json.size.map((item) => (
                  <button
                    type="button"
                    className={
                      btn === item.id
                        ? "rounded-full mr-1 px-2 border-2 border-blue-600 text-blue-600 text-sm font-medium "
                        : "rounded-full mr-1 px-2 border-2 border-gray text-gray text-sm font-medium  "
                    }
                    onClick={(e) => btnOption(item.id)}
                  >
                    <div className="text-base">{item.text}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12  content-center  ">
              <div className="grid grid-cols-12 gap-5">
                <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center">
                  <button className="btn-save py-2 px-3">
                    <div className="grid grid-cols-12 ">
                      <div className="grid  col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 content-center">
                        <Cart />
                      </div>
                      <div className="grid  col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-10 xl:col-span-10 content-center">
                        <div className="text-base" onClick={AddCart}>
                          เพิ่มในตะกร้า
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="grid col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-center">
                  <button className="btn-save py-2 px-3">
                    <div className="grid grid-cols-12 ">
                      <div className="grid  col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 content-center">
                        <i className="far fa-dollar-sign"></i>
                      </div>
                      <div className="grid  col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-10 xl:col-span-10 content-center">
                        <div className="text-base" onClick={Pay}>
                          ซื้อเลย
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-0 mb-2 p-3 bg-white rounded-sm">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-center">
              <div className="text-xl">รายละเอียด</div>
              <div className="text-base text-gray-600">{json.detials}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
