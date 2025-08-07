import express from 'express';
import prisma from './prisma.js';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API running 🚀');
});

app.get('/users',async (_req, res) => {
if(prisma?.user === undefined) {
    return res.status(500).json({ error: 'User model not found' });
  }
  const users = await prisma.user.findMany();
  res.json(users);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
