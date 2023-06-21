import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "devextreme-react/list.js";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { useRecoilValue } from "recoil";
import { userdata, UserState } from "../../Recoil/MainRecoil";
import Auth from "../../MainCall/Auth";
import { ReactComponent as Icon_grey } from "../../image/SVG_Memorybox/Navbar Top/Nav icon_grey.svg";

export default function Menu_pay(props) {
  const UserStateData = useRecoilValue<userdata>(UserState);

  const navigate = useNavigate();
  const navigation = [
    { id: 1, text: "Home", icon: "far fa-home" },
    { id: 2, text: "Price", icon: "far fa-dollar-sign" },
    { id: 6, text: "LogOut", icon: "far fa-sign-out " },
  ];
  const menucilck = (e) => {
    if (e.itemData.id === 1) {
      navigate("../");
      onOutsideClick();
    } else if (e.itemData.id === 2) {
      navigate("../Price");
      onOutsideClick();
    } else if (e.itemData.id === 6) {
      Auth.LogOut();
      onOutsideClick();
    }
  };
  const { pageshow, Title } = props;
  const [opened, setopened] = useState<boolean>(false);

  const btnBack = () => {
    return (
      <button type="button" className="hover:bg-slate-100 p-2">
        <i
          className="fal fa-angle-left text-3xl"
          onClick={() => navigate(-1)}
        ></i>
      </button>
    );
  };
  const btnMenu = () => {
    return (
      <button type="button" className="hover:bg-slate-100 p-2">
        <Icon_grey
          className="inline h-[auto] w-[30px] "
          onClick={() => setopened(!opened)}
        />
        {/*  <i
          className="fas fa-grip-vertical"
          onClick={() => setopened(!opened)}
        ></i> */}
      </button>
    );
  };
  const onOutsideClick = () => {
    setopened(false);
    return false;
  };

  useEffect(() => {
    if (UserStateData.username === "") {
      navigate("/Authen");
    }
  }, []);

  function drawerComponentList() {
    return (
      <div className="list">
        <div className="list" style={{ width: "100vw" }}>
          <List
            dataSource={navigation}
            className="panel-list dx-theme-accent-as-background-color"
            onItemClick={(e) => {
              menucilck(e);
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <Toolbar>
        <Item location="before" render={btnBack} />
        <Item location="center" text={Title} />
        <Item location="after" render={btnMenu} />
      </Toolbar>
      <Drawer
        opened={opened}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode="overlap"
        position="top"
        component={drawerComponentList}
        revealMode="expand"
        height={"auto"}
        maxSize={200}
      >
        <div id="content" className="dx-theme-background-color ">
          <div className="grid grid-cols-12 bg-[#F6F9FF] mb-16">
            <div className="grid  col-span-12 sm:col-span-12 md:col-span-10 md:col-start-2 lg:col-span-10 lg:col-start-2 xl:col-start-2 xl:col-span-10 bg-[#F6F9FF]">
              {pageshow}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
