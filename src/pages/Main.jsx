import Charts from "../components/charts/Charts";
import UsersTable from "../components/dashboard/UsersTable";
import StatisticsCards from "../components/dashboard/StatisticsCards";

function Main() {
  return (
    <div className="flex flex-col gap-6">
      <div className="head flex flex-col gap-4">
        <h2 className="text-4xl font-medium">Dashboard</h2>
        <span className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          quisquam.
        </span>
      </div>
      <StatisticsCards />
      <Charts />
      <UsersTable />
    </div>
  );
}

export default Main;
