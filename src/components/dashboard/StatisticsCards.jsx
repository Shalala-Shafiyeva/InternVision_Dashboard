import React from "react";

function StatisticsCards() {
  return (
    <div className="statistics">
      <div className="cards flex flex-col gap-4 sm:flex-row flex-wrap justify-start">
        <div className="card px-4 py-6 text-white flex flex-col gap-2 justify-between rounded-[32px] bg-gradient-to-br from-green-900 to-green-500 w-full sm:w-[48%] md:w-[31.5%] lg:w-[23%]">
          <span className="title text-lg sm:text-xl font-medium">
            Total Users
          </span>
          <span className="number text-4xl lg:text-5xl font-bold">24</span>{" "}
          {/* Адаптивный размер текста */}
          <div className="flex gap-2 items-center text-green-200 text-sm">
            <span className="percentage p-1 border border-green-200 rounded-md">
              +3%
            </span>
            <span className="">Increased from last month</span>
          </div>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between rounded-[32px] bg-white w-full sm:w-[48%] md:w-[31.5%] lg:w-[23%] shadow-md">
          <span className="title text-lg sm:text-xl font-medium text-gray-800">
            Ended Projects
          </span>
          <span className="number text-4xl lg:text-5xl font-bold text-gray-800">
            10
          </span>{" "}
          {/* Адаптивный размер текста */}
          <div className="flex gap-2 items-center text-green-600 text-sm">
            <span className="percentage p-1 border border-green-600 rounded-md">
              +6%
            </span>
            <span className="">Increased from last month</span>
          </div>
        </div>

        {/* Карточка 3: Running Projects (Белый) */}
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between rounded-[32px] bg-white w-full sm:w-[48%] md:w-[31.5%] lg:w-[23%] shadow-md">
          <span className="title text-lg sm:text-xl font-medium text-gray-800">
            Running Projects
          </span>
          <span className="number text-4xl lg:text-5xl font-bold text-gray-800">
            12
          </span>{" "}
          {/* Адаптивный размер текста */}
          <div className="flex gap-2 items-center text-green-600 text-sm">
            <span className="percentage p-1 border border-green-600 rounded-md">
              +2%
            </span>
            <span className="">Increased from last month</span>
          </div>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between rounded-[32px] bg-white w-full sm:w-[48%] md:w-[31.5%] lg:w-[23%] shadow-md">
          <span className="title text-lg sm:text-xl font-medium text-gray-800">
            Pending Projects
          </span>
          <span className="number text-4xl lg:text-5xl font-bold text-gray-800">
            2
          </span>{" "}
          <div className="flex gap-2 items-center text-gray-600 text-sm">
            <span className="">On Discuss</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCards;
