const MOCK_PROFILE = {
  name: 'Alex',
  ageGroup: '6-8' as const,
  interests: ['Dinosaurs', 'Space', 'Drawing', 'LEGO'],
};

export default function ProfilePage() {
  return (
    <div className="px-4 py-6">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center text-3xl">
          {MOCK_PROFILE.name[0]}
        </div>
        <h2 className="mt-3 font-display text-xl font-bold">{MOCK_PROFILE.name}</h2>
        <span className="text-xs text-gray-500 mt-1">Age group: {MOCK_PROFILE.ageGroup}</span>
      </div>

      {/* Interests */}
      <section className="mt-8">
        <h3 className="font-semibold text-sm text-gray-700 mb-2">My Interests</h3>
        <div className="flex flex-wrap gap-2">
          {MOCK_PROFILE.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* Placeholder for stats */}
      <section className="mt-8 grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Liked', value: 42 },
          { label: 'Watched', value: 128 },
          { label: 'Saved', value: 15 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 py-3">
            <p className="text-lg font-bold text-primary-600">{value}</p>
            <p className="text-[10px] text-gray-500">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
