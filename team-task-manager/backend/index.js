const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  users.push({
    email,
    password,
  });

  res.json({
    message: "Signup successful",
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  res.json({
    message: "Login successful",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});