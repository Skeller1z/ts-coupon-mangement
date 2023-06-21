import React from "react";
import "./skeleton.css";
export default function Skeleton() {
  const COUNTER = 8;
  const FeedSkeleton = () => (
    <div className="grid col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 content-center after:pt-[75%] after:block after:content-[''] relative postSk">
      <div className='absolute top-0 right-0 left-0 bottom-0 flex w-full h-full'>
        <div className="postSkImg"></div>
        <div className="absolute  top-0 right-0 left-0 bottom-0 flex justify-end  items-end pb-1">
          <div
            className="rounded-full mr-1 p-0 ">
            <div className="w-5 h-5 bg-white animate-pulse rounded-full">
            </div>
          </div>
          <div
            className="rounded-full mr-1 p-0 ">
            <div className="w-5 h-5 bg-white animate-pulse rounded-full">
              {" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return Array(COUNTER).fill(<FeedSkeleton />);
}
