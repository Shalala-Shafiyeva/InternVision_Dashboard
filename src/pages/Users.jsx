import { useState } from "react";
import StatisticsBar from "../components/users/StatisticsBar";
import UsersTable from "../components/users/UsersTable";
import CreateUser from "../components/users/CreateUser";

function Users() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-6">
      {isOpen && <CreateUser handleOpenModal={handleOpenModal} />}
      <div className="head flex flex-col gap-4 dark:text-white">
        <h2 className="text-4xl font-medium">Users</h2>
        <span className="text-gray-500 dark:text-gray-200">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium,
          quisquam.
        </span>
      </div>
      <StatisticsBar />
      <UsersTable handleOpenModal={handleOpenModal} />
    </div>
  );
}

export default Users;
