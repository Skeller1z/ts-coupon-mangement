import React, { useRef, useEffect } from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { useLocation } from "react-router-dom";
import "../../App.css";
import "../../css/Custom.css";
import My_profile from "../../image/SVG_Memorybox/Account/My_profile_Black.svg";
import My_review from "../../image/SVG_Memorybox/Account/My_order_black.svg";
import MyProfile from "./MyProfile";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { active } from "../../Recoil/MenuRecoil";
import Profile from "./Profile";
export default function Account() {
  //------------------------------------------- ตัวแปร ------------------------------------------
  const { t, i18n } = useTranslation();
  interface LocationState {
    rate_id: number;
    num: number;
  }
  const tab = useRef(null);
  const location = useLocation();
  const stateany: any = location.state;
  const StateInterface: LocationState = stateany;
  const [menuactive, setmenuactive] = useRecoilState(active);
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {
    setmenuactive(4);
  }, []);
  useEffect(() => {
    tab.current.instance.option("selectedIndex", StateInterface.num);
  }, [StateInterface]);
  //------------------------------------------- funtion ------------------------------------------

  //------------------------------------------- html ------------------------------------------
  return (
    <div className="grid grid-cols-12 bg-blue-100">
      <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
        <div className="grid grid-cols-12 gap-0 bg-white">
          <div className="grid col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
            <TabPanel
              className=" bg-white"
              height={"100%"}
              ref={tab}
              focusStateEnabled={false}
              deferRendering={false}
              swipeEnabled={false}
            >
              <Item title="MY PROFILE" icon={My_profile}>
                <Profile />
              </Item>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
