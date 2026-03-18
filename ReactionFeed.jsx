import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReactionFeed({ reactions }) {
  const [displayReactions, setDisplayReactions] = useState([]);

  useEffect(() => {
    if (reactions && reactions.length > 0) {
      const latest = reactions[reactions.length - 1];
      const id = Date.now();
      setDisplayReactions(prev => [...prev, { ...latest, id }]);
      
      setTimeout(() => {
        setDisplayReactions(prev => prev.filter(r => r.id !== id));
      }, 3000);
    }
  }, [reactions]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {displayReactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="mb-2 bg-white border-2 border-amber-200 rounded-full px-4 py-2 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{reaction.emoji}</span>
              <div className="text-sm">
                <span className="font-semibold text-slate-800">{reaction.from}</span>
                <span className="text-slate-500 ml-1">{reaction.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
