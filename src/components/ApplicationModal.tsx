'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { Application, ApplicationInput, ApplicationStatus } from '@/types/application'

const schema = z.object({
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  status: z.enum(['Applied', 'Interviewing', 'Offered', 'Rejected']),
  dateApplied: z.string().min(1, 'Date is required'),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters'),
  jobUrl: z.string(),
  salary: z.string(),
})

type FormValues = z.infer<typeof schema>

const STATUSES: ApplicationStatus[] = ['Applied', 'Interviewing', 'Offered', 'Rejected']

interface ApplicationModalProps {
  editing: Application | null
  onClose: () => void
  onSubmit: (data: ApplicationInput) => void
}

export default function ApplicationModal({ editing, onClose, onSubmit }: ApplicationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      position: '',
      company: '',
      status: 'Applied',
      dateApplied: new Date().toISOString().split('T')[0],
      notes: '',
      jobUrl: '',
      salary: '',
    },
  })

  const notesValue = watch('notes', '')

  useEffect(() => {
    if (editing) {
      reset({
        position: editing.position,
        company: editing.company,
        status: editing.status,
        dateApplied: editing.dateApplied,
        notes: editing.notes,
        jobUrl: editing.jobUrl ?? '',
        salary: editing.salary ?? '',
      })
    } else {
      reset({
        position: '',
        company: '',
        status: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0],
        notes: '',
        jobUrl: '',
        salary: '',
      })
    }
  }, [editing, reset])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function submit(values: FormValues) {
    onSubmit(values)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90dvh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 id="modal-title" className="font-semibold text-gray-900">
            {editing ? 'Edit Application' : 'Add Application'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Position" id="position" error={errors.position?.message}>
              <input
                id="position"
                autoFocus
                {...register('position')}
                placeholder="e.g. Senior Frontend Dev"
                className="input"
              />
            </Field>
            <Field label="Company" id="company" error={errors.company?.message}>
              <input
                id="company"
                {...register('company')}
                placeholder="e.g. Google"
                className="input"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Status" id="status" error={errors.status?.message}>
              <select id="status" {...register('status')} className="input">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date Applied" id="dateApplied" error={errors.dateApplied?.message}>
              <input id="dateApplied" type="date" {...register('dateApplied')} className="input" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Job URL (optional)" id="jobUrl">
              <input
                id="jobUrl"
                {...register('jobUrl')}
                placeholder="https://..."
                className="input"
              />
            </Field>
            <Field label="Salary (optional)" id="salary">
              <input
                id="salary"
                {...register('salary')}
                placeholder="e.g. $120k–$150k"
                className="input"
              />
            </Field>
          </div>

          <Field label="Notes" id="notes" error={errors.notes?.message}>
            <textarea
              id="notes"
              {...register('notes')}
              placeholder="Any notes about this application..."
              rows={3}
              className="input resize-none"
            />
            <p className="text-xs text-gray-400 text-right">{notesValue.length}/500</p>
          </Field>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {editing ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <span id={`${id}-error`} role="alert" className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
