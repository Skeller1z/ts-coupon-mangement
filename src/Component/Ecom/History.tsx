import TabPanel, { Item } from "devextreme-react/tab-panel";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PendingPay from "./PendingPay";
import { GetdataAPI } from "../../MainCall/MainCall";
import { useRecoilState } from "recoil";
import { active } from "../../Recoil/MenuRecoil";
import Payment from "./Payment";
import { DataGrid, DateBox, SelectBox, TextBox } from "devextreme-react";
import { Column, Grouping, GroupPanel, MasterDetail, Pager, Paging, SearchPanel, Selection } from "devextreme-react/data-grid";
export default function History() {
  //------------------------ตัวแปร-----------------------------
  const [SOitem, setSOitem] = useState([]);
  const [SOheader, setSOheader] = useState([]);
  const [SOcount, setSOcount] = useState("");
  const [isSOLoading, setSOIsLoading] = useState(true);
  const [INVitem, setINVitem] = useState([]);
  const [INVcount, setINVcount] = useState(0);
  const [isINVLoading, setINVIsLoading] = useState(true);
  const { t } = useTranslation();
  const [menuactive, setmenuactive] = useRecoilState(active);
  const date = new Date();
  const History = [
    {
      price: 2500,
      discount: 500
    },
    {
      price: 1500,
      discount: 500
    },
    {
      price: 9500,
      discount: 500
    },
    {
      price: 800,
      discount: 500
    },
  ];
  const employees = [{
    ID: 1,
    no: 'FM-95 Mhz',
    date: '1964/03/16',
    type: 'ทั่วไป',
    user: 'Mr.Top',
    Position: 'CEO',
    note: '',
    date_new: '1995/01/15',
    approve: true,
    not_approve: false,
    details: 'California',
    dataexpend: [
      {
        date: '1964/03/16',
        doctype: 'บิลเงินสด',
        name: 'ทอปน้อยอุไรพร',
        type: 'Service',
        SN: 'GT-200',
        list: 'G0000-50',
        qty: '50.00',
        unit_price: '5.00',
        price: '5.00',
        details: 'ตำบลคิดไม่ออก',
      },
      {
        date: '1964/03/0',
        doctype: 'บิลเงินสด',
        name: 'ทอปน้อยอุไรพร',
        type: 'Service',
        SN: 'GT-200',
        list: 'G0000-50',
        qty: '50.00',
        unit_price: '5.00',
        price: '5.00',
        details: 'ตำบลคิดไม่ออก',
      }
    ]
  }, {
    ID: 2,
    no: 'FM-90 Mhz',
    date: '1964/03/16',
    type: 'ทั่วไป',
    user: 'Mr.Top',
    Position: 'CEO',
    note: '',
    date_new: '1995/01/15',
    approve: true,
    not_approve: false,
    details: 'California',
    dataexpend: [
      {
        date: '1964/03/16',
        doctype: 'บิลเงินสด',
        name: 'ทอปน้อยอุไรพร',
        type: 'Service',
        SN: 'GT-200',
        list: 'G0000-50',
        qty: '50.00',
        unit_price: '5.00',
        price: '5.00',
        details: 'ตำบลคิดไม่ออก',
      },
      {
        date: '1964/03/0',
        doctype: 'บิลเงินสด',
        name: 'ทอปน้อยอุไรพร',
        type: 'Service',
        SN: 'GT-200',
        list: 'G0000-50',
        qty: '50.00',
        unit_price: '5.00',
        price: '5.00',
        details: 'ตำบลคิดไม่ออก',
      }
    ]
  },];
  //------------------------fn------------------------------
  useEffect(() => {
    setmenuactive(3);
    GetSOdata();
    GetINVdata();
  }, []);
  //------------------------fn------------------------------
  const GetSOdata = () => {
    GetdataAPI("/api/MainSale/SelectOrderItemNotInv", { OrderId: "" }).then(
      (res) => {
        if (res.Status === "Success") {
          let header = [];
          const so = res.Data;
          so.forEach((item, index) => {
            const chk = header.filter((e) => {
              return e.order_id === item.order_id;
            });

            if (chk.length === 0) {
              const newdata = {
                order_id: item.order_id,
                order_no: item.order_no,
                grand_total: item.grand_total,
              };
              header.push(newdata);
            }
          });
          setSOheader(header);
          setSOitem(so);
          if (header.length === 0) {
            setSOcount("");
          } else {
            setSOcount(String(header.length));
          }
        }
        setSOIsLoading(false);
      }
    );
  };
  const GetINVdata = () => {
    GetdataAPI("/api/MemoryBox/SelectOrderInv", {}).then((res) => {
      if (res.Status === "Success") {
        setINVitem(res.Data);
        setINVcount(res.Data.length);
      }
      setINVIsLoading(false);
    });
  };
  //------------------------HTML------------------------------
  return (
    <>
      <div>
        <div className="grid grid-cols-12 gap-5 border">
          <div className="grid col-span-12">
            <div className="text-center text-3xl font-semibold">ประวัติการชำระ</div>
          </div>
          {History.map((item, index) => (
            <div className="grid col-span-12 bg-white border p-2" key={index}>
              <div
                key={index}
                className=""
                onClick={
                  (e) => {
                  }
                } >
                <div className="grid grid-cols-12">
                  <div className="grid col-span-6 content-start text-start">
                    <div className="text-lg">ค่าบริการห้องพัก</div>
                    <div className="text-lg text-red-500">ส่วนลดห้องพัก</div>
                  </div>
                  <div className="grid col-span-6 content-start text-end">
                    <div className="text-lg">
                      {item.price}
                    </div>
                    <div className="text-lg text-red-500">
                      -{item.discount}
                    </div>
                    <div className="text-lg mt-1 flex justify-end">
                      <div className="pr-14">รวมเป็นเงิน</div>
                      <div>{item.price - item.discount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
