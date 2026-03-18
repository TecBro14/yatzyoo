import React from 'react';
import { Button } from '@/components/ui/button';
import AvatarDisplay from './AvatarDisplay';

const avatarOptions = {
  face: [
    { value: 'happy', label: '😊 Happy' },
    { value: 'cool', label: '😎 Cool' },
    { value: 'silly', label: '🤪 Silly' },
    { value: 'determined', label: '😤 Determined' },
    { value: 'sleepy', label: '😴 Sleepy' },
  ],
  hair: [
    { value: 'short', label: '✂️ Short' },
    { value: 'long', label: '💇 Long' },
    { value: 'curly', label: '🌀 Curly' },
    { value: 'spiky', label: '⚡ Spiky' },
    { value: 'bald', label: '🥚 Bald' },
  ],
  eyes: [
    { value: 'normal', label: '👁️ Normal' },
    { value: 'round', label: '⭕ Round' },
    { value: 'squint', label: '😑 Squint' },
    { value: 'wink', label: '😉 Wink' },
    { value: 'star', label: '⭐ Star' },
  ],
  skin: [
    { value: 'light', label: '🌸 Light' },
    { value: 'tan', label: '🌼 Tan' },
    { value: 'brown', label: '🌰 Brown' },
    { value: 'dark', label: '🍫 Dark' },
    { value: 'blue', label: '💙 Blue' },
    { value: 'green', label: '💚 Green' },
  ],
};

export default function AvatarCustomizer({ avatar, onChange }) {
  const handleChange = (category, value) => {
    onChange({ ...avatar, [category]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
          <AvatarDisplay avatar={avatar} size="large" />
        </div>
      </div>

      {Object.entries(avatarOptions).map(([category, options]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700 capitalize">{category}</h3>
          <div className="grid grid-cols-5 gap-2">
            {options.map((option) => (
              <Button
                key={option.value}
                variant={avatar[category] === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleChange(category, option.value)}
                className={`text-xs h-auto py-2 px-1 ${
                  avatar[category] === option.value
                    ? 'bg-amber-500 hover:bg-amber-600 border-amber-600'
                    : 'hover:border-amber-300'
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
