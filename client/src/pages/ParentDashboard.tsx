import { useState } from 'react';
import { useUserStore, ALL_TOPICS } from '../store/userStore';
import type { ContentPlatform } from '@kidstream/shared/src/types';

const PLATFORMS: { id: ContentPlatform; label: string }[] = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'youtube_shorts', label: 'YouTube Shorts' },
  { id: 'instagram_reels', label: 'Instagram Reels' },
  { id: 'image', label: 'Images' },
];

const SCREEN_TIME_OPTIONS = [15, 30, 45, 60, 90, 120];

type PanelKey = 'filters' | 'screentime' | 'platforms' | 'activity' | null;

export default function ParentDashboard() {
  const {
    name, likedIds, watchedIds, skippedIds, savedIds,
    blockedTopics, addBlockedTopic, removeBlockedTopic,
    screenTimeLimit, setScreenTimeLimit,
    platformFilters, togglePlatform,
    parentPin, setParentPin,
    resetProfile,
  } = useUserStore();

  const [openPanel, setOpenPanel] = useState<PanelKey>(null);
  const [newBlockedTopic, setNewBlockedTopic] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [authenticated, setAuthenticated] = useState(!parentPin);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Simple PIN gate for parent controls
  if (!authenticated) {
    return (
      <div className="px-4 py-12 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl mb-4">
          🔒
        </div>
        <h2 className="font-display text-lg font-bold mb-2">Parent Access</h2>
        <p className="text-sm text-gray-500 mb-4">Enter your PIN to continue</p>
        <input
          type="password"
          maxLength={6}
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter PIN"
          className="w-40 px-4 py-2 rounded-xl border-2 border-gray-200 text-center text-lg tracking-widest focus:outline-none focus:border-primary-400"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && pinInput === parentPin) setAuthenticated(true);
          }}
        />
        <button
          onClick={() => pinInput === parentPin && setAuthenticated(true)}
          className="mt-3 px-6 py-2 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition"
        >
          Unlock
        </button>
      </div>
    );
  }

  const toggle = (key: PanelKey) => setOpenPanel(openPanel === key ? null : key);

  return (
    <div className="px-4 py-6 space-y-4">
      <h2 className="font-display text-lg font-bold">Parent Dashboard</h2>
      <p className="text-xs text-gray-500">Managing profile for <span className="font-semibold text-gray-700">{name}</span></p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Content Liked', value: likedIds.length, color: 'text-primary-600' },
          { label: 'Content Watched', value: watchedIds.length, color: 'text-blue-600' },
          { label: 'Content Skipped', value: skippedIds.length, color: 'text-gray-600' },
          { label: 'Content Saved', value: savedIds.length, color: 'text-amber-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-2">
        {/* Content Filters */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button onClick={() => toggle('filters')} className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <p className="text-sm font-medium">Content Filters</p>
              <p className="text-xs text-gray-500">{blockedTopics.length} topic{blockedTopics.length !== 1 ? 's' : ''} blocked</p>
            </div>
            <span className="text-gray-400">{openPanel === 'filters' ? '▲' : '▼'}</span>
          </button>
          {openPanel === 'filters' && (
            <div className="px-4 pb-4 border-t border-gray-50 space-y-3">
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newBlockedTopic}
                  onChange={(e) => setNewBlockedTopic(e.target.value)}
                  placeholder="Block a topic..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newBlockedTopic.trim()) {
                      addBlockedTopic(newBlockedTopic.trim());
                      setNewBlockedTopic('');
                    }
                  }}
                />
                <button
                  onClick={() => { if (newBlockedTopic.trim()) { addBlockedTopic(newBlockedTopic.trim()); setNewBlockedTopic(''); } }}
                  className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Block
                </button>
              </div>
              {/* Quick-block from all topics */}
              <div className="flex flex-wrap gap-1.5">
                {ALL_TOPICS.map((topic) => {
                  const blocked = blockedTopics.some((b) => b.toLowerCase() === topic.toLowerCase());
                  return (
                    <button
                      key={topic}
                      onClick={() => blocked ? removeBlockedTopic(topic) : addBlockedTopic(topic)}
                      className={`text-[10px] px-2 py-1 rounded-full font-medium transition ${
                        blocked
                          ? 'bg-red-100 text-red-700 line-through'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
              {blockedTopics.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">Currently blocked:</p>
                  {blockedTopics.map((topic) => (
                    <div key={topic} className="flex items-center justify-between px-3 py-1.5 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-700">{topic}</span>
                      <button onClick={() => removeBlockedTopic(topic)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Screen Time */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button onClick={() => toggle('screentime')} className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <p className="text-sm font-medium">Screen Time Limits</p>
              <p className="text-xs text-gray-500">{screenTimeLimit} minutes per day</p>
            </div>
            <span className="text-gray-400">{openPanel === 'screentime' ? '▲' : '▼'}</span>
          </button>
          {openPanel === 'screentime' && (
            <div className="px-4 pb-4 border-t border-gray-50">
              <div className="flex flex-wrap gap-2 mt-3">
                {SCREEN_TIME_OPTIONS.map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setScreenTimeLimit(mins)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      screenTimeLimit === mins
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Platform Access */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button onClick={() => toggle('platforms')} className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <p className="text-sm font-medium">Platform Access</p>
              <p className="text-xs text-gray-500">{platformFilters.length} of {PLATFORMS.length} enabled</p>
            </div>
            <span className="text-gray-400">{openPanel === 'platforms' ? '▲' : '▼'}</span>
          </button>
          {openPanel === 'platforms' && (
            <div className="px-4 pb-4 border-t border-gray-50 space-y-2 mt-3">
              {PLATFORMS.map(({ id, label }) => {
                const enabled = platformFilters.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => togglePlatform(id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition"
                  >
                    <span className="text-sm">{label}</span>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${enabled ? 'bg-primary-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${enabled ? 'left-[18px]' : 'left-0.5'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button onClick={() => toggle('activity')} className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition">
            <div>
              <p className="text-sm font-medium">Activity Summary</p>
              <p className="text-xs text-gray-500">Review interactions</p>
            </div>
            <span className="text-gray-400">{openPanel === 'activity' ? '▲' : '▼'}</span>
          </button>
          {openPanel === 'activity' && (
            <div className="px-4 pb-4 border-t border-gray-50 mt-3 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-green-50 rounded-lg">
                <span className="text-lg">👍</span>
                <div>
                  <p className="text-sm font-medium text-green-700">{likedIds.length} items liked</p>
                  <p className="text-xs text-green-600">Things {name} enjoyed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 rounded-lg">
                <span className="text-lg">👀</span>
                <div>
                  <p className="text-sm font-medium text-blue-700">{watchedIds.length} items viewed</p>
                  <p className="text-xs text-blue-600">Content {name} opened</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 bg-amber-50 rounded-lg">
                <span className="text-lg">⭐</span>
                <div>
                  <p className="text-sm font-medium text-amber-700">{savedIds.length} items saved</p>
                  <p className="text-xs text-amber-600">Favorites collection</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <span className="text-lg">⏭️</span>
                <div>
                  <p className="text-sm font-medium text-gray-700">{skippedIds.length} items skipped</p>
                  <p className="text-xs text-gray-500">Content {name} didn't want</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Set/Change PIN */}
      <section className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
        <h3 className="text-sm font-medium">{parentPin ? 'Change' : 'Set'} Parent PIN</h3>
        <div className="flex gap-2">
          <input
            type="password"
            maxLength={6}
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
            placeholder="4-6 digit PIN"
            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          <button
            onClick={() => { if (pinInput.length >= 4) { setParentPin(pinInput); setPinInput(''); } }}
            disabled={pinInput.length < 4}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-primary-700 transition"
          >
            {parentPin ? 'Update' : 'Set'}
          </button>
        </div>
        <p className="text-[10px] text-gray-400">This locks the Parent Dashboard with a PIN.</p>
      </section>

      {/* Reset */}
      <section>
        {showResetConfirm ? (
          <div className="bg-red-50 rounded-xl border border-red-200 p-4 space-y-2">
            <p className="text-sm text-red-700 font-medium">Reset everything? This removes all data and returns to setup.</p>
            <div className="flex gap-2">
              <button onClick={() => resetProfile()} className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold">
                Yes, Reset
              </button>
              <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-semibold">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full text-center py-2 text-xs text-red-400 hover:text-red-600 transition"
          >
            Reset Profile
          </button>
        )}
      </section>
    </div>
  );
}
