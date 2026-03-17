'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface LikeButtonProps {
  profileId: string;
  size?: 'sm' | 'lg';
}

export default function LikeButton({ profileId, size = 'sm' }: LikeButtonProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      const stored = JSON.parse(localStorage.getItem('allegedly_likes') || '[]');
      setLiked(stored.includes(profileId));
      return;
    }

    supabase
      .from('likes')
      .select('id')
      .eq('liker_id', user.id)
      .eq('liked_id', profileId)
      .maybeSingle()
      .then(({ data }) => setLiked(!!data));
  }, [user, profileId]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    setLoading(true);

    if (!user) {
      const stored: string[] = JSON.parse(localStorage.getItem('allegedly_likes') || '[]');
      const next = liked ? stored.filter(id => id !== profileId) : [...stored, profileId];
      localStorage.setItem('allegedly_likes', JSON.stringify(next));
      setLiked(!liked);
      setLoading(false);
      return;
    }

    if (liked) {
      await supabase.from('likes').delete()
        .eq('liker_id', user.id)
        .eq('liked_id', profileId);
    } else {
      await supabase.from('likes').insert({ liker_id: user.id, liked_id: profileId });
    }

    setLiked(!liked);
    setLoading(false);
  };

  const sizeClass = size === 'lg' ? 'w-12 h-12 text-xl' : 'w-9 h-9 text-base';

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`${sizeClass} flex items-center justify-center border-2 border-black transition ${
        liked ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
      }`}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      {liked ? '♥' : '♡'}
    </button>
  );
}
