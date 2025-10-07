import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
// Предположим, что data.json содержит { projects: [...] }
import projectsData from "../../data.json"; 

// ----------------------------------------------------------------------
// 1. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (ВНЕ КОМПОНЕНТА)
// ----------------------------------------------------------------------

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

function ColumnFilter({ column }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Filtirlə...`}
      className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
      onClick={(e) => e.stopPropagation()}
    />
  );
}

// ----------------------------------------------------------------------
// 2. ГЛАВНЫЙ КОМПОНЕНТ ТАБЛИЦЫ
// ----------------------------------------------------------------------

// Изменил имя компонента на UsersTable, чтобы соответствовать данным
function UsersTable() { 
  const [data] = useState(projectsData.projects);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // 3. Определение колонок (теперь здесь нет проблем с зависимостями)
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <>
            <span className="flex justify-between items-center">
              Proyekt Adı
            </span>
            <ColumnFilter column={column} />
          </>
        ),
        cell: (info) => (
          <span className="font-semibold text-blue-600">{info.getValue()}</span>
        ),
        filterFn: "includesString",
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
      },
      {
        accessorKey: "progress",
        header: "İrəliləyiş (%)",
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${info.getValue()}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {info.getValue()}%
            </span>
          </div>
        ),
      },
      {
        accessorKey: "team_size",
        header: "Komanda Sayı",
        size: 100,
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()} üzv</span>
        ),
      },
      {
        accessorKey: "budget",
        header: "Büdcə (AZN)",
        cell: (info) => (
          <span className="font-medium text-green-700">
            {info.getValue().toLocaleString()} AZN
          </span>
        ),
        sortingFn: "alphanumeric",
      },
    ],
    []
  );

  // 4. Инициализация таблицы: Теперь передаем columns напрямую!
  const table = useReactTable({
    data,
    columns, // 👈 Передаем колонки сюда
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  // 5. Удаляем лишний useEffect:
  // Если columns передаются напрямую, этот useEffect больше не нужен
  /* useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      columns,
    }));
  }, [columns, table]);
  */

  return (
    <div className="w-full p-4">
      <div className="w-full p-4">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Хедер и Глобальный Поиск */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Proyekt Portfeli
            </h2>

            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Ümumi Axtarış..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          </div>

          {/* Тело Таблицы */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Заголовки (Thead) */}
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider 
                          ${header.column.getCanSort() ? "cursor-pointer hover:bg-gray-100 transition-colors" : ""}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {/* Иконка сортировки */}
                        {{
                          asc: (<i className="fa-solid fa-sort-up ml-1 text-blue-500"></i>),
                          desc: (<i className="fa-solid fa-sort-down ml-1 text-blue-500"></i>),
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? (
                            <i className="fa-solid fa-sort ml-1 text-gray-400"></i>
                          ) : null)}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {/* Строки (Tbody) */}
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-blue-50/50 transition-colors"
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
                      Heç bir nəticə tapılmadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Футер Таблицы */}
          <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
            <p>
              Göstərilən nəticələr: {table.getFilteredRowModel().rows.length} /
              Cəmi: {data.length} proyekt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;