export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">CV Tracker</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track your job applications</p>
        </div>
      </header>
      <main className="px-4 sm:px-8 py-8 flex-1">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <footer className="border-t border-gray-100 px-4 sm:px-8 py-6 mt-8">
        <div className="max-w-7xl mx-auto flex items-start gap-3 text-xs text-gray-400">
          <span className="text-base leading-none mt-0.5">🔒</span>
          <p>
            <span className="font-medium text-gray-500">Your data never leaves your device.</span>{' '}
            All applications are saved in your browser&apos;s local storage — no server, no database, no third party.
            If you clear your browser data or switch devices, your applications will be gone.
          </p>
        </div>
      </footer>
    </div>
  )
}
