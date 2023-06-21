import React, { useState } from "react";
import img1 from "../../image/image 37.png";
import img2 from "../../image/image 36.png";
import img3 from "../../image/image 35.png";
import img4 from "../../image/image 39.png";
import img5 from "../../image/image 40.png";
import Logo2 from "../../image/BTRAVEL2.png";
export default function Footer(props) {
    //------------------------------------------- ตัวแปร ------------------------------------------
    //------------------------------------------- onload ------------------------------------------
    //------------------------------------------- funtion ------------------------------------------

    //------------------------------------------- html ------------------------------------------
    return (
        <>
            <footer className="grid grid-cols-12 bg-gray-700 py-5 lg:px-60 xl:px-80 
           ">
                <div className="grid col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 justify-center">
                    <img src={Logo2} className="w-36 h-[auto] mb-2" />
                    <div className="text-white text-lg mb-2">ผู้ให้บริการชำระเงิน</div>
                    <div className="flex">
                        <img src={img1} className="w-14 h-[auto] mr-2 mb-2" />
                        <img src={img2} className="w-14 h-[auto] mr-2 mb-2" />
                        <img src={img3} className="w-14 h-[auto] mr-2 mb-2" />
                    </div>
                </div>
                <div className="grid col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 justify-center">
                    <div className="text-white text-lg mt-3 cursor-pointer hover:text-blue-600">เกี่ยวกับ B TRAVEL</div>
                    <div className="text-white text-sm cursor-pointer hover:text-blue-600">ติดต่อเรา</div>
                    <div className="text-white text-sm cursor-pointer hover:text-blue-600">ศูนย์ช่วยเหลือ</div>
                    <div className="text-white text-sm cursor-pointer hover:text-sky-600">เกี่ยวกับเรา</div>
                </div>
                <div className="grid col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 justify-center">
                    <div className="text-white text-lg mt-3 cursor-pointer hover:text-blue-600">ติดตามโปรโมชั่น</div>
                    <div className="text-white text-sm cursor-pointer hover:text-blue-600">Facebook</div>
                    <div className="text-white text-sm cursor-pointer hover:text-lime-700">Line</div>
                </div>
                <div className="grid col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-3 xl:col-span-3 justify-center">
                    <div className="text-white text-lg mt-3 mb-2">ดาวน์โหลดแอป</div>
                    <img src={img4} className="cursor-pointer w-24 h-[auto] mb-2" />
                    <img src={img5} className="cursor-pointer w-24 h-[auto]" />
                </div>
                <div className="grid col-span-12">
                    <div className="text-white text-lg mt-5 text-center">Copyright © 2023 - B TRAVEL</div>
                </div>
            </footer>

        </>
    );
}
