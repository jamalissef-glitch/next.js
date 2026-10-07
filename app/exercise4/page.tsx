'use client';

import { useActionState, useState, useEffect, useTransition } from 'react';
import {
  createTodoAction,
  getTodosAction,
  toggleTodoAction,
  bulkDeleteAction,
  bulkToggleStatusAction,
  Todo,
} from './actions';

// 5. Relative Time Helper
function getRelativeTime(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // 1. Form State Hook
  const [state, formAction, isSubmitting] = useActionState(createTodoAction, null);

  const fetchTodos = () => {
    startTransition(async () => {
      const data = await getTodosAction(search, status);
      setTodos(data);
    });
  };

  useEffect(() => {
    fetchTodos();
  }, [search, status, state]);

  // Handle Selection for Bulk Operations
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === todos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(todos.map((t) => t.id));
    }
  };

  const handleBulkDelete = () => {
    startTransition(async () => {
      await bulkDeleteAction(selectedIds);
      setSelectedIds([]);
      fetchTodos();
    });
  };

  const handleBulkStatus = (completed: boolean) => {
    startTransition(async () => {
      await bulkToggleStatusAction(selectedIds, completed);
      setSelectedIds([]);
      fetchTodos();
    });
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add Todo Manager</h1>

      {/* 1 & 2. Add Todo Form with Priority Level */}
      <form action={formAction} className="p-4 border rounded-lg bg-gray-50 space-y-4">
        <h2 className="font-semibold text-lg">Add New Task</h2>
        <div className="flex gap-2">
          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            className="flex-1 p-2 border rounded"
          />
          <select name="priority" className="p-2 border rounded bg-white">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>

        {/* State feedback */}
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state?.success && <p className="text-green-600 text-sm">{state.message}</p>}
      </form>

      {/* 3. Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 border rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/2"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`px-3 py-1 rounded capitalize text-sm ${
                status === f ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Bulk Operations Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium">{selectedIds.length} items selected</span>
          <div className="space-x-2">
            <button
              onClick={() => handleBulkStatus(true)}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
            >
              Mark Complete
            </button>
            <button
              onClick={() => handleBulkStatus(false)}
              className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
            >
              Mark Incomplete
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Todos List */}
      <div className="border rounded-lg bg-white divide-y">
        <div className="p-3 bg-gray-50 flex items-center gap-3 border-b text-xs font-semibold text-gray-500">
          <input
            type="checkbox"
            checked={todos.length > 0 && selectedIds.length === todos.length}
            onChange={toggleSelectAll}
          />
          <span>Select All</span>
        </div>

        {isPending ? (
          <div className="p-4 text-center text-gray-500">Loading tasks...</div>
        ) : todos.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No tasks found.</div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(todo.id)}
                  onChange={() => toggleSelect(todo.id)}
                />
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    startTransition(async () => {
                      await toggleTodoAction(todo.id);
                      fetchTodos();
                    });
                  }}
                  className="w-4 h-4"
                />
                <div>
                  <p
                    className={`font-medium ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </p>
                  {/* 5. Timestamps */}
                  <span className="text-xs text-gray-400">
                    created {getRelativeTime(todo.createdAt)} • updated {getRelativeTime(todo.updatedAt)}
                  </span>
                </div>
              </div>

              {/* Priority badge */}
              <span
                className={`text-xs px-2 py-1 rounded font-semibold capitalize ${
                  todo.priority === 'high'
                    ? 'bg-red-100 text-red-700'
                    : todo.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {todo.priority}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}