import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isCensored = (text) => {
    const badWords = [
      'fuck', 'shit', 'ass', 'bitch', 'damn', 'crap', 'hell', 'bastard',
      'dick', 'cock', 'pussy', 'cunt', 'whore', 'slut', 'nigger', 'fag',
      'retard', 'nazi', 'hitler', 'sex', 'porn', 'rape', 'kill', 'murder'
    ];
    const lowerText = text.toLowerCase();
    return badWords.some(word => lowerText.includes(word));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (isSignUp && isCensored(username)) {
      setError('Username contains inappropriate content');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Store credentials in localStorage (simple auth for game)
        const users = JSON.parse(localStorage.getItem('yatzy_users') || '{}');
        
        // Check username uniqueness (case-insensitive)
        const normalizedUsername = username.toLowerCase();
        const existingUser = Object.keys(users).find(
          key => key.toLowerCase() === normalizedUsername
        );
        
        if (existingUser) {
          setError('Username already exists');
          setLoading(false);
          return;
        }

        users[username] = { 
          password, 
          createdAt: new Date().toISOString(),
          friends: [],
          pendingInvites: [],
          gameInvites: []
        };
        localStorage.setItem('yatzy_users', JSON.stringify(users));
        localStorage.setItem('yatzy_current_user', username);
        
        // Trigger storage event for other tabs
        window.dispatchEvent(new Event('storage'));
        
        onSuccess(username);
        onClose();
      } else {
        // Sign in - FIXED PASSWORD VERIFICATION
        const users = JSON.parse(localStorage.getItem('yatzy_users') || '{}');
        
        // Find exact username match
        if (!users[username]) {
          setError('Username not found');
          setLoading(false);
          return;
        }

        // Verify password matches exactly
        const storedPassword = users[username]?.password;
        if (!storedPassword || storedPassword !== password) {
          setError('Incorrect password');
          setLoading(false);
          return;
        }

        localStorage.setItem('yatzy_current_user', username);
        
        // Trigger storage event for other tabs
        window.dispatchEvent(new Event('storage'));
        
        onSuccess(username);
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            {isSignUp ? (
              <UserPlus className="w-12 h-12 text-amber-500 mx-auto" />
            ) : (
              <LogIn className="w-12 h-12 text-amber-500 mx-auto" />
            )}
            <h2 className="text-2xl font-bold text-slate-800">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-sm text-slate-500">
              {isSignUp ? 'Join the game and track your scores' : 'Welcome back!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="rounded-xl"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="rounded-xl"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 rounded-xl h-11"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
