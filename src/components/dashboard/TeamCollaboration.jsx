import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import projectsData from "../../data.json";

function TeamCollaboration() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const allMembersWithProject = projectsData?.projects.flatMap((project) =>
    project.team_members.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      projectName: project.name,
      projectStatus: project.status,
    }))
  );
  const groupedMembers = new Map();

  allMembersWithProject.forEach((member) => {
    if (!groupedMembers.has(member.id)) {
      groupedMembers.set(member.id, []);
    }
    groupedMembers.get(member.id).push(member);
  });
  const uniqueMembersArray = Array.from(groupedMembers.values()).map(
    (memberRecords) => {
      const randomIndex = Math.floor(Math.random() * memberRecords.length);
      return memberRecords[randomIndex];
    }
  );
  const shuffledMembers = shuffleArray(uniqueMembersArray);
  const uniqueRandomMembers = shuffledMembers.slice(0, 5);

  return (
    <div className="team_collaboration bg-white p-4 rounded-xl shadow flex flex-col gap-3">
      <div className="head flex justify-between items-center gap-2 flex-wrap">
        <span className="text-xl font-medium">Team Collaboration</span>
        <div className="add_btn">
          <button className="flex items-center gap-1 bg-white w-[max-content] group text-xs md:text-sm  py-1 px-2 md:py-2 md:px-4 rounded-[32px] font-medium text-green-800 border border-green-800 hover:bg-green-800 hover:text-white transition duration-150">
            <PlusIcon className="w-4 h-4 text-green-800 group-hover:text-white" />
            <span>Add Member</span>
          </button>
        </div>
      </div>
      <div className="team_box flex flex-col gap-3">
        {uniqueRandomMembers.map((member) => (
          <div
            key={member?.id}
            className="team_member flex justify-between items-end"
          >
            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                alt=""
              />
              <div className="flex flex-col">
                <div>
                  <span className="font-medium text-sm">{member?.name}, </span>
                  <span className="text-gray-500 text-sm">{member?.role}</span>
                </div>
                <div className="project_name">
                  <span className="text-xs text-gray-500">Working on </span>
                  <span className="text-xs font-medium">
                    {member?.projectName}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span
                className={`inline-flex items-center rounded-md ${
                  member?.projectStatus === "Pending"
                    ? "bg-yellow-400/10 text-yellow-500 inset-ring-yellow-400/20"
                    : member?.projectStatus === "Completed"
                    ? "bg-green-400/10 text-green-500 inset-ring-green-400/20"
                    : "bg-indigo-400/10 text-indigo-400 inset-ring-indigo-400/20"
                }  px-2 py-1 text-xs font-medium  inset-ring`}
              >
                {member?.projectStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamCollaboration;
