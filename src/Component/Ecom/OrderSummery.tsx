import { useNavigate } from "react-router-dom";
import GridOrder from "./GridOrder";
export default function OrderSummery() {
  let navigate = useNavigate();
  return (
    <div>
      <div className="mb-12">
        <div className="grid grid-cols-12 gap-3 bg-orange-200 py-1 text-orange-700 border border-b-orange-700 mb-2">
          <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
            ซื้อ 5 ภาพขึ้นไป รับส่วนลดทันที 50%
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 border border-b-gray-300 border-t-white border-l-white border-r-white py-4">
          <div className="grid justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start text-gray-500">
            By Placing Busines value web devoloper hemchart.
          </div>
        </div>

        <div className="grid grid-cols-12 border border-b-gray-300 border-t-white border-l-white border-r-white py-4 ">
          <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
            <div className="grid grid-cols-12 px-5">
              <div className="grid col-span-8  sm:col-span-8 md:col-span-8 lg:col-span-8 xl:col-span-8 content-start font-bold text-xl ">
                <span className="inline-flex items-baseline">
                  <div className="pr-3">Service Provider</div>
                  <svg
                    className="self-center h-8 w-8 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
              <div className="grid justify-end col-span-4  sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4 content-start font-bold text-xl">
                ฿299.00
              </div>
            </div>
          </div>
        </div>

        <div className="px-5  pb-2">
          <div className="grid grid-cols-12 ">
            <div className="grid col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4 ">
              <div className="grid grid-cols-12 ">
                <div className="justify-center col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start ">
                  <GridOrder />
                </div>
              </div>

              <div className="grid grid-cols-12  px-5  py-4">
                <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start font-bold text-xl">
                  Total
                </div>

                <div className="grid justify-end col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
                  <span>
                    <span className="text-lg">THB </span>
                    <span className="font-bold text-lg">฿299.00</span>
                  </span>
                  <div className="text-gray-500 mt-1">Please 70% tax</div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 mt-3 ">
                <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
                  <button type="button" className="btn-save">
                    Find more photo
                  </button>
                </div>
                <div className="grid col-span-6  sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 content-start ">
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() => navigate("../Pay")}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
