import axios from "axios";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const [role, setRole] = useState("Admin");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/signup",
        {
          email,
          password,
        }
      );

      alert(res.data.message);
    } catch (error) {
      alert("User already exists");
    }
  };

  const addTask = () => {
    if (!projectName || !taskTitle) {
      alert("Enter project name and task title");
      return;
    }

    const newTask = {
      id: Date.now(),
      project: projectName,
      title: taskTitle,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setProjectName("");
    setTaskTitle("");
  };

  const changeStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4f8",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            width: "300px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#333",
              fontSize: "32px",
              lineHeight: "40px",
            }}
          >
            Team Task Manager
          </h1>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            Login
          </button>

          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Dashboard</h1>

        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>
          Select Role:
        </label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "10px",
          }}
        >
          <option>Admin</option>
          <option>Member</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Completed</h3>
          <p>
            {
              tasks.filter(
                (t) => t.status === "Completed"
              ).length
            }
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Pending</h3>
          <p>
            {
              tasks.filter(
                (t) => t.status === "Pending"
              ).length
            }
          </p>
        </div>
      </div>

      {role === "Admin" && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <h2>Create Project & Task</h2>

          <input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <input
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "10px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>
      )}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Task List</h2>

        {tasks.length === 0 ? (
          <p>No tasks added</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <p>
                <b>Project:</b> {task.project}
              </p>

              <p>
                <b>Task:</b> {task.title}
              </p>

              <p>
                <b>Status:</b> {task.status}
              </p>

              {task.status === "Pending" && (
                <button
                  onClick={() =>
                    changeStatus(task.id)
                  }
                  style={{
                    marginRight: "10px",
                    padding: "8px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Mark Completed
                </button>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  padding: "8px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;