import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as DotsIcon } from "../../assets/icons/dots.svg";
import { useEffect, useState } from "react";
import DepartmentDetails from "../departments/DepartmentDetails";
import axios from "axios";
import { set } from "react-hook-form";

export default function DepartmentCards({ handleOpenModal }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleDropdown = (e, departmentId) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === departmentId ? null : departmentId);
  };
  const handleDepartment = (department) => {
    setSelectedDepartment(department);
  };

  const departmentsData = async () => {
    try {
      const res = await axios.get(
        "https://mocki.io/v1/aeb93500-95a0-4761-9b72-db45d6bc967a"
      );

      setDepartments(res.data.departments || []);
    } catch (err) {
      console.error("Axios Fetch Error:", err);
    }
  };

  useEffect(() => {
    departmentsData();
  }, []);

  return (
    <>
      {selectedDepartment && (
        <DepartmentDetails
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
      <div className="add_btn flex justify-end mb-6">
        <button
          className="flex items-center gap-1 bg-white w-[max-content] group text-sm py-2 px-4 rounded-[32px] font-medium text-green-800 border border-green-800 hover:bg-green-800 hover:text-white transition duration-150"
          onClick={handleOpenModal}
        >
          <PlusIcon className="w-4 h-4 text-green-800 group-hover:text-white" />
          <span>Add Department</span>
        </button>
      </div>
      <div className="cards">
        <div className="grid mb-8 border border-gray-200 shadow-xs dark:border-gray-700 md:mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white dark:bg-gray-800">
          {departments?.map((department) => (
            <div
              key={department?.id}
              onClick={() => handleDepartment(department)}
              className="relative flex flex-col p-6 border bg-white border-gray-200 transition-all duration-300
           dark:bg-gray-500 dark:border-neutral-700
           shadow-none
           hover:shadow-lg hover:shadow-gray-400/50 
           dark:hover:shadow-xl dark:hover:shadow-black/70 
           "
            >
              {/*dropdown */}
              <div className="absolute top-3 right-3 z-20">
                <button
                  className="inline-flex justify-center items-center size-8 text-gray-400 hover:text-gray-600 focus:text-gray-600 rounded-full
                     hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                  type="button"
                  onClick={(e) => {
                    handleDropdown(e, department?.id);
                  }}
                  aria-expanded={openDropdownId === department?.id}
                  aria-controls={`card-dropdown-${department?.id}`}
                >
                  <span className="sr-only">Open dropdown menu</span>
                  <DotsIcon />
                </button>
                <div
                  id={`card-dropdown-${department?.id}`}
                  className={`absolute ${
                    openDropdownId === department?.id ? "block" : "hidden"
                  } top-full right-0 mt-2 z-30 w-44 
                     bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-100
                     dark:bg-neutral-700 dark:border-neutral-600 dark:divide-neutral-600`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-neutral-200"
                    aria-labelledby="dropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 dark:hover:text-white"
                      >
                        View Details
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-600 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-neutral-600 dark:hover:text-red-400"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center text-left mt-2">
                <h5 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                  {department?.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-neutral-400 mb-4">
                  {department?.description}
                </span>
                <div className="w-full h-px bg-gray-200 dark:bg-neutral-700 mb-4"></div>
                <div className="space-y-2 w-full">
                  <p className="flex justify-between text-base font-medium text-gray-700 dark:text-neutral-300">
                    <span>Team Members</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {department?.members}
                    </span>
                  </p>
                  <p className="flex justify-between text-base font-medium text-gray-700 dark:text-neutral-300">
                    <span>Positions</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {department?.positions}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
