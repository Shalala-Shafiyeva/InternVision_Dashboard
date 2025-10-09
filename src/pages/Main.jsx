import ProjectsTable from "../components/projects/ProjectsTable";
import StatisticsCards from "../components/dashboard/StatisticsCards";
import ProjectProgress from "../components/charts/ProjectProgress";
import TeamCollaboration from "../components/dashboard/TeamCollaboration";
import TeamSideperProject from "../components/charts/TeamSideperProject";
import ProjectsByStatus from "../components/charts/ProjectsByStatus";

function Main() {
  return (
    <div className="flex flex-col gap-6">
      <div className="head flex flex-col gap-4">
        <h2 className="text-4xl font-medium">Dashboard</h2>
        <span className="text-gray-500 text-md">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          quisquam.
        </span>
      </div>
      <StatisticsCards />
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-2 rounded-lg">
        <ProjectProgress />
        <TeamCollaboration />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-2 rounded-lg">
        <ProjectsByStatus />
        <TeamSideperProject />
      </div>
      <ProjectsTable />
    </div>
  );
}

export default Main;
