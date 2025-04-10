import { Router } from 'express';
import type { Request, Response } from 'express';
const router = Router();

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' }
];

router.get('/', (_req, res:Response) => {
  res.json(users);
});

export default router;