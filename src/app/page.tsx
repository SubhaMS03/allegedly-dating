import Link from 'next/link';
import { MOCK_PROFILES } from '@/lib/mockData';
import ProfileCard from '@/components/ProfileCard';

export default function Home() {
  const featured = MOCK_PROFILES.slice(0, 3);

  return (
    <div>
      {/* Hero Section — black bg like allegedly-hired */}
      <section className="bg-black text-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
            Find your person — allegedly
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            No games.<br />
            No gimmicks.<br />
            <span className="text-gray-500">Just real connections.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-base sm:text-lg font-mono max-w-lg">
            Create your profile, browse real people, and find someone worth your time.
          </p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/browse"
              className="bg-white text-black px-6 py-3.5 font-black uppercase tracking-widest text-sm border-2 border-white hover:bg-gray-200 transition"
            >
              Start Browsing
            </Link>
            <Link
              href="/profile"
              className="border-2 border-white text-white px-6 py-3.5 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition"
            >
              Create Profile
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-b-2 border-black">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">How it works</h2>
        <div className="grid md:grid-cols-3 gap-0">
          {[
            { num: '01', title: 'Create your profile', desc: 'Share what makes you, you. Add your interests, photos, and what you\'re looking for.' },
            { num: '02', title: 'Browse & discover', desc: 'Explore profiles of real people. Filter by interests, location, and more.' },
            { num: '03', title: 'Connect', desc: 'Like someone? Let them know. When it\'s mutual, start a conversation.' },
          ].map((step, i) => (
            <div key={i} className={`p-6 ${i < 2 ? 'md:border-r-2 md:border-black' : ''} ${i > 0 ? 'border-t-2 md:border-t-0 border-black' : ''}`}>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{step.num}</span>
              <h3 className="text-lg font-black uppercase tracking-tight mt-2 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-600 font-mono leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">People you might like</h2>
          <Link
            href="/browse"
            className="text-xs font-bold uppercase tracking-wide border-b-2 border-black hover:text-gray-500 hover:border-gray-500 transition hidden md:block"
          >
            View All
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link href="/browse" className="text-xs font-bold uppercase tracking-wide border-b-2 border-black">
            View All Profiles
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-black text-white border-2 border-black p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Ready to meet someone new?</h2>
          <p className="text-gray-400 font-mono max-w-md mx-auto mb-8">
            Your next great connection is just a profile away.
          </p>
          <Link
            href="/profile"
            className="inline-block bg-white text-black px-8 py-3.5 font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition"
          >
            Create Your Profile
          </Link>
        </div>
      </section>
    </div>
  );
}
