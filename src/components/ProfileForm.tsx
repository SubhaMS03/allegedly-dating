'use client';

import { useState } from 'react';
import { ALL_INTERESTS } from '@/lib/mockData';

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
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState<ProfileData>(() => {
    if (typeof window === 'undefined') return { name: '', age: '', gender: '', bio: '', interests: [], location: '', lookingFor: '' };
    const stored = localStorage.getItem('allegedly_my_profile');
    if (stored) return JSON.parse(stored);
    return { name: '', age: '', gender: '', bio: '', interests: [], location: '', lookingFor: '' };
  });

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

  const handleSave = () => {
    localStorage.setItem('allegedly_my_profile', JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full px-4 py-3 border-2 border-black bg-white text-black font-mono text-sm placeholder:text-gray-400 outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all";

  return (
    <div className="space-y-8">
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
        className={`w-full py-3.5 font-black uppercase tracking-widest text-sm transition ${
          saved
            ? 'bg-black text-white'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {saved ? '// Profile Saved //' : 'Save Profile'}
      </button>
    </div>
  );
}
