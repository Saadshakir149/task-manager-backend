import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedCounter from '../components/AnimatedCounter';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const floatingParticles = [
  { left: '6%', top: '10%', color: '#6366f1', delay: '0s' },
  { left: '22%', top: '24%', color: '#14b8a6', delay: '1s' },
  { left: '48%', top: '14%', color: '#a855f7', delay: '0.5s' },
  { left: '66%', top: '32%', color: '#6366f1', delay: '1.6s' },
  { left: '84%', top: '18%', color: '#14b8a6', delay: '0.8s' },
];

export default function Dashboard() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [neonEnabled, setNeonEnabled] = useState(true);
  const [particleEnabled, setParticleEnabled] = useState(true);
  const [creationBursts, setCreationBursts] = useState([]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/tasks`, {
        headers,
        params: {
          status: statusFilter,
          priority: priorityFilter,
          search,
        },
      });
      setTasks(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 250);

    return () => clearTimeout(timer);
  }, [statusFilter, priorityFilter, search]);

  const handleCreateOrUpdate = async (formData) => {
    setSaving(true);
    try {
      if (editingTask) {
        await axios.put(`${API_URL}/tasks/${editingTask._id}`, formData, { headers });
        toast.success('Task updated');
      } else {
        await axios.post(`${API_URL}/tasks`, formData, { headers });
        setCreationBursts((prev) => [...prev, { id: Date.now() }]);
        toast.success('Task created');
      }
      setEditingTask(null);
      setModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task) => {
    const ok = window.confirm(`Delete "${task.title}"?`);
    if (!ok) return;

    try {
      await axios.delete(`${API_URL}/tasks/${task._id}`, { headers });
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
      await axios.put(`${API_URL}/tasks/${task._id}`, { status: nextStatus }, { headers });
      if (nextStatus === 'completed') {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.75 },
        });
      }
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    if (!creationBursts.length) return;
    const timer = setTimeout(() => {
      setCreationBursts((prev) => prev.slice(1));
    }, 700);
    return () => clearTimeout(timer);
  }, [creationBursts]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-animated-gradient relative">
      {particleEnabled && (
        <div className="particle-bg" aria-hidden="true">
          {floatingParticles.map((particle, idx) => (
            <span
              key={idx}
              className="particle"
              style={{ left: particle.left, top: particle.top, backgroundColor: particle.color, animationDelay: particle.delay }}
            />
          ))}
        </div>
      )}

      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5 relative">
        <ProgressBar active={loading || saving} />

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-primary-700">Your Tasks</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingTask(null);
                setModalOpen(true);
              }}
              className="ripple-btn focus-ring px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
            >
              + New Task
            </button>
            <button
              onClick={() => setNeonEnabled((v) => !v)}
              className="ripple-btn focus-ring px-3 py-2 rounded-md bg-white border border-primary-200 hover:bg-primary-50"
            >
              {neonEnabled ? 'Neon on' : 'Neon off'}
            </button>
            <button
              onClick={() => setParticleEnabled((v) => !v)}
              className="ripple-btn focus-ring px-3 py-2 rounded-md bg-white border border-primary-200 hover:bg-primary-50"
            >
              {particleEnabled ? 'Particles on' : 'Particles off'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <AnimatedCounter value={stats.total} label="Total" />
          <AnimatedCounter value={stats.completed} label="Completed" />
          <AnimatedCounter value={stats.pending} label="Pending" />
        </div>

        <div className="bg-white/90 backdrop-blur border border-primary-100 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-3 shadow-sm">
          <input
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 focus-ring"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 focus-ring">
            <option value="all">All status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 focus-ring">
            <option value="all">All priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={(task) => {
            setEditingTask(task);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          neonEnabled={neonEnabled}
        />

        <TaskModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
          loading={saving}
        />

        {creationBursts.map((burst) => (
          <motion.div
            key={burst.id}
            className="pointer-events-none absolute left-1/2 top-20"
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.1 }}
            transition={{ duration: 0.65 }}
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500/35 via-secondary-500/35 to-accent-500/35 blur-sm" />
          </motion.div>
        ))}
      </main>
    </div>
  );
}
