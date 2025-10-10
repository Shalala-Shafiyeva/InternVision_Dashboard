import { useState, useMemo } from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { GradientPinkBlue } from "@visx/gradient";
import { animated, useTransition, interpolate } from "@react-spring/web";
import projectsData from "../../data.json";
const getStatusCount = (d) => d.count;
const getStatus = (d) => d.status;

const getStatusColor = scaleOrdinal({
  domain: ["In Progress", "Completed", "On Hold", "Canceled"],
  range: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

const fromLeaveTransition = ({ endAngle }) => ({
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});

const enterUpdateTransition = ({ startAngle, endAngle }) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

function AnimatedPie({
  animate = true,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}) {
  const transitions = useTransition(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });

  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
    const total = arcs.reduce((acc, a) => acc + getStatusCount(a.data), 0);
    const percentage = ((getStatusCount(arc.data) / total) * 100).toFixed(1);

    return (
      <g key={key}>
        <animated.path
          d={interpolate(
            [props.startAngle, props.endAngle],
            (startAngle, endAngle) =>
              path({
                ...arc,
                startAngle,
                endAngle,
              })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
          style={{ cursor: "pointer" }}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={10}
              fontWeight={600}
              textAnchor="middle"
              pointerEvents="none"
            >
              {percentage}%
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}

export default function ProjectsByStatus({
  width,
  height,
  margin = defaultMargin,
  animate = true,
}) {
  const statusData = useMemo(() => {
    return Object.values(
      projectsData?.projects.reduce((acc, project) => {
        acc[project.status] = acc[project.status] || {
          status: project.status,
          count: 0,
        };
        acc[project.status].count++;
        return acc;
      }, {})
    );
  }, []);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const fullWidth = width || 350;
  const fullHeight = height || 300;

  if (fullWidth < 10) return null;

  const innerWidth = fullWidth - margin.left - margin.right;
  const innerHeight = fullHeight - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 70;

  const displayData = selectedStatus
    ? statusData.filter(({ status }) => status === selectedStatus)
    : statusData;
  const pieData = displayData.length > 0 ? displayData : statusData;

  return (
    <div className="bg-white dark:bg-gray-100 dark:shadow-slate-400 p-4 rounded-xl shadow flex justify-center flex-col">
      <h2 className="text-lg font-semibold mb-3 text-left">
        Projects by Status
      </h2>
      <div className="flex justify-center">
        <svg width={fullWidth} height={fullHeight}>
          <GradientPinkBlue id="visx-pie-gradient" />
          <rect
            rx={14}
            width={fullWidth}
            height={fullHeight}
            fill="#FFF"
            className="border dark:fill-gray-100"
          />

          <Group top={centerY + margin.top} left={centerX + margin.left}>
            <Pie
              data={pieData}
              pieValue={getStatusCount}
              outerRadius={radius}
              innerRadius={radius - donutThickness}
              cornerRadius={4}
              padAngle={0.008}
              pieSortValues={() => -1}
            >
              {(pie) => (
                <AnimatedPie
                  {...pie}
                  animate={animate}
                  getKey={(arc) => arc.data.status}
                  onClickDatum={({ data: { status } }) =>
                    animate &&
                    setSelectedStatus(
                      selectedStatus && selectedStatus === status
                        ? null
                        : status
                    )
                  }
                  getColor={(arc) => getStatusColor(arc.data.status)}
                />
              )}
            </Pie>
          </Group>

          {selectedStatus && (
            <text
              x={centerX + margin.left}
              y={centerY + margin.top}
              dy=".33em"
              fontSize={18}
              fontWeight={700}
              textAnchor="middle"
              fill={getStatusColor(selectedStatus)}
              pointerEvents="none"
            >
              {selectedStatus}
            </text>
          )}

          {animate && (
            <text
              textAnchor="end"
              x={fullWidth - 16}
              y={fullHeight - 16}
              fill="#555"
              fontSize={11}
              fontWeight={300}
              pointerEvents="none"
            >
              Click segments to update
            </text>
          )}
        </svg>
      </div>
    </div>
  );
}

export function ProjectsByStatusWrapper() {
  return (
    <div className="w-full">
      <ProjectsByStatus width={350} height={350} />
    </div>
  );
}
