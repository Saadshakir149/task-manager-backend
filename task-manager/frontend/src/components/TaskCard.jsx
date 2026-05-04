import { format } from 'date-fns';
import { motion } from 'framer-motion';

const priorityColor = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus, neonEnabled }) {
  const isCompleted = task.status === 'completed';

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`rounded-xl p-[1px] bg-gradient-to-r ${
        isCompleted
          ? 'from-accent-500 via-primary-500 to-secondary-500'
          : 'from-slate-200 via-slate-200 to-slate-200'
      }`}
    >
      <div
        className={`bg-white rounded-[11px] p-4 space-y-3 border ${
          neonEnabled ? 'shadow-neon border-primary-200' : 'shadow-sm border-slate-200'
        } transition-shadow duration-300`}
      >
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-slate-900">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColor[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        {task.description && <p className="text-sm text-slate-600">{task.description}</p>}

        <div className="text-xs text-slate-500">
          Due: {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'Not set'}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onToggleStatus(task)}
            className={`ripple-btn focus-ring text-xs px-2 py-1 rounded-md transition-colors ${
              isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
            }`}
          >
            {task.status}
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="ripple-btn focus-ring text-sm px-2 py-1 rounded bg-primary-600 text-white hover:bg-primary-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task)}
              className="ripple-btn focus-ring text-sm px-2 py-1 rounded bg-rose-600 text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
