import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../MainCall/Auth";
import { ReactComponent as Symbol } from "../../image/SVG_Memorybox/Home instruction/Symbol_White.svg";
import { ReactComponent as Loveandman } from "../../image/SVG_Memorybox/Home instruction/Loveandaman.svg";
import Ads from "../MainPage/Ads";
import PopupPDPA from "./PopupPDPA";
import Banner from "../../image/Banner Pricing.png";
import QRcode from "../../image/QR code.jpg";
import Kplus from "../../image/K +.jpg";
import Visa from "../../image/Visa.jpg";
import Master from "../../image/Master.jpg";
import Truemoney from "../../image/True money.jpg";
import Rabbit from "../../image/Rabbit.jpg";
import Prompt from "../../image/Prompt.jpg";
import Wechat from "../../image/Wechat.jpg";
import { useTranslation } from "react-i18next";

export default function Introduce() {
  //------------------------ตัวแปร-----------------------------
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  //------------------------onload----------------------------
  //------------------------function--------------------------
  const handleClick = () => {
    navigate("/UploadIMG");
  };
  //------------------------HTML------------------------------
  return (
    <div>
      <Ads />
      <div className="grid grid-cols-12 ">
        <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
          <div className="px-4 bg-[#F6F9FF] mt-2">
            <div className="grid grid-cols-12 mt-5 mb-5">
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-5">
                <img src={Banner}></img>
              </div>
              <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
                <button
                  type="button"
                  onClick={handleClick}
                  className=" bg-[#0D6AFA] py-3 rounded hover:bg-blue-800 active:bg-blue-900"
                >
                  <div className="grid grid-cols-12 ">
                    <div className="grid content-center justify-center col-span-12  ">
                      <span className="inline-flex ">
                        <Symbol />
                        <div className="grid content-center pl-8 text-white text-[18px]">
                          {t("Start scan your memory")}
                        </div>
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-12 mb-7">
              <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start">
                <div className="text-[#000000] opacity-60 text-center text-[11px]">
                  {" "}
                  *เนื่องด้วยนโยบายความเป็นส่วนตัว
                  ระบบจะแสดงภาพพรีวิวหลังผลการค้นหา
                </div>
                <div className="text-[#000000] opacity-60 text-center text-[11px] px-10">
                  {" "}
                  *Due to the privacy & policy, a preview image will be
                  displayed after the search results.
                </div>
              </div>
            </div>

            <div className="bg-white py-6">
              <div className="px-8">
                <div className="grid grid-cols-12 mb-5">
                  <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-[19px] ">
                    <div className="font-extrabold">{t("Pricing")}</div>
                  </div>
                </div>

                <div className="px-2">
                  <div className="grid grid-cols-12 mb-2">
                    {/* ----------------------- Header -----------------------------*/}
                    <div className="grid  col-span-4 content-center text-center mb-3">
                      <span className="text-[#838383] text-[12px]">
                        {t("Amount")}
                      </span>
                    </div>
                    <div className="grid  col-span-4 content-center text-center mb-3">
                      <span className="text-[#838383] text-[12px]">
                        {t("Price")}
                      </span>
                    </div>
                    <div className="grid  col-span-4 content-center text-center mb-3">
                      <span className="text-[#838383] text-[12px]">
                        {t("You save")}
                      </span>
                    </div>
                    {/* ----------------------------------------------------------*/}
                    <div className="grid col-span-4 mb-6">
                      <div className="text-center pl-1">
                        <div className="flex items-center ">
                          <div className="items-center rounded-full bg-[#393939]  drop-shadow-md rounded-full h-[29px] w-[29px]">
                            <span className="text-white text-[19px] text-center">
                              1
                            </span>
                          </div>
                          <span className="text-[#838383] text-[10px] px-2">
                            {t("Photo")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#1572F5]  drop-shadow-md rounded-full h-[34px] w-[77px]">
                            <span className="text-white text-[16px]">฿100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center "></div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="text-center pl-1">
                        <div className="flex items-center ">
                          <div className="items-center rounded-full bg-[#393939]  drop-shadow-md rounded-full h-[29px] w-[29px]">
                            <span className="text-white text-[19px]">3</span>
                          </div>
                          <span className="text-[#838383] text-[10px] px-2">
                            {t("Photos")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#1572F5]  drop-shadow-md rounded-full h-[34px] w-[77px]">
                            <span className="text-white text-[16px]">฿270</span>
                            <div className="absolute flex justify-center items-center top-[-18px] right-[-18px] text-[8px] py-1 px-1 text-center bg-[#FF4A4A] text-white rounded-full h-[33.18px] w-[39.5px]">
                              <p className="text-[16px]">10%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#FFF5E2] drop-shadow-md rounded-full h-[34px] w-[54px]">
                            <span className="text-[#393939] text-[14px]">
                              -฿30
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="text-center pl-1">
                        <div className="flex items-center ">
                          <div className="items-center rounded-full bg-[#393939]  drop-shadow-md rounded-full h-[29px] w-[29px]">
                            <span className="text-white text-[19px]">5</span>
                          </div>
                          <span className="text-[#838383] text-[10px] px-2">
                            {t("Photos")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#1572F5]  drop-shadow-md rounded-full h-[34px] w-[77px]">
                            <span className="text-white text-[16px]">฿400</span>
                            <div className="absolute flex justify-center items-center top-[-18px] right-[-18px] text-[8px] py-1 px-1 text-center bg-[#FF4A4A] text-white rounded-full h-[33.18px] w-[39.5px]">
                              <p className="text-[16px]">20%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#FFF5E2]  drop-shadow-md rounded-full h-[34px] w-[54px]">
                            <span className="text-[#393939] text-[14px]">
                              -฿100
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="text-center pl-1">
                        <div className="flex items-center ">
                          <div className="items-center rounded-full bg-[#393939]  drop-shadow-md rounded-full h-[29px] w-[29px]">
                            <span className="text-white text-[19px]">7</span>
                          </div>
                          <span className="text-[#838383] text-[10px] px-2">
                            {t("Photos")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#1572F5]  drop-shadow-md rounded-full h-[34px] w-[77px]">
                            <span className="text-white text-[16px]">฿490</span>
                            <div className="absolute flex justify-center items-center top-[-18px] right-[-18px] text-[8px] py-1 px-1 text-center bg-[#FF4A4A] text-white rounded-full h-[33.18px] w-[39.5px]">
                              <p className="text-[16px]">30%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#FFF5E2]  drop-shadow-md rounded-full h-[34px] w-[54px]">
                            <span className="text-[#393939] text-[14px]">
                              -฿210
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="text-center pl-1">
                        <div className="flex items-center ">
                          <div className="items-center rounded-full bg-[#393939]  drop-shadow-md rounded-full h-[29px] w-[29px]">
                            <span className="text-white text-[19px]">9</span>
                          </div>
                          <span className="text-[#838383] text-[10px] px-2">
                            {t("Photos")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#1572F5]  drop-shadow-md rounded-full h-[34px] w-[77px]">
                            <span className="text-white text-[14px]">฿540</span>
                            <div className="absolute flex justify-center items-center top-[-18px] right-[-18px] text-[8px] py-1 px-1 text-center bg-[#FF4A4A] text-white rounded-full h-[33.18px] w-[39.5px]">
                              <p className="text-[16px]">40%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#FFF5E2]  drop-shadow-md rounded-full h-[34px] w-[54px]">
                            <span className="text-[#393939] text-[14px]">
                              -฿360
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="text-center pl-1">
                        <div className="flex items-center ">
                          <div className="items-center rounded-full bg-[#393939]  drop-shadow-md rounded-full h-[29px] w-[29px]">
                            <span className="text-white text-[19px]">11</span>
                          </div>
                          <span className="text-[#838383] text-[10px] px-2">
                            {t("Photos")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#1572F5]  drop-shadow-md rounded-full h-[34px] w-[77px]">
                            <span className="text-white text-[16px]">฿550</span>
                            <div className="absolute flex justify-center items-center top-[-18px] right-[-18px] text-[8px] py-1 px-1 text-center bg-[#FF4A4A] text-white rounded-full h-[33.18px] w-[39.5px]">
                              <p className="text-[16px]">50%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-4 mb-6">
                      <div className="flex text-center justify-center pl-1">
                        <div className="flex items-center ">
                          <div className="flex justify-center items-center rounded-full bg-[#FFF5E2]  drop-shadow-md rounded-full h-[34px] w-[54px]">
                            <span className="text-[#393939] text-[14px]">
                              -฿550
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 text-center">
                <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-[14px] text-[#000000] opacity-60">
                  {t(
                    "*Your photo will be deleted from the system within 7 days."
                  )}
                  <br />
                  {t("To recovery your photo.")}
                </div>
                <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-[14px] text-[#2679FA] opacity-60">
                  <a className="text-center" href="hello@memorybox.store">
                    {t("more information")}
                  </a>
                </div>
              </div>
              <section className="mt-5">
                <div className="grid grid-cols-12 gap-3 mt-2 mb-2">
                  <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-4 font-bold text-[#000000] opacity-60">
                    {t("Trusted by the most famous tourism company")}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3 mb-5 px-4">
                  <div className="grid col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start ">
                    <Loveandman className="inline h-[auto] w-[100px] " />
                  </div>
                </div>
              </section>
              <section className="mt-4 mb-8 px-4">
                <div className=" grid grid-cols-12 gap-3 mt-2 mb-2">
                  <div className="text-base grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-2">
                    {t("Payment methods")}
                  </div>
                </div>
                <img src={QRcode} className="imgPay mb-6" />
                <img src={Kplus} className="imgPay mb-6" />
                <img src={Visa} className="imgPay mb-6" />
                <img src={Master} className="imgPay mb-6" />
                <img src={Truemoney} className="imgPay mb-6" />
                <img src={Rabbit} className="imgPay mb-6" />
                <img src={Prompt} className="imgPay mb-6" />
                <img src={Wechat} className="imgPay mb-6" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
