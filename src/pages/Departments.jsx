import React, { useState } from "react";
import DepartmentCards from "../components/departments/DepartmentCards";

export default function Departments() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-6">
      {/* {isOpen && <CreateUser handleOpenModal={handleOpenModal} />} */}
      <div className="head flex flex-col gap-4 dark:text-white">
        <h2 className="text-4xl font-medium">Departments</h2>
        <span className="text-gray-500 dark:text-gray-200">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          quisquam.
        </span>
      </div>
      <DepartmentCards handleOpenModal={handleOpenModal} />
    </div>
  );
}
