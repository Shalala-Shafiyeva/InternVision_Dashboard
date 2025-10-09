import { ReactComponent as CurrencyIcon } from "../../assets/icons/currency.svg";
import { ReactComponent as PercentIcon } from "../../assets/icons/percent.svg";
import { ReactComponent as USAFlagIcon } from "../../assets/icons/usa.svg";
import { ReactComponent as EURFlagIcon } from "../../assets/icons/eur.svg";
import { ReactComponent as CADFlagIcon } from "../../assets/icons/cad.svg";
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/arrowdown.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/closesm.svg";
import { ReactComponent as CloseRedIcon } from "../../assets/icons/closeicon.svg";
import { useEffect, useRef, useState } from "react";

const CURRENCIES = [
  {
    id: "USD",
    label: "USD",
    flag: <USAFlagIcon className="h-4 w-4 me-2" />,
  },
  {
    id: "EUR",
    label: "EUR",
    flag: <EURFlagIcon className="h-4 w-4 me-2" />,
  },
  {
    id: "CAD",
    label: "CAD",
    flag: <CADFlagIcon className="h-4 w-4 me-2" />,
  },
];

const OPTIONS = [
  {
    value: "1",
    title: "Christina",
    description: "chris",
    disabled: false,
  },
  {
    value: "2",
    title: "David",
    description: "david",
    disabled: false,
  },
  {
    value: "3",
    title: "Alex",
    description: "alex27",
    disabled: true,
  },
  {
    value: "4",
    title: "Samia",
    description: "samia_samia",
    disabled: false,
  },
];

export default function ProjectForm({ project, onClose, onSave }) {
  const isEditing = !!project;
  const [formData, setFormData] = useState({
    id: isEditing ? project.id : null,
    name: isEditing ? project.name : "",
    status: isEditing ? project.status : "Pending",
    team_size: isEditing ? project.team_size : 1,
    budget: isEditing ? project.budget : 0,
    deadline: isEditing
      ? project.deadline
      : new Date().toISOString().split("T")[0],
  });
  const [budget, setBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); //currency dropdown
  const [selectedValues, setSelectedValues] = useState(["1"]);
  // multi select dropdown (team selector)
  const [isOpen, setIsOpen] = useState(false);
  // search in team members selector
  const [searchTerm, setSearchTerm] = useState("");
  // reference for team selector
  const selectRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // curency dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleRemoveTag = (value, e) => {
    e.stopPropagation();
    setSelectedValues(selectedValues.filter((v) => v !== value));
  };

  const selectedOptions = OPTIONS.filter((opt) =>
    selectedValues.includes(opt.value)
  );

  const filteredOptions = OPTIONS.filter(
    (opt) =>
      opt.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !opt.disabled
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] sm:w-[40%] p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
            {isEditing ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
           <CloseRedIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            {/* progress */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Progress
              </label>
              <input
                type="number"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                required
                placeholder="100"
                min={0}
                max={100}
                className="mt-1 block pe-12 w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <PercentIcon className="w-4 h-4 absolute top-1/2 right-3 transform translate-y-1.5" />
            </div>
          </div>
          {/* currency */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="currency-input"
              className="text-sm font-medium text-gray-700"
            >
              Project Budget
            </label>

            <div className="relative w-full flex" ref={dropdownRef}>
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none z-30">
                <CurrencyIcon className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="currency-input"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="p-2.5 z-20 ps-10 grow text-sm text-gray-900 bg-gray-50 rounded-s-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Enter budget"
                required
              />
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                {selectedCurrency.flag}
                {selectedCurrency.label}
                <ChevronDownIcon />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-36 dark:bg-gray-700">
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {CURRENCIES.map((currency) => (
                      <li key={currency.id}>
                        <button
                          type="button"
                          onClick={() => handleCurrencySelect(currency)}
                          className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          <div className="inline-flex items-center">
                            {currency.flag}
                            {currency.label}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* team members */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Members
            </label>
            <div className="relative w-full" ref={selectRef}>
              <div
                className="relative ps-0.5 pe-9 min-h-11.5 flex items-center flex-wrap text-nowrap w-full border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
              >
                {selectedOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 m-1 dark:bg-neutral-900 dark:border-neutral-700"
                  >
                    <div className="whitespace-nowrap text-gray-800 dark:text-neutral-200">
                      {option.title}
                    </div>
                    <div
                      className="inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-hidden focus:ring-2 focus:ring-gray-400 text-sm dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer"
                      onClick={(e) => handleRemoveTag(option.value, e)}
                      role="button"
                      aria-label={`Remove ${option.title}`}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                ))}
                <input
                  id="hs-tags-input"
                  className="py-2.5 sm:py-3 px-2 min-w-20 rounded-lg order-1 border-transparent focus:ring-0 sm:text-sm outline-hidden dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-neutral-400 flex-grow"
                  placeholder={
                    selectedValues.length === 0 ? "Select option..." : ""
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="absolute top-1/2 end-3 -translate-y-1/2 pointer-events-none">
                  <ChevronDownIcon />
                </div>
              </div>
              {isOpen && (
                <div className="absolute mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700">
                  <ul role="menu" className="py-1">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <li key={option.value}>
                          <button
                            type="button"
                            onClick={() => handleToggleOption(option.value)}
                            className={`"py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" ${
                              option.disabled
                                ? "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50"
                                : ""
                            }`}
                            disabled={option.disabled}
                            role="menuitem"
                          >
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                  {option.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-neutral-500">
                                  {option.description}
                                </div>
                              </div>
                              {selectedValues.includes(option.value) && (
                                <div className="ms-auto">
                                  <CheckIcon className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-500 dark:text-neutral-500">
                        No options found.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-[32px] font-medium bg-gray-200 border border-gray-300 hover:bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white w-[max-content] text-sm py-2 px-4 rounded-[32px] font-medium text-green-800 border border-green-800 hover:bg-green-800 hover:text-white transition duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              {isEditing ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
