import { useEffect, useState } from "react";
import "../../App.css";
import { supabase } from "../../supabase-client.tsx";
import type { Session } from "@supabase/supabase-js";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

function TaskManager({ session }: { session: Session }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newDescription, setNewDescription] = useState("");

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading task: ", error.message);
      return;
    }

    setTasks(data);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task: ", error.message);
      return;
    }
  };

  const updateTask = async (id: number) => {
    const { error } = await supabase
      .from("tasks")
      .update({ description: newDescription })
      .eq("id", id);

    if (error) {
      console.error("Error updating task: ", error.message);
      return;
    }

    setNewDescription("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase
      .from("tasks")
      .insert({ ...newTask, email: session.user.email })
      .single();

    if (error) {
      console.error("Error adding task: ", error.message);
      return;
    }

    setNewTask({ title: "", description: "" });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("tasks-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tasks" },
        (payload) => {
          const newTask = payload.new as Task;
          setTasks((prev) => [...prev, newTask]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tasks" },
        (payload) => {
          const updatedTask = payload.new as Task;
          setTasks((prev) =>
            prev.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "tasks" },
        (payload) => {
          const deletedTask = payload.old as Task;
          setTasks((prev) => prev.filter((task) => task.id != deletedTask.id));
        }
      )
      .subscribe((status) => {
        console.log("Subscription: ", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task, key) => (
          <li
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
            key={key}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div>
                <textarea
                  placeholder="Updated description..."
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button
                  style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  style={{ padding: "0.5rem 1rem" }}
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
