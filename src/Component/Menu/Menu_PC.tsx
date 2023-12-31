import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import List from "devextreme-react/list.js";
import { ReactComponent as UpimgIcon } from "../../image/SVG_Memorybox/Home instruction/Symbol.svg";
import Auth from "../../MainCall/Auth";

export default function Menu_PC(prop) {
  //------------------------------------ตัวแปร---------------------------------------------
  const navigate = useNavigate();
  const navigation = [
    { id: 1, text: "Home" },
    { id: 2, text: "Price" },
    { id: 3, text: "My order" },
    { id: 4, text: "My Profile" },
  ];
  const { pageshow } = prop;
  const [opened, setopened] = useState<boolean>(true);
  //------------------------------------onload---------------------------------------------
  //------------------------------------function---------------------------------------------

  const iconClick = () => {
    setopened(!opened);
  };
  const menucilck = (e) => {
    if (e.itemData.id === 1) {
      navigate("../");
    } else if (e.itemData.id === 2) {
      navigate("../Price");
    } else if (e.itemData.id === 3) {
      navigate("../MyProfile", {
        state: {
          num: 1,
        },
      });
    } else if (e.itemData.id === 4) {
      navigate("../MyProfile", {
        state: {
          num: 0,
        },
      });
    }
  };
  const LogOut = () => {
    Auth.LogOut();
  };
  const MenuItem = () => {
    return (
      <button type="button" className="">
        <UpimgIcon className="inline h-[auto] w-[30px] " onClick={iconClick} />
      </button>
    );
  };
  const AboutItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8">About</div>
      </button>
    );
  };
  const TechItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("../OrderSummery")}>
          Cart
        </div>
      </button>
    );
  };
  const PriceItem = () => {
    return (
      <button type="button" className="hover:bg-slate-100">
        <div className="px-8" onClick={() => navigate("../Price")}>
          Price
        </div>
      </button>
    );
  };
  const LoginItem = () => {
    return (
      <button type="button" className="btn-login px-6" onClick={LogOut}>
        LogOut
      </button>
    );
  };

  //------------------------------------html---------------------------------------------
  return (
    <>
      <Toolbar>
        <Item location="center" render={MenuItem} />
        <Item location="center" render={AboutItem} />
        <Item location="center" render={TechItem} />
        <Item location="center" render={PriceItem} />
        <Item location="center" render={LoginItem} />
      </Toolbar>
      <Drawer
        opened={opened}
        openedStateMode="shrink"
        //position='left'
        //revealMode={revealMode}
        component={drawerComponentList}
        closeOnOutsideClick={false}
        height="auto"
      >
        <div id="content" className="dx-theme-background-color">
          <div className="grid grid-cols-12 bg-[#F6F9FF] sm:mb-16 lg:mb-0">
            <div className="grid col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-white min-h-[90vh]">
              {pageshow}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );

  function drawerComponentList() {
    return (
      <div className="list">
        <div className="list" style={{ width: "200px" }}>
          <List
            dataSource={navigation}
            className="bg-fill"
            onItemClick={(e) => {
              menucilck(e);
            }}
          />
        </div>
      </div>
    );
  }
}
