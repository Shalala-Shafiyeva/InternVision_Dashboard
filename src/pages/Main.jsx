import ProjectsTable from "../components/dashboard/ProjectsTable";
import StatisticsCards from "../components/dashboard/StatisticsCards";
import ProjectProgress from "../components/charts/ProjectProgress";
import TeamCollaboration from "../components/dashboard/TeamCollaboration";
import TeamSideperProject from "../components/charts/TeamSideperProject";
import ProjectsByStatus from "../components/charts/ProjectsByStatus";
import TimeTracker from "../components/dashboard/TimeTracker";

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
      <div className="grid grid-cols-2 gap-2 rounded-lg">
        <ProjectProgress />
        <TeamCollaboration />
      </div>
      <div className="grid grid-cols-2 gap-2 rounded-lg">
        <ProjectsByStatus />
        <TeamSideperProject />
      </div>
      <ProjectsTable />
      <TimeTracker />
    </div>
  );
}

export default Main;
