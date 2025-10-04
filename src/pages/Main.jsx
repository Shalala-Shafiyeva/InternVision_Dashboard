import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Charts from "../components/Charts";
import UsersTable from "../components/UsersTable";

function Main() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Header />
        <Charts />
        <UsersTable />
      </div>
    </div>
  );
}

export default Main;
