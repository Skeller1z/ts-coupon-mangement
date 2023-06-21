import React, { useEffect, useRef } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Account from "../Component/Ecom/Account";
import LineLogin from "../Component/MainPage/LineLogin";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import MainAuth from "../Component/MainPage/MainAuth";
import MainLine from "../Component/MainPage/MainLine";
import MainMobileAuth from "../Component/MainPage/MainMobileAuth";
import PDPA from "../Component/MainPage/PDPA";
import PinLogin from "../Component/MainPage/PinLogin";
import ResetPassword from "../Component/MainPage/ResetPassword";
import Setpin from "../Component/MainPage/Setpin";
import Menu_index from "../Component/Menu/Menu_index";
import Menu_pay from "../Component/Menu/Menu_pay";
import HomePage from "../Component/Ecom/HomePage";
import Menu_Logout from "../Component/Menu/Menu_Logout";
import Menu_Login from "../Component/Menu/Menu_Login";
import { Islogin } from "../Recoil/MainRecoil";
import { useRecoilState } from "recoil";
import Auth from "../MainCall/Auth";
import SignUpNotpin from "../Component/MainPage/SignUpNotpin";
import Payment from "../Component/Ecom/Payment";
import Profile from "../Component/Ecom/Profile";
import MyCoupon from "../Component/Ecom/MyCoupon";
import Test from "../Component/Ecom/Test";
const History = React.lazy(() => import("../Component/Ecom/History"));
const UploadIMG = React.lazy(() => import("../Component/Ecom/UploadIMG"));
const Hotel = React.lazy(() => import("../Component/Ecom/Hotel"));
const GridOrder = React.lazy(() => import("../Component/Ecom/GridOrder"));
const Main = React.lazy(() => import("../Component/MainPage/Main"));
const Menu_Mobile = React.lazy(() => import("../Component/Menu/Menu_Mobile"));
const Menu_PC = React.lazy(() => import("../Component/Menu/Menu_PC"));
const Login = React.lazy(() => import("../Component/MainPage/Login"));
const Page404 = React.lazy(() => import("../Component/MainPage/Page404"));
const MainMobile = React.lazy(() => import("../Component/MainPage/MainMobile"));
const Introduce = React.lazy(() => import("../Component/Ecom/Introduce"));
const Price = React.lazy(() => import("../Component/Ecom/Price"));
const SignUp = React.lazy(() => import("../Component/MainPage/SignUp"));
const OrderSummery = React.lazy(() => import("../Component/Ecom/OrderSummery"));
const MyProfile = React.lazy(() => import("../Component/Ecom/MyProfile"));
const FindIMG = React.lazy(() => import("../Component/Ecom/FindIMG"));
const Pay = React.lazy(() => import("../Component/Ecom/Pay"));
const TopupQrcode = React.lazy(() => import("../Component/Ecom/TopupQrcode"));
const TopupCreditcard = React.lazy(
  () => import("../Component/Ecom/TopupCreditcard")
);
const EditPhone = React.lazy(() => import("../Component/Ecom/EditPhone"));
const EditEmail = React.lazy(() => import("../Component/Ecom/EditEmail"));
const ConfirmEmail = React.lazy(() => import("../Component/Ecom/ConfirmEmail"));
const ChangePassWord = React.lazy(
  () => import("../Component/Ecom/ChangePassword")
);
const Forgotpass = React.lazy(() => import("../Component/Ecom/Forgotpass"));
const Resetpass = React.lazy(() => import("../Component/Ecom/Resetpass"));
const ForgotEmail = React.lazy(() => import("../Component/Ecom/ForgotEmail"));
const ForgotNewPass = React.lazy(
  () => import("../Component/Ecom/ForgotNewpass")
);
const ChangeEmailpath2 = React.lazy(
  () => import("../Component/Ecom/ChangeEmailpath2")
);
const ChangeEmailpath3 = React.lazy(
  () => import("../Component/Ecom/ChangeEmailpath3")
);
const ChangePassWord2 = React.lazy(
  () => import("../Component/Ecom/ChangePassword2")
);
const ChangePhoneNumber2 = React.lazy(
  () => import("../Component/Ecom/ChangePhoneNumber2")
);
const ChangePhoneNumber3 = React.lazy(
  () => import("../Component/Ecom/ChangePhoneNumber3")
);
const Pin = React.lazy(() => import("../Component/Ecom/Pin"));
const VerifyYourEmail = React.lazy(
  () => import("../Component/Ecom/VerifyYourEmail")
);
export default function Router() {
  const menupayRef = useRef(null);
  const [islogin, setislogin] = useRecoilState(Islogin);
  useEffect(() => {
    Auth.CurrentUser().then((res) => {
      if (res !== "") {
        setislogin(true)
      } else {
        setislogin(false)
      }
    });
  }, [islogin])
  return useRoutes([
    {
      path: "/Authen",
      element: isBrowser ? <MainAuth /> : <MainMobileAuth />,
      children: [
        { index: true, path: "/Authen", element: <Login navTo={"/"} /> },
        { path: "SignUp", element: <SignUp /> },
        { path: "Forgotpass", element: <Forgotpass /> },
        { path: "Resetpass", element: <Resetpass /> },
        { path: "ForgotEmail", element: <ForgotEmail /> },
        { path: "ForgotNewPass", element: <ForgotNewPass /> },
        { path: "LineLogin", element: <PinLogin /> },
        { path: "SignUpNotpin", element: <SignUpNotpin /> },
        {
          path: "ResetPassword",
          element: (
            <ResetPassword />
          ),
        },
      ],
    },
    {
      path: "/LineAuthen",
      element: <MainLine />,
      children: [{ index: true, path: "/LineAuthen", element: <LineLogin /> }],
    },
    {
      path: "/FindIMG",
      element: !islogin ? <Menu_Logout pageshow={<FindIMG />} /> : <Menu_Login pageshow={<FindIMG />} />,
    },
    {
      path: "/UploadIMG",
      element: !islogin ? <Menu_Logout pageshow={<UploadIMG />} /> : <Menu_Login pageshow={<UploadIMG />} />,
    },
    {
      path: "/Hotel",
      element: !islogin ? <Menu_Logout pageshow={<Hotel />} /> : <Menu_Login pageshow={<Hotel />} />,
    },
    {
      path: "/HomePage",
      element: !islogin ? <Menu_Logout pageshow={<HomePage />} /> : <Menu_Login pageshow={<HomePage />} />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/SignUp",
      element: <Menu_Logout pageshow={<SignUp />} />,
    },

    {
      path: "/",
      element: isBrowser ? <Main /> : <MainMobile />,
      children: [
        {
          index: true,
          path: "/",
          element: <Menu_Login pageshow={<HomePage />} Title="หน้าหลัก" />,
        },
        {
          path: "Price",
          element: isBrowser ? <Menu_Login pageshow={<Price />} /> : <Menu_Login pageshow={<Price />} />,
        },
        {
          path: "Setpin",
          element: <Setpin />,
        },
        {
          path: "Test",
          element: <Test />,
        },
        {
          path: "OrderSummery",
          element: isBrowser ? <Menu_Login pageshow={<GridOrder />} /> : <Menu_Login pageshow={<GridOrder />} Title="Basket" />,
        },
        {
          path: "MyProfile",
          element: isBrowser ? <Menu_Login pageshow={<MyProfile />} /> : <Menu_Login pageshow={<MyProfile />} Title="MyProfile" />,
        },
        {
          path: "EditPhone",
          element: isBrowser ? <Menu_Login pageshow={<EditPhone />} /> : <Menu_Login pageshow={<EditPhone />} Title="EditPhone" />,
        },
        {
          path: "EditEmail",
          element: isBrowser ? <Menu_Login pageshow={<EditEmail />} /> : <Menu_Login pageshow={<EditEmail />} Title="EditEmail" />,
        },
        {
          path: "ConfirmEmail",
          element: isBrowser ? <Menu_Login pageshow={<ConfirmEmail />} /> : <Menu_Login pageshow={<ConfirmEmail />} Title="ConfirmEmail" />,
        },
        {
          path: "Changepassword",
          element: isBrowser ? <Menu_Login pageshow={<ChangePassWord />} /> : <Menu_Login pageshow={<ChangePassWord />} Title="ChangePassWord" />,
        },
        {
          path: "Pay",
          element: isBrowser ? <Menu_Login pageshow={<Pay sumfn={menupayRef} />} /> : <Menu_Login pageshow={<Pay sumfn={menupayRef} />} Title="Pay" />,
        },
        {
          path: "TopupQrcode",
          element: isBrowser ? <Menu_Login pageshow={<TopupQrcode />} /> : <Menu_Login pageshow={<TopupQrcode />} Title="Pay" />,
        },
        {
          path: "TopupCreditcard",
          element: isBrowser ? <Menu_Login pageshow={<TopupCreditcard />} /> : <Menu_Login pageshow={<TopupCreditcard />} Title="Pay" />,
        },
        {
          path: "History",
          element: isBrowser ? <Menu_Login pageshow={<History />} /> : <Menu_Login pageshow={<History />} Title="Payment" />,
        },
        {
          path: "Payment",
          element: isBrowser ? <Menu_Login pageshow={<Payment />} /> : <Menu_Login pageshow={<Payment />} Title="Payment" />,
        },
        {
          path: "ChangeEmailpath2",
          element: isBrowser ? <Menu_Login pageshow={<ChangeEmailpath2 />} /> : <Menu_Login pageshow={<ChangeEmailpath2 />} Title="ChangeEmail" />,
        },
        {
          path: "ChangeEmailpath3",
          element: isBrowser ? <Menu_Login pageshow={<ChangeEmailpath3 />} /> : <Menu_Login pageshow={<ChangeEmailpath3 />} Title="ChangeEmail" />,
        },
        {
          path: "VerifyYourEmail",
          element: isBrowser ? <Menu_Login pageshow={<VerifyYourEmail />} /> : <Menu_Login pageshow={<VerifyYourEmail />} Title="VerifyYourEmail" />,
        },
        {
          path: "ChangePhoneNumber2",
          element: isBrowser ? <Menu_Login pageshow={<ChangePhoneNumber2 />} /> : <Menu_Login pageshow={<ChangePhoneNumber2 />} Title="ChangePhoneNumber" />,
        },
        {
          path: "ChangePhoneNumber3",
          element: isBrowser ? <Menu_Login pageshow={<ChangePhoneNumber3 />} /> : <Menu_Login pageshow={<ChangePhoneNumber3 />} Title="ChangePhoneNumber" />,
        },
        {
          path: "ChangePassWord",
          element: isBrowser ? <Menu_Login pageshow={<ChangePassWord />} /> : <Menu_Login pageshow={<ChangePassWord />} Title="ChangePassWord" />,
        },
        {
          path: "ChangePassWord2",
          element: isBrowser ? <Menu_Login pageshow={<ChangePassWord2 />} /> : <Menu_Login pageshow={<ChangePassWord2 />} Title="ChangePassWord" />,
        },
        {
          path: "Account",
          element: isBrowser ? <Menu_Login pageshow={<Account />} /> : <Menu_Login pageshow={<Account />} Title="Account" />,
        },
        {
          path: "Hotel",
          element: isBrowser ? <Menu_Login pageshow={<Hotel />} /> : <Menu_Login pageshow={<Hotel />} Title="Hotel" />,
        },
        {
          path: "FindIMG",
          element: isBrowser ? <Menu_Login pageshow={<FindIMG />} /> : <Menu_Login pageshow={<FindIMG />} Title="Hotel" />,
        },
        {
          path: "UploadIMG",
          element: isBrowser ? <Menu_Login pageshow={<UploadIMG />} /> : <Menu_Login pageshow={<UploadIMG />} Title="Hotel" />,
        },
        {
          path: "Hotel",
          element: isBrowser ? <Menu_Login pageshow={<Hotel />} /> : <Menu_Login pageshow={<Hotel />} Title="Hotel" />,
        },
        {
          path: "HomePage",
          element: isBrowser ? <Menu_Login pageshow={<HomePage />} /> : <Menu_Login pageshow={<HomePage />} Title="Hotel" />,
        },
        {
          path: "Profile",
          element: isBrowser ? <Menu_Login pageshow={<Profile />} /> : <Menu_Login pageshow={<Profile />} Title="Hotel" />,
        },
        {
          path: "MyCoupon",
          element: isBrowser ? <Menu_Login pageshow={<MyCoupon />} /> : <Menu_Login pageshow={<MyCoupon />} Title="Hotel" />,
        },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/Mobile/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

//index: true,
