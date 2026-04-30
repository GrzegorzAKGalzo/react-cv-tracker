export type ApplicationStatus = 'Applied' | 'Interviewing' | 'Offered' | 'Rejected'

export interface Application {
  id: string
  company: string
  position: string
  status: ApplicationStatus
  dateApplied: string
  notes: string
  jobUrl?: string
  salary?: string
}

export type ApplicationInput = Omit<Application, 'id'>
