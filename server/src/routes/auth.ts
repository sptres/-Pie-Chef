import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = Router();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
};

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await (user as any).comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'your_jwt_secret'
    );
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'Unknown error' });
    }
  }
});

export default router;
