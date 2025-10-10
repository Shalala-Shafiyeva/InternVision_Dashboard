import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import projectsData from "../../data.json";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import ProjectDetails from "./ProjectDetails";
import ProjectForm from "./ProjectForm";

const getStatusClasses = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const uniqueStatuses = ["In Progress", "Completed", "Pending"];

function ColumnFilter({ column }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Filter...`}
      className="w-full h-8 px-2 text-sm border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 outline-none"
      onClick={(e) => e.stopPropagation()}
    />
  );
}

function StatusFilter({ column }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <select
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      className="w-full h-8 px-2 text-sm border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 outline-none"
      onClick={(e) => e.stopPropagation()}
    >
      <option value="">All</option>
      {uniqueStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

function ProjectsTable() {
  const [data, setData] = useState(projectsData.projects);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Project name",
        cell: (info) => (
          <span className="font-semibold text-blue-600">{info.getValue()}</span>
        ),
        filterFn: "includesString",
        meta: {
          filterComponent: ColumnFilter,
          filterType: "text",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
              info.getValue()
            )}`}
          >
            {info.getValue()}
          </span>
        ),
        filterFn: "equals",
        meta: {
          filterComponent: StatusFilter,
          filterType: "select",
        },
      },
      {
        accessorKey: "progress",
        header: "Progress (%)",
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-900 h-2.5 rounded-full"
                style={{ width: `${info.getValue()}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {info.getValue()}%
            </span>
          </div>
        ),
        meta: {
          filterComponent: null,
          filterType: "none",
        },
      },
      {
        accessorKey: "team_size",
        header: "Team size",
        size: 100,
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()} üzv</span>
        ),
        meta: {
          filterComponent: ColumnFilter,
          filterType: "text",
        },
      },
      {
        accessorKey: "budget",
        header: "Bunget (AZN)",
        cell: (info) => (
          <span className="font-medium text-green-700">
            {info.getValue().toLocaleString()} AZN
          </span>
        ),
        sortingFn: "alphanumeric",
        meta: {
          filterComponent: ColumnFilter,
          filterType: "text",
        },
      },
      {
        id: "actions",
        header: "Actions",
        size: 120,
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(info.row.original);
              }}
              className="relative p-2 border border-blue-600 rounded-lg overflow-hidden  font-medium text-sm  text-blue-600 hover:text-white transition-colors duration-300 group"
            >
              <span className="absolute inset-0 bg-blue-600 w-0 group-hover:w-full  transition-all duration-300 ease-out  z-0" />
              <EditIcon className="w-5 h-5 relative z-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(info.row.original.id);
              }}
              className="relative p-2 border border-red-600 rounded-lg overflow-hidden text-red-600 hover:text-white transition-colors font-medium text-sm duration-300 group"
            >
              <span className="absolute inset-0 bg-red-600 w-0 group-hover:w-full  transition-all duration-300 ease-out  z-0" />
              <TrashIcon className="w-5 h-5 relative z-8" />
            </button>
          </div>
        ),
        meta: {
          filterComponent: null,
          filterType: "none",
        },
      },
    ],
    [projectsData.projects]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  const handleRowClick = (project) => {
    setSelectedProject(project);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };
  const handleSaveProject = (newProject) => {
    if (newProject.id) {
      setData(
        projectsData.projects.map((p) =>
          p.id === newProject.id ? newProject : p
        )
      );
    } else {
      newProject.id = Date.now();
      setData([newProject, ...data]);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    console.log("Delete user with ID:", id); // Logic to handle deletion
  };

  return (
    <div className="w-full">
      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveProject}
        />
      )}
      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
      <div className="add_btn flex justify-end mb-6">
        <button
          className="flex items-center gap-1 bg-white w-[max-content] group text-sm py-2 px-4 rounded-[32px] font-medium text-green-800 border border-green-800 hover:bg-green-800 hover:text-white transition duration-150"
          onClick={() => {
            setEditingProject(null);
            setIsFormOpen(true);
          }}
        >
          <PlusIcon className="w-4 h-4 text-green-800 group-hover:text-white" />
          <span>Add Project</span>
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-medium">Projects Portfolio</h2>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`px-6 p-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider 
                                  ${
                                    header.column.getCanSort()
                                      ? "cursor-pointer hover:bg-gray-100 transition-colors"
                                      : ""
                                  }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: (
                          <i className="fa-solid fa-sort-up ml-1 text-blue-500"></i>
                        ),
                        desc: (
                          <i className="fa-solid fa-sort-down ml-1 text-blue-500"></i>
                        ),
                      }[header.column.getIsSorted()] ??
                        (header.column.getCanSort() ? (
                          <i className="fa-solid fa-sort ml-1 text-gray-400"></i>
                        ) : null)}
                    </th>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-gray-200 bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-6 py-2 text-left text-xs font-medium text-gray-600"
                    >
                      {header.column.columnDef.meta &&
                      header.column.columnDef.meta.filterComponent
                        ? flexRender(
                            header.column.columnDef.meta.filterComponent,
                            header.getContext()
                          )
                        : null}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-blue-50/50 transition-colors"
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 flex flex-col gap-2 sm:flex-row sm:gap-0 items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <p>
              Filtered: {table.getFilteredRowModel().rows.length} / Total:{" "}
              {data.length} project(s)
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-2 py-1 border border-gray-300 rounded-lg outline-none"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <span className="flex items-center gap-1">
              Page
              <strong className="font-semibold">
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <div className="flex space-x-1">
              <button
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Prev
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-100 transition-colors"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsTable;
