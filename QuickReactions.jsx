import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const reactions = [
  { emoji: '👋', label: 'Hi!' },
  { emoji: '🎲', label: 'Your turn' },
  { emoji: '🍀', label: 'Good luck' },
  { emoji: '🔥', label: 'Nice!' },
  { emoji: '😂', label: 'LOL' },
  { emoji: '😎', label: 'GG' },
  { emoji: '🤔', label: 'Thinking...' },
  { emoji: '⏰', label: 'Hurry up' },
  { emoji: '💪', label: 'Let\'s go!' },
  { emoji: '👏', label: 'Well played' },
];

export default function QuickReactions({ onSendReaction }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Smile className="w-5 h-5 text-amber-500" />
          <span className="font-semibold text-slate-700 text-sm">Quick Reactions</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200"
          >
            <div className="grid grid-cols-5 gap-2 p-3">
              {reactions.map((reaction, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSendReaction(reaction);
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-amber-50 transition-colors group"
                  title={reaction.label}
                >
                  <span className="text-2xl">{reaction.emoji}</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-amber-700 transition-colors">
                    {reaction.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
