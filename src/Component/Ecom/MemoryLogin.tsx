import TextBox from "devextreme-react/text-box";

export default function MemoryLogin() {
  return (
    <div className="px-5 py-2">
      <div className="grid grid-cols-12 gap-3 mt-14">
        <div className="grid justify-center col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-8">
          <svg
            className="h-20 w-20 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M4 7v-1a2 2 0 0 1 2 -2h2" />{" "}
            <path d="M4 17v1a2 2 0 0 0 2 2h2" />{" "}
            <path d="M16 4h2a2 2 0 0 1 2 2v1" />{" "}
            <path d="M16 20h2a2 2 0 0 0 2 -2v-1" />{" "}
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>

        <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-8">
          THE MEMORY BOX
        </div>
        <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-8">
          <TextBox defaultValue="" placeholder="&#xf08e; Sign With Google" />
        </div>
        <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-8">
          <TextBox defaultValue="" placeholder="&#xf08e; Sign With Facebook" />
        </div>

        <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-8">
          <button type="button" className="bg-lime-500 py-2 rounded text-white">
            Login with Line
          </button>
        </div>

        <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start  py-3 font-bold">
          Or
        </div>
        <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 ">
          <span>
            <span>Already have an account ? </span>
            <span className="text-blue-600">Sign in</span>
          </span>
        </div>
        <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-8">
          <TextBox defaultValue="" placeholder="Email or Phone" />
        </div>
        <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-8">
          <TextBox defaultValue="" placeholder="Password" />
        </div>
        <div className="grid col-span-12  sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start px-8">
          <button type="button" className="btn-save">
            Create account
          </button>
        </div>
        <div className="grid col-span-12 justify-center sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 content-start mb-3 ">
          <span>
            <span>Already have an account ? </span>
            <span className="text-blue-600">Sign in</span>
          </span>
        </div>
      </div>
    </div>
  );
}
