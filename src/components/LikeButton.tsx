'use client';

import { useState } from 'react';

interface LikeButtonProps {
  profileId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LikeButton({ profileId, size = 'md', className = '' }: LikeButtonProps) {
  const [liked, setLiked] = useState(() => {
    if (typeof window === 'undefined') return false;
    const likes = JSON.parse(localStorage.getItem('allegedly_likes') || '[]');
    return likes.includes(profileId);
  });

  const toggle = () => {
    const next = !liked;
    setLiked(next);

    const likes: string[] = JSON.parse(localStorage.getItem('allegedly_likes') || '[]');
    if (next) {
      likes.push(profileId);
    } else {
      const idx = likes.indexOf(profileId);
      if (idx > -1) likes.splice(idx, 1);
    }
    localStorage.setItem('allegedly_likes', JSON.stringify(likes));
  };

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(); }}
      className={`${sizes[size]} border-2 border-black flex items-center justify-center transition-all ${
        liked
          ? 'bg-black text-white'
          : 'bg-white text-black hover:bg-black hover:text-white'
      } ${className}`}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      {liked ? '♥' : '♡'}
    </button>
  );
}
