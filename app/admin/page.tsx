export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 p-6">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">nurserE Admin Dashboard</h1>
          <p className="text-sm text-green-600">Manage users, nurses, and system overview</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
          A
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
          <h3 className="text-sm text-green-600">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-green-800">1,245</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
          <h3 className="text-sm text-green-600">Registered Nurses</h3>
          <p className="mt-2 text-3xl font-bold text-green-800">320</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
          <h3 className="text-sm text-green-600">Active Requests</h3>
          <p className="mt-2 text-3xl font-bold text-green-800">58</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
          <h2 className="mb-4 text-lg font-semibold text-green-800">Recent Users</h2>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span className="text-green-700">Anish Tamang</span>
              <span className="text-green-500">User</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-green-700">Sita Sharma</span>
              <span className="text-green-500">Nurse</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-green-700">Ram Karki</span>
              <span className="text-green-500">User</span>
            </li>
          </ul>
        </div>

        {/* System Activity */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-green-100">
          <h2 className="mb-4 text-lg font-semibold text-green-800">System Activity</h2>
          <ul className="space-y-3 text-sm text-green-700">
            <li>✔ New nurse registered</li>
            <li>✔ User requested home care</li>
            <li>✔ Profile verification completed</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
