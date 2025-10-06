import Charts from '../components/charts/Charts'
import UsersTable from '../components/dashboard/UsersTable'

function Users() {
  return (
      <div className="main-panel">
        <Charts />
        <UsersTable />
      </div>
  )
}

export default Users
