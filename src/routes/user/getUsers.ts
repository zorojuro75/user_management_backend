import { Router } from 'express';
import { supabase } from '../../db';

const router = Router();

router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

    res.json({ users: data });
  } catch (error) {
    console.error('Exception in /users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
