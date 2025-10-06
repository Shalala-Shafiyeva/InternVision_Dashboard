import React from "react";

function StatisticsCards() {
  return (
    <div className="statistics">
      <div className="cards flex gap-2">
        <div className="card px-4 py-6 text-white flex flex-col gap-2 justify-between  rounded-[32px] bg-gradient-to-br from-green-900 to-green-500 w-3/12">
          <span className="title text-xl font-medium">Total Projects</span>
          <span className="number text-5xl font-bold">24</span>
          <div className="flex gap-2 items-center text-green-200">
            <span className="percentage p-1 border border-green-200 rounded-md">
              +3%
            </span>
            <span className="">Increased from last month</span>
          </div>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between  rounded-[32px] bg-white w-3/12">
          <span className="title text-xl font-medium">Ended Projects</span>
          <span className="number text-5xl font-bold">10</span>
          <div className="flex gap-2 items-center text-green-600">
            <span className="percentage p-1 border border-green-600 rounded-md">
              +6%
            </span>
            <span className="">Increased from last month</span>
          </div>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between  rounded-[32px] bg-white w-3/12">
          <span className="title text-xl font-medium">Running Projects</span>
          <span className="number text-5xl font-bold">12</span>
          <div className="flex gap-2 items-center text-green-600">
            <span className="percentage p-1 border border-green-600 rounded-md">
              +2%
            </span>
            <span className="">Increased from last month</span>
          </div>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between  rounded-[32px] bg-white w-3/12">
          <span className="title text-xl font-medium">Pending Projects</span>
          <span className="number text-5xl font-bold">2</span>
          <div className="flex gap-2 items-center text-green-600">
            <span className="">On Discuss</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCards;
