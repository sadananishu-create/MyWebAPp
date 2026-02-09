export default function ParentDashboard() {
  return (
    <div className="px-4 py-6">
      <h2 className="font-display text-lg font-bold mb-4">Parent Dashboard</h2>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Screen Time Today', value: '45 min' },
          { label: 'Content Viewed', value: '12' },
          { label: 'Blocked Items', value: '3' },
          { label: 'Safety Score', value: '98%' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-bold text-primary-600 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Controls placeholder */}
      <section>
        <h3 className="font-semibold text-sm text-gray-700 mb-2">Controls</h3>
        <div className="space-y-2">
          {[
            { label: 'Content Filters', desc: 'Manage blocked topics and keywords' },
            { label: 'Screen Time Limits', desc: 'Set daily viewing limits' },
            { label: 'Platform Access', desc: 'Choose which platforms to allow' },
            { label: 'Activity History', desc: 'Review what your child has watched' },
          ].map(({ label, desc }) => (
            <button
              key={label}
              className="w-full text-left px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-primary-200 transition"
            >
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
