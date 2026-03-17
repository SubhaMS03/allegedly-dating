'use client';

import { useState, useEffect } from 'react';
import { ALL_INTERESTS } from '@/lib/mockData';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface ProfileData {
  name: string;
  age: string;
  gender: string;
  bio: string;
  interests: string[];
  location: string;
  lookingFor: string;
}

export default function ProfileForm() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProfileData>({
    name: '', age: '', gender: '', bio: '', interests: [], location: '', lookingFor: '',
  });

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      .then(({ data: profile }) => {
        if (profile) {
          setData({
            name: profile.name || '',
            age: profile.age?.toString() || '',
            gender: profile.gender || '',
            bio: profile.bio || '',
            interests: profile.interests || [],
            location: profile.location || '',
            lookingFor: profile.looking_for || '',
          });
        }
        setLoading(false);
      });
  }, [user]);

  const update = (field: keyof ProfileData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const toggleInterest = (interest: string) => {
    const next = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];
    update('interests', next);
  };

  const handleSave = async () => {
    setSaving(true);

    if (user) {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        name: data.name,
        age: parseInt(data.age) || null,
        gender: data.gender,
        bio: data.bio,
        interests: data.interests,
        location: data.location,
        looking_for: data.lookingFor,
        photos: [],
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Error saving profile:', error);
        setSaving(false);
        return;
      }
    } else {
      localStorage.setItem('allegedly_my_profile', JSON.stringify(data));
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full px-4 py-3 border-2 border-black bg-white text-black font-mono text-sm placeholder:text-gray-400 outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all";

  if (loading) {
    return <div className="py-20 text-center font-mono text-sm text-gray-400 uppercase tracking-widest">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {!user && (
        <div className="border-2 border-black p-4 bg-gray-50">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-600 font-mono">
            <a href="/auth/signup" className="underline">Create an account</a> to save your profile permanently.
          </p>
        </div>
      )}

      {/* Name & Age */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your first name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Age</label>
          <input
            type="number"
            value={data.age}
            onChange={(e) => update('age', e.target.value)}
            placeholder="25"
            min={18}
            max={100}
            className={inputClass}
          />
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">I identify as</label>
        <div className="flex gap-1">
          {[
            { value: 'female', label: 'Woman' },
            { value: 'male', label: 'Man' },
            { value: 'non-binary', label: 'Non-binary' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => update('gender', opt.value)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                data.gender === opt.value
                  ? 'bg-black text-white'
                  : 'border-2 border-black hover:bg-black hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => update('location', e.target.value)}
          placeholder="San Francisco, CA"
          className={inputClass}
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
          About me
          <span className="font-mono font-normal text-gray-400 normal-case tracking-normal ml-2">({data.bio.length}/300)</span>
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => update('bio', e.target.value.slice(0, 300))}
          placeholder="What makes you interesting?"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Looking for */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">What I&apos;m looking for</label>
        <input
          type="text"
          value={data.lookingFor}
          onChange={(e) => update('lookingFor', e.target.value)}
          placeholder="Someone kind, funny, and adventurous"
          className={inputClass}
        />
      </div>

      {/* Interests */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
          Interests
          <span className="font-mono font-normal text-gray-400 normal-case tracking-normal ml-2">(pick at least 3)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_INTERESTS.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`interest-tag cursor-pointer ${data.interests.includes(interest) ? 'selected' : ''}`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Photo placeholder */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Photos</label>
        <div className="border-2 border-dashed border-black p-10 text-center hover:bg-gray-50 transition cursor-pointer">
          <p className="text-sm font-bold uppercase tracking-wide">Photo Upload Coming Soon</p>
          <p className="text-xs text-gray-500 font-mono mt-1">Supabase Storage integration pending</p>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3.5 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition disabled:opacity-50"
      >
        {saving ? 'Saving...' : saved ? '// Profile Saved //' : 'Save Profile'}
      </button>
    </div>
  );
}
