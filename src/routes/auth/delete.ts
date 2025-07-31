import { Router } from 'express';
import { supabase } from '../../db';

const router = Router();

router.post('/deleteUser', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)
      .select();

    if (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: data[0] });
  } catch (error) {
    console.error('Delete user exception:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
