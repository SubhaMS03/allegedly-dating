'use client';

import { useState, useMemo } from 'react';
import { MOCK_PROFILES } from '@/lib/mockData';
import ProfileCard from '@/components/ProfileCard';

const LOCATIONS = ['All', ...Array.from(new Set(MOCK_PROFILES.map(p => p.location))).sort()];

export default function BrowsePage() {
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 45]);

  const filtered = useMemo(() => {
    return MOCK_PROFILES.filter(p => {
      if (genderFilter !== 'all' && p.gender !== genderFilter) return false;
      if (locationFilter !== 'All' && p.location !== locationFilter) return false;
      if (p.age < ageRange[0] || p.age > ageRange[1]) return false;
      return true;
    });
  }, [genderFilter, locationFilter, ageRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8 border-b-2 border-black pb-6">
        <h1 className="text-4xl font-black uppercase tracking-tight">Browse Profiles</h1>
        <p className="mt-2 text-gray-500 text-sm font-mono uppercase tracking-wide">Discover people who might be your perfect match</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8 p-5 border-2 border-black">
        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Show me</label>
          <div className="flex gap-1">
            {[
              { value: 'all', label: 'Everyone' },
              { value: 'female', label: 'Women' },
              { value: 'male', label: 'Men' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setGenderFilter(opt.value)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition ${
                  genderFilter === opt.value
                    ? 'bg-black text-white'
                    : 'border-2 border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-1.5 text-xs font-bold uppercase tracking-wide border-2 border-black bg-white text-black outline-none cursor-pointer"
          >
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Age Range */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Age: {ageRange[0]} – {ageRange[1]}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={18}
              max={45}
              value={ageRange[0]}
              onChange={(e) => setAgeRange([Math.min(Number(e.target.value), ageRange[1] - 1), ageRange[1]])}
              className="w-24 accent-black"
            />
            <span className="text-gray-400 text-xs font-bold">TO</span>
            <input
              type="range"
              min={18}
              max={45}
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], Math.max(Number(e.target.value), ageRange[0] + 1)])}
              className="w-24 accent-black"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{filtered.length} profile{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-black">
          <h3 className="text-lg font-black uppercase tracking-tight mb-2">No profiles match</h3>
          <p className="text-sm text-gray-500 font-mono">Try broadening your search criteria</p>
        </div>
      )}
    </div>
  );
}
