import Link from 'next/link';
import Image from 'next/image';
import { Profile } from '@/lib/types';
import LikeButton from './LikeButton';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link
      href={`/profile/${profile.id}`}
      className="group bg-white border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden border-b-2 border-black">
        <Image
          src={profile.photos[0] || '/placeholder.jpg'}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Like button */}
        <div className="absolute top-3 right-3">
          <LikeButton profileId={profile.id} size="sm" />
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-white text-xl font-black uppercase tracking-tight group-hover:underline">{profile.name}</h3>
            <span className="text-white/70 text-lg font-mono">{profile.age}</span>
          </div>
          <p className="text-white/60 text-xs font-bold uppercase tracking-wide mt-1">{profile.location}</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-4">
        <p className="text-gray-600 text-sm font-mono line-clamp-2">{profile.bio}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {profile.interests.slice(0, 3).map((interest) => (
            <span key={interest} className="bg-gray-100 text-gray-700 px-2 py-0.5 text-xs font-mono">
              {interest}
            </span>
          ))}
          {profile.interests.length > 3 && (
            <span className="bg-gray-50 text-gray-400 px-2 py-0.5 text-xs font-mono">
              +{profile.interests.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
