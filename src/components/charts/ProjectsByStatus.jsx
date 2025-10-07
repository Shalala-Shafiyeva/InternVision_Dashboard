import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import projectsData from "../../data.json";

function ProjectsByStatus() {
  const statusData = Object.values(
    projectsData?.projects.reduce((acc, project) => {
      acc[project.status] = acc[project.status] || {
        status: project.status,
        count: 0,
      };
      acc[project.status].count++;
      return acc;
    }, {})
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">Projects by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statusData}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#285313" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProjectsByStatus;
