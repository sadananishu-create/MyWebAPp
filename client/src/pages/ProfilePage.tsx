import { useState } from 'react';
import { useUserStore, ALL_TOPICS } from '../store/userStore';
import type { AgeGroup } from '@kidstream/shared/src/types';

const AGE_OPTIONS: AgeGroup[] = ['3-5', '6-8', '9-12'];

export default function ProfilePage() {
  const {
    name, ageGroup, interests, likedIds, watchedIds, savedIds,
    setName, setAgeGroup, toggleInterest,
  } = useUserStore();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [showInterestPicker, setShowInterestPicker] = useState(false);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setName(nameInput.trim());
    }
    setEditingName(false);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-3xl text-white font-bold shadow-lg">
          {name[0]?.toUpperCase() ?? '?'}
        </div>

        {editingName ? (
          <div className="flex items-center gap-2 mt-3">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={20}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-center font-medium focus:outline-none focus:ring-2 focus:ring-primary-400"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
            />
            <button onClick={handleSaveName} className="text-primary-600 text-sm font-semibold">
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setNameInput(name); setEditingName(true); }}
            className="mt-3 group"
          >
            <h2 className="font-display text-xl font-bold">
              {name}
              <span className="text-gray-300 group-hover:text-gray-500 ml-1 text-sm transition">
                (edit)
              </span>
            </h2>
          </button>
        )}

        {/* Age group selector */}
        <div className="flex gap-2 mt-3">
          {AGE_OPTIONS.map((ag) => (
            <button
              key={ag}
              onClick={() => setAgeGroup(ag)}
              className={`px-3 py-1 rounded-full text-xs font-medium border-2 transition ${
                ageGroup === ag
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 text-gray-500 hover:border-primary-300'
              }`}
            >
              {ag} yrs
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Liked', value: likedIds.length, color: 'text-primary-600' },
          { label: 'Watched', value: watchedIds.length, color: 'text-blue-600' },
          { label: 'Saved', value: savedIds.length, color: 'text-amber-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 py-3">
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      {/* Interests */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm text-gray-700">My Interests</h3>
          <button
            onClick={() => setShowInterestPicker(!showInterestPicker)}
            className="text-xs text-primary-600 font-medium"
          >
            {showInterestPicker ? 'Done' : 'Edit'}
          </button>
        </div>

        {showInterestPicker ? (
          <div className="flex flex-wrap gap-2">
            {ALL_TOPICS.map((topic) => {
              const active = interests.some((i) => i.toLowerCase() === topic.toLowerCase());
              return (
                <button
                  key={topic}
                  onClick={() => toggleInterest(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border-2 transition ${
                    active
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.length > 0 ? (
              interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">No interests selected. Tap Edit to add some!</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
