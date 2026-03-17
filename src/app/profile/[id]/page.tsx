import Image from 'next/image';
import Link from 'next/link';
import { MOCK_PROFILES } from '@/lib/mockData';
import LikeButton from '@/components/LikeButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfileViewPage({ params }: PageProps) {
  const { id } = await params;
  const profile = MOCK_PROFILES.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Profile not found</h1>
        <p className="text-gray-500 font-mono text-sm mb-6">This person might have moved on (or never existed).</p>
        <Link href="/browse" className="text-xs font-bold uppercase tracking-wide border-b-2 border-black hover:text-gray-500 transition">
          Back to browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Back link */}
      <Link href="/browse" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-black mb-8 transition">
        &larr; Back to browsing
      </Link>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-0 border-2 border-black">
        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden md:border-r-2 md:border-black">
          <Image
            src={profile.photos[0] || '/placeholder.jpg'}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 right-4">
            <LikeButton profileId={profile.id} size="lg" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col p-6 sm:p-8">
          {/* Name & basics */}
          <div className="border-b-2 border-black pb-6 mb-6">
            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl font-black uppercase tracking-tight">{profile.name}</h1>
              <span className="text-2xl text-gray-400 font-mono">{profile.age}</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">{profile.location}</p>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">About</h3>
            <p className="text-gray-600 font-mono text-sm leading-relaxed">{profile.bio}</p>
          </div>

          {/* Looking for */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Looking for</h3>
            <p className="text-gray-600 font-mono text-sm">{profile.lookingFor}</p>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map(interest => (
                <span key={interest} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto pt-6 border-t-2 border-black">
            <button className="flex-1 bg-black text-white py-3.5 font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition">
              Send a Wave
            </button>
            <Link
              href="/browse"
              className="px-6 py-3.5 border-2 border-black font-bold uppercase tracking-wide text-xs hover:bg-black hover:text-white transition text-center"
            >
              Keep Browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
