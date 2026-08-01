import express from 'express';
import passport from 'passport';

const router = express.Router();

// Login route
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

// GitHub callback route
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    // Éxito al iniciar sesión, redirige a Swagger o envía un mensaje
    res.redirect('/api-docs');
  }
);

export default router;
