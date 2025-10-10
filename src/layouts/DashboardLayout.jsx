import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/common/Header'
import { Outlet } from 'react-router-dom'
import TimeTracker from '../components/common/TimeTracker'

function DashboardLayout() {
  return (
     <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full ml-0 lg:ml-60 min-h-screen dark:bg-gray-200">
        <Header />
        <main className="mx-4 mb-4 px-4 py-6 flex-1 overflow-y-auto bg-[rgb(247,247,247)] dark:bg-gray-700 rounded-xl">
          <Outlet />
        </main>
      </div>
      <TimeTracker />
    </div>
  )
}

export default DashboardLayout
