import ProfileForm from '@/components/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 border-b-2 border-black pb-6">
        <h1 className="text-4xl font-black uppercase tracking-tight">My Profile</h1>
        <p className="mt-2 text-gray-500 text-sm font-mono uppercase tracking-wide">Tell the world who you are</p>
      </div>

      <div className="border-2 border-black p-6 sm:p-8">
        <ProfileForm />
      </div>
    </div>
  );
}
