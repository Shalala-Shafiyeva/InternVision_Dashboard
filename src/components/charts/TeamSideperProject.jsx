import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import projectsData from "../../data.json";
import { useState } from "react";

function TeamSideperProject() {
  const [chartType, setChartType] = useState("top");

  const topTeamData = [...projectsData?.projects]
    .sort((a, b) => b.team_size - a.team_size)
    .slice(0, 5)
    .map((p) => ({ name: p.name, team_size: p.team_size }));


  // === 4. Данные для RadialBarChart (команда по проектам) ===
  const teamData = projectsData?.projects.map((project) => ({
    name: project.name,
    team_size: project.team_size,
    fill: "#285313",
  }));
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Team Size per Project</h2>
        <select
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="top">Top 5 Projects</option>
          <option value="all">All Projects</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        {chartType === "top" ? (
          <RadialBarChart
            innerRadius="20%"
            outerRadius="90%"
            data={topTeamData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar dataKey="team_size" background clockWise />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        ) : (
          <BarChart data={teamData} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip />
            <Bar dataKey="team_size" fill="#285313" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default TeamSideperProject;
