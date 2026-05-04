import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

export default function TaskForm({ onSubmit, editingTask, onCancel, loading }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (!editingTask) {
      setForm(initialState);
      return;
    }

    setForm({
      title: editingTask.title || '',
      description: editingTask.description || '',
      priority: editingTask.priority || 'medium',
      dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '',
    });
  }, [editingTask]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-primary-100 rounded-xl p-5 space-y-3 shadow-xl">
      <h2 className="font-semibold text-lg text-primary-700">{editingTask ? 'Edit Task' : 'New Task'}</h2>
      <input
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full rounded-md border border-slate-300 px-3 py-2 focus-ring"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-300 px-3 py-2 focus-ring"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select name="priority" value={form.priority} onChange={handleChange} className="rounded-md border border-slate-300 px-3 py-2 focus-ring">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="rounded-md border border-slate-300 px-3 py-2 focus-ring" />
      </div>
      <div className="flex gap-2">
        <button disabled={loading} className="ripple-btn focus-ring px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60">
          {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
        </button>
        <button type="button" onClick={onCancel} className="ripple-btn focus-ring px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200">
          Cancel
        </button>
      </div>
    </form>
  );
}
