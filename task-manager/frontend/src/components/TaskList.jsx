import { AnimatePresence, motion } from 'framer-motion';
import LoadingSkeleton from './LoadingSkeleton';
import TaskCard from './TaskCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus, loading, neonEnabled }) {
  if (loading) return <LoadingSkeleton />;

  return (
    <AnimatePresence mode="wait">
      {tasks.length ? (
        <motion.div
          key="task-grid"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {tasks.map((task) => (
            <motion.div key={task._id} variants={itemVariants} layout whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}>
              <TaskCard
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
                neonEnabled={neonEnabled}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="empty-state"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="py-10 text-center text-slate-500 bg-white border rounded-lg"
        >
          No tasks found.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
