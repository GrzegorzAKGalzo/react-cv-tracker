export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">CV Tracker</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track your job applications</p>
        </div>
      </header>
      <main className="px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
