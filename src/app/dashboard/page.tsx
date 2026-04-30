'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Filter, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Application, ApplicationInput, ApplicationStatus } from '@/types/application'
import { repository } from '@/lib/repository'
import StatsCards from '@/components/StatsCards'
import ApplicationCard from '@/components/ApplicationCard'
import ApplicationModal from '@/components/ApplicationModal'

type FilterOption = 'All Applications' | ApplicationStatus

const FILTER_OPTIONS: FilterOption[] = [
  'All Applications',
  'Applied',
  'Interviewing',
  'Offered',
  'Rejected',
]

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="h-5 w-36 bg-gray-200 rounded" />
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-2 mt-auto pt-1">
        <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterOption>('All Applications')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Application | null>(null)

  const load = useCallback(() => {
    setApplications(repository.getAll())
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const statusCounts = useMemo(
    () => ({
      Applied: applications.filter((a) => a.status === 'Applied').length,
      Interviewing: applications.filter((a) => a.status === 'Interviewing').length,
      Offered: applications.filter((a) => a.status === 'Offered').length,
      Rejected: applications.filter((a) => a.status === 'Rejected').length,
    }),
    [applications],
  )

  const filtered =
    filter === 'All Applications'
      ? applications
      : applications.filter((a) => a.status === filter)

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(app: Application) {
    setEditing(app)
    setModalOpen(true)
  }

  function handleSave(data: ApplicationInput) {
    if (editing) {
      repository.update(editing.id, data)
      toast.success('Application updated')
    } else {
      repository.create(data)
      toast.success('Application added')
    }
    load()
  }

  function handleDelete(id: string) {
    const app = applications.find((a) => a.id === id)
    const label = app ? `"${app.company} — ${app.position}"` : 'this application'
    if (!confirm(`Delete ${label}?`)) return
    repository.delete(id)
    load()
    toast.success('Application deleted')
  }

  return (
    <>
      <StatsCards applications={applications} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-gray-400 shrink-0" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterOption)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt === 'All Applications'
                  ? `All Applications (${applications.length})`
                  : `${opt} (${statusCounts[opt as ApplicationStatus]})`}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Application
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <span className="text-4xl">📋</span>
          <p className="text-sm">
            {filter === 'All Applications'
              ? 'No applications yet. Add your first one!'
              : `No ${filter} applications.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <ApplicationModal
          editing={editing}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSave}
        />
      )}
    </>
  )
}
