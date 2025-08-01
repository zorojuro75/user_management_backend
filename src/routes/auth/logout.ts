import { Router } from 'express';

const router = Router();

// Example logout endpoint
router.post('/logout', (req, res) => {
  // Destroy session or remove token logic here
  // For stateless JWT, instruct client to delete token
  res.json({ message: 'Logged out successfully' });
});

export default router;
