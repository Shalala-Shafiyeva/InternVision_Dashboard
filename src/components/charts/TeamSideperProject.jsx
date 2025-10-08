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
import { useState, useMemo } from "react";

// Массив цветов для Top 5 проектов
const CHART_COLORS = [
  "#10B981", // Green
  "#3B82F6", // Blue
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#6366F1", // Indigo
];
const ALL_PROJECTS_COLOR = "#285313";

//Кастомный тултип
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload;
    const teamSize = dataItem.team_size;
    const projectName = dataItem.name;

    return (
      <div className="bg-white p-3 border border-gray-300 shadow-md rounded-lg text-sm">
        <p className="font-semibold text-gray-800 mb-1">{projectName}</p>
        <p className="text-gray-600">
          <span className="font-medium">Komanda Sayı:</span> {teamSize}
        </p>
      </div>
    );
  }

  return null;
};

function TeamSideperProject() {
  const [chartType, setChartType] = useState("top");

  const { topTeamData, teamData } = useMemo(() => {
    const allData = projectsData?.projects.map((project) => ({
      name: project.name,
      team_size: project.team_size,
      fill: ALL_PROJECTS_COLOR,
    }));

    const topData = [...projectsData?.projects]
      .sort((a, b) => b.team_size - a.team_size)
      .slice(0, 5)
      .map((p, index) => ({
        name: p.name,
        team_size: p.team_size,
        fill: CHART_COLORS[index % CHART_COLORS.length], 
      }));

    return { topTeamData: topData, teamData: allData };
  }, [projectsData?.projects]);


  return (
    <div className="bg-white p-4 rounded-xl shadow h-fit">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Team Size per Project</h2>
        <select
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}
          className="border rounded px-2 py-1 text-sm outline-none"
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
            <RadialBar 
                dataKey="team_size" 
                fill="#285313" 
                background 
                clockWise 
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              payload={topTeamData.map(item => ({
                value: item.name,
                type: 'square',
                id: item.name,
                color: item.fill,
              }))}
            />
          </RadialBarChart>
        ) : (
          <BarChart data={teamData} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
             <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="team_size" fill={ALL_PROJECTS_COLOR} /> 
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default TeamSideperProject;