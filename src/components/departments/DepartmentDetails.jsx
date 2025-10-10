function DepartmentDetails({ department, onClose }) {
  const teamMembers = [
    { name: "John Doe", role: "Project Manager", dept: "Development" },
    { name: "Jane Smith", role: "Developer", dept: "Engineering" },
  ];
  const DetailItem = ({ label, value, className = "text-gray-800" }) => (
    <div className="border-b border-gray-200 py-3">
      <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
      <p className={`text-sm font-semibold ${className}`}>{value}</p>
    </div>
  );
  return (
    <div className="fixed inset-0 z-40">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-start border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {department?.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Department Overview</h3>
            <DetailItem
              label="Department name"
              value={department?.name || "N/A"}
            />
            <DetailItem
              label="Description"
              value={
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full`}
                >
                  {department?.description}
                </span>
              }
            />
            <DetailItem
              label="Positions"
              value={`${department?.positions}`}
              className="text-green-600"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold border-t pt-4 mb-3">
              Team Members ({department?.members})
            </h3>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-xs text-gray-600">
                    {member.role} ({member.dept})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentDetails;
