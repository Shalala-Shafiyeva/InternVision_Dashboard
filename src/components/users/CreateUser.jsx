import { useForm } from "react-hook-form";

function CreateUser({ handleOpenModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    // const newUsers = [...localUsers, data];
    // setLocalUsers(newUsers);
    handleOpenModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] sm:w-[40%] p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleOpenModal}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl leading-none"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Add New User
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fullname
              </label>
              <input
                {...register("fullname", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters",
                  },
                })}
                type="text"
                name="fullname"
                id="fullname"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter full name"
              />
              {errors.fullname && (
                <div className="mt-1 text-red-500 text-xs">
                  {errors.fullname.message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone
              </label>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^^\+994 \d{2} \d{3} \d{2} \d{2}$/,
                    message:
                      "Phone number must be in the format +994 XX XXX XX XX",
                  },
                })}
                type="tel"
                name="phone"
                id="phone"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
                placeholder="+994 XX XXX XX XX"
              />
              {errors.phone && (
                <div className="mt-1 text-red-500 text-xs">
                  {errors.phone.message}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
                placeholder="example@mail.com"
              />
              {errors.email && (
                <div className="mt-1 text-red-500 text-xs">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                name="password"
                id="password"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
                placeholder="example@mail.com"
              />
              {errors.password && (
                <div className="mt-1 text-red-500 text-xs">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Role
            </label>
            <select
                name="role"
                id="role"
                {...register("role", {
                  required: "Role is required",
                })}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
              >
               <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
                <option value="developer">Developer</option>
              </select>
            {errors.role && (
              <div className="mt-1 text-red-500 text-xs">
                {errors.role.message}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Department
              </label>
              <select
                name="department"
                id="department"
                {...register("department", {
                  required: "Department is required",
                })}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">Select department</option>
                <option value="it">IT</option>
                <option value="main">Main Office</option>
              </select>
              {errors.department && (
                <div className="mt-1 text-red-500 text-xs">
                  {errors.department.message}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Position
              </label>
              <select
                name="position"
                id="position"
                {...register("position", {
                  required: "Position is required",
                })}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">Select position</option>
                <option value="ceo">CEO</option>
                <option value="manager">Manager</option>
                <option value="tester">Tester</option>
                <option value="developer">Developer</option>
              </select>
              {errors.position && (
                <div className="mt-1 text-red-500 text-xs">
                  {errors.position.message}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleOpenModal}
              className="px-4 py-2 rounded-[32px] font-medium bg-gray-200 border border-gray-300 hover:bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-white w-[max-content] text-sm py-2 px-4 rounded-[32px] font-medium text-green-800 border border-green-800 hover:bg-green-800 hover:text-white transition duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
