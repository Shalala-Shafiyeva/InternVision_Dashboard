import { PlusIcon } from "lucide-react";
import ProjectsTable from "../components/projects/ProjectsTable";

function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <div className="head flex flex-col gap-4">
        <h2 className="text-4xl font-medium dark:text-white">Projects</h2>
        <span className="text-gray-500 dark:text-gray-200">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          quisquam.
        </span>
      </div>
      <ProjectsTable />
    </div>
  );
}

export default Projects;
