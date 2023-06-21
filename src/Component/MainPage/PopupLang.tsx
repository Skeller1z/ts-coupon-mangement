import { List, Popup } from "devextreme-react";
import React from "react";
import THAicon from "../../image/lang/THA icon.png";
import ENGicon from "../../image/lang/ENG icon.png";
import CNAicon from "../../image/lang/CNA icon.png";
import RUSicon from "../../image/lang/RUS icon.png";
import { useTranslation } from "react-i18next";

export default function PopupLang(props) {
  const { t, i18n } = useTranslation();
  const jobjlang = [
    { id: 1, text: "ENGLISH", icon: ENGicon },
    { id: 2, text: "Россия", icon: RUSicon },
    { id: 3, text: "汉语", icon: CNAicon },
    { id: 4, text: "ภาษาไทย", icon: THAicon },
  ];
  const setLang = (lang) => {
    localStorage.setItem("Lang", lang);
  };
  const btnlang = (item) => {
    return (
      <div>
        <img src={item.icon} className="inline h-12" />
        <span>{item.text}</span>
      </div>
    );
  };
  const onItemClick = (e) => {
    props.done();
    if (e.itemData.id === 1) {
      i18n.changeLanguage("en");
      setLang("en");
    } else if (e.itemData.id === 2) {
      i18n.changeLanguage("rus");
      setLang("rus");
    } else if (e.itemData.id === 3) {
      i18n.changeLanguage("cna");
      setLang("cna");
    } else {
      i18n.changeLanguage("th");
      setLang("th");
    }
  };
  return (
    <Popup
      position="center"
      visible={props.data}
      closeOnOutsideClick={true}
      width="70%"
      height={"auto"}
      showTitle={false}
    >
      <List
        dataSource={jobjlang}
        height="100%"
        itemRender={btnlang}
        onItemClick={onItemClick}
      />
    </Popup>
  );
}
