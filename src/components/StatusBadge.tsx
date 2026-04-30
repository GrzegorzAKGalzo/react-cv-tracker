import { ApplicationStatus } from '@/types/application'

const styles: Record<ApplicationStatus, string> = {
  Applied: 'bg-blue-50 text-blue-500 border-blue-100',
  Interviewing: 'bg-violet-50 text-violet-500 border-violet-100',
  Offered: 'bg-green-50 text-green-500 border-green-100',
  Rejected: 'bg-red-50 text-red-500 border-red-100',
}

const symbols: Record<ApplicationStatus, string> = {
  Applied: '→',
  Interviewing: '◎',
  Offered: '✓',
  Rejected: '✕',
}

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full border shrink-0 ${styles[status]}`}>
      <span aria-hidden="true">{symbols[status]} </span>{status}
    </span>
  )
}
