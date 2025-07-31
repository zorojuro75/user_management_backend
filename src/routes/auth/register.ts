import { Router } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../../db';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Check user error:', checkError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          status: 'active',
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error || !data || !data.length) {
      console.error('Insert error:', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    const { password: _, ...userWithoutPassword } = data[0];
    res.status(201).json({ user: userWithoutPassword });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
