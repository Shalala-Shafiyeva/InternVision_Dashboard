import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import projectsData from "../../data.json";

export default function ProjectProgress() {

  const COLORS = ["#285313", "#a8e063", "#66bb6a"];

  const progressData = projectsData?.projects.map((project) => ({
    name: project.name,
    progress: project.progress,
  }));

  return (
    <div className="bg-white dark:bg-gray-100 dark:shadow-slate-400 p-4 rounded-xl shadow">
      <h2 className="text-xl font-medium mb-3">Project Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#285313"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
