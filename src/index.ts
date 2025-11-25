// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route.ts'

const app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/users", userRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});