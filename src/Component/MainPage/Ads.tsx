import { useTranslation } from "react-i18next";

export default function Ads() {
  const { t, i18n } = useTranslation();
  return (
    <div className="grid grid-cols-12 gap-3 bg-[#FFEDD0] py-1 font-bold text-[#FF9F00] border border-b-[#FEC567]">
      <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-[14px]">
        {t("Buy more than 10 photos, get 50% off.")}
      </div>
    </div>
  );
}
