import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ReactComponent as Basket_Blue } from "../../../image/SVG_Memorybox/Find Photo/Add_Basket_White.svg";
import { GetdataAPI } from "../../../MainCall/MainCall";
import PopupImg from "../../Ecom/PopupImg";
import { useRecoilState } from "recoil";
import { countcart } from "../../../Recoil/CartRecoil";

export default function Feed(props) {
  const { fetchMoreData, img, cate, more, Datas, toggle, fntoggle } = props;
  //--------------ตัวแปร-------------------------------
  const navigate = useNavigate();

  const { v4: uuidv4 } = require("uuid");
  const Gallery_Ref = useRef(null);

  interface ToasttypeFace {
    type?: "custom" | "error" | "info" | "success" | "warning";
  }
  const [ToastVisible, setToastVisible] = useState(false);
  const [ToastType, setToastType] = useState<ToasttypeFace>({
    type: "info",
  });
  const [Toastmessage, setToastmessage] = useState("");
  const [numcount, setnumcount] = useRecoilState(countcart);
  //---------------------onload-----------------------

  //--------------------------function-----------------------------

  const openimg = (rowid) => {
    const selectedItem = Datas.filter((id) => id.Rownumber === rowid);

    Gallery_Ref.current.instance.goToItem(selectedItem);
    fntoggle();
  };
  const AddCart = (slist_id) => {
    GetdataAPI("/api/MemoryBox/AddItemToCart", {
      CompId: "1",
      slist_id: slist_id,
      ItemId: 0,
      Qty: "1",
    }).then(async (res) => {
      if (res.Status === "Success") {
        setnumcount(res.Data.length);
        setToastVisible(true);
        setToastType({ type: "success" });
        setToastmessage("เพิ่มสำเร็จ");
      }
    });
  };
  const COUNTER = 8;
  const skeleton = [];
  for (let i = 0; i < COUNTER; i++) {
    skeleton.push(
      <>
        <div
          key={uuidv4()}
          className="grid col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 content-center after:pt-[75%] after:block after:content-[''] relative postSk"
        >
          <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
            <div className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit] bg-gray-300 animate-pulse"></div>
            <div className="absolute  top-0 right-0 left-0 bottom-0 flex justify-end  items-end pb-1">
              <div className="rounded-full mr-1 p-0 ">
                <div className="w-5 h-5 bg-white animate-pulse rounded-full">
                  {" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  //--------------------------html-----------------------------
  return (
    <>
      <div className="">
        <InfiniteScroll
          key={uuidv4()}
          className="grid grid-cols-12 gap-3 border border-solid px-5 pb-0 pt-5  bg-white"
          dataLength={Datas.length}
          next={fetchMoreData}
          hasMore={more}
          loader={skeleton}
          endMessage={""}
        >
          {Datas.map((item) => (
            <div
              key={uuidv4()}
              className="grid col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 content-center after:pt-[75%] after:block after:content-[''] relative"
              onClick={() => {
                openimg(item.Rownumber);
              }}
            >
              <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
                <img
                  alt=""
                  className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                  src={item.img_path}
                />
              </div>
              <div className="absolute  top-0 right-0 left-0 bottom-0 flex justify-end  items-end pb-1">
                <button
                  type="button"
                  onClick={() => {
                    AddCart(item.slist_id);
                  }}
                  className="rounded-full mr-1 p-0  text-sm font-medium  bg-blue-500 hover:bg-blue-500 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                >
                  <div className="">
                    {" "}
                    <Basket_Blue className="w-5 h-5 text-red-500" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <PopupImg
        ref={Gallery_Ref}
        data={Datas}
        toggle={toggle}
        fntoggle={fntoggle}
        fetchMoreData={fetchMoreData}
        more={more}
      />
    </>
  );
}
