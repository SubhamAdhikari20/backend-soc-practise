import express from 'express';

const app = express();
app.use(express.json());

// In-memory storage - 
let users: any[] = [
  { id: "user1", username: 'john_doe', email: 'john@example.com', name: 'John Doe', age: 30 },
  { id: "user2", username: 'jane_smith', email: 'jane@example.com', name: 'Jane Smith', age: 25 },
];
let nextId = 3;

// GET all users - 
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user - 
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(u => u.id === id);
  
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  res.json(user);
});

// POST new user - 
app.post('/api/users', (req, res) => {
  const { username, email, name, age } = req.body;
  
  
  if (!username || !email || !name) {
    res.status(400).json({ error: 'Username, email, and name are required' });
    return;
  }
  
  
  const existingUserByEmail = users.find(u => u.email === email);
  if (existingUserByEmail) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }
  
  const existingUserByUsername = users.find(u => u.username === username);
  if (existingUserByUsername) {
    res.status(409).json({ error: 'Username already exists' });
    return;
  }
  
  
  const newUser = {
    id: nextId++,
    username,
    email,
    name,
    age: age || null
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user - 
app.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const { username, email, name, age } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  
  if (!username || !email || !name) {
    res.status(400).json({ error: 'Username, email, and name are required' });
    return;
  }
  
  
  const existingUserByEmail = users.find(u => u.email === email && u.id !== id);
  if (existingUserByEmail) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }
  
  const existingUserByUsername = users.find(u => u.username === username && u.id !== id);
  if (existingUserByUsername) {
    res.status(409).json({ error: 'Username already exists' });
    return;
  }
  
  
  users[userIndex] = {
    id,
    username,
    email,
    name,
    age: age || users[userIndex].age
  };
  
  res.json(users[userIndex]);
});

// DELETE user - 
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
