import { Building2, Calendar, Pencil, Trash2 } from "lucide-react";
import { Application } from "@/types/application";
import StatusBadge from "./StatusBadge";

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
}

export default function ApplicationCard({
  application,
  onEdit,
  onDelete,
}: ApplicationCardProps) {
  const { company, position, status, dateApplied, notes } = application;

  const formattedDate = new Date(dateApplied).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">
          {position}
        </h3>
        <StatusBadge status={status} />
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Building2 size={14} className="shrink-0" />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="shrink-0" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {notes && (
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {notes}
        </p>
      )}

      <div className="flex gap-2 mt-auto pt-1 sm:opacity-100 sm:group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(application)}
          aria-label={`Edit ${position} at ${company}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          onClick={() => onDelete(application.id)}
          aria-label={`Delete application for ${position} at ${company}`}
          className="flex-1 flex items-center justify-center gap-2 bg-red-50  hover:bg-red-100 text-red-500 text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
