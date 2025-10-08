import React from "react";

function StatisticsBar() {
  return (
    <div className="statistics">
      <div className="cards flex gap-2">
        <div className="card px-4 py-6 text-white flex flex-col gap-2 justify-between  rounded-[32px] bg-gradient-to-br from-green-900 to-green-500 w-3/12">
          <span className="title text-xl font-medium">Total Users</span>
          <span className="number text-5xl font-bold">24</span>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between text-white rounded-[32px] bg-gradient-to-br from-green-900 to-green-500 w-3/12">
          <span className="title text-xl font-medium">Working on project</span>
          <span className="number text-5xl font-bold">10</span>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between text-white rounded-[32px] bg-gradient-to-br from-green-900 to-green-500 w-3/12">
          <span className="title text-xl font-medium">Lorem, ipsum.</span>
          <span className="number text-5xl font-bold">12</span>
        </div>
        <div className="card px-4 py-6 flex flex-col gap-2 justify-between text-white rounded-[32px] bg-gradient-to-br from-green-900 to-green-500 w-3/12">
          <span className="title text-xl font-medium">Lorem, ipsum.</span>
          <span className="number text-5xl font-bold">2</span>
        </div>
      </div>
    </div>
  );
}

export default StatisticsBar;
