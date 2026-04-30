import { Application } from '@/types/application'

interface StatsCardsProps {
  applications: Application[]
}

interface StatCardProps {
  label: string
  count: number
  className?: string
  labelClassName?: string
}

function StatCard({ label, count, className = '', labelClassName = '' }: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-6 flex flex-col gap-1 ${className}`}>
      <span className={`text-3xl font-bold ${labelClassName}`}>{count}</span>
      <span className={`text-sm ${labelClassName}`}>{label}</span>
    </div>
  )
}

export default function StatsCards({ applications }: StatsCardsProps) {
  const counts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'Applied').length,
    interviewing: applications.filter((a) => a.status === 'Interviewing').length,
    offered: applications.filter((a) => a.status === 'Offered').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      <StatCard
        label="Total Applications"
        count={counts.total}
        className="border-gray-200 bg-white"
        labelClassName="text-gray-900"
      />
      <StatCard
        label="Applied"
        count={counts.applied}
        className="border-blue-100 bg-blue-50"
        labelClassName="text-blue-500"
      />
      <StatCard
        label="Interviewing"
        count={counts.interviewing}
        className="border-violet-100 bg-violet-50"
        labelClassName="text-violet-500"
      />
      <StatCard
        label="Offered"
        count={counts.offered}
        className="border-green-100 bg-green-50"
        labelClassName="text-green-500"
      />
      <StatCard
        label="Rejected"
        count={counts.rejected}
        className="border-red-100 bg-red-50"
        labelClassName="text-red-500"
      />
    </div>
  )
}
