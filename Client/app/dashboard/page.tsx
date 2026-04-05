"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const [editId, setEditId] = useState<number | null>(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
     const params: any = { page };
if (search) params.search = search;
if (status !== "") params.status = status;

const res = await api.get("/tasks", { params });

      setTasks(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  const handleAddTask = async (e: any) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Title is required");
    }

    setLoading(true);
    try {
      await api.post("/tasks", { title, description });

      toast.success("Task added successfully");

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };



const handleUpdate = async (id: number) => {
  if (!editTitle.trim()) {
    return toast.error("Title is required");
  }

  setLoading(true);
  try {
    await api.patch(`/tasks/${id}`, {
      title: editTitle,
      description: editDescription,
    });

    toast.success("Task updated");

    setEditId(null);
    setEditTitle("");
    setEditDescription("");

    fetchTasks();
  } catch {
    toast.error("Update failed");
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    setLoading(true);
    try {
      await api.patch(`/tasks/${id}/toggle`);
      toast.success("Task updated");
      fetchTasks();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>

      {/* Add Task */}
      <form
        onSubmit={handleAddTask}
        className="shadow p-4 rounded mb-6 space-y-3 border border-gray-600"
      >
        <input
          type="text"
          placeholder="Task title"
          className="w-full border p-2 bg-gray-900 text-white rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="w-full border p-2 bg-gray-900 text-white rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="border p-2 flex-1 bg-gray-900 text-white rounded"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border p-2 bg-gray-900 text-white rounded"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-400">Loading...</p>
      )}

      {/* Empty State */}
      {!loading && tasks.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No tasks found
        </p>
      )}

      {/* Task List */}
      <div className="space-y-3">
   {!loading &&
  tasks.map((task) => (
    <div
      key={task.id}
      className="p-4 shadow rounded flex justify-between items-center"
    >
      {/* LEFT SIDE */}
      <div className="flex-1">
        {editId === task.id ? (
          <>
            <input
              className="w-full border p-1 mb-1 bg-gray-900 text-white rounded"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              className="w-full border p-1 bg-gray-900 text-white rounded"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3
              className={`font-semibold ${
                task.status ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600">
              {task.description}
            </p>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="space-x-2">
        {editId === task.id ? (
          <>
            <button
              onClick={() => handleUpdate(task.id)}
              disabled={loading}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setEditId(null)}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditId(task.id);
                setEditTitle(task.title);
                setEditDescription(task.description || "");
              }}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleToggle(task.id)}
              disabled={loading}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              {task.status ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              disabled={loading}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`px-3 py-1 border rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-3 py-1 border rounded ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}